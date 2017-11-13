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
	let tRange;
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
					aChara.plusStatus(aSupportnums.effect,tValue);
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
				aChara.plusOriginStatus(aSupportnums.effect.slice(-2),tValue);
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
					tRange=calcRange(aSupportnums.range,tTurnChara.getPosition());
					newLog([mTurnChara,"はトラップを設置した"])
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
					newLog([mTurnChara,"はトラップを踏んだ"])
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
				if(tValue>0) tAnimation=[36];
				else tAnimation=[7];
					attackAnimate(tTurnChara,aChara,tAnimation,()=>{
						aChara.addDamage(tValue).then(()=>{
							res();
						})
					})
				break;
			case "summon"://召喚
				let tPosition=mTurnChara.getPosition();
				//召喚位置決定
					mTurnChara.summon(tValue,aSupportnums.position,aSupportnums.operationNum,aSupportnums.delay).then(()=>{
						res();
				})
				break;
			case "Retrofits":
				attackAnimate(tTurnChara,aChara,[7],()=>{
					mTurnChara.changeClothes("up");
				res()})
				break;
			case "changeCardType"://カードのタイプを変更
				//変更後タイプ
				let tSoot;
				switch (aSupportnums.value) {
					case "ally"://ランダムな自分以外の味方のタイプ(味方がいないなら自分のタイプ)
						let tMyTeam=(mTurnChara.getTeam()=="T")?mTrueTeam.concat():mFalseTeam.concat();
						if(tMyTeam.length>1){
							//配列から自分を削除する
							for(let i=0;i<tMyTeam.length;i++){
								if(tMyTeam[i]==mTurnChara){
									tMyTeam.splice(i,1);
									break;
								}
							}
							//味方一人をランダムに選択
							tSoot=tMyTeam[makeRandom(tMyTeam.length-1)].getType();
						}
						else{//味方がいない
							tSoot=mTurnChara.getType();
						}
						break;
					default:
				}
				//変更する座標
				tRange=calcRange(aSupportnums.range,mTurnChara.getPosition());
				//アニメーション実行
				attackAnimate(tTurnChara,aChara,[7],()=>{
					//変更する
					addLog("カードのタイプが変更された")
					for(let i=0;i<tRange.length;i++){
						Feild.getCard(tRange[i][0],tRange[i][1]).setSoot(tSoot);
					}
				res()})
				break;
			case "changeCardSkill"://特殊な効果を持ったカードに変える
				tRange=calcRange(aSupportnums.range,mTurnChara.getPosition());
				//アニメーション実行
				attackAnimate(tTurnChara,aChara,[7],()=>{
					newLog([mTurnChara,"は"+aSupportnums.name+"カードを生成した"])
					//変更する
					for(let i=0;i<tRange.length;i++){
						Feild.getCard(tRange[i][0],tRange[i][1]).changeSpecial(aSupportnums.name,aSupportnums.img,aSupportnums.skill,mTurnChara,aSupportnums.style);
					}
				res()})
				break;
			case "changeCardNumber"://カードの番号を変える
				if(aSupportnums.range==undefined) tRange=[[mTurnChara.x,mTurnChara.y]];
				else	tRange=calcRange(aSupportnums.range,mTurnChara.getPosition());
				//アニメーション実行
				attackAnimate(tTurnChara,aChara,[7],()=>{
					//変更する
					for(let i=0;i<tRange.length;i++){
						Feild.getCard(tRange[i][0],tRange[i][1]).setNumber(tValue);
						Feild.getCard(tRange[i][0],tRange[i][1]).shuffledFunction.push({function:(aCard)=>{aCard.makeRevers();},infinity:true,name:"revers"})
					}
				res()})
				break;
			case "changeDeck":
				attackAnimate(tTurnChara,aChara,[10],()=>{
					switch(tValue){
						case "akurahairu":
							aChara.deck[14] = {NUMBER:0,
								TEXT:"スカ　相手に威力２のダメージ",
								RANGE:[["enemy"]],
								POWER:2,
								DELAY:0,
								MAGIC:0,
								SUPPORT_Be_Myself:[],
								SUPPORT_Af_Myself:[],
								SUPPORT_Be_Enemy:[],
								SUPPORT_Af_Enemy:[],
								SUPPORT_Otherwise:[],
								M_ATTACK:0,
								F_ATTACK:false,
						    E_ATTACK:true,
								ANIMATION:[0]
							}
							break;
						default:
						console.log("デッキ書き換え失敗")
					}


				res()})
				break;
			case 6:

				break;
			default:
				console.log("存在しない効果");
				res();
		}
	})
}
