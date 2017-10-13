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
		for(var j=0;j<mSkillList.length;j++){
			if(mSkillList[j].NUMBER==tSkill){
				tSkill=mSkillList[j];
				break;
			}
		}

		if(aChara.MP<tSkill.MAGIC){
			//delay計算
			var tDelay = Math.floor(100000/aChara.SPD);//初期値
			// tDelay+=Math.floor(tSkill.DELAY/aChara.SPD)//追加delay

			aChara.addDelay(tDelay);
			// mDelayList=sortDelay(mDelayList);
			mDelayList = initDelay(mTrueTeam,mFalseTeam);//mDelayListのdelay値が変わってなかったため
			displayDelay();
			freeLog(aChara,"MP","足りない")
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
								let tTeam;
								if(aDamagedTeam[0].team=="T") tTeam="F";
								else tTeam="T";
								winner(tTeam);
								return;
							}
							if(aDamagedTeam[aI].HP>aDamagedTeam[aI].originalHP){//威力がマイナスだと回復する
								aDamagedTeam[aI].HP = aDamagedTeam[aI].originalHP;
							}

							//サポート効果敵　後
							Support_A_E(aSkill.SUPPORT_Af_Enemy,aDamagedTeam[aI]).then(()=>{
								displayStatus();
								damageRes();
							})
						})
					})
				}
				else{
					if(i==aDamagedTeam.length-1&&j==tRange.length-1&&!tAttackFlag){
						damageRes();
					}
				}
			}
		}
	})
}
