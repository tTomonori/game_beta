class Yunikon extends Enemy{
	getText(){
		//キャラ説明
		return "味方の回復を得意とする";
	}
	constructor(aX,aY,aTeam,aOperationNum){
		let tData=Yunikon.getCharaData();
		super(aX,aY,aTeam,tData,aOperationNum);
		this.data=tData;

		this.MP=15
	}
	static getCharaData(){
		return {NAME:"ユニコーン",
						HP:80,
						MP:20,
						ATK:20,
						DEF:27,
						SPD:24,
						MOV:2,
						TYPE:"diamond",
						IMAGE:1377010002,
						DECK:Yunikon.getDeck()
		}
	}

	static getDeck(){
		let tSkill={NUMBER:1,
			TEXT:"味方に威力7の回復",
			RANGE:[["ally"]],
			POWER:-7,
			DELAY:0,
			MAGIC:2,
			SUPPORT_Be_Myself:[],
			SUPPORT_Af_Myself:[],
			SUPPORT_Be_Enemy:[],
			SUPPORT_Af_Enemy:[],
			SUPPORT_Otherwise:[],
			M_ATTACK:0,
			F_ATTACK:true,
			E_ATTACK:false,
			ANIMATION:[7]
		};
		let tSkill2={NUMBER:1,
			TEXT:"周囲8マスの味方に威力10の回復",
			RANGE:[["square",3]],
			POWER:-10,
			DELAY:0,
			MAGIC:2,
			SUPPORT_Be_Myself:[],
			SUPPORT_Af_Myself:[],
			SUPPORT_Be_Enemy:[],
			SUPPORT_Af_Enemy:[],
			SUPPORT_Otherwise:[],
			M_ATTACK:0,
			F_ATTACK:true,
			E_ATTACK:false,
			ANIMATION:[7]
		};
		let tSkill3={NUMBER:1,
			TEXT:"隣接した4マスに威力2の攻撃",
			RANGE:[["circumference",1]],
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
		};


		return [
			tSkill3,
			tSkill3,
			tSkill,
			tSkill,
			tSkill,
			tSkill,
			{NUMBER:7,
				TEXT:"シャッフルしてもう一度行動",
				RANGE:[],
				POWER:0,
				DELAY:0,
				MAGIC:0,
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
			tSkill2,
			tSkill2,
			tSkill2,
			tSkill2,
			tSkill2,
			tSkill2,
			{NUMBER:14,
				TEXT:"味方全体に威力7の回復 その後シャッフル",
				RANGE:[["enemy"]],
				POWER:-7,
				DELAY:0,
				MAGIC:3,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
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
				},]
	}
}
