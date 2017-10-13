//トランプを並べる（表示）
function displayCard() {
	let tTable="";
	for(let i=0;i<7;i++){
		tTable+="<tr>";
		for(let j=0;j<8;j++){
			tTable+="<td style='width:70px;height:20px:position:relative' onclick='move("+j+","+i+")' onmouseover='attackable("+j+","+i+")' onmouseout='if(mEventFlag)returnMoveable();else returnAttackable()'>";
			let tCard=mCard[j+i*8];

			// let tMark=mCard[i*8+j]/13;
			let tNum=tCard[0];
			// if(tMark>=4){
			// 	if(tNum<=1){
			// 		tNum="JOKER";
			// 	}
			// 	else{
			// 		tNum="";
			// 	}
			// 	tMark="";
			// }
			// else {
				//マーク
				// if(tMark<=1){
				// 	tMark="spade.png";
				// }
				// if(tMark<=2){
				// 	tMark="club.png";
				// }
				// if(tMark<=3){
				// 	tMark="diamond.png";
				// }
				// if(tMark<=4){
				// 	tMark="heart.png";
				// }
				//数字
				if(tNum==0){
					tNum="A";
				}
				else if(tNum==10){
					tNum="J";
				}
				else if(tNum==11){
					tNum="Q";
				}
				else if(tNum==12){
					tNum="K";
				}
				else {
					tNum=tNum+1;
				}

			if(tCard[1]!="joker"&&tCard[1]!="suka"){
				tTable+="<img src='../image/card.png' style='width:70px;height:70px;'>";
				tTable+="<img src='../image/"+tCard[1]+".png' style='width:50px;height:50px;position:absolute;margin-left:-57px;margin-top:13px'>";
				tTable+="<p style='position:absolute;margin-top:-63px;margin-left:12px'>"+tNum+"</p>";
				// tTable+=mCard[i*7+j];
			}
			else if(tCard[1]=="joker"||tCard[1]=="suka"){
				tTable+="<img src='../image/card_back.png' style='width:70px;height:70px;'>";
			}

			tTable+="</td>";
		}
		tTable+="</tr>";
	}
	$("#cardTable")[0].innerHTML=tTable;
}

//キャラの表示
function initDisplay(){
	for(let i=0;i<mTrueTeam.length;i++){
		mTrueTeam[i].initDisplay();
	}
	for(let i=0;i<mFalseTeam.length;i++){
		mFalseTeam[i].initDisplay();
	}
}

//ステータス表示
function displayStatus(){
	let tTag=document.getElementById("status");
	tTag.innerHTML="";
	displayTeamStatus(tTag,mTrueTeam);
	displayTeamStatus(tTag,mFalseTeam);
}
function displayTeamStatus(aTag,aTeam){
	for(let i=0;i<aTeam.length;i++){
		aTag.innerHTML+="<div style='background:"+aTeam[i].teamColor+";margin:2px;width:90%;border-radius:10px;margin-bottom:10px;padding-bottom:5px'>"
		+"<table style='width:100%;color:#ffffff'><tr><td rowspan='3' style='width:64px'><div style='width:64px;height:64px;overflow:hidden;'><img src='"+aTeam[i].getActorUrl()+"' style=''></div><img src='../image/"+aTeam[i].TYPE+".png' style='width:20px;margin-top:-20px;position:absolute'></td>"
		+"<td>"+aTeam[i].NAME+"</td></tr>"
		+"<tr><td>HP:"+aTeam[i].HP+"/"+aTeam[i].originalHP
		+"</td><tr><td>"+"MP:"+aTeam[i].MP+"/"+aTeam[i].originalMP+"</td></tr>"
		+"<tr><td colspan='2'>"+aTeam[i].getHPBar()+"</td></tr>"
		+"<tr><td colspan='2'>"+aTeam[i].getMPBar()+"</td></tr>"
		+"</div>"
	}
}

function displayDelay(){
	let tOrder=document.getElementById("order");
	tOrder.innerHTML="";
	for(let i=0;i<mDelayList.length;i++){
		let tPickChara=mDelayList[i];
		if(tPickChara[1]=="T"){
			tOrder.innerHTML+="<img src='"+mTrueTeam[tPickChara[2]].getFaceUrl()+"' style='width:50%;border-radius:144px;border:solid 3px "+mTrueTeam[tPickChara[2]].teamColor+";background:"+mTrueTeam[tPickChara[2]].teamColor+"'>"
		}
		else if(tPickChara[1]=="F"){
			tOrder.innerHTML+="<img src='"+mFalseTeam[tPickChara[2]].getFaceUrl()+"' style='width:50%;border-radius:144px;border:solid 3px "+mFalseTeam[tPickChara[2]].teamColor+";background:"+mFalseTeam[tPickChara[2]].teamColor+"'>"
		}
		tOrder.innerHTML+="<br>";
	}
}

