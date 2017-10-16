function com(aPlayerNum){
	console.log(aPlayerNum);
	switch(aPlayerNum){
		case 1:
			AI_1();
			break;
		default:
	}
}

function AI_1(){//最大火力のマスを選択する簡単なAI
	var tPrioritys = new Array();
	for(var i=0;i<mMovable.length;i++){

		var tPriority = 0;

		var tCard=mCard[mMovable[i][0]+mMovable[i][1]*8];

		var tChara = new Object();
		if(mDelayChara[1]=="T"){
			tChara = mTrueTeam[mDelayChara[2]];
		}
		else{
			tChara = mFalseTeam[mDelayChara[2]];
		}
		//デッキの確認
		var tSkill;
		if(tCard[1]=="joker"){
			tSkill=tChara.deck[13];
		}
		else if(tCard[1]=="suka"){
			tSkill=tChara.deck[14];
		}
		else{
			tSkill=tChara.deck[tCard[0]];
		}

		//技取り出し
		for(var j=0;j<mSkillList.length;j++){
			if(mSkillList[j].NUMBER==tSkill){
				tSkill=mSkillList[j];
				break;
			}
		}
		// tSkill=mSkillList[tSkill];
		let tRange=calcRange(tSkill.RANGE,{x:mMovable[i][0],y:mMovable[i][1]});
		if(tCard[1]!="joker"&&tCard[1]!="suka"){//jokerとsukaは攻撃範囲を表示しない
			var tDamegeCharas = new Array();
			if(mDelayChara[1]=="T"){
				tDamegeCharas = mFalseTeam;
			}
			else{
				tDamegeCharas = mTrueTeam;
			}
			if(tChara.MP>tSkill.MAGIC){
				for(let i=0;i<tRange.length;i++){
					for(var j=0;j<tDamegeCharas.length;j++){
						if(tRange[i][0]==tDamegeCharas[j].x&&tRange[i][1]==tDamegeCharas[j].y){
							var tDamage = calcDamage(tChara.ATK,tDamegeCharas[j].DEF,tSkill.POWER);

							if(tCard[1]==tChara.TYPE){//属性補正
								tDamage = Math.floor(tDamage*1.5);
							}

							tPriority+=tDamage;
						}
					}
				}
			}
			if(tSkill.M_ATTACK!=0){
				if(tChara.MP>tSkill.MAGIC){
					var tDamage = calcDamage(tChara.ATK,tChara.DEF,tSkill.M_ATTACK);

					if(tCard[1]==tChara.TYPE){//属性補正
						tDamage = Math.floor(tDamage*1.5);
					}
					tPriority-=tDamage;
				}
			}
			tPriority*=100;
			for(var m=0;m<tDamegeCharas.length;m++){
				tPriority -= Math.abs(tChara.x-tDamegeCharas[m].x);
				tPriority -= Math.abs(tChara.y-tDamegeCharas[m].y);
			}
		}
		// console.log(tCard[0]+1,tCard[1],tPriority);
		tPrioritys.push(tPriority);
	}
	// console.log(tPrioritys)
	var tSelected=0;
	var tMax = -Infinity;
	for(var i=0;i<tPrioritys.length;i++){
		if(tPrioritys[i]>tMax){
			tSelected=i;
			tMax=tPrioritys[i];
		}
	}
	move(mMovable[tSelected][0],mMovable[tSelected][1]);
}