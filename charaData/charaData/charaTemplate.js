class (キャラ名) extends Chara{
	static getText(){
		//キャラ説明
		return "タイプ：<br>";
	}
	constructor(aX,aY,aTeam){
		let tData={NAME:"",
						HP:,
						MP:,
						ATK:,
						DEF:,
						SPD:,
						MOV:,
						TYPE:"",
						IMAGE:,
						DECK:(キャラ名).getDeck()
		}
		super(aX,aY,aTeam,tData);
		this.data=tData;
	}
	static getDeck(){
		return [
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
			{NUMBER:103,
				TEXT:"３マス隣に威力４のダメージ",
				RANGE:[["distance",3]],
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
			{NUMBER:104,
				TEXT:"縦一列に威力３のダメージ",
				RANGE:[["vertical",1]],
				POWER:3,
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
			{NUMBER:105,
				TEXT:"横一列に威力３ダメージ",
				RANGE:[["horizontal",1]],
				POWER:3,
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
			{NUMBER:106,
				TEXT:"十字に威力２ダメージ",
				RANGE:[["vertical",1],["horizontal",1]],
				POWER:2,
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
			{NUMBER:108,
				TEXT:"相手全体に威力２のダメージ（DELAY　１０）",
				RANGE:[["enemy"]],
				POWER:2,
				DELAY:10,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[5]
			},
			{NUMBER:109,
				TEXT:"周囲８マスに威力３のダメージ",
				RANGE:[["square",3]],
				POWER:3,
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
				ANIMATION:[3]
			},
			{NUMBER:110,
				TEXT:"隣のマスに敵味方無視の威力７のダメージ（DELAY　５）",
				RANGE:[["distance",1]],
				POWER:7,
				DELAY:5,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:true,
		    E_ATTACK:true,
				ANIMATION:[4,3]
			},
			{NUMBER:111,
				TEXT:"周囲１２マスに威力５のダメージ（自傷　威力１）",
				RANGE:[["circumference",2]],
				POWER:5,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:1,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[3]
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
			{NUMBER:114,
				TEXT:"相手全体に威力5のダメージ その後シャッフル",
				RANGE:[["enemy"]],
				POWER:5,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[["revers"],["shuffle"]],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[34]
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