class Pathi extends Chara{
	static getText(){
		//キャラ説明
		return "ジャマ―タイプ：<br>敵の妨害をするのが得意";
	}
	constructor(aX,aY,aTeam,aOperationNum){
		let tData=Pathi.getCharaData();
		super(aX,aY,aTeam,tData,aOperationNum);
		this.data=tData;
	}
	static getCharaData(){
		return {NAME:"パティ",
						HP:90,
						MP:5,
						ATK:25,
						DEF:25,
						SPD:22,
						MOV:2,
						TYPE:"heart",
						IMAGE:1437010001,
						DECK:Pathi.getDeck()
		}
	}
	static getDeck(){
		return [
			{NUMBER:801,
				TEXT:"周囲１２マスにいる相手の攻撃力を２下げ、威力２のダメージ",
				RANGE:[["circumference",2]],
				POWER:2,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[{effect:"atk",value:-2}],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[0]
			},
			{NUMBER:802,
				TEXT:"周囲１２マスにいる相手の防御力を２下げ、威力２のダメージ",
				RANGE:[["circumference",2]],
				POWER:2,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[{effect:"def",value:-2}],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[0]
			},
			{NUMBER:803,
				TEXT:"周囲１２マスにいる相手のスピードを２下げ、威力２のダメージ",
				RANGE:[["circumference",2]],
				POWER:2,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[{effect:"spd",value:-2}],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[0]
			},
			{NUMBER:804,
				TEXT:"周囲１２マスにいる相手のDELAYを２５上げ、威力２のダメージ",
				RANGE:[["circumference",2]],
				POWER:2,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[{effect:"delay",value:-25}],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[17]
			},
			{NUMBER:805,
				TEXT:"隣のマスにいる相手のDELAYを５０上げ、威力２のダメージ（消費MP２）",
				RANGE:[["distance",1]],
				POWER:2,
				DELAY:0,
				MAGIC:2,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[{effect:"delay",value:50}],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[17]
			},
			{NUMBER:101,
				TEXT:"隣のマスに威力５のダメージ",
				RANGE:[["distance",1]],
				POWER:5,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[4]
			},
			{NUMBER:7,
				TEXT:"シャッフルしてもう一度行動",
				RANGE:[],
				POWER:0,
				DELAY:0,
				MAGIC:1,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[{effect:"getTurn"}],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[{effect:"shuffle"}],
				M_ATTACK:0,
				F_ATTACK:false,
				E_ATTACK:true,
				ANIMATION:[0]
			},
			{NUMBER:808,
				TEXT:"相手全体のDELAYを２５上げ、威力１のダメージ",
				RANGE:[["enemy"]],
				POWER:1,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[{effect:"delay",value:25}],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[17]
			},
			{NUMBER:102,
				TEXT:"２マス隣に威力４のダメージ",
				RANGE:[["distance",2]],
				POWER:4,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[0]
			},
			{NUMBER:501,
				TEXT:"MPを３回復 (タイプ一致時４回復)",
				RANGE:[],
				POWER:0,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[{effect:"mp",value:3,additionOfMatchingType:1}],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[15]
			},
			{NUMBER:612,
				TEXT:"スピード4アップ　その後DELAYを50下げる（タイプ一致時6アップ）（消費MP２）",
				RANGE:[],
				POWER:0,
				DELAY:0,
				MAGIC:2,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[{effect:"spd",value:4,additionOfMatchingType:2},{effect:"delay",value:50}],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[0]
			},
			{NUMBER:112,
				TEXT:"自分に威力５の回復（消費MP３）",
				RANGE:[],
				POWER:0,
				DELAY:0,
				MAGIC:3,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:-5,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[7]
			},
			{NUMBER:113,
				TEXT:"味方に威力３の回復（消費MP４）",
				RANGE:[["ally"]],
				POWER:-3,
				DELAY:0,
				MAGIC:4,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:true,
		    E_ATTACK:false,
				ANIMATION:[7]
			},
			{NUMBER:814,
				TEXT:"相手全体のDELAYを５０上げ、威力３のダメージ　その後シャッフルする",
				RANGE:[["enemy"]],
				POWER:3,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[{effect:"delay",value:50}],
				SUPPORT_Otherwise:[{effect:"revers"},{effect:"shuffle"}],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[17]
			},
			{NUMBER:0,
					TEXT:"スカ　何も起こらない",
					RANGE:[],
					POWER:0,
					DELAY:0,
					MAGIC:0,
					SUPPORT_Be_Myself:[],
					SUPPORT_Af_Myself:[],
					SUPPORT_Be_Enemy:[],
					SUPPORT_Af_Enemy:[],
					SUPPORT_Otherwise:[{effect:"revers"}],
					M_ATTACK:0,
					F_ATTACK:false,
					E_ATTACK:true,
					ANIMATION:[0]
				},]
	}
}
