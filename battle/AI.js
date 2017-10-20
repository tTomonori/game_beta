var mAIMovable;
var mAIChara;
var mAIEnemyCharas;
var mAISkill;
var mAISkillList;
var mAICard;
var mAICardMark;
var mAICardNum;
var mAIPrioritys;


function AIConstructor(){
	mAIMovable=mMovable.concat();
	mAICard=mCard.concat();
	mAICardMark=new Array();
	mAICardNum=new Array();
	mAISkillList=mSkillList.concat();
	mAISkill=new Object();
	if(mDelayChara[1]=="T"){
		mAIChara = mTrueTeam[mDelayChara[2]];
		mAIEnemyCharas = mFalseTeam.concat();
	}
	else{
		mAIChara = mFalseTeam[mDelayChara[2]];
		mAIEnemyCharas = mTrueTeam.concat();
	}
	mAIPrioritys=new Array();
}

function com(aPlayerNum){//
	switch(aPlayerNum){
		case 1:
			AI_1();
			break;
		default:
	}
}

function AI_1(){//最大火力のマスを選択する簡単なAI
	AIConstructor();
	for(var i=0;i<mAIMovable.length;i++){
		var tX = mAIMovable[i][0];
		var tY = mAIMovable[i][1];
		mAICardNum=mAICard[tX+tY*8][0]
		mAICardMark=mAICard[tX+tY*8][1]

		//デッキの確認
		var tSkill;
		if(mAICardMark=="joker")		tSkill=mAIChara.deck[13];
		else if(mAICardMark=="suka")	tSkill=mAIChara.deck[14];
		else							tSkill=mAIChara.deck[mAICardNum];
		for(var j=0;j<mAISkillList.length;j++){
			if(mAISkillList[j].NUMBER==tSkill){
				mAISkill=mAISkillList[j];
				break;
			}
		}
		var tPriority = 0;

		let tRange=calcRange(mAISkill.RANGE,{x:tX,y:tY});
		if(mAICardMark=="joker"||mAICardMark=="suka"){
		}
		else if(mAIChara.MP>mAISkill.MAGIC){
		var tDamegeCharas = new Array();
			for(let i=0;i<tRange.length;i++){
				for(var j=0;j<mAIEnemyCharas.length;j++){
					if(tRange[i][0]==mAIEnemyCharas[j].x&&tRange[i][1]==mAIEnemyCharas[j].y){
						var tDamage = calcDamage(mAIChara.ATK,mAIEnemyCharas[j].DEF,mAISkill.POWER);

						if(mAICardMark==mAIChara.TYPE)	tDamage = Math.floor(tDamage*1.5);
						if(mAIEnemyCharas.HP<tDamage)	tPriority = Infinity;//倒せるなら決めに行く

						tPriority+=tDamage;
					}
				}
			}
		}

		if(mAISkill.M_ATTACK!=0&&mAIChara.MP>mAISkill.MAGIC){
			var tDamage = calcDamage(mAIChara.ATK,mAIChara.DEF,mAISkill.M_ATTACK);

			if(mAICardMark==mAIChara.TYPE)	tDamage = Math.floor(tDamage*1.5);
			if(mAIChara.originalHP>mAIChara.HP-tDamage)	tPriority-=tDamage;//過剰回復防止
			if(mAIChara.HP-tDamage<0)	tPriority = -Infinity;//自滅回避
		}

		tPriority*=100;
		for(var m=0;m<mAIEnemyCharas.length;m++){//敵から遠くにはいかない
			tPriority -= Math.abs(tX-mAIEnemyCharas[m].x);
			tPriority -= Math.abs(tY-mAIEnemyCharas[m].y);
		}
		mAIPrioritys.push(tPriority);
	}

	var tSelected=0;//優先度最大を選択
	var tMax = -Infinity;
	for(var i=0;i<mAIPrioritys.length;i++){
		if(mAIPrioritys[i]>tMax){
			tSelected=i;
			tMax=mAIPrioritys[i];
		}
	}

	//移動を実行
	// move(mAIMovable[tSelected][0],mAIMovable[tSelected][1]);
}

function calcSupportPriority(){
	return;
}