function initDelay(aTrueTeam,aFalseTeam){
	var delayList = new Array();//delayのリスト[[delay値,チーム,番号]]
	for(var i=0;i<aTrueTeam.length;i++){
		for(var j=0;j<delayList.length;j++){
			if(aTrueTeam[i].Delay<delayList[j][0]){
				break;
			}
		}
		delayList.splice(j,0,[aTrueTeam[i].Delay,"T",i]);
	}
	for(var i=0;i<aFalseTeam.length;i++){
		for(var j=0;j<delayList.length;j++){
			if(aFalseTeam[i].Delay<delayList[j][0]){
				break;
			}
		}
		delayList.splice(j,0,[aFalseTeam[i].Delay,"F",i]);
	}
	return delayList;
}

function delayMinus(aTeamList,aDelay){
	for(i=0;i<aTeamList.length;i++){
		aTeamList[i].Delay -= aDelay;
	}
	return aTeamList;
}