const mPlayerNum=location.search.substring(1).split("=")[1];
var mSelectedCharas=new Array();
var mStatusList=["NAME","HP","MP","ATK","DEF","SPD","MOV","TYPE"];

var mTeam="T";

var charas=loadChara();
var mSelectPointor=0;
var mCharaMaxNum=charas.length
displayCharaData(mSelectPointor)
displayDeckData(mSelectPointor)

//キャラ表示
function displayCharaData(aNum){
	let tData=charas[aNum];
	let tStatus=$(".status");

	for(let i=0;i<tStatus.length;i++){
		if(mStatusList[i]=="TYPE"){
			tStatus[i].innerHTML="<img src='../image/"+tData[mStatusList[i]]+".png' style='width:18px;'>"
		}
		else{
			tStatus[i].innerHTML=tData[mStatusList[i]];
		}
	}
	$("#charaImage")[0].src="../image/chara/2_stand/"+(tData.IMAGE+200)+".png";
	$("#charaNumber")[0].innerHTML=(mSelectPointor+1)+"/"+mCharaMaxNum;
}

$(".pointorLeft").on("click",function(){
	mSelectPointor+=(mCharaMaxNum-1);
	mSelectPointor%=mCharaMaxNum;
	displayCharaData(mSelectPointor);
	displayDeckData(mSelectPointor);
})
$(".pointorRight").on("click",function(){
	mSelectPointor+=1;
	mSelectPointor%=mCharaMaxNum;
	displayCharaData(mSelectPointor);
	displayDeckData(mSelectPointor);
})

//選択ボタン
function selectChara() {
	if(mSelectedCharas.length==4){
		ipc.send("selected",mSelectedCharas,mPlayerNum);
		return;
	}
	if(mSelectedCharas.length<2){
		mSelectedCharas.push([mSelectPointor,"T"]);
		chageLabel();
	}
	else if(mSelectedCharas.length<4){
		mSelectedCharas.push([mSelectPointor,"F"]);
		chageLabel();
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

//キャラ情報とデッキ情報の切り替え
function changeInformation(){
	let tStatus=document.getElementById("status_information");
	let tDeck=document.getElementById("deck_information");
	if(tStatus.style.display=="block"){
		tStatus.style.display="none"
	}
	else{
		tStatus.style.display="block"
	}
	if(tDeck.style.display=="block"){
		tDeck.style.display="none"
	}
	else{
		tDeck.style.display="block"
	}
}
//デッキ情報欄生成
function displayDeckData(aNum){
	let tTag=document.getElementById("card_status");
	tTag.innerHTML="";
	let tTable=document.createElement("table");
	tTag.appendChild(tTable);
	let tContents="";
	for(let i=0;i<15;i++){
		let tCardNum=i;
		if(i=="0") tCardNum="A";
		else if(i=="10") tCardNum="J";
		else if(i=="11") tCardNum="Q";
		else if(i=="12") tCardNum="K";
		else if(i=="13") tCardNum="JKR"
		else if(i=="14") tCardNum="";
		if(i%2==0){
			//左のセル
			tContents+="<tr><td>";
			tContents+="<img src='../image/card.png' style='width:35px;'>";
			tContents+="<span style='position:absolute;margin-left:-25px;margin-top:10px'>"+tCardNum+"</span>";
			tContents+="</td><td>";
			tContents+=mSkillList[charas[aNum].DECK[i]].TEXT;
			tContents+="</td>";
		}
		else{
			//右のセル
			tContents+="<td>";
			tContents+="<img src='../image/card.png' style='width:35px;'>";
			tContents+="<span style='position:absolute;margin-left:-25px;margin-top:10px'>"+tCardNum+"</span>";
			tContents+="</td><td>";
			tContents+=mSkillList[charas[aNum].DECK[i]].TEXT;
			tContents+="</td></tr>";
		}
		tTable.innerHTML=tContents;
	}
}
