function movableSquares(aChara){
	let tMovable = new Array();
	let tPosition=aChara.getPosition();

	for(let i=(-aChara.getMov());i<aChara.getMov()+1;i++){
		for(let j=(-aChara.getMov())+Math.abs(i);j<aChara.getMov()-Math.abs(i)+1;j++){
			let tX=i+tPosition.x;
			let tY=j+tPosition.y;
			if(tX<0||7<tX||tY<0||6<tY) continue;
			tMovable.push([tX,tY]);
			for(let i=0;i<mDelayList.length;i++){
				if(mDelayList[i].x==tX&&mDelayList[i].y==tY){
					tMovable.pop();
					break;
				}
			}
		}
	}
	return tMovable;
}

function move(aX,aY,aInfoFlag,aAiFlag){
	if(mTurnChara.getOperationNum()>0&&!aAiFlag){//Aiのターンに操作
		console.log("AIのターン中にプレイヤーが操作");
		return;
	}
	if(mTurnChara.getOperationNum()==0){//AIでない
		if(mEventFlag){//イベント中
			console.log("イベント中に操作");
			return;
		}
	}
	if(mCommunicationFlag&&mMyTeam.indexOf(mTurnChara.getTeam())==-1&&aInfoFlag!="receive_move"){//通信中
		console.log("通信相手のターン");
		return;
	}
	//対戦相手に通知
	if(mCommunicationFlag&&aInfoFlag!="receive_move"){
		informMove({x:aX,y:aY})
	};

	for(let i=0;i<mMovable.length;i++){
		if(mMovable[i][0]!=aX||mMovable[i][1]!=aY){
			continue;
		}

		// if(!mMovable.indexOf([aX,aY])) return;
		mEventFlag = true;//操作不可能に
		returnAttackable();
		returnMoveable();
		mTurnChara.move(aX,aY,()=>{
			Feild.getCard(aX,aY).trap(mTurnChara).then(()=>{
				if(!mTurnChara.getDownFlag()){
					attack(mTurnChara).then(()=>{
						battleMain();
					})
				}
				else{
					battleMain();
				}
			})
		});
		return;
	}
}
