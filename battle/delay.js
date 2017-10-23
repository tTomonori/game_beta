const mSetDelay=10000;
function initDelay(aTrueTeam,aFalseTeam){
	let tDelayList=aTrueTeam.concat(aFalseTeam);
	return tDelayList;
}

function delayMinus(){
	let tDelay=mDelayList[0].getDelay();
	for(let i=0;i<mDelayList.length;i++){
		mDelayList[i].minusDelay(tDelay);
	}
}

function sortDelay(aDelayList){
	let tDelay=aDelayList.shift();
	let i;
	for(i=0;i<aDelayList.length;i++){
		if(aDelayList[i][0].Delay>tDelay[0]){
			break;
		}
	}
	aDelayList.splice(i,0,tDelay);
	return aDelayList;
}

function sortDelayList(){
	mDelayList.sort((a,b)=>{
		if(a.getDelay()<b.getDelay()) return -1;
		if(a.getDelay()>b.getDelay()) return 1;
		return 0;
	})
	// displayDelay();
}
// function initDelay(aTrueTeam,aFalseTeam){
// 	var delayList = new Array();//delayのリスト[[delay値,チーム,番号]]
// 	for(var i=0;i<aTrueTeam.length;i++){
// 		for(var j=0;j<delayList.length;j++){
// 			if(aTrueTeam[i].Delay<delayList[j][0]){
// 				break;
// 			}
// 		}
// 		delayList.splice(j,0,[aTrueTeam[i].Delay,"T",i]);
// 	}
// 	for(var i=0;i<aFalseTeam.length;i++){
// 		for(var j=0;j<delayList.length;j++){
// 			if(aFalseTeam[i].Delay<delayList[j][0]){
// 				break;
// 			}
// 		}
// 		delayList.splice(j,0,[aFalseTeam[i].Delay,"F",i]);
// 	}
// 	return delayList;
// }
//
// function delayMinus(aTeamList,aDelay){
// 	for(i=0;i<aTeamList.length;i++){
// 		aTeamList[i].Delay -= aDelay;
// 	}
// 	return aTeamList;
// }
//
// function sortDelay(aDelayList){
// 	let tDelay=aDelayList.shift();
// 	let i;
// 	for(i=0;i<aDelayList.length;i++){
// 		if(aDelayList[i][0].Delay>tDelay[0]){
// 			break;
// 		}
// 	}
// 	aDelayList.splice(i,0,tDelay);
// 	return aDelayList;
// }
//
// function sortDelayList(){
// 	mDelayList.sort((a,b)=>{
// 		let tADelay=(a[1]=="T")?mTrueTeam[a[2]].Delay:mFalseTeam[a[2]].Delay;
// 		let tBDelay=(b[1]=="T")?mTrueTeam[b[2]].Delay:mFalseTeam[b[2]].Delay;
//
// 		if(tADelay<tBDelay) return -1;
// 		if(tADelay>tBDelay) return 1;
// 		return 0;
// 	})
// 	// displayDelay();
// }