function displayMoveable(aMoveable) {
	for(let i=0;i<aMoveable.length;i++){
		let tCardCell=$("#cardTable")[0].getElementsByTagName("tr")[aMoveable[i][1]].getElementsByTagName("td")[aMoveable[i][0]];
		let tCard=document.createElement("img");
		tCard.style.position="absolute";
		tCard.style.pointerEvents="none";
		tCard.style.marginLeft="-70px";
		tCard.style.width="70px";
		tCard.style.height="70px";
		tCard.style.opacity="0.6";
		tCard.src="../image/card_canMove.png";
		tCardCell.appendChild(tCard);
	}
}
function returnMoveable() {
	let tCard=document.getElementsByTagName("img");
	for(let i=0;i<tCard.length;i++){
		if(tCard[i].src.match(/card_canAttack.png/)){
			tCard[i].remove()
		}
		if(tCard[i].src.match(/card_canMove.png/)){
			tCard[i].remove()
		}
	}
}

function attackable(aX,aY){
	if(mEventFlag==true){//操作不可
		returnMoveable();
		return;
	}

	for(let i=0;i<mMovable.length;i++){
		if(mMovable[i][0]!=aX||mMovable[i][1]!=aY){
			continue;
		}

		//カードの確認
		var tCard=mCard[aX+aY*8];

		var tChara = new Object();
		if(mDelayChara[1]=="T"){
			tChara = mTrueTeam[mDelayChara[2]];
		}
		else{
			tChara = mFalseTeam[mDelayChara[2]];
		}
		//デッキの確認
		var tSkill;
		if(tCard[1]=="joker"){
			tSkill=tChara.deck[13];
		}
		else if(tCard[1]=="suka"){
			tSkill=tChara.deck[14];
		}
		else{
			tSkill=tChara.deck[tCard[0]];
		}

		//技取り出し
		for(var j=0;j<mSkillList.length;j++){
			if(mSkillList[j].NUMBER==tSkill){
				tSkill=mSkillList[j];
				break;
			}
		}
		// tSkill=mSkillList[tSkill];
		let tRange=calcRange(tSkill.RANGE,{x:aX,y:aY});
		if(tCard[1]!="joker"&&tCard[1]!="suka"){//jokerとsukaは攻撃範囲を表示しない
			for(let i=0;i<tRange.length;i++){
				// let tCard=$("#cardTable")[0].getElementsByTagName("tr")[tRange[i][1]].getElementsByTagName("td")[tRange[i][0]].getElementsByTagName("img")[0];
				let tCardCell=$("#cardTable")[0].getElementsByTagName("tr")[tRange[i][1]].getElementsByTagName("td")[tRange[i][0]];
				let tCard=document.createElement("img");
				tCard.style.position="absolute";
				tCard.style.pointerEvents="none";
				tCard.style.marginLeft="-70px";
				tCard.style.width="70px";
				tCard.style.height="70px";
				tCard.style.opacity="0.6";
				tCard.src="../image/card_canAttack.png";
				tCardCell.appendChild(tCard);
			}
		}
		return;
	}


}
function returnAttackable() {
	let tCard=document.getElementsByTagName("img");
	for(let i=0;i<tCard.length;i++){
		if(tCard[i].src.match(/card_canAttack.png/)){
			tCard[i].remove()
		}
		if(tCard[i].src.match(/card_canMove.png/)){
			tCard[i].remove()
		}
	}
	displayMoveable(mMovable);
}

function displayDeck(aNum){
	if(mDelayChara[1]=="T"){
		for(var j=0;j<mSkillList.length;j++){
			if(mSkillList[j].NUMBER==mTrueTeam[mDelayChara[2]].deck[aNum]){
				$("#cardText")[0].textContent=mSkillList[j].TEXT;
				break;
			}
		}
	}
	else if(mDelayChara[1]=="F"){
		for(var j=0;j<mSkillList.length;j++){
			if(mSkillList[j].NUMBER==mFalseTeam[mDelayChara[2]].deck[aNum]){
				$("#cardText")[0].textContent=mSkillList[j].TEXT;
				break;
			}
		}
	}
	$("#cardText").css("left",aNum*50+"px");
	$("#cardText").css("display","inline-block");
}

function returnDeck(){
	$("#cardText").css("display","none")
}

//ログ追加
function addLog(aLog){
	let tLogTag=document.getElementById("log");
	if(tLogTag.innerHTML!="")
		tLogTag.innerHTML+="<hr>";
	tLogTag.innerHTML+=aLog+"<br>";
	// tLogTag.scrollTop="";
	$("#log").delay(100).animate({
		scrollTop: $("#log")[0].scrollHeight
	},1500)
}
//ダメージのログ
function damageLog(aChara,aDamage){
	let tLog="";
	if(aDamage<0){
		tLog+="<b style='color:"+aChara.teamColor+"'>"+aChara.NAME+"</b>"+"が"+(-aDamage)+"回復";
	}
	else{
		tLog+="<b style='color:"+aChara.teamColor+"'>"+aChara.NAME+"</b>"+"に"+aDamage+"ダメージ";
	}
	addLog(tLog);
}
//汎用ログ
function freeLog(aChara,aStatus,aText){
	let tLog="";
	tLog+="<b style='color:"+aChara.teamColor+"'>"+aChara.NAME+"</b>"+"の"+aStatus+"が"+aText;
	addLog(tLog);	
}
