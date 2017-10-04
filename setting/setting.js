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
	mSelectedCharas.push([mSelectPointor,mTeam]);
	if(mSelectedCharas.length==1){
		if(mPlayerNum==1){
			$("#player")[0].innerHTML="COMのキャラを選んでください"
		}
		else{
			$("#player")[0].innerHTML="プレイヤー2のキャラを選んでください"
		}
	}
	else if(mSelectedCharas.length==2){
		ipc.send("selected",mSelectedCharas);
	}
}
//戻るボタン
function back() {
	mSelectedCharas.pop(mSelectPointor);
	if(mSelectedCharas.length==1){
		if(mPlayerNum==1){
			$("#player")[0].innerHTML="COMのキャラを選んでください"
		}
		else{
			$("#player")[0].innerHTML="プレイヤー2のキャラを選んでください"
		}
	}
	else if(mSelectedCharas.length==0){
		$("#player")[0].innerHTML="プレイヤー1のキャラを選んでください"
	}
}
