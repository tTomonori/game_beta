class Goburin extends Enemy{
	static getText(){
		//キャラ説明
		return "単体では強くないが群れで行動する";
	}
	constructor(aX,aY,aTeam,aOperationNum){
		let tData=Goburin.getCharaData();
		super(aX,aY,aTeam,tData,aOperationNum);
		this.data=tData;
	}
	static getCharaData(){
		return {NAME:"ゴブリン",
						HP:40,
						MP:0,
						ATK:18,
						DEF:18,
						SPD:18,
						MOV:2,
						TYPE:"club",
						IMAGE:1001010001,
						DECK:Goburin.getDeck()
		}
	}

	static getDeck(){
		let tSkill={NUMBER:1,
			TEXT:"隣接した4マスに威力3のダメージ",
			RANGE:[["circumference",1]],
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
		};

		return [
			tSkill,
			tSkill,
			tSkill,
			tSkill,
			tSkill,
			tSkill,
			{NUMBER:7,
				TEXT:"シャッフルする",
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
			tSkill,
			tSkill,
			tSkill,
			tSkill,
			tSkill,
			tSkill,
			{NUMBER:14,
				TEXT:"相手全体に威力2のダメージ その後シャッフル",
				RANGE:[["enemy"]],
				POWER:2,
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
				ANIMATION:[5]
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
