function getAttackRange(aSkillRange) {
	let tPosition=mTurnChara.getPosition();

	return calcRange(aSkillRange,tPosition);
}

function calcRange(aSkillRange,aPosition){
	let tRange=new Array();
	let tAcceptMyPositionFlag=false;//falseなら自分がいるマス(=aPosition)を含めない
	for(let i=0;i<aSkillRange.length;i++){
		let tX=aSkillRange[i][1];
		switch (aSkillRange[i][0]) {
			case "circumference"://距離x以内範囲
				for(let j=-tX;j<=tX;j++)
					for(let k=-(tX-Math.abs(j));k<=(tX-Math.abs(j));k++){
						if(j==0&&k==0) continue;
						tRange.push([aPosition.x+j,aPosition.y+k]);
					}
				break;
			case "distance"://丁度距離xのマス
				for(let j=-tX;j<=tX;j++){
					tRange.push([aPosition.x+j,aPosition.y-(tX-Math.abs(j))]);
					tRange.push([aPosition.x+j,aPosition.y+(tX-Math.abs(j))]);
				}
				break;
			case "square"://一辺がxの四角範囲
				for(let j=-(tX-1)/2;j<=(tX-1)/2;j++)
					for(let k=-(tX-1)/2;k<=(tX-1)/2;k++){
						if(j==0&&k==0) continue;
						tRange.push([aPosition.x+j,aPosition.y+k]);
					}
				break;
			case "vertical"://縦列x列
				for(let j=-(tX-1)/2;j<=(tX-1)/2;j++)
					for(let k=0;k<7;k++){
						tRange.push([aPosition.x+j,k]);
					}
					break;
			case "horizontal"://横列x列
					for(let j=-(tX-1)/2;j<=(tX-1)/2;j++)
						for(let k=0;k<8;k++){
							tRange.push([k,aPosition.y+j]);
						}
						break;
			case "enemy"://敵全体
				if(mTurnChara.getTeam()=="T"){
					for (var j=0;j<mFalseTeam.length;j++) {
						tRange.push([mFalseTeam[j].x,mFalseTeam[j].y]);
					}
				}
				else{
					for (var j=0;j<mTrueTeam.length;j++) {
						tRange.push([mTrueTeam[j].x,mTrueTeam[j].y]);
					}
				}
				break;
			case "ally"://自分以外の味方全体
			let tMyTeam=(mTurnChara.getTeam()=="T")?mTrueTeam:mFalseTeam;
			for(let j=0;j<tMyTeam.length;j++){
				if(mTurnChara==tMyTeam[j]) continue;
				let tPosition=tMyTeam[j].getPosition();
				tRange.push([tPosition.x,tPosition.y]);
			}
				break;
			case "my"://自分がいるマス
				tRange.push([aPosition.x,aPosition.y]);
				tAcceptMyPositionFlag=true;
				break;
			case "around"://外周からx列目
					for(var j=tX-1;j<8-tX;j++){
						tRange.push([tX-1,j]);
						tRange.push([8-tX,j]);
					}
					for(var j=tX-1;j<9-tX;j++){
						tRange.push([j,tX-1]);
						tRange.push([j,7-tX]);
					}
				break;
			case "random"://ランダムなマス
				for(let j=0;j<tX;j++){
					let tRX=Math.floor(makeRandom()*8);
					let tRY=Math.floor(makeRandom()*7);
					for(let k=0;k<tRange.length;k++){//重複削除
						if(tRX==tRange[i][0]&&tRY==tRange[i][1]){
							j--;
							continue;
						}
					}
					tRange.push([tRX,tRY]);
				}
				break;
			case "function"://関数に渡してtrueが返されるcard
				let tCards=Feild.getAllCard();
				for(let j=0;j<tCards.length;j++){
					if(aSkillRange[i][1](tCards[j],mTurnChara)){
						tRange.push([j%8,Math.floor(j/8)])
					}
				}
				console.log(tRange);
				break;
			default:
		}
	}
	let tRgihtRange=new Array();
	for(let i=0;i<tRange.length;i++){
		//フィールドの外は入れない
		if(tRange[i][0]<0||7<tRange[i][0]||tRange[i][1]<0||6<tRange[i][1]){
			continue;
		}
		//自分がいるマス
		if(!tAcceptMyPositionFlag&&tRange[i][0]==aPosition.x&&tRange[i][1]==aPosition.y){
			continue;
		}
		for(let j=0;j<tRgihtRange.length;j++){//被り削除
			if(tRange[i][0]==tRgihtRange[j][0]&&tRange[i][1]==tRgihtRange[j][1]){
				tRgihtRange.splice(j,1);
				break;
			}
		}
		tRgihtRange.push(tRange[i]);
	}
	return tRgihtRange;
}
