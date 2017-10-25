class Guren extends Chara{
	static getText(){
		//キャラ説明
		return "アタックタイプ：<br>遠距離からの攻撃を得意とする";
	}
	constructor(aX,aY,aTeam){
		let tData=Guren.getCharaData();
		super(aX,aY,aTeam,tData);
		this.data=tData;
	}
	static getCharaData(){
		return {NAME:"グレン",
						HP:80,
						MP:5,
						ATK:27,
						DEF:24,
						SPD:24,
						MOV:2,
						TYPE:"club",
						IMAGE:1023010001,
						DECK:Guren.getDeck()
		}
	}
	static getDeck(){
		return [
			{NUMBER:1101,
				TEXT:"３マス隣のマスに威力４のダメージ",
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
				ANIMATION:[24]
			},
			{NUMBER:1102,
				TEXT:"４マス隣に威力４のダメージ",
				RANGE:[["distance",4]],
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
				ANIMATION:[24]
			},
			{NUMBER:1103,
				TEXT:"５マス隣に威力４のダメージ",
				RANGE:[["distance",5]],
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
				ANIMATION:[24]
			},
			{NUMBER:1104,
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
				ANIMATION:[24]
			},
			{NUMBER:1105,
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
				ANIMATION:[37]
			},
			{NUMBER:1106,
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
				ANIMATION:[37]
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
			{NUMBER:1108,
				TEXT:"相手全体に威力２のダメージ",
				RANGE:[["enemy"]],
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
				ANIMATION:[37]
			},
			{NUMBER:1109,
				TEXT:"外周マスに威力４のダメージ",
				RANGE:[["around",1]],
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
				ANIMATION:[37]
			},
			{NUMBER:1110,
				TEXT:"外周から１マス内側のマスに威力３のダメージ",
				RANGE:[["around",2]],
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
				ANIMATION:[37]
			},
			{NUMBER:1111,
				TEXT:"敵全体に威力５のダメージ（消費MP５）",
				RANGE:[["enemy"]],
				POWER:5,
				DELAY:0,
				MAGIC:5,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[36]
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
			{NUMBER:1114,
				TEXT:"相手全体に威力5のダメージ その後シャッフル",
				RANGE:[["enemy"]],
				POWER:5,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[{effect:"revers"},{effect:"shuffle"}],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[36]
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
