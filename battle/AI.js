var mAIMovable;
var mAIChara;
var mAICharaTeam;
var mAIEnemyTeam;
var mAISkill;
var mAISkillList;
var mAICard;
var mAICardMark;
var mAICardNum;
var mAIPrioritys;
var mReversCards;//裏向いてる数


function AIConstructor(){
	mAIMovable=mMovable.concat();
	mAICard=Feild.getAllCard();
	mAICardMark=new Array();
	mAICardNum=new Array();
	mAISkillList=mSkillList.concat();
	mAISkill=new Object();
	mAIChara=mTurnChara;
	mAICharaTeam=(mAIChara.getTeam()=="T")?mTrueTeam.concat():mFalseTeam.concat();
	mAIEnemyTeam=(mAIChara.getTeam()=="F")?mTrueTeam.concat():mFalseTeam.concat();
	mReversCards=Feild.getReversCardNum();
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
		mAICardNum=mAICard[tX+tY*8].getNumber();
		mAICardMark=mAICard[tX+tY*8].getSoot();

		var tPriority = 0;

		var tCard=Feild.getCard(mMovable[i][0],mMovable[i][1]);

		//デッキの確認
		var tSkill;
		if(mAICardMark=="joker")		tSkill=mAIChara.getSkill(14);
		else if(mAICardMark=="suka")	tSkill=mAIChara.getSkill(15);
		else							tSkill=mAIChara.getSkill(tCard);
		mAISkill=tSkill;

		var tPriority = 0;

		let tRange=calcRange(mAISkill.RANGE,{x:tX,y:tY});
		if(tCard.isReverse()/*カードが裏向き*/){
			var tJokerSkill=mAIChara.getSkill(14);
			if(mAIChara.MP>=tJokerSkill.MAGIC){
				tPriority += calcDamage(mAIChara.ATK,mAIChara.DEF,tJokerSkill.POWER)*mAIEnemyTeam.length;//今のところジョーカーは攻撃なら敵全体なので
				tPriority += calcSupportPriority(tJokerSkill);
				tPriority /= mReversCards;//期待値
				tPriority *= 2;
				if(mAICardMark=="suka"&&!tCard.isReverse()) tPriority=-Infinity;
			}
		}
		else if(mAIChara.MP>mAISkill.MAGIC){
			for(let i=0;i<tRange.length;i++){
				var tDamegeCharas = new Array();
				for(var j=0;j<mAIEnemyTeam.length;j++){
					if(tRange[i][0]==mAIEnemyTeam[j].x&&tRange[i][1]==mAIEnemyTeam[j].y){
						var tDamage = calcDamage(mAIChara.ATK,mAIEnemyTeam[j].DEF,mAISkill.POWER);

						if(mAICardMark==mAIChara.TYPE)	tDamage = Math.floor(tDamage*1.5);
						if(mAIEnemyTeam[j].HP<tDamage)	tPriority = Infinity;//倒せるなら決めに行く

						tPriority+=tDamage;
						tPriority-=SupportPriorityPoint(mAISkill.SUPPORT_Af_Enemy);
						tPriority-=SupportPriorityPoint(mAISkill.SUPPORT_Be_Enemy);
					}
				}
			}


			if(mAISkill.M_ATTACK!=0){
				var tDamage = calcDamage(mAIChara.ATK,mAIChara.DEF,mAISkill.M_ATTACK);

				if(mAICardMark==mAIChara.TYPE)	tDamage = Math.floor(tDamage*1.5);
				if(mAIChara.originalHP>mAIChara.HP-tDamage)	tPriority -= Infinity;//過剰回復防止
				if(mAIChara.HP<tDamage)	tPriority = -Infinity;//自滅回避
				if(tDamage<0) tDamage *= (mAIChara.originalHP/mAIChara.HP)/2//半分で等倍　少ないと優先度が上がる
				tPriority+=tDamage;
			}

			if(mAISkill.F_ATTACK==true){
				for(let i=0;i<tRange.length;i++){
					tDamegeCharas = new Array();
					for(var j=0;j<mAICharaTeam.length;j++){
						if(tRange[i][0]==mAICharaTeam[j].x&&tRange[i][1]==mAICharaTeam[j].y){
							var tDamage = calcDamage(mAIChara.ATK,mAICharaTeam[j].DEF,mAISkill.POWER);

							if(mAICardMark==mAIChara.TYPE)	tDamage = Math.floor(tDamage*1.5);
							if(mAICharaTeam[j].HP<tDamage)	tPriority = -Infinity;//味方が死ぬのはアウト
							if(mAICharaTeam[j].HP-tDamage>mAICharaTeam[j].originalHP)	tPriority = -Infinity;//過剰回復防止
							if(tDamage<0) tDamage *= (mAICharaTeam[j].originalHP/mAICharaTeam[j].HP)/2//半分で等倍　少ないと優先度が上がる

							tPriority-=tDamage;
							tPriority+=SupportPriorityPoint(mAISkill.SUPPORT_Af_Enemy);
							tPriority+=SupportPriorityPoint(mAISkill.SUPPORT_Be_Enemy);
						}
					}
				}
			}
			tPriority += SupportPriorityPoint(mAISkill.SUPPORT_Af_Myself);
			tPriority += SupportPriorityPoint(mAISkill.SUPPORT_Be_Myself);
		}
		tPriority += SupportPriorityPoint(mAISkill.SUPPORT_Otherwise);

		tPriority*=100;
		for(var m=0;m<mAIEnemyTeam.length;m++){//敵から遠くにはいかない
			tPriority -= Math.abs(tX-mAIEnemyTeam[m].x);
			tPriority -= Math.abs(tY-mAIEnemyTeam[m].y);
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
	move(mAIMovable[tSelected][0],mAIMovable[tSelected][1],undefined,true);
}

function calcSupportPriority(aSkill){//作者のさじ加減
	var tPriority = 0;
	tPriority += SupportPriorityPoint(aSkill.SUPPORT_Be_Myself);
	tPriority += SupportPriorityPoint(aSkill.SUPPORT_Af_Myself);
	tPriority -= SupportPriorityPoint(aSkill.SUPPORT_Be_Enemy);
	tPriority -= SupportPriorityPoint(aSkill.SUPPORT_Af_Enemy);
	return tPriority;
}

function SupportPriorityPoint(aSupportNum){
	var tAddPriority = 0;
	for (var i = 0; i < aSupportNum.length; i++) {
		var tPriority = 0;
		switch(aSupportNum[i].effect){
			case "resetStatus"://ステーテスを初期値に戻す
				tPriority -= 1;
			case "shuffle"://シャッフルする
				tPriority +=0.3;
				switch (mTurnChara.getOriginalName()) {
					case "ロゼッタ":
						tPriority+=2;
						break;
					default:
				}
				break;
			case "revers"://裏カードを表に向ける
			case "type"://タイプ変更
				tPriority += 0;
				break;
			case "delay"://delay
				tPriority -= 0.1 * aSupportNum[i].value;
				break;
			case "mp"://MP +1
				if(mAIChara.MP==mAIChara.originalMP) tPriority=-Infinity;
				tPriority -= 1.0;
			case "mov"://mov変化 +2
				tPriority += 0.5;
			case "spd"://spd変化 +1.5
				tPriority += 0.5;
			case "atk"://at変化
				tPriority += 0.5;
			case "originalHP":
			case "originalMP":
			case "def"://def変化 +0.5
				tPriority +=　0.5;
				if(aSupportNum[i].additionOfMatchingType!=undefined&&mAIChara.TYPE==mAICardMark)
					tPriority += aSupportNum[i].additionOfMatchingType;
				break;
			case "transform"://変身する
				switch (mTurnChara.getOriginalName()) {
					case "ロゼッタ":
						tPriority+=15;
						break;
					case "ガーベラ":
						if(aSupportNum[i].value==0)	tPriority += ((mAIChara.originalMP - mAIChara.MP)/2)-mAIChara.originalMP/4;
						else if(aSupportNum[i].value==1)	tPriority += mAIChara.MP/2-mAIChara.originalMP/4;
						break;
					default:
				}
				break;
			case "setTrap":
				let tNum=calcRange(aSupportNum[i].range,mTurnChara.getPosition());
				tPriority+=tNum*0.5;
				break;
			case "summon":
			switch (mTurnChara.getOriginalName()) {
				case "ザーウィン":
					if(aSupportNum[i].value==0) tPriority+=3;
					else if(aSupportNum[i].value==1) tPriority+=5;
					else if(aSupportNum[i].value==2) tPriority+=6;
					break;
				case "ウンディーネ":
					if(aSupportNum[i].value==0) tPriority+=3;
					else if(aSupportNum[i].value==1) tPriority+=5;
					break;
				default:
			}
				break;
			case "Retrofits":
				tPriority+=3;
				break;
			case "changeCardType":
				if(mAICharaTeam.length>1)tPriority+=3;
				else tPriority+=1;
				break;
			case "changeCardSkill":
				switch(aSupportNum[i].name){
					case "パンプキン"://パンプキン
						tPriority+=4;
						break;
					case "スケルトン"://スケルトン
						tPriority+=3;
						break;
					case "バット"://バット
						tPriority+=4;
						break;
					case "ヴァンパイア"://ヴァンパイア
						//変更できるカードを数える
						let tNum=calcRange(aSupportNum[i].range,mTurnChara.getPosition());
						//固定値*変更カード数
						tPriority+=tNum*3;
						break;
					default:
						tPriority+=0;
				}
				break;

			default:
				tPriority +=0;
		}
		tAddPriority += tPriority;
	}

	tAddPriority = calcDamage(mAIChara.ATK,mAIChara.DEF,tAddPriority);
	return tAddPriority;
}
