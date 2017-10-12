function attack(aChara) {
	return new Promise((attacRes,attacRej)=>{
		let tDamagedCharas=new Array()//ダメージを受けたキャラ
		let tLogTag="";
		//カードの確認
		var tCard=mCard[aChara.x+aChara.y*8];

		//デッキの確認
		var tSkill;
		if(tCard[1]=="joker"){
			tSkill=aChara.deck[13];
		}
		else if(tCard[1]=="suka"){
			tSkill=aChara.deck[14];
		}
		else{
			tSkill=aChara.deck[tCard[0]];
		}

		//技取り出し
		tSkill=mSkillList[tSkill];

		if(aChara.MP<tSkill.MAGIC){
			//delay計算
			var tDelay = Math.floor(100000/aChara.SPD);//初期値
			// tDelay+=Math.floor(tSkill.DELAY/aChara.SPD)//追加delay

			aChara.addDelay(tDelay);
			// mDelayList=sortDelay(mDelayList);
			mDelayList = initDelay(mTrueTeam,mFalseTeam);//mDelayListのdelay値が変わってなかったため
			displayDelay();
			attacRes();
			// return;
		}
		else{
			aChara.MpMinus(tSkill.MAGIC).then(()=>{
				//補助効果適用(B)
				Support_B_M(tSkill.SUPPORT_Be_Myself,aChara).then(()=>{
					let tMyTeam;
					let tEnemyTeam;
					if(aChara.team=="T"){
						tMyTeam=mTrueTeam;
						tEnemyTeam=mFalseTeam;
					}
					else{
						tMyTeam=mFalseTeam;
						tEnemyTeam=mTrueTeam;
					}
					addDamage(aChara,tMyTeam,tEnemyTeam,tSkill,tCard[1]).then(()=>{
						//補助効果適用(A)
						Support_A_M(tSkill.SUPPORT_Af_Myself,aChara).then(()=>{

							Support_O(tSkill.SUPPORT_Otherwise,aChara).then(()=>{

								//delay計算
								var tDelay = Math.floor(100000/aChara.SPD);//初期値
								tDelay+=Math.floor(tSkill.DELAY/aChara.SPD)//追加delay

								aChara.addDelay(tDelay);
								// mDelayList=sortDelay(mDelayList);
								mDelayList = initDelay(mTrueTeam,mFalseTeam);//mDelayListのdelay値が変わってなかったため
								displayDelay();
								attacRes();
							})
						})
					})
				})
			})
		}
		// return new Promise((res,rej)=>{
		// 	attackAnimate(aChara,tDamagedCharas,tSkill.ANIMATION,()=>{res();});
		// })
	})
}

function calcDamage(aATK,aDEF,aPOWER){
	var tDamage = Math.floor((aATK+30)*5/(aDEF+30)*aPOWER)

	return tDamage
}

function addDamage(aAttackChara,aMyTeam,aEnemyTeam,aSkill,aCard){
	return new Promise((res,rej)=>{
		damage(aAttackChara,aEnemyTeam,aSkill,aCard).then(()=>{
			console.log("敵に攻撃")
			if(aSkill.F_ATTACK==true)
			damage(aAttackChara,aMyTeam,aSkill,aCard).then(()=>{
				console.log("味方に攻撃")
				res();
			})
			else res();
		})
	})
}
function damage(aAttackChara,aDamagedTeam,aSkill,aCard){
	return new Promise((damageRes,damageRej)=>{
		let tAttackFlag=false;
		let tDamagedCharas=new Array();
		//攻撃
		let tRange=getAttackRange(aSkill.RANGE);
		if(tRange.length==0) damageRes();
		for(var i=0;i<aDamagedTeam.length;i++){
			for(var j=0;j<tRange.length;j++){
				if(aDamagedTeam[i].x==tRange[j][0]&&aDamagedTeam[i].y==tRange[j][1]){
					tAttackFlag=true;
					//サポート効果敵　前
					let aI=i;
					Support_B_E(aSkill.SUPPORT_Be_Enemy,aDamagedTeam[i]).then(()=>{
						//ダメージ計算
						var tDamage = calcDamage(aAttackChara.ATK,aDamagedTeam[aI].DEF,aSkill.POWER);

						if(aCard==aAttackChara.TYPE){//属性補正
							tDamage = Math.floor(tDamage*1.5);
						}

						aDamagedTeam[aI].HP-=tDamage;
						damageLog(aDamagedTeam[aI],tDamage);
						new Promise((res,rej)=>{
							attackAnimate(aAttackChara,aDamagedTeam[aI],aSkill.ANIMATION,()=>{res();});
						}).then(()=>{
							tDamagedCharas.push(aDamagedTeam[aI]);
							if(aDamagedTeam[aI].HP<=0){
								aDamagedTeam[aI].HP=0;
								winner(aDamagedTeam[0].team);
							}
							if(aDamagedTeam[aI].HP>aDamagedTeam[aI].originalHP){//威力がマイナスだと回復する
								aDamagedTeam[aI].HP = aDamagedTeam[aI].originalHP;
							}

							//サポート効果敵　後
							Support_A_E(aSkill.SUPPORT_Af_Enemy,aDamagedTeam[aI]).then(()=>{
								displayStatus();
								console.log("anime fin")
								damageRes();
							})
						})
					})
				}
				else{
					if(i==aDamagedTeam.length-1&&j==tRange.length-1&&!tAttackFlag){
						console.log("範囲外")
						damageRes();
					}
				}
			}
		}
	})
}


