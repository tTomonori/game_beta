function Support(aSupportnums,aChara){
	return new Promise((res,rej)=>{
		if(aSupportnums.length>0){
			SupportPlay(aSupportnums[0],aChara).then(()=>{
				aSupportnums.shift();
				Support(aSupportnums,aChara).then(()=>{
					res();
				})
			})
		}
		else res();
	})
}
function SupportPlay(aSupportnums,aChara){
	let tTurnChara=mTurnChara;
	let tMyselfFlag=(tTurnChara==aChara);//trueならスキル使用者と受け手が同じ
	let tCard=Feild.getCard(aChara.x,aChara.y);//使用者がいるマス
	let tValue=aSupportnums.value;
	if(aSupportnums.additionOfMatchingType!=undefined){
		if(aChara.TYPE==tCard.getSoot()) tValue+=aSupportnums.additionOfMatchingType;
	}
	let tAnimation;
	return new Promise((res,rej)=>{
		switch (aSupportnums.effect) {
			case "shuffle"://シャッフルする
				addLog("シャッフル");
				Feild.shuffleAnimate().then(()=>{
					res();})
					break;
			case "revers"://裏カードを表に向ける
				tCard.makeFace();
				// $("#cardTable")[0].getElementsByTagName("tr")[aChara.y].getElementsByTagName("td")[aChara.x].getElementsByTagName("img")[0].src="../image/card.png";
				res();
				break;
			case "getTurn"://ターン獲得(delay-100)
				aChara.getTurn();
				res();
				break;
			case "mp"://MP
				attackAnimate(tTurnChara,aChara,[15],()=>{
					aChara.addMp(tValue);
					res()})
				break;
			case "delay"://delay
				attackAnimate(tTurnChara,aChara,[9],()=>{
					aChara.effectDelay(tValue);
					res()})
				break;
			case "type"://タイプ変更
				attackAnimate(tTurnChara,aChara,[10],()=>{
					aChara.changeType(tValue)
					res()})
				break;
			case "atk"://at変化
			case "def"://def変化
			case "spd"://spd変化
			case "mov"://mov変化
				tAnimation=(tValue>0)?[19]:[20];
				attackAnimate(tTurnChara,aChara,tAnimation,()=>{
					aChara.plusStatus(aSupportnums[0],tValue);
					res()})
				break;
			case "resetStatus"://ステーテスを初期値に戻す
			attackAnimate(tTurnChara,aChara,[20],()=>{
				aChara.resetStatus(tValue);
				res()})
				break;
			case "transform"://変身する
				attackAnimate(tTurnChara,aChara,[7],()=>{
					aChara.transform(aChara.getTransformData(tValue));
					res()})
				break;
			case "originalHP":
			case "originalMP":
				tAnimation=(tValue>0)?[19]:[20];
				attackAnimate(tTurnChara,aChara,tAnimation,()=>{
				aChara.plusOriginStatus(aSupportnums.effect,tValue);
				res()})
				break;
			case "setTrap"://トラップ設置
				attackAnimate(tTurnChara,aChara,[18],()=>{
					//効果対象のチーム確認
					let tTarget=aSupportnums.target.concat();
					for(let i=0;i<tTarget.length;i++){
						if(tTarget[i]=="ally") tTarget[i]=(tTurnChara.getTeam()=="T")?"T":"F";
						else if(tTarget[i]=="enemy") tTarget[i]=(tTurnChara.getTeam()=="T")?"F":"T";
					}
					let tRange=calcRange(aSupportnums.range,tTurnChara.getPosition());
					for(let i=0;i<tRange.length;i++){
						let tSettedCard=Feild.getCard(tRange[i][0],tRange[i][1]);
						tSettedCard.setTrap({effect:"stepTrap",trapEffect:aSupportnums.trapEffect,value:tValue,owner:tTurnChara.getTeam(),target:tTarget,remove:aSupportnums.remove});
					}
					res();
				})
				break;
			case "stepTrap"://トラップを踏んだ
				if(aSupportnums.target.indexOf(aChara.getTeam())!=-1){
					//効果対象のチームのキャラが効果を受ける
					addLog("トラップを踏んだ")
					SupportPlay({effect:aSupportnums.trapEffect,value:tValue},aChara).then(()=>{
						res();
					})
				}
				else{
					//効果を受けるキャラが効果対象でなかった
					res();
				}
				break;
			case "mine"://地雷
					tAnimation=[36];
					attackAnimate(tTurnChara,aChara,tAnimation,()=>{
						if(aChara.addDamage(tValue)!="down")
							res();
					})
				break;
			case 6:

				break;
			default:

		}
	})
}
