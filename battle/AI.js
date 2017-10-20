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
var mReversCards=4;//裏向いてる数


function AIConstructor(){
	mAIMovable=mMovable.concat();
	mAICard=mCard.concat();
	mAICardMark=new Array();
	mAICardNum=new Array();
	mAISkillList=mSkillList.concat();
	mAISkill=new Object();
	if(mDelayChara[1]=="T"){
		mAIChara = mTrueTeam[mDelayChara[2]];
		mAICharaTeam = mTrueTeam.concat();
		mAIEnemyTeam = mFalseTeam.concat();
	}
	else{
		mAIChara = mFalseTeam[mDelayChara[2]];
		mAICharaTeam = mFalseTeam.concat();
		mAIEnemyTeam = mTrueTeam.concat();
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
		if(mAICardMark=="joker"||mAICardMark=="suka"/*||カードが裏向き*/){
			var tJokerSkill;
			for(var j=0;j<mAISkillList.length;j++){
				if(mAISkillList[j].NUMBER==mAIChara.deck[13]){
					tJokerSkill=mAISkillList[j];
					break;
				}
			}
			if(mAIChara.MP>tJokerSkill.MAGIC){
				tPriority += tJokerSkill.POWER*mAIEnemyTeam.length;//今のところジョーカーは攻撃なら敵全体なので
				tPriority += calcSupportPriority(tJokerSkill);
				tPriority /= mReversCards;//期待値
				//if(mAICardMark=="suka"&&表向いてたら){
					// tPriority = -Infinity;
				// }
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
	move(mAIMovable[tSelected][0],mAIMovable[tSelected][1]);
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
		switch(aSupportNum[i][0]){	
			case "resetStatus"://ステーテスを初期値に戻す
				tPriority -= 1;
			case "shuffle"://シャッフルする
			case "revers"://裏カードを表に向ける
			case "type"://タイプ変更
				tPriority += 0;
				break; 
			case "delay"://delay
				tPriority += 0.1 * aSupportNum[i][1];
				if(aSupportNum[i][1]==100) tPriority = 0;
				break;
			case "mov"://mov変化 +2
				tPriority += 0.5;
			case "spd"://spd変化 +1.5
				tPriority += 0.5;
			case "mp"://MP +1
			case "atk"://at変化
				tPriority += 0.5;
			case "originalHP":
			case "originalMP":
			case "def"://def変化 +0.5
				tPriority +=　0.5;
				if(aSupportNum[i][2]!=undefined&&mAIChara.TYPE==mAICardMark) tPriority += aSupportNum[i][2];
				break;
			case "transform"://変身する
				if(aSupportNum[i][1]==0||aSupportNum[i][1]==1||aSupportNum[i][1]==2) tPriority+=10;
				else if(aSupportNum[i][1]==3)	tPriority += ((mAIChara.originalMP - mAIChara.MP)/2)-mAIChara.originalMP/4;
				else if(aSupportNum[i][1]==4)	tPriority += mAIChara.MP/2-mAIChara.originalMP/4;
				break;
			default:
				tPriority +=0;
		}
		tAddPriority += tPriority;
	}

	tAddPriority = calcDamage(mAIChara.ATK,mAIChara.DEF,tAddPriority);
	return tAddPriority;
}