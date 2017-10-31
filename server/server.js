version=require("../version.js");

const http = require('http');
var socketio = require('socket.io');
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(fs.readFileSync(__dirname, 'utf-8'));
}).listen(10010);
var io = socketio.listen(server);

//マッチング中のユーザの情報
var mMatchingUser=[null,null,null,null];
var mBattleNum=0;
//{user1Socket,user1Id,user2Socket,user2Id,battleNum,randoms1,randoms2,user1Charas,user2Charas}
var mBattles=new Map();//対戦中の試合の情報

io.sockets.on('connection', function(socket) {
  //idの通知
  io.to(socket.id).emit("inform_id",{id:socket.id});
  socket.on("inform_version",(aVersion,aSocket)=>{//バージョンを確認する
    if(aVersion!=version.version){//バージョンが異なる
      io.to(aSocket.id).emit("not_match_version");
      return;
    }
    //選択したキャラの数を確認し,マッチングさせる
    let tCharaNum=aSocket.charaNum;//キャラクターの数
    let tUserData={id:aSocket.id}
    if(mMatchingUser[tCharaNum]==null){//一人目
      mMatchingUser[tCharaNum]=tUserData;
    }
    else if(mMatchingUser[tCharaNum]!=null){//二人目
      let tPartnerData=mMatchingUser[tCharaNum];
      mMatchingUser[tCharaNum]=null;
      matching(tUserData,tPartnerData);
    }
  })
  socket.on("inform_character",(data)=>{//使用するキャラの通知
    informChara(data.battleNum,data.id,data.charas);
    let tBattle=mBattles.get(data.battleNum);
    //二人ともキャラを通知したならバトル開始
    if(tBattle.user1Charas!=undefined&&tBattle.user2Charas!=undefined){
      startBattle(data.battleNum);
    }
  })
  socket.on("move",(data)=>{//移動
    move(data.battleNum,data.id,data.position);
  })
  socket.on("get_random",(data)=>{//乱数取得
    getRandom(data.battleNum,data.id);
  })
  socket.on("finish",(data)=>{//バトル終了
    mBattles.delete(data.battleNum);
  })
});
//試合番号生成
function getBattleNum(){
  if(mBattleNum>10000) mBattleNum=0;
  return mBattleNum++;
}
//対戦相手のidを返す
function getPartnerId(aBattleNum,aId){
  let tBattle=mBattles.get(aBattleNum);
  let tPartnerId;
  if(aId==tBattle.user1Id) tPartnerId=tBattle.user2Id;
  else if(aId==tBattle.user2Id) tPartnerId=tBattle.user1Id;

  return tPartnerId;
}
//マッチングさせる
function matching(aUser1,aUser2){
  let tBattleNum=getBattleNum();
  mBattles.set(tBattleNum,{user1Socket:aUser1.socket,user1Id:aUser1.id,user2Socket:aUser2.socket,user2Id:aUser2.id,battleNum:tBattleNum,randoms1:new Array(),randoms2:new Array()});

  //マッチングしたことを伝える
  io.to(aUser1.id).emit("matching",{battleNum:tBattleNum,playerNum:1});
  io.to(aUser2.id).emit("matching",{battleNum:tBattleNum,playerNum:2});
  //試合開始時に乱数配列初期化
  setRandom(tBattleNum);
  return tBattleNum;
}
//使用するキャラの通知
function informChara(aBattleNum,aId,aCharas){
  let tPartnerId=getPartnerId(aBattleNum,aId);

  io.to(tPartnerId).emit("inform_character",aCharas);

  let tBattle=mBattles.get(aBattleNum);
  if(tBattle.user1Id==aId) tBattle.user1Charas=aCharas;
  else if(tBattle.user2Id==aId) tBattle.user2Charas=aCharas;
}
//キャラ移動
function move(aBattleNum,aId,aPosition){
  let tPartnerId=getPartnerId(aBattleNum,aId);
  io.to(tPartnerId).emit("move",aPosition);
}
//乱数を取得
function getRandom(aBattleNum,aId){
  let tBattle=mBattles.get(aBattleNum);
  let tMyRandomList;
  let tPartnerRandomList;
  if(aId==tBattle.user1Id){
    tMyRandomList=tBattle.randoms1;
    tPartnerRandomList=tBattle.randoms2;
  }
  else if(aId==tBattle.user2Id){
    tMyRandomList=tBattle.randoms2;
    tPartnerRandomList=tBattle.randoms1;
  }

  let tRandom;
  if(tMyRandomList.length>0){
    tRandom=tMyRandomList.shift();
    io.to(aId).emit("get_random",tRandom);
  }
  else{
    tRandom=Math.random();
    tPartnerRandomList.push(tRandom);
    io.to(aId).emit("get_random",tRandom);
  }
}
//試合開始時に乱数配列初期化
function setRandom(aBattleNum){
  let tRandomNum=1000;
  let tRandomList=new Array();
  for(let i=0;i<tRandomNum;i++){
    tRandomList.push(Math.random())
  }
  let tBattle=mBattles.get(aBattleNum);
  io.to(tBattle.user1Id).emit("set_random",tRandomList);
  io.to(tBattle.user2Id).emit("set_random",tRandomList);
}
//試合開始通知
function startBattle(aBattleNum){
  let tBattle=mBattles.get(aBattleNum);
  io.to(tBattle.user1Id).emit("start");
  io.to(tBattle.user2Id).emit("start");
}
