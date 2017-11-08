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
		+"<table style='width:100%;color:#ffffff'><tr><td rowspan='3' style='width:64px'><div style='width:64px;height:64px;overflow:hidden;'><img src='"+aTeam[i].getActorUrl()+"' style=''></div><img src='../image/"+aTeam[i].TYPE+".png' style='width:20px;margin-top:-20px;position:relative'></td>"
		+"<td>"+aTeam[i].NAME+"</td></tr>"
		+"<tr><td>HP:"+aTeam[i].HP+"/"+aTeam[i].maxHP
		+"</td><tr><td>"+"MP:"+aTeam[i].MP+"/"+aTeam[i].maxMP+"</td></tr>"
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
			tOrder.innerHTML+="<img src='"+tPickChara.getFaceUrl()+"' style='width:50%;border-radius:144px;border:solid 3px "+tPickChara.getTeamColor()+";background:"+tPickChara.getTeamColor()+"'>"
		tOrder.innerHTML+="<br>";
	}
}

function displayMoveable(aMoveable) {
	for(let i=0;i<aMoveable.length;i++){
		let tCardCell=$("#cardTable")[0].getElementsByTagName("tr")[aMoveable[i][1]].getElementsByTagName("td")[aMoveable[i][0]];
		let tCard=document.createElement("img");
		tCard.style.position="absolute";
		tCard.style.pointerEvents="none";
		tCard.style.top="0";
		tCard.style.left="0";
		tCard.style.width="65px";
		tCard.style.height="65px";
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
		//カードの確認

	if(mEventFlag==true){//操作不可
		returnMoveable();
		return;
	}
		let tCard=Feild.getCard(aX,aY);
		let tNumber=tCard.getNumber();
		if(tNumber!="joker"&&tNumber!="suka"){
			displayDeck(tCard);
		}

	for(let i=0;i<mMovable.length;i++){
		if(mMovable[i][0]!=aX||mMovable[i][1]!=aY){
			continue;
		}


		var tChara = mTurnChara;
		//デッキの確認
		var tSkill=tChara.getSkill(tCard);

		//技取り出し
		// for(var j=0;j<mSkillList.length;j++){
		// 	if(mSkillList[j].NUMBER==tSkill){
		// 		tSkill=mSkillList[j];
		// 		break;
		// 	}
		// }
		// tSkill=mSkillList[tSkill];
		let tRange=calcRange(tSkill.RANGE,{x:aX,y:aY});
		if(!tCard.revers){//裏返されているなら表示しない
			if(tChara.MP<tSkill.MAGIC){
				tCardCell=$("#cardTable")[0].getElementsByTagName("tr")[tChara.y].getElementsByTagName("td")[tChara.x];
				var tPreDamage=document.createElement("div");
				tPreDamage.style.position="absolute";
				tPreDamage.style.pointerEvents="none";
				tPreDamage.style.top="-35px";
				tPreDamage.style.left="-25px";
				tPreDamage.style.width="120px";
				tPreDamage.style.height="65px";
				tPreDamage.style.textAlign="center"
				tPreDamage.style.color="#f00";
				tPreDamage.style.fontSize="30px";
				tPreDamage.classList.add("predamege")
				tPreDamage.style.webkitTextStrokeColor="#fff";
				tPreDamage.style.webkitTextStrokeWidth="0.5px";
				tPreDamage.style.zIndex="5";
				// tPreDamage.style.zoom="2";
				tPreDamage.style.pointerEvents="none";
				tDamage="MP不足"
				tPreDamage.textContent=tDamage;
				tCardCell.appendChild(tPreDamage);
				return;
			}
			let tDamageCharas;
			let t;
			let tMyTeam=(mTurnChara.getTeam()=="T")?mTrueTeam:mFalseTeam;
			let tEnemyTeam=(mTurnChara.getTeam()=="T")?mFalseTeam:mTrueTeam;
			let tCardImage;
			if(tSkill.F_ATTACK==true&&tSkill.E_ATTACK==true){
				tDamageCharas=tMyTeam.concat(tEnemyTeam);
				tCardImage="../image/card_indiscriminate.png";
			}
			else if(tSkill.F_ATTACK==true&&tSkill.E_ATTACK==false){
				tDamageCharas=tMyTeam.concat();
				t=10;
				tCardImage="../image/card_friend.png";
			}
			else if(tSkill.F_ATTACK==false&&tSkill.E_ATTACK==true){
				tDamageCharas=tEnemyTeam.concat();
				tCardImage="../image/card_canAttack.png";
			}
			else if(tSkill.F_ATTACK==false&&tSkill.E_ATTACK==false){
				return;
			}
			for(let i=0;i<tRange.length;i++){
				// let tCard=$("#cardTable")[0].getElementsByTagName("tr")[tRange[i][1]].getElementsByTagName("td")[tRange[i][0]].getElementsByTagName("img")[0];
				let tCardCell=$("#cardTable")[0].getElementsByTagName("tr")[tRange[i][1]].getElementsByTagName("td")[tRange[i][0]];
				let tCardImg=document.createElement("img");
				tCardImg.style.position="absolute";
				tCardImg.style.pointerEvents="none";
				tCardImg.style.top="0";
				tCardImg.style.left="0";
				tCardImg.style.width="65px";
				tCardImg.style.height="65px";
				tCardImg.style.opacity="0.6";
				tCardImg.src=tCardImage;
				tCardCell.appendChild(tCardImg);

				for(let j=0;j<tDamageCharas.length;j++){
					if(tDamageCharas[j].x==tChara.x&&tDamageCharas[j].y==tChara.y) continue;
					if(tRange[i][0]==tDamageCharas[j].x&&tRange[i][1]==tDamageCharas[j].y){
						var tDamage = calcDamage(tChara.ATK,tDamageCharas[j].DEF,tSkill.POWER);

						if(tCard.getSoot()==tChara.TYPE){//属性補正
							tDamage = Math.floor(tDamage*1.5);
						}
						//敵へのダメージ
						let tCardCell=$("#cardTable")[0].getElementsByTagName("tr")[tRange[i][1]].getElementsByTagName("td")[tRange[i][0]];
						var tPreDamage=document.createElement("div");
						tPreDamage.style.position="absolute";
						tPreDamage.style.pointerEvents="none";
						tPreDamage.style.top="-40px";
						tPreDamage.style.left="0";
						tPreDamage.style.width="70px";
						tPreDamage.style.height="70px";
						tPreDamage.style.textAlign="center"
						tPreDamage.style.color="#f00";
						tPreDamage.style.fontSize="40px";
						tPreDamage.classList.add("predamege")
						tPreDamage.style.webkitTextStrokeColor="#fff";
						tPreDamage.style.webkitTextStrokeWidth="0.5px";
						tPreDamage.style.zIndex="5";
						// tPreDamage.style.zoom="2";
						tPreDamage.style.pointerEvents="none";
						if(tDamage<0){
							tPreDamage.style.color="#0f0";
							tDamage *= (-1);
						}
						else if(tDamage==0){//補助効果のみのスキル
							tPreDamage.style.fontSize="40px";
							if(tChara.team==tDamageCharas[j].team){
								//攻撃相手が味方でダメージが0
								tDamage="↑";
								tPreDamage.style.color="#0f0";
							}
							else{
								//攻撃相手が敵でダメージが0
								tDamage="↓";
							}
						}
						tPreDamage.textContent=tDamage;
						tCardCell.appendChild(tPreDamage);
					}
				}
			}
			if(tSkill.M_ATTACK!=0){
				var tDamage = calcDamage(tChara.ATK,tChara.DEF,tSkill.M_ATTACK);

				if(tCard.getSoot()==tChara.TYPE){//属性補正
					tDamage = Math.floor(tDamage*1.5);
				}
				//自傷ダメージ
				tCardCell=$("#cardTable")[0].getElementsByTagName("tr")[tChara.y].getElementsByTagName("td")[tChara.x];
				var tPreDamage=document.createElement("div");
				tPreDamage.style.position="absolute";
				tPreDamage.style.pointerEvents="none";
				tPreDamage.style.top="-40px";
				tPreDamage.style.left="0";
				tPreDamage.style.width="70px";
				tPreDamage.style.height="70px";
				tPreDamage.style.textAlign="center"
				tPreDamage.style.color="#f00";
				tPreDamage.style.fontSize="40px";
				tPreDamage.classList.add("predamege")
				tPreDamage.style.webkitTextStrokeColor="#fff";
				tPreDamage.style.webkitTextStrokeWidth="0.5px";
				tPreDamage.style.zIndex="5";
				tPreDamage.style.pointerEvents="none";
				if(tDamage<0){
					tPreDamage.style.color="#0f0";
					tDamage *= (-1);
				}
				tPreDamage.textContent=tDamage;
				tCardCell.appendChild(tPreDamage);
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
		if(tCard[i].src.match(/card_friend.png/)){
			tCard[i].remove()
		}
		if(tCard[i].src.match(/card_indiscriminate.png/)){
			tCard[i].remove()
		}
	}
	$(".predamege").remove();
	displayMoveable(mMovable);
	returnDeck();
}
//スキルの説明を表示
function displayDeck(aCard){
	if(mEventFlag) return;
	let tSkill=mTurnChara.getSkill(aCard);
	let tNum;
	if(typeof(aCard)=="number"||typeof(aCard)=="string"){
		tNum=aCard;
	}
	else{
		if(aCard.isReverse())return;
		tNum=aCard.getNumber();
	}
	tNum=cardNumberToInt(tNum);
	$("#cardText")[0].textContent=createSkillText(tSkill);
	$("#cardText").css("left",(tNum-1)*50+"px");
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
	},500)
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

function newLog(aLog){
	let tLog="";
	for(let i=0;i<aLog.length;i++){
		let tComment=aLog[i]
		if((typeof tComment)=="string"){
			tLog+=tComment;
		}
		else{
			tLog+="<b style='color:"+tComment.teamColor+"'>"+tComment.NAME+"</b>";
		}
	}
	addLog(tLog)
}

function shuffleAnimate(aCard){
	return new Promise((res,rej)=>{
		let tTimes=20;
		for(let i=0;i<tTimes;i++){
			setTimeout(()=>{
				shuffle(aCard);
				displayCard();
				if(i==tTimes-1) res();
			},i*100)
		}
	})
}

function flowBand(aMessage){
	return new Promise((res,rej)=>{
		let tBand=document.createElement("b");
		tBand.id="flowBand";
		tBand.innerHTML=aMessage;
		tBand.style.whiteSpace="nowrap";
		tBand.style.color="#ff0000";
		tBand.style.webkitTextStrokeColor="#8f0000";
		tBand.style.webkitTextStrokeWidth="5px";
		tBand.style.position="fixed";
		tBand.style.top=0;
		tBand.style.left=0;
		tBand.style.zIndex="1";
		tBand.style.marginLeft=document.getElementsByTagName("body")[0].offsetWidth+"px";
		tBand.style.marginTop="20%";
		tBand.style.fontSize="200px";
		document.getElementsByTagName("body")[0].appendChild(tBand);
		$("#"+tBand.id).animate({
			marginLeft:"-"+tBand.offsetWidth+"px"
		},3000,"linear",()=>{
			$("#"+tBand.id).remove();
			res();
		})
	})
}
function strongBand(aMessage){
	let tBand=document.createElement("b");
	tBand.id="flowBand";
	tBand.innerHTML=aMessage;
	tBand.style.whiteSpace="nowrap";
	tBand.style.color="#ff0000";
	tBand.style.webkitTextStrokeColor="#8f0000";
	tBand.style.webkitTextStrokeWidth="5px";
	tBand.style.position="fixed";
	tBand.style.top=0;
	tBand.style.textAlign="center";
	tBand.style.verticalAlign="center";
	tBand.style.zIndex="1";
	tBand.style.zoom="5";
	tBand.style.left=0;
	tBand.style.width=tBand.offsetWidth*tBand.style.zoom+"px";
	tBand.style.marginLeft=tBand.offsetWidth/2+"px"
	tBand.style.height="100%";
	tBand.style.fontSize="200px";
	document.getElementsByTagName("body")[0].appendChild(tBand);
	$("#"+tBand.id).animate({
		zoom:"1.5"
	},500,"linear").animate({
		zoom:"1"
	},2000,"linear",()=>{
		// $("#"+tBand.id).remove();
	})
}
