const mPlayerNum=location.search.substring(1).split("=")[1].split(",")[0];
const mTrueTeamNum=Number(location.search.substring(1).split("=")[1].split(",")[1]);
const mFalseTeamNum=Number(location.search.substring(1).split("=")[1].split(",")[2]);
var mSelectedCharas=new Array();
var mStatusList=["TYPE","NAME","HP","MP","ATK","DEF","SPD","MOV","TEXT"];

var mTeam="T";
// var mTrueTeamNum=2;
// var mFalseTeamNum=2;

var charas=loadChara();
var mSelectPointor=0;
var mCharaMaxNum=charas.length
displayCharaData(mSelectPointor)
displayDeckData(mSelectPointor)
var mChangeChara = -1;

for(var i=0;i<mCharaMaxNum;i++){
	var tImg="";
	tImg += "<img src='../image/chara/1_face/"+(charas[i].IMAGE+100)+".png' style='width:18%' onclick='list("+i+")';>";
	$("#Charalist")[0].innerHTML+=tImg;
}

function list(aNum){
	mSelectPointor=aNum;
	displayCharaData(aNum);
	displayDeckData(aNum);
	mSelectPointor=aNum;
}
$("#changeList").on("click",function(){
	if($("#Charalist")[0].style.display=="none"){
		$("#Charalist")[0].style.display="block";
		$("#selector")[0].style.display="none";
	}
	else{
		$("#Charalist")[0].style.display="none";
		$("#selector")[0].style.display="block";
	}
});

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

	if(tData.CHANGE==undefined){
		$(".change").css("display","none");
		$(".return").css("display","none");
	}
	else{
		$(".change").css("display","block");
		$(".return").css("display","none");
		mChangeChara=tData.CHANGE;
	}

	judSelectedChara(mSelectPointor);
}
$(".return").on("click",function(){
	displayCharaData(mSelectPointor);
	displayDeckData(mSelectPointor);
	$(".return").css("display","none");
});
//キャラ表示
$(".change").on("click",function(){

	let tTag=document.getElementById("card_status");
	tTag.innerHTML="";
	let tTable=document.createElement("table");
	tTable.style.borderCollapse="collapse";
	tTag.appendChild(tTable);
	let tContents="";
	for(let i=0;i<15;i++){
		let tCardNum=i+1;
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
				if(mSkillList[j].NUMBER==mFunnel[mChangeChara].DECK[i]){
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
				if(mSkillList[j].NUMBER==mFunnel[mChangeChara].DECK[i]){
					tSkillText=mSkillList[j].TEXT;
					break;
				}
			}
			tContents+=tSkillText;
			tContents+="</td></tr>";
		}
		tTable.innerHTML=tContents;
	}
	let tData=mFunnel[mChangeChara];
	mChangeChara=tData.CHANGE;
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

	if(tData.CHANGE==undefined){
		$(".change").css("display","none");
		$(".return").css("display","none");
	}
	else if(tData.CHANGE==Infinity){
		$(".change").css("display","none");
		$(".return").css("display","block");	
	}
	else{
		$(".change").css("display","block");
		$(".return").css("display","none");
	}

	judSelectedChara(mSelectPointor);
});

$(".pointorLeft").on("click",function(){
	mSelectPointor+=(mCharaMaxNum-1);
	mSelectPointor%=mCharaMaxNum;
	displayCharaData(mSelectPointor);
	displayDeckData(mSelectPointor);
	// judSelectedChara(mSelectPointor);
})
$(".pointorRight").on("click",function(){
	mSelectPointor+=1;
	mSelectPointor%=mCharaMaxNum;
	displayCharaData(mSelectPointor);
	displayDeckData(mSelectPointor);
	// judSelectedChara(mSelectPointor);
})

//選択ボタン
function selectChara() {
	if(mSelectedCharas.length<mTrueTeamNum){
		mSelectedCharas.push([mSelectPointor,"T"]);
		var tImag = "<img src='../image/chara/1_face/"+(charas[mSelectPointor].IMAGE+100)+".png' style='width:48px;margin-bottom:-7px'>";
		$("#SelectedMember")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[mSelectedCharas.length].innerHTML = tImag;
	}
	else if(mSelectedCharas.length<mTrueTeamNum+mFalseTeamNum){
		mSelectedCharas.push([mSelectPointor,"F"]);
		var tImag = "<img src='../image/chara/1_face/"+(charas[mSelectPointor].IMAGE+100)+".png' style='width:48px;margin-bottom:-7px'>";
		$("#SelectedMember")[0].getElementsByTagName("tr")[2].getElementsByTagName("td")[mSelectedCharas.length-mTrueTeamNum].innerHTML = tImag;
	}
	if(mSelectedCharas.length==mTrueTeamNum+mFalseTeamNum){
		ipc.send("selected",mSelectedCharas,mPlayerNum);
		return;
	}
	mSelectPointor=0;
	displayCharaData(mSelectPointor);
	displayDeckData(mSelectPointor);
	// judSelectedChara(mSelectPointor);
	chageLabel();
}
//戻るボタン
function back() {
	if(mSelectedCharas.length>0){
		if(mSelectedCharas.length<=mTrueTeamNum){
			$("#SelectedMember")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[mSelectedCharas.length].innerHTML = "";
		}
		else if(mSelectedCharas.length<=mTrueTeamNum+mFalseTeamNum){
			$("#SelectedMember")[0].getElementsByTagName("tr")[2].getElementsByTagName("td")[mSelectedCharas.length-mTrueTeamNum].innerHTML = "";
		}
		mSelectedCharas.pop(mSelectedCharas);
		chageLabel();
	}
	mSelectPointor=0;
	displayCharaData(mSelectPointor);
	displayDeckData(mSelectPointor);
	// judSelectedChara(mSelectPointor);
}

function chageLabel(){
	let tLabel="";
	if(mPlayerNum==0||mSelectedCharas.length<mTrueTeamNum){
		tLabel+="プレイヤー"+Math.floor(((mSelectedCharas.length/mTrueTeamNum)+1))+"の";
	}
	else{
		tLabel+="COMの";
	}
	tLabel+="キャラ"+((mSelectedCharas.length%mTrueTeamNum)+1)+"を選んでください";
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
		let tCardNum=i+1;
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

function judSelectedChara(aNum){
	if(mSelectedCharas.length==0){
		$("#decide")[0].value="このキャラにする";
		$("#decide").prop("disabled",false);
	}
	else if(mSelectedCharas.length<mTrueTeamNum){
		for(var i=0;i<mSelectedCharas.length;i++){
			if(mSelectedCharas[i][0]==aNum){
				$("#decide")[0].value="選択済みです";
				$("#decide").prop("disabled",true);
				break;
			}
			else{
				$("#decide")[0].value="このキャラにする";
				$("#decide").prop("disabled",false);
			}
		}
	}
	else{
		for(var i=mTrueTeamNum;i<mSelectedCharas.length;i++){
			if(mSelectedCharas[i][0]==aNum){
				$("#decide")[0].value="選択済みです";
				$("#decide").prop("disabled",true);
				break;
			}
			else{
				$("#decide")[0].value="このキャラにする";
				$("#decide").prop("disabled",false);
			}
		}
	}
}
