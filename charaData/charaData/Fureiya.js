class Fureiya extends Chara{
	static getText(){
		//キャラ説明
		return "ディフェンスタイプ：<br>回復スキルを持たないが、毎ターンHPが微量回復する";
	}
	constructor(aX,aY,aTeam){
		let tData=Fureiya.getCharaData();
		super(aX,aY,aTeam,tData);
		this.data=tData;
	}
	static getCharaData(){
		return {NAME:"フレイヤ",
						HP:90,
						MP:1,
						ATK:21,
						DEF:30,
						SPD:21,
						MOV:2,
						TYPE:"heart",
						IMAGE:1087010001,
						DECK:Fureiya.getDeck()
		}
	}
	static getDeck(){
		return [
			{NUMBER:1201,
				TEXT:"隣のマスに威力５のダメージ 威力１の回復",
				RANGE:[["distance",1]],
				POWER:5,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:-1,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[4]
			},
			{NUMBER:1202,
				TEXT:"２マス隣に威力４のダメージ 威力１の回復",
				RANGE:[["distance",2]],
				POWER:4,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:-1,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[0]
			},
			{NUMBER:1203,
				TEXT:"３マス隣に威力４のダメージ 威力１の回復",
				RANGE:[["distance",3]],
				POWER:4,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:-1,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[0]
			},
			{NUMBER:1204,
				TEXT:"縦一列に威力３のダメージ 威力１の回復",
				RANGE:[["vertical",1]],
				POWER:3,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:-1,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[0]
			},
			{NUMBER:1205,
				TEXT:"横一列に威力３ダメージ 威力１の回復",
				RANGE:[["horizontal",1]],
				POWER:3,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:-1,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[0]
			},
			{NUMBER:1206,
				TEXT:"十字に威力２ダメージ 威力１の回復",
				RANGE:[["vertical",1],["horizontal",1]],
				POWER:2,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:-1,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[0]
			},
			{NUMBER:7,
				TEXT:"シャッフルしてもう一度行動",
				RANGE:[],
				POWER:0,
				DELAY:0,
				MAGIC:1,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[["getTurn"]],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[["shuffle"]],
				M_ATTACK:0,
				F_ATTACK:false,
				E_ATTACK:true,
				ANIMATION:[0]
			},
			{NUMBER:1208,
				TEXT:"相手全体に威力２のダメージ 威力１の回復（DELAY　１０）",
				RANGE:[["enemy"]],
				POWER:2,
				DELAY:10,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:-1,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[5]
			},
			{NUMBER:1209,
				TEXT:"周囲８マスに威力３のダメージ 威力１の回復",
				RANGE:[["square",3]],
				POWER:3,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:-1,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[3]
			},
			{NUMBER:1210,
				TEXT:"隣のマスに敵味方無視の威力７のダメージ 威力１の回復（DELAY　５）",
				RANGE:[["distance",1]],
				POWER:7,
				DELAY:5,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:-1,
				F_ATTACK:true,
		    E_ATTACK:true,
				ANIMATION:[4,3]
			},
			{NUMBER:1211,
				TEXT:"周囲１２マスに威力３のダメージ 威力１の回復",
				RANGE:[["circumference",2]],
				POWER:3,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:-1,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[3]
			},
			{NUMBER:1212,
				TEXT:"攻撃が2アップ 防御が3アップ 威力１の回復",
				RANGE:[],
				POWER:0,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[["atk",2],["def",3]],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:-1,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[7]
			},
			{NUMBER:1213,
				TEXT:"味方に威力２の回復 威力１の回復",
				RANGE:[["ally"]],
				POWER:-2,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:-1,
				F_ATTACK:true,
		    E_ATTACK:false,
				ANIMATION:[7]
			},
			{NUMBER:1214,
				TEXT:"HPの最大値を10アップして威力４の回復",
				RANGE:[],
				POWER:0,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[["originalHP",10]],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[["revers"],["shuffle"]],
				M_ATTACK:-4,
				F_ATTACK:true,
		    E_ATTACK:false,
				ANIMATION:[7]
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
					SUPPORT_Otherwise:[["revers"]],
					M_ATTACK:0,
					F_ATTACK:false,
					E_ATTACK:true,
					ANIMATION:[0]
				},]
	}
}