const socketClient=require("socket.io-client");
var mSocketServer;
var mRandoms;
var mSocketId;
var mBattleNum;
var mMyPlayerNum;
var mMyCharas=mSelectedCharas;

function getRandom(){
	mSocket.emit("get_random",{battleNum:mBattleNum,id:mSocketId});
	return mRandoms.shift();
}

function connectServer(aIpAdress){
	console.log("connect")
	mSocket=socketClient("http://"+aIpAdress+":"+(10010));
	mSocket.on("inform_id",(data)=>{//id通知
		console.log("inform_id")
		mSocketId=data.id;
	})
	mSocket.on("inform_character",(data)=>{//使用するキャラの通知
		console.log("inform_chara")
		if(mMyPlayerNum==1){
			for(let i=0;i<data.length;i++)
				if(data[i]=="T") data[i]="F";
			mSelectedCharas=mMyCharas.concat(data);
			console.log(mSelectedCharas)

		}
		else if(mMyPlayerNum==2){
			mMyTeam="F";
			for(let i=0;i<mMyCharas.length;i++)
				if(mMyCharas[i]=="T") mMyCharas[i]="F";
			mSelectedCharas=data.concat(mMyCharas);
			console.log(mSelectedCharas)
		}
	})
	mSocket.on("move",(data)=>{//対戦相手がキャラ移動
		console.log("inform_move")
		move(data.x,data.y,"receive_move");
	});
	mSocket.on("get_random",(data)=>{//乱数取得
		console.log("inform_random")
		mRandoms.push(data);
	})
	mSocket.on("matching",(data)=>{//マッチングした
		console.log("inform_match")
		mBattleNum=data.battleNum;
		mMyPlayerNum=data.playerNum;
		mSocket.emit("inform_character",{battleNum:mBattleNum,id:mSocketId,charas:mMyCharas});
	});
	mSocket.on("set_random",(data)=>{//乱数配列初期化
		console.log("inform_set_random")
		mRandoms=data;
	})
	mSocket.on("start",(data)=>{//試合開始
		console.log("inform_start")
		start();
	})
}
//キャラの移動先を対戦相手に通知
function informMove(aPosition){
	console.log("my move")
	mSocket.emit("move",{battleNum:mBattleNum,id:mSocketId,position:aPosition});
}

//通信か通信でないかで異なる関数を実行
if(mCommunicationFlag){
	$("#text")[0].textContent="マッチング中です"
	connectServer("localhost");
}
else{
	start();
}
