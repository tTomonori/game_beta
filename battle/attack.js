function attack(aChara) {
	return new Promise((attacRes,attacRej)=>{
		let tDamagedCharas=new Array()//ダメージを受けたキャラ
		let tLogTag="";
		let tPosition=aChara.getPosition();
		//カードの確認
		var tCard=Feild.getCard(tPosition.x,tPosition.y);

		//デッキの確認
		var tSkill=aChara.getSkill(tCard);

		// //技取り出し
		// for(var j=0;j<mSkillList.length;j++){
		// 	if(mSkillList[j].NUMBER==tSkill){
		// 		tSkill=mSkillList[j];
		// 		break;
		// 	}
		// }
		if(aChara.useMp(tSkill.MAGIC)){
			//補助効果適用(B)
			Support(tSkill.SUPPORT_Be_Myself.concat(),aChara).then(()=>{
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
				attackMyself(aChara,tSkill,tCard).then(()=>{
					addDamage(aChara,tMyTeam,tEnemyTeam,tSkill,tCard).then(()=>{
						//補助効果適用(A)
						Support(tSkill.SUPPORT_Af_Myself.concat(),aChara).then(()=>{
							Support(tSkill.SUPPORT_Otherwise.concat(),aChara).then(()=>{
								aChara.endTurn(tSkill.DELAY).then(()=>{
									mDelayList = initDelay(mTrueTeam,mFalseTeam);//mDelayListのdelay値が変わってなかったため
									displayDelay();
									attacRes();
								})
							})
						})
					})
				})
			})
		}
		else{
			//MPが足りない
			freeLog(aChara,"MP","足りない")
			aChara.endTurn(0).then(()=>{
				mDelayList = initDelay(mTrueTeam,mFalseTeam);//mDelayListのdelay値が変わってなかったため
				displayDelay();
				attacRes();
			})
		}
	})
}

function calcDamage(aATK,aDEF,aPOWER){
	if(aDEF==Infinity&&aPOWER>0) return 1;
	else if(aDEF==Infinity&&aPOWER<0) return -1;

	var FixedValueAttack = 40;//ここの値が大きいほど能力値の恩恵が減る
	var FixedValueDefense = 40;
	var FixedMagnification = 4;//ここの値が大きいほどゲームの長さが短くなる
	if(mTrueTeam.length==3) FixedMagnification = 3;

	var tDamage = Math.floor((aATK+FixedValueAttack)*FixedMagnification/(aDEF+FixedValueDefense)*aPOWER);

	return tDamage
}

//自傷,自己回復
function attackMyself(aChara,aSkill,aCard){
	return new Promise((MAres,MArej)=>{
		if(aSkill.M_ATTACK==0){
			MAres();
			return;
		}
		//ダメージ計算
		let tDamage = calcDamage(aChara.ATK,aChara.DEF,aSkill.M_ATTACK);
		if(aCard.getSoot()==aChara.TYPE){//属性補正
			tDamage = Math.floor(tDamage*1.5);
		}
		let tAnimation=(tDamage>0)?[2]:[7];
		new Promise((res,rej)=>{
			attackAnimate(aChara,aChara,tAnimation,()=>{res();})
		}).then(()=>{
			aChara.addDamage(tDamage).then(()=>{
				MAres();
			})
		})
	})
}
function addDamage(aAttackChara,aMyTeam,aEnemyTeam,aSkill,aCard){
	return new Promise((res,rej)=>{
		if(aSkill.E_ATTACK==true){
			damage(aAttackChara,aEnemyTeam.concat(),aSkill,aCard).then(()=>{
				if(aSkill.F_ATTACK==true)
				damage(aAttackChara,aMyTeam.concat(),aSkill,aCard).then(()=>{
					res();
				})
				else res();
			})
		}
		else{
			if(aSkill.F_ATTACK==true)
			damage(aAttackChara,aMyTeam.concat(),aSkill,aCard).then(()=>{
				res();
			})
			else res();
		}
	})
}
function damage(aAttackChara,aDamagedTeam,aSkill,aCard){
	return new Promise((damageRes,damageRej)=>{
		let tAttackFlag=false;
		let tDamagedCharas=new Array();
		//攻撃
		let tRange=getAttackRange(aSkill.RANGE);
		if(tRange.length==0) damageRes();
		let tPromiseNum=aDamagedTeam.length*tRange.length;
		for(var i=0;i<aDamagedTeam.length;i++){
			for(var j=0;j<tRange.length;j++){
				if(aDamagedTeam[i].x==tRange[j][0]&&aDamagedTeam[i].y==tRange[j][1]){
					tAttackFlag=true;
					//サポート効果敵　前
					let aI=i;
					Support(aSkill.SUPPORT_Be_Enemy.concat(),aDamagedTeam[i]).then(()=>{
						//ダメージ計算
						var tDamage = calcDamage(aAttackChara.ATK,aDamagedTeam[aI].DEF,aSkill.POWER);
						if(aCard.getSoot()==aAttackChara.TYPE){//属性補正
							tDamage = Math.floor(tDamage*1.5);
						}
						new Promise((res,rej)=>{
							attackAnimate(aAttackChara,aDamagedTeam[aI],aSkill.ANIMATION,()=>{res();});
						}).then(()=>{
							aDamagedTeam[aI].addDamage(tDamage).then(()=>{
								//サポート効果敵　後
								Support(aSkill.SUPPORT_Af_Enemy.concat(),aDamagedTeam[aI]).then(()=>{
									displayStatus();
									tPromiseNum--;
									if(tPromiseNum<=0)
										damageRes();
								})
							})
						})
					})
				}
				else{
					// if(i==aDamagedTeam.length-1&&j==tRange.length-1&&!tAttackFlag){
						tPromiseNum--;
						if(tPromiseNum<=0)
							damageRes();
					// }
				}
			}
		}
	})
}
