//URLから引数を取得
//[[選択されたキャラクター,チーム],...]
var mSelectedCharas=location.search.substring(1).split("&")[0].split("=")[1].split(",");
var mTurnChara;
var mMovable = new Array();//移動可能リスト
//flag==trueのとき操作不能
var mEventFlag=true;
//delayのリスト
var mDelayList = new Array();

var mMyTeam=["T"];
//チームのリスト
var mTrueTeam=new Array();
var mFalseTeam=new Array();

let start;//バトル開始関数

var mPlayerNum;

if(location.search.substring(1).split("&")[1].split("=")[0]=="num"){
mPlayerNum=Number(location.search.substring(1).split("&")[1].split("=")[1].split(",")[0]);
var mCommunicationFlag=(mPlayerNum==-1)?true:false;
if(mPlayerNum==0) mMyTeam=["T","F"];
start=()=>{normalStart()}
}
else if(location.search.substring(1).split("&")[1].split("=")[0]=="quest"){
	start=()=>{};
const mQuestNum=Number(location.search.substring(1).split("&")[1].split("=")[1].split(",")[0]);
let tQuestClass=QuestList.getQuestClass(mQuestNum);
let tQuest=new tQuestClass();
let tCharas=new Array();
if(mSelectedCharas[0]!=""){
	for(let i=0;i<mSelectedCharas.length;i+=2)
		tQuest.addChoicedChara(mSelectedCharas[i])
}
tQuest.questStart();
}

//バトル開始(quest以外)
function normalStart(){
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
	let tOperationNum=(mMyTeam.indexOf(mSelectedCharas[i+1])!=-1)?0:mPlayerNum;
	if(mSelectedCharas[i+1]=="T"){
		mTrueTeam.push(new tCharaClass(tTCharaPosition[0][0],tTCharaPosition[0][1],"T",tOperationNum))
		tTCharaPosition.shift()
	}
	else{
		mFalseTeam.push(new tCharaClass(tFCharaPosition[0][0],tFCharaPosition[0][1],"F",tOperationNum))
		tFCharaPosition.shift()
	}
}
//初期delayを設定
mDelayList = initDelay(mTrueTeam,mFalseTeam);

initDisplay();
displayStatus();
displayDelay();

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

function addChara(aChara){
	let tTeam=(aChara.getTeam()=="T")?mTrueTeam:mFalseTeam;
	tTeam.push(aChara);
	mDelayList.push(aChara);
}
//キャラを消す
function removeChara(aChara){
	aChara.container.remove();
	let tTeam=(aChara.getTeam()=="T")?mTrueTeam:mFalseTeam;
	for(let i=0;i<tTeam.length;i++){
		if(tTeam[i]==aChara){
			tTeam.splice(i,1);
		}
	}
	for(let i=0;i<mDelayList.length;i++){
		if(mDelayList[i]==aChara){
			mDelayList.splice(i,1);
		}
	}
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
	mTurnChara.startTurn().then(()=>{
		//移動
		mMovable = movableSquares(mTurnChara);//移動先のリスト
		if(mMovable.length==0){
			if(mTurnChara.getMov>0){
				addLog("移動できない");
				mTurnChara.endTurn(0).then(()=>{
					battleMain();
				})
			}
			else{
				attack(mTurnChara).then(()=>{
					battleMain();
				})
			}
			return;
		}

		displayStatus();

		//操作
		if(mTurnChara.getOperationNum()!=0/*&&mMyTeam.indexOf(mTurnChara.getTeam())==-1*/){
			if(!mCommunicationFlag){
				com(mTurnChara.getOperationNum());
			}
		}
		else{
			mEventFlag = false;//操作可能に
			displayMoveable(mMovable);
		}
	})
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

//0からaNumまでのランダムな整数値を返す(引数を設定していないなら0から1未満の実数)
function makeRandom(aNum){
	if(mCommunicationFlag){
		//通信対戦時
		if(aNum!=undefined) return Math.floor(getRandom()*(aNum+1))
		return getRandom();
	}
	else{
		if(aNum!=undefined) return Math.floor(Math.random()*(aNum+1))
		return Math.random();
	}
}
