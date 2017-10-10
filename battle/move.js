function movableSquares(aChara){
	var tMovable = new Array();

	for(let i=(-aChara.MOV);i<aChara.MOV+1;i++){
		for(let j=(-aChara.MOV)+Math.abs(i);j<aChara.MOV-Math.abs(i)+1;j++){
			let tX=i+aChara.x;
			let tY=j+aChara.y;
			if(tX<0||7<tX||tY<0||6<tY) continue;
			tMovable.push([tX,tY]);
			for(let i=0;i<mTrueTeam.length;i++){
				if(mTrueTeam[i].x==tX&&mTrueTeam[i].y==tY){
					tMovable.pop();
					break;
				}
			}
			for(let i=0;i<mFalseTeam.length;i++){
				if(mFalseTeam[i].x==tX&&mFalseTeam[i].y==tY){
					tMovable.pop();
					break;
				}
			}

		}
	}
	return tMovable;
}

function move(aX,aY){
	if(mEventFlag==true)//操作不可
		return;

	for(let i=0;i<mMovable.length;i++){
		if(mMovable[i][0]!=aX||mMovable[i][1]!=aY){
			continue;
		}

		// if(!mMovable.indexOf([aX,aY])) return;
		returnMoveable();
		returnAttackable();
		mEventFlag = true;//操作不可能に
		if(mDelayChara[1]=="T"){
			mTrueTeam[mDelayChara[2]].move(aX,aY,()=>{
				attack(mTrueTeam[mDelayChara[2]])
				battleMain();
				returnMoveable();
				returnAttackable();
			});
		}
		else if(mDelayChara[1]=="F"){
			mFalseTeam[mDelayChara[2]].move(aX,aY,()=>{
				attack(mFalseTeam[mDelayChara[2]])
				battleMain();
				returnMoveable();
				returnAttackable();
			});
		}

		return;
	}
}
