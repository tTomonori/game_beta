function attack(aChara) {
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

	//補助効果適用(B)
	Support_B_M(tSkill.SUPPORT_Be_Myself,aChara);



	//攻撃
	let tRange=getAttackRange(tSkill.RANGE);
	if(aChara.team=="T"||tSkill.F_ATTACK==true){
		for(var i=0;i<mFalseTeam.length;i++){
			for(var j=0;j<tRange.length;j++){
				if(mFalseTeam[i].x==tRange[j][0]&&mFalseTeam[i].y==tRange[j][1]){
					//サポート効果敵　前
					Support_B_E(tSkill.SUPPORT_Be_Enemy,mFalseTeam[i]);
					//ダメージ計算
					var tDamage = calcDamage(aChara.ATK,mFalseTeam[i].DEF,tSkill.POWER);

					if(tCard[1]==aChara.TYPE){
						tDamage = Math.floor(tDamage*1.5);
					}

					mFalseTeam[i].HP-=tDamage;
					if(mFalseTeam[i].HP<=0){
						mFalseTeam[i].HP=0;
						winner("T");
					}
					if(mFalseTeam[i].HP>mFalseTeam[i].originalHP){//威力がマイナスだと回復する
						mFalseTeam[i].HP = mFalseTeam[i].originalHP;
					}

					//サポート効果敵　後
					Support_A_E(tSkill.SUPPORT_Af_Enemy,mFalseTeam[i]);
					displayStatus();
				}
			}
		}
	}
	if(aChara.team=="F"||tSkill.F_ATTACK==true){
		for(var i=0;i<mTrueTeam.length;i++){
			for(var j=0;j<tRange.length;j++){
				if(mTrueTeam[i].x==tRange[j][0]&&mTrueTeam[i].y==tRange[j][1]){
					//サポート効果敵　前
					Support_B_E(tSkill.SUPPORT_Be_Enemy,mTrueTeam[i]);
					//ダメージ計算
					var tDamage = calcDamage(aChara.ATK,mTrueTeam[i].DEF,tSkill.POWER);

					if(tCard[1]==aChara.TYPE){
						tDamage = Math.floor(tDamage*1.5);
					}

					console.log(mTrueTeam[i].HP,tDamage);
					mTrueTeam[i].HP-=tDamage;
					console.log(mTrueTeam[i].HP);
					if(mTrueTeam[i].HP<=0){
						mTrueTeam[i].HP=0;
						winner("F");
					}
					if(mTrueTeam[i].HP>mTrueTeam[i].originalHP){//威力がマイナスだと回復する
						mTrueTeam[i].HP = mTrueTeam[i].originalHP;
					}
					//サポート効果敵　後
					Support_A_E(tSkill.SUPPORT_Af_Enemy,mFalseTeam[i]);
					displayStatus();
				}
			}
		}
	}

	//補助効果適用(A)
	Support_A_M(tSkill.SUPPORT_Af_Myself,aChara);
	Support_O(tSkill.SUPPORT_Otherwise,aChara);

	//delay計算
	var tDelay = Math.floor(100000/aChara.SPD);//初期値
	tDelay+=Math.floor(tSkill.DELAY/aChara.SPD)//追加delay

	aChara.addDelay(tDelay);
	// mDelayList=sortDelay(mDelayList);
	mDelayList = initDelay(mTrueTeam,mFalseTeam);//mDelayListのdelay値が変わってなかったため
	displayDelay();
}

function calcDamage(aATK,aDEF,aPOWER){
	var tDamage = Math.floor((aATK+30)*5/(aDEF+30)*aPOWER)

	return tDamage
}
