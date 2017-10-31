const socketClient=require("socket.io-client");
const version=require("../version.js");
var mSocketServer;
var mRandoms;
var mSocketId;
var mBattleNum;
var mMyPlayerNum;
var mMyCharas=mSelectedCharas;
var mTimer;

function getRandom(){
	mSocket.emit("get_random",{battleNum:mBattleNum,id:mSocketId});
	return mRandoms.shift();
}

function connectServer(aIpAdress){
	mSocket=socketClient("http://"+aIpAdress+":"+(10010));
	mSocket.on("inform_id",(data)=>{//id通知
		window.clearTimeout(mTimer)//接続タイムアウト関数を削除
		$("#text")[0].textContent="マッチング中です"
		mSocketId=data.id;
		data.charaNum=mSelectedCharas.length;
		mSocket.emit("inform_version",version.version,data);
	})
	mSocket.on("not_match_version",(data)=>{//バージョンが合わない
		$("#text")[0].textContent="サーバのバージョンと異なります";
		$("#finishButton")[0].style.display="block";
	})
	mSocket.on("inform_character",(data)=>{//使用するキャラの通知
		if(mMyPlayerNum==1){
			$("#text")[0].textContent="あなたはTチームです"
			for(let i=0;i<data.length;i++)
				if(data[i]=="T") data[i]="F";
			mSelectedCharas=mMyCharas.concat(data);

		}
		else if(mMyPlayerNum==2){
			$("#text")[0].textContent="あなたはFチームです"
			mMyTeam=["F"];
			for(let i=0;i<mMyCharas.length;i++)
				if(mMyCharas[i]=="T") mMyCharas[i]="F";
			mSelectedCharas=data.concat(mMyCharas);
		}
	})
	mSocket.on("move",(data)=>{//対戦相手がキャラ移動
		move(data.x,data.y,"receive_move");
	});
	mSocket.on("get_random",(data)=>{//乱数取得
		mRandoms.push(data);
	})
	mSocket.on("matching",(data)=>{//マッチングした
		mBattleNum=data.battleNum;
		mMyPlayerNum=data.playerNum;
		mSocket.emit("inform_character",{battleNum:mBattleNum,id:mSocketId,charas:mMyCharas});
	});
	mSocket.on("set_random",(data)=>{//乱数配列初期化
		mRandoms=data;
	})
	mSocket.on("start",(data)=>{//試合開始
		start();
	})
}
//キャラの移動先を対戦相手に通知
function informMove(aPosition){
	mSocket.emit("move",{battleNum:mBattleNum,id:mSocketId,position:aPosition});
}

//通信か通信でないかで異なる関数を実行
if(mCommunicationFlag){
	$("#text")[0].textContent="サーバのIPアドレスを入力してください"
	$("#adressForm")[0].style.display="block";
	// connectServer("localhost");
}
else{
	start();
}

function connect(){
	$("#text")[0].textContent="接続中です"
	$("#adressForm")[0].style.display="none";
	let tAdress=$("#adressText")[0].value;
	connectServer(tAdress);
	mTimer=setTimeout(()=>{//接続タイムアウト
		mSocket=mSocket.disconnect();
		$("#text")[0].textContent="サーバが見つかりません"
		$("#adressForm")[0].style.display="block";
	},5000)
}
//バトルが終わったことをサーバに通知
function informFinish(){
	mSocket.emit("finish",{battleNum:mBattleNum});
}
