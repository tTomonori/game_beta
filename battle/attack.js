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


	//攻撃
	let tRange=getAttackRange(tSkill.RANGE);
	if(aChara.team=="T"||tSkill.F_ATTACK==true){
		for(var i=0;i<mFalseTeam.length;i++){
			for(var j=0;j<tRange.length;j++){				
				if(mFalseTeam[i].x==tRange[j][0]&&mFalseTeam[i].y==tRange[j][1]){
					//ダメージ計算
					var tDamege = 1;//test

					mFalseTeam[i].HP-=tDamege;
					displayStatus();
					if(mFalseTeam[i].HP<=0){
						mFalseTeam[i].HP=0;
						winner("T");
					}
				}
			}
		}
	}
	if(aChara.team=="F"||tSkill.F_ATTACK==true){
		for(var i=0;i<mTrueTeam.length;i++){
			for(var j=0;j<tRange.length;j++){
				if(mTrueTeam[i].x==tRange[j][0]&&mTrueTeam[i].y==tRange[j][1]){
					//ダメージ計算
					var tDamege = 1;//test

					mTrueTeam[i].HP-=tDamege;
					displayStatus();
					if(mTrueTeam[i].HP<=0){
						mTrueTeam[i].HP=0;
						winner("F");
					}
				}
			}
		}
	}

	//補助効果適用(A)

	//delay計算
	var tDelay = 100000/aChara.SPD;//初期値
	tDelay+=Math.floor(tSkill.DELAY/aChara.SPD)//追加delay

	aChara.addDelay(tDelay);
	// mDelayList=sortDelay(mDelayList);
	mDelayList = initDelay(mTrueTeam,mFalseTeam);//mDelayListのdelay値が変わってなかったため
	displayDelay();
}
