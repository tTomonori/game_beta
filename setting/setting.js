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
			tStatus[i].innerHTML="<img src='../image/"+tData[mStatusList[i]]+".png' style='width:40px;'>"
		}
		else{
			tStatus[i].innerHTML=tData[mStatusList[i]];
		}
	}
	$("#face_image")[0].src="../image/chara/1_face/"+(tData.IMAGE+100)+".png";
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
	if(mSelectedCharas.length<2){
		mSelectedCharas.push([mSelectPointor,"T"]);
	}
	else if(mSelectedCharas.length<4){
		mSelectedCharas.push([mSelectPointor,"F"]);
	}
	if(mSelectedCharas.length==4){
		ipc.send("selected",mSelectedCharas,mPlayerNum);
		return;
	}
	chageLabel();
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

// //キャラ情報とデッキ情報の切り替え
$(".change_information").on("click",(e)=>{
	let tVal=$(".change_information:checked").val();
	let tInformation=document.getElementsByClassName("information_tab");
	for(let i=0;i<tInformation.length;i++){
		if(tInformation[i].id==tVal+"_information"){
			tInformation[i].style.display="block";
		}
		else{
			tInformation[i].style.display="none";
		}
	}
})

//デッキ情報欄生成
function displayDeckData(aNum){
	let tTag=document.getElementById("card_status");
	tTag.innerHTML="";
	let tTable=document.createElement("table");
	tTable.style.borderCollapse="collapse";
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
			tContents+="<tr style='border-bottom:solid 1px #bbf'><td>";
			tContents+="<img src='../image/card.png' style='width:35px;'>";
			tContents+="<span style='color:#000;position:absolute;margin-left:-25px;margin-top:10px'>"+tCardNum+"</span>";
			tContents+="</td><td>";
			var tSkillText = "";
			for(var j=0;j<mSkillList.length;j++){
				if(mSkillList[j].NUMBER==charas[aNum].DECK[i]){
					tSkillText=mSkillList[j].TEXT;
					break;
				}
			}
			tContents+=tSkillText;
			tContents+="</td>";
		}
		else{
			//右のセル
			tContents+="<td>";
			tContents+="<img src='../image/card.png' style='width:35px;'>";
			if(i!=13)
			tContents+="<span style='color:#000; position:absolute;margin-left:-25px;margin-top:10px'>"+tCardNum+"</span>";
			else
			tContents+="<span style='color:#000; position:absolute;margin-left:-29px;margin-top:10px;font-size:13px'>"+tCardNum+"</span>";
			tContents+="</td><td>";
			var tSkillText = "";
			for(var j=0;j<mSkillList.length;j++){
				if(mSkillList[j].NUMBER==charas[aNum].DECK[i]){
					tSkillText=mSkillList[j].TEXT;
					break;
				}
			}
			tContents+=tSkillText;
			tContents+="</td></tr>";
		}
		tTable.innerHTML=tContents;
	}
}
