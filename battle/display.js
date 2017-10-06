//トランプを並べる（表示）
function displayCard() {
	let tTable="";
	for(let i=0;i<7;i++){
		tTable+="<tr>";
		for(let j=0;j<8;j++){
			tTable+="<td style='width:70px;height:20px:position:relative' onclick='move("+j+","+i+")' onmouseover='attackable("+j+","+i+")' onmouseout='returnAttackable()'>";
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
			tTable+="<img src='../image/card.png' style='width:70px;height:70px;'>";
			if(tCard[1]!="joker"&&tCard[1]!="suka"){
				tTable+="<img src='../image/"+tCard[1]+".png' style='width:50px;height:50px;position:absolute;margin-left:-57px;margin-top:13px'>";
				tTable+="<p style='position:absolute;margin-top:-63px;margin-left:12px'>"+tNum+"</p>";
				// tTable+=mCard[i*7+j];
			}
			else if(tCard[1]=="joker"){
				tTable+="<p style='position:absolute;margin-top:-63px;margin-left:12px'>"+"JOKER"+"</p>";

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
		let tCard=$("#cardTable")[0].getElementsByTagName("tr")[aMoveable[i][1]].getElementsByTagName("td")[aMoveable[i][0]].getElementsByTagName("img")[0];
		tCard.src="../image/card_canMove.png";
	}
}
function returnMoveable() {
	let tCard=$("#cardTable")[0].getElementsByTagName("img");
	for(let i=0;i<tCard.length;i++){
		if(tCard[i].src.match(/card_canMove.png/)){
			tCard[i].src="../image/card.png";
		}
	}
}

function attackable(aX,aY){
	if(mEventFlag==true)//操作不可
		return;

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
		tSkill=mSkillList[tSkill];
		let tRange=calcRange(tSkill.RANGE,{x:aX,y:aY});

		for(let i=0;i<tRange.length;i++){
			let tCard=$("#cardTable")[0].getElementsByTagName("tr")[tRange[i][1]].getElementsByTagName("td")[tRange[i][0]].getElementsByTagName("img")[0];
			tCard.src="../image/card_canAttack.png";
		}
		return;
	}


}
function returnAttackable() {
	let tCard=$("#cardTable")[0].getElementsByTagName("img");
	for(let i=0;i<tCard.length;i++){
		if(tCard[i].src.match(/card_canAttack.png/)){
			tCard[i].src="../image/card.png";
		}
	}

	displayMoveable(mMovable);
}