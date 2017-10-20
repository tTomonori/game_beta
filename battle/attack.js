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
						addDamage(aChara,tMyTeam,tEnemyTeam,tSkill,tCard[1]).then(()=>{
							//補助効果適用(A)
							Support(tSkill.SUPPORT_Af_Myself.concat(),aChara).then(()=>{

								Support(tSkill.SUPPORT_Otherwise.concat(),aChara).then(()=>{

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
			})
		}
		// return new Promise((res,rej)=>{
		// 	attackAnimate(aChara,tDamagedCharas,tSkill.ANIMATION,()=>{res();});
		// })
	})
}

function calcDamage(aATK,aDEF,aPOWER){
	var FixedValueAttack = 40;//ここの値が大きいほど能力値の恩恵が減る
	var FixedValueDefense = 40;
	var FixedMagnification = 5;//ここの値が大きいほどゲームの長さが短くなる
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
		if(aCard[1]==aChara.TYPE){//属性補正
			tDamage = Math.floor(tDamage*1.5);
		}
		let tAnimation=(tDamage>0)?[2]:[7];
		new Promise((res,rej)=>{
			attackAnimate(aChara,aChara,tAnimation,()=>{res();})
		}).then(()=>{
			if(aChara.addDamage(tDamage)=="down") return;
			MAres();
		})
	})
}
function addDamage(aAttackChara,aMyTeam,aEnemyTeam,aSkill,aCard){
	return new Promise((res,rej)=>{
		if(aSkill.E_ATTACK==true){
			damage(aAttackChara,aEnemyTeam,aSkill,aCard).then(()=>{
				if(aSkill.F_ATTACK==true)
				damage(aAttackChara,aMyTeam,aSkill,aCard).then(()=>{
					res();
				})
				else res();
			})
		}
		else{
			if(aSkill.F_ATTACK==true)
			damage(aAttackChara,aMyTeam,aSkill,aCard).then(()=>{
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
		for(var i=0;i<aDamagedTeam.length;i++){
			for(var j=0;j<tRange.length;j++){
				if(aDamagedTeam[i].x==tRange[j][0]&&aDamagedTeam[i].y==tRange[j][1]){
					tAttackFlag=true;
					//サポート効果敵　前
					let aI=i;
					Support(aSkill.SUPPORT_Be_Enemy.concat(),aDamagedTeam[i]).then(()=>{
						//ダメージ計算
						var tDamage = calcDamage(aAttackChara.ATK,aDamagedTeam[aI].DEF,aSkill.POWER);
						if(aCard==aAttackChara.TYPE){//属性補正
							tDamage = Math.floor(tDamage*1.5);
						}
						new Promise((res,rej)=>{
							attackAnimate(aAttackChara,aDamagedTeam[aI],aSkill.ANIMATION,()=>{res();});
						}).then(()=>{
							if(aDamagedTeam[aI].addDamage(tDamage)=="down") return;
							//サポート効果敵　後
							Support(aSkill.SUPPORT_Af_Enemy.concat(),aDamagedTeam[aI]).then(()=>{
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
