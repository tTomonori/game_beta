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
	let tTurnChara=(mDelayChara[0][1]=="T")?mTrueTeam[mDelayChara[0][2]]:mFalseTeam[mDelayChara[0][2]];
	let tMyselfFlag=(tTurnChara==aChara);//trueならスキル使用者と受け手が同じ
	var tCard=mCard[aChara.x+aChara.y*8];//使用者がいるマス
	if(aSupportnums[2]!=undefined){
		if(aChara.TYPE==tCard[1])aSupportnums[1]+=aSupportnums[2];
	}
	return new Promise((res,rej)=>{
		switch (aSupportnums[0]) {
			case "shuffle"://シャッフルする
				addLog("シャッフル");
				shuffleAnimate(mCard).then(()=>{
					res();})
					break;
			case "revers"://裏カードを表に向ける
				$("#cardTable")[0].getElementsByTagName("tr")[aChara.y].getElementsByTagName("td")[aChara.x].getElementsByTagName("img")[0].src="../image/card.png";
				res();
				break;
			case "mp"://MP
				attackAnimate(tTurnChara,aChara,[15],()=>{
					aChara.addMp(aSupportnums[1]);
					res()})
				break;
			case "delay"://delay
				attackAnimate(tTurnChara,aChara,[9],()=>{
					aChara.minusDelay(aSupportnums[1]);
					res()})
				break;
			case "type"://タイプ変更
				attackAnimate(tTurnChara,aChara,[10],()=>{
					aChara.changeType(aSupportnums[1])
					res()})
				break;
			case "atk"://at変化
			case "def"://def変化
			case "spd"://spd変化
			case "mov"://mov変化
				let tAnimation=(aSupportnums[1]>0)?[19]:[20];
				attackAnimate(tTurnChara,aChara,tAnimation,()=>{
					aChara.plusStatus(aSupportnums[0],aSupportnums[1]);
					res()})
				break;
			case "resetStatus"://ステーテスを初期値に戻す
			attackAnimate(tTurnChara,aChara,[20],()=>{
				aChara.resetStatus(aSupportnums[1]);
				res()})
				break;
			case "transform"://変身する
				attackAnimate(tTurnChara,aChara,[7],()=>{
					aChara.transform(aSupportnums[1]);
					res()})
				break;
			case "originalHP":
			case "originalMP":
				let tAnimation=(aSupportnums[1]>0)?[19]:[20];
				attackAnimate(tTurnChara,aChara,tAnimation,()=>{
				aChara.plusOriginStatus(aSupportnums[0],aSupportnums[1]);
				res()})
				break;
			default:
			case 6:

				break;
			default:

		}
	})
}
