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
	let tValue=aSupportnums[1];
	if(aSupportnums[2]!=undefined){
		if(aChara.TYPE==tCard.getSoot()) tValue+=aSupportnums[2];
	}
	let tAnimation;
	return new Promise((res,rej)=>{
		switch (aSupportnums[0]) {
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
					aChara.minusDelay(tValue);
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
					aChara.transform(tValue);
					res()})
				break;
			case "originalHP":
			case "originalMP":
				tAnimation=(tValue>0)?[19]:[20];
				attackAnimate(tTurnChara,aChara,tAnimation,()=>{
				aChara.plusOriginStatus(aSupportnums[0],tValue);
				res()})
				break;
			case 6:

				break;
			default:

		}
	})
}
