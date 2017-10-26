class Sirufe extends Chara{
	static getText(){
		//キャラ説明
		return "サポートタイプ：<br>味方を強化しながら戦う";
	}
	constructor(aX,aY,aTeam,operation){
		let tData=Sirufe.getCharaData();
		super(aX,aY,aTeam,tData,operation);
		this.data=tData;
	}
	static getCharaData(){
		return {NAME:"シルフェ",
						HP:80,
						MP:15,
						ATK:20,
						DEF:25,
						SPD:30,
						MOV:3,
						TYPE:"heart",
						IMAGE:1235010001,
						DECK:Sirufe.getDeck()
		}
	}
	static getDeck(){
		return [
			{NUMBER:401,
				TEXT:"周囲8マスの味方のMPを2回復（消費MP1）",
				RANGE:[["square",3]],
				POWER:0,
				DELAY:0,
				MAGIC:1,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[{effect:"mp",value:2}],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:true,
		    E_ATTACK:false,
				ANIMATION:[7]
			},
			{NUMBER:402,
				TEXT:"２マス隣に威力3のダメージ",
				RANGE:["distance",2],
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
			{NUMBER:403,
				TEXT:"３マス隣に威力3のダメージ",
				RANGE:[["distance",3]],
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
			{NUMBER:404,
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
			{NUMBER:405,
				TEXT:"横一列に威力３ダメージ",
				RANGE:[["horizontal",1]],
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
			{NUMBER:406,
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
				SUPPORT_Af_Myself:[{effect:"getTurn"}],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[{effect:"shuffle"}],
				M_ATTACK:0,
				F_ATTACK:false,
				E_ATTACK:true,
				ANIMATION:[0]
			},
			{NUMBER:408,
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
			{NUMBER:409,
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
			{NUMBER:410,
				TEXT:"味方のMPを2回復（消費MP2）",
				RANGE:[["ally"]],
				POWER:0,
				DELAY:0,
				MAGIC:2,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[{effect:"mp",value:2}],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:true,
		    E_ATTACK:false,
				ANIMATION:[7]
			},
			{NUMBER:411,
				TEXT:"味方のDELAYを50下げる（消費MP2）",
				RANGE:[["ally"]],
				POWER:0,
				DELAY:0,
				MAGIC:2,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[{effect:"delay",value:-50}],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:true,
		    E_ATTACK:false,
				ANIMATION:[7]
			},
			{NUMBER:412,
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
			{NUMBER:413,
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
			{NUMBER:414,
				TEXT:"味方のDELAYを100下げる（消費MP1）",
				RANGE:[["ally"]],
				POWER:0,
				DELAY:0,
				MAGIC:1,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[{effect:"delay",value:-100}],
				SUPPORT_Otherwise:[{effect:"revers"},{effect:"shuffle"}],
				M_ATTACK:0,
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
					SUPPORT_Otherwise:[{effect:"revers"}],
					M_ATTACK:0,
					F_ATTACK:false,
					E_ATTACK:true,
					ANIMATION:[0]
				}]
	}
}