///////////////////////////////
// //攻撃
	// let tRange=getAttackRange(aSkill.RANGE);
	// if(aChara.team=="T"||tSkill.F_ATTACK==true){
	// 	for(var i=0;i<mFalseTeam.length;i++){
	// 		for(var j=0;j<tRange.length;j++){
	// 			if(mFalseTeam[i].x==tRange[j][0]&&mFalseTeam[i].y==tRange[j][1]){
	// 				//サポート効果敵　前
	// 				Support_B_E(tSkill.SUPPORT_Be_Enemy,mFalseTeam[i]);
	// 				//ダメージ計算
	// 				var tDamage = calcDamage(aChara.ATK,mFalseTeam[i].DEF,tSkill.POWER);
	//
	// 				if(tCard[1]==aChara.TYPE){
	// 					tDamage = Math.floor(tDamage*1.5);
	// 				}
	//
	// 				mFalseTeam[i].HP-=tDamage;
	// 				damageLog(mFalseTeam[i],tDamage);
	// 				tDamagedCharas.push(mFalseTeam[i]);
	// 				if(mFalseTeam[i].HP<=0){
	// 					mFalseTeam[i].HP=0;
	// 					winner("T");
	// 				}
	// 				if(mFalseTeam[i].HP>mFalseTeam[i].originalHP){//威力がマイナスだと回復する
	// 					mFalseTeam[i].HP = mFalseTeam[i].originalHP;
	// 				}
	//
	// 				//サポート効果敵　後
	// 				Support_A_E(tSkill.SUPPORT_Af_Enemy,mFalseTeam[i]);
	// 				displayStatus();
	// 			}
	// 		}
	// 	}
	// }
	// if(aChara.team=="F"||tSkill.F_ATTACK==true){
	// 	for(var i=0;i<mTrueTeam.length;i++){
	// 		for(var j=0;j<tRange.length;j++){
	// 			if(mTrueTeam[i].x==tRange[j][0]&&mTrueTeam[i].y==tRange[j][1]){
	// 				//サポート効果敵　前
	// 				Support_B_E(tSkill.SUPPORT_Be_Enemy,mTrueTeam[i]);
	// 				//ダメージ計算
	// 				var tDamage = calcDamage(aChara.ATK,mTrueTeam[i].DEF,tSkill.POWER);
	//
	// 				if(tCard[1]==aChara.TYPE){
	// 					tDamage = Math.floor(tDamage*1.5);
	// 				}
	//
	// 				mTrueTeam[i].HP-=tDamage;
	// 				damageLog(mTrueTeam[i],tDamage);
	// 				tDamagedCharas.push(mTrueTeam[i]);
	// 				if(mTrueTeam[i].HP<=0){
	// 					mTrueTeam[i].HP=0;
	// 					winner("F");
	// 				}
	// 				if(mTrueTeam[i].HP>mTrueTeam[i].originalHP){//威力がマイナスだと回復する
	// 					mTrueTeam[i].HP = mTrueTeam[i].originalHP;
	// 				}
	// 				//サポート効果敵　後
	// 				Support_A_E(tSkill.SUPPORT_Af_Enemy,mFalseTeam[i]);
	// 				displayStatus();
	// 			}
	// 		}
	// 	}
	// }
