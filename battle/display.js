//トランプを並べる（表示）
function displayCard() {
	let tTable="";
	for(let i=0;i<7;i++){
		tTable+="<tr>";
		for(let j=0;j<8;j++){
			tTable+="<td style='width:70px;height:20px:position:relative'>";

			let tMark=mCard[i*8+j]/13;
			let tNum=mCard[i*8+j]%13;
			if(tMark>=4){
				if(tNum<=1){
					tNum="JOKER";
				}
				else{
					tNum="";
				}
				tMark="";
			}
			else {
				//マーク
				if(tMark<=1){
					tMark="spade.png";
				}
				if(tMark<=2){
					tMark="club.png";
				}
				if(tMark<=3){
					tMark="diamond.png";
				}
				if(tMark<=4){
					tMark="heart.png";
				}
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
			}
			tTable+="<img src='../image/card.png' style='width:70px;height:70px;'>";
			if(tMark!=""){
				tTable+="<img src='../image/"+tMark+"' style='width:50px;height:50px;position:absolute;margin-left:-57px;margin-top:13px'>";
				tTable+="<p style='position:absolute;margin-top:-63px;margin-left:12px'>"+tNum+"</p>";
				// tTable+=mCard[i*7+j];
			}
			else if(tNum=="JOKER"){
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

//HP表示
function displayStatus(){
	let tTag=document.getElementById("status");
	tTag.innerHTML="";
	displayTeamStatus(tTag,mTrueTeam);
	displayTeamStatus(tTag,mFalseTeam);
}
function displayTeamStatus(aTag,aTeam){
	for(let i=0;i<aTeam.length;i++){
		aTag.innerHTML+="<div style='width:64px;height:64px;overflow:hidden;'><img src='"+aTeam[i].getActorUrl()+"' style=''>";
		aTag.innerHTML+="<div style='float:right;margin-right:80px;margin-top:-40px;'>HP:"+aTeam[i].HP+"/"+aTeam[i].originalHP+"<br>"+"MP:"+aTeam[i].MP+"/"+aTeam[i].originalMP+"</div>";
		aTag.innerHTML+="</div>"
		aTag.innerHTML+=aTeam[i].getHPBar();
		aTag.innerHTML+="<div style='height:2px'>";
		aTag.innerHTML+=aTeam[i].getMPBar();
	}
}
