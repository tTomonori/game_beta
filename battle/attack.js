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

	//補助効果適用(A)

	aChara.addDelay(100000/aChara.SPD);
	mDelayList=sortDelay(mDelayList);
	displayDelay();
}
