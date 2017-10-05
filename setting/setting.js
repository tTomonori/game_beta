const mPlayerNum=location.search.substring(1).split("=")[1];
var mSelectedCharas=new Array();
var mStatusList=["NAME","HP","MP","ATK","DEF","SPD","TYPE"];

var mTeam="T";

var charas=loadChara();
var mSelectPointor=0;
var mCharaMaxNum=charas.length
displayCharaData(mSelectPointor)

//キャラ表示
function displayCharaData(aNum){
	let tData=charas[aNum];
	let tStatus=$(".status");

	for(let i=0;i<tStatus.length;i++){
		tStatus[i].innerHTML=tData[mStatusList[i]];
	}
	$("#charaImage")[0].src="../image/chara/2_stand/"+(tData.IMAGE+200)+".png";
	$("#charaNumber")[0].innerHTML=(mSelectPointor+1)+"/"+mCharaMaxNum;
}

$(".pointorLeft").on("click",function(){
	mSelectPointor+=(mCharaMaxNum-1);
	mSelectPointor%=mCharaMaxNum;
	displayCharaData(mSelectPointor);
})
$(".pointorRight").on("click",function(){
	mSelectPointor+=1;
	mSelectPointor%=mCharaMaxNum;
	displayCharaData(mSelectPointor);
})

//選択ボタン
function selectChara() {
	if(mSelectedCharas.length<2){
		mSelectedCharas.push([mSelectPointor,"T"]);
		chageLabel();
	}
	else if(mSelectedCharas.length<4){
		mSelectedCharas.push([mSelectPointor,"F"]);
		chageLabel();
	}
	if(mSelectedCharas.length==4){
		ipc.send("selected",mSelectedCharas,mPlayerNum);
	}
}
//戻るボタン
function back() {
	if(mSelectedCharas.length>0){
		mSelectedCharas.pop(mSelectPointor);
		chageLabel();
	}
}

function chageLabel(){
	let tLabel="";
	if(mPlayerNum==0||mSelectedCharas.length<2){
		tLabel+="プレイヤー"+Math.floor(((mSelectedCharas.length/2)+1))+"の";
	}
	else{
		tLabel+="COMの";
	}
	tLabel+="キャラ"+((mSelectedCharas.length%2)+1)+"を選んでください";
	$("#player")[0].innerHTML=tLabel;

}
