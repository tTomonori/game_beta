function getAttackRange(aSkillRange) {
	let tPosition;
	if(mDelayChara[1]=="T"){
		tPosition={x:mTrueTeam[mDelayChara[2]].x,y:mTrueTeam[mDelayChara[2]].y}
	}
	else{
		tPosition={x:mFalseTeam[mDelayChara[2]].x,y:mFalseTeam[mDelayChara[2]].y}
	}

	return calcRange(aSkillRange,tPosition);
}

function calcRange(aSkillRange,tPosition){
		let tRange=new Array();
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
		case 3://3マス隣
			tRange.push([tPosition.x-3,tPosition.y]);
			tRange.push([tPosition.x+3,tPosition.y]);
			tRange.push([tPosition.x,tPosition.y-3]);
			tRange.push([tPosition.x,tPosition.y+3]);
			tRange.push([tPosition.x-1,tPosition.y-2]);
			tRange.push([tPosition.x+1,tPosition.y+2]);
			tRange.push([tPosition.x+1,tPosition.y-2]);
			tRange.push([tPosition.x-1,tPosition.y+2]);
			tRange.push([tPosition.x-2,tPosition.y-1]);
			tRange.push([tPosition.x+2,tPosition.y+1]);
			tRange.push([tPosition.x+2,tPosition.y-1]);
			tRange.push([tPosition.x-2,tPosition.y+1]);
			break;
		case 4://縦１列
			for(let i=0;i<7;i++){
				tRange.push([tPosition.x,i]);
			}
			break;
		case 5://横１列
			for(let i=0;i<8;i++){
				tRange.push([i,tPosition.y]);
			}
			break;
		case 6://十字
			for(let i=0;i<7;i++){
				tRange.push([tPosition.x,i]);
			}
			for(let i=0;i<8;i++){
				tRange.push([i,tPosition.y]);
			}
		break;
		case 8://敵に必中
			if(mDelayChara[1]=="T"){
				for (var i=0;i<mFalseTeam.length;i++) {
					tRange.push([mFalseTeam[i].x,mFalseTeam[i].y]);
				}
			}
			else{
				for (var i=0;i<mTrueTeam.length;i++) {
					tRange.push([mTrueTeam[i].x,mTrueTeam[i].y]);
				}
			}
		break;
		case 9://周囲８マス
			tRange.push([tPosition.x-1,tPosition.y-1]);
			tRange.push([tPosition.x+1,tPosition.y+1]);
			tRange.push([tPosition.x+1,tPosition.y-1]);
			tRange.push([tPosition.x-1,tPosition.y+1]);
			tRange.push([tPosition.x-1,tPosition.y]);
			tRange.push([tPosition.x+1,tPosition.y]);
			tRange.push([tPosition.x,tPosition.y-1]);
			tRange.push([tPosition.x,tPosition.y+1]);
		break;
		case 11://
			tRange.push([tPosition.x-2,tPosition.y]);
			tRange.push([tPosition.x+2,tPosition.y]);
			tRange.push([tPosition.x,tPosition.y-2]);
			tRange.push([tPosition.x,tPosition.y+2]);
			tRange.push([tPosition.x-1,tPosition.y]);
			tRange.push([tPosition.x+1,tPosition.y]);
			tRange.push([tPosition.x,tPosition.y-1]);
			tRange.push([tPosition.x,tPosition.y+1]);
			tRange.push([tPosition.x-1,tPosition.y-1]);
			tRange.push([tPosition.x+1,tPosition.y+1]);
			tRange.push([tPosition.x+1,tPosition.y-1]);
			tRange.push([tPosition.x-1,tPosition.y+1]);
		break;
		case 10://

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