function getAttackRange(aSkillRange) {
	let tRange=new Array();
	let tPosition;
	if(mDelayChara[1]=="T"){
		tPosition={x:mTrueTeam[mDelayChara[2]].x,y:mTrueTeam[mDelayChara[2]].y}
	}
	else{
		tPosition={x:mFalseTeam[mDelayChara[2]].x,y:mFalseTeam[mDelayChara[2]].y}
	}
	switch (aSkillRange) {
		case 0://攻撃しない
			break;
		case 1://周囲4マス
			tRange.push([tPosition.x-1,tPosition.y]);
			tRange.push([tPosition.x+1,tPosition.y]);
			tRange.push([tPosition.x,tPosition.y-1]);
			tRange.push([tPosition.x,tPosition.y+1]);
			break;
		case 2://２マス隣
			tRange.push([tPosition.x-2,tPosition.y]);
			tRange.push([tPosition.x+2,tPosition.y]);
			tRange.push([tPosition.x,tPosition.y-2]);
			tRange.push([tPosition.x,tPosition.y+2]);
			tRange.push([tPosition.x-1,tPosition.y-1]);
			tRange.push([tPosition.x+1,tPosition.y+1]);
			tRange.push([tPosition.x+1,tPosition.y-1]);
			tRange.push([tPosition.x-1,tPosition.y+1]);
			break;
		case 3://縦１列
			for(let i=0;i<7;i++){
				tRange.push([tPosition.x,i]);
			}
			break;
		default:

	}

	let tRgihtRange=new Array();
	for(let i=0;i<tRange.length;i++){
		if(tRange[i][0]<0||7<tRange[i][0]||tRange[i][1]<0||6<tRange[i][1]||(tRange[i][0]==tPosition.x&&tRange[i][1]==tPosition.y)){
			continue;
		}
		tRgihtRange.push(tRange[i]);
	}

	return tRgihtRange;
}
