//URLから引数を取得
//[[選択されたキャラクター,チーム],...]
var mSelectedCharas=location.search.substring(1).split("&")[0].split("=")[1].split(",");
const mPlayerNum=Number(location.search.substring(1).split("&")[1].split("=")[1].split(",")[0]);
var mCommunicationFlag=(mPlayerNum==-1)?true:false;
var mTurnChara = new Array();//選択キャラ[[delay],[チーム],[番号]]
var mMovable = new Array();//移動可能リスト
//flag==trueのとき操作不能
var mEventFlag=true;
//キャラクターのデータを取得
// var mCharaData=loadChara();
//delayのリスト
var mDelayList = new Array();

//トランプ
// var mCard=new Array();

var mMyTeam="T";

//チームのリスト
var mTrueTeam=new Array();
var mFalseTeam=new Array();


// var mBattleBoard=new Array();
//トランプ＋２枚生成
// for(let i=0;i<56;i++){
// 	let tMark;
// 	//0から12がスペード
// 	if(0<=i&&i<=12) tMark="spade";
// 	//13から25がクラブ
// 	if(13<=i&&i<=25) tMark="club";
// 	//26から38がダイヤ
// 	if(26<=i&&i<=38) tMark="diamond";
// 	//39から51がハート
// 	if(39<=i&&i<=51) tMark="heart";
// 	//52,53がジョーカー
// 	if(52<=i&&i<=53) tMark="joker";
// 	//54,55がスカ
// 	if(54<=i&&i<=55) tMark="suka";
//
// 	mCard.push([i%13,tMark]);
// }
// if(mCommunicationFlag){
// 	connectServer("localhost");
// }
// else{
// 	start();
// }

function start(){
// //シャッフルする
// mCard=shuffle(mCard);
// //トランプを並べる
Feild.displayCard();
//チームの人数を数える
let tTNum=0;
let tFNum=0;
for(let i=1;i<mSelectedCharas.length;i+=2){
	if(mSelectedCharas[i]=="T"){
		tTNum++;
	}
	else{
		tFNum++;
	}
}

//初期配置
let tTCharaPosition;
let tFCharaPosition;
if(tTNum==1){
	tTCharaPosition=[[1,3]]
}
else if(tTNum==2){
	tTCharaPosition=[[1,2],[1,4]]
}
else if(tTNum==3){
	tTCharaPosition=[[1,1],[1,3],[1,5]]
}
if(tFNum==1){
	tFCharaPosition=[[6,3]]
}
else if(tFNum==2){
	tFCharaPosition=[[6,2],[6,4]]
}
else if(tFNum==3){
	tFCharaPosition=[[6,1],[6,3],[6,5]]
}
//実際に配置
for(let i=0;i<mSelectedCharas.length;i+=2){
	let tCharaClass=CharaList.getCharaClass(mSelectedCharas[i]);
	if(mSelectedCharas[i+1]=="T"){
		mTrueTeam.push(new tCharaClass(tTCharaPosition[0][0],tTCharaPosition[0][1],"T"))
		tTCharaPosition.shift()
	}
	else{
		mFalseTeam.push(new tCharaClass(tFCharaPosition[0][0],tFCharaPosition[0][1],"F"))
		tFCharaPosition.shift()
	}
}
//初期delayを設定
mDelayList = initDelay(mTrueTeam,mFalseTeam);

initDisplay();
displayStatus();
displayDelay();
//ここまでで初期設定が完了
//バトルのメイン関数
// shuffleAnimate(mCard).then(()=>{
// 	flowBand("バトルスタート").then(()=>{
// 			battleMain();
// 	})
// })
// }
Feild.shuffleAnimate().then(()=>{
	flowBand("バトルスタート").then(()=>{
		battleMain();
	})
})
}


// for(let i=0;i<7;i++){
// 	mBattleBoard.push(mCard.slice(i*8,i*8+8));
// }
//トランプシャッフル
// function shuffle(aCard){
// 	//取り出す範囲(箱の中)を末尾から狭める繰り返し
// 	for(let i = aCard.length -1;i>0;i--){
// 	    //乱数生成を使ってランダムに取り出す値を決める
// 	    let r = Math.floor(makeRandom()*(i+1));
// 	    //取り出した値と箱の外の先頭の値を交換する
// 	    let tmp = aCard[i];
// 	    aCard[i] = aCard[r];
// 	    aCard[r] = tmp;
// 	}
// 	return aCard;
// }

function changeText(aText){
	$("#text")[0].innerHTML=aText;

}
////////////////////////////////////////////////////////////////////////////////////////



function battleMain(){
	sortDelayList();
	displayDelay();
	//ターン管理
	//行動キャラの選択
	mTurnChara = mDelayList[0];//先頭のキャラが一番delayの値が少ない
	// mTrueTeam = delayMinus(mTrueTeam,mTurnChara[0]); //全体のdelay値を下げる
	// mFalseTeam = delayMinus(mFalseTeam,mTurnChara[0]);//全体のdelay値を下げる
	delayMinus();

	var tCharaTeam=(mTurnChara.getTeam()=="T")?mTrueTeam:mFalseTeam;
	changeText("<strong style='color:"+mTurnChara.getTeamColor()+";-webkit-text-stroke-color: #fff;-webkit-text-stroke-width: 0.5px;'>"+mTurnChara.getName()+"</strong>"+"のターン")

	//MPの回復
	mTurnChara.startTurn();
	//移動
	mMovable = movableSquares(mTurnChara);//移動先のリスト
	//移動先のトランプの色を変えたい

	displayStatus();

	//操作
	if(mPlayerNum!=0&&mTurnChara.getTeam()!=mMyTeam){
		if(!mCommunicationFlag)
			com(mPlayerNum);
	}
	else{
		mEventFlag = false;//操作可能に
		displayMoveable(mMovable);
	}
}

function winner(aWinner){
	mEventFlag=true;
	if(mCommunicationFlag){//通信中ならサーバに終了通知
		informFinish();
	}
	displayStatus();
	let tWinnerTeam;
	if(aWinner=="T") tWinnerTeam=mTrueTeam;
	else tWinnerTeam=mFalseTeam;

	let tLog="winner is "+aWinner+" team"
	addLog(tLog);
	console.log(tLog);//勝者
	flowBand(tLog);
	document.getElementById("text").innerHTML="winner is "+"<b style='color:"+tWinnerTeam[0].teamColor+"'>"+aWinner+"</b> team";

	$("#finishButton")[0].style.display="block"
}

function makeRandom(){
	if(mCommunicationFlag){
		//通信対戦時
		return getRandom();
	}
	else{
		return Math.random();
	}
}
