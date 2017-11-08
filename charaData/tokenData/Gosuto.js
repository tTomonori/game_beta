class Gosuto extends Token{
	static getText(){
		//キャラ説明
		return "トークン：<br>ザーウィンのスキルによって召喚される";
	}
	constructor(aX,aY,aTeam,aOperationNum,aDelay){
		let tData=Gosuto.getCharaData();
		super(aX,aY,aTeam,tData,aOperationNum,aDelay);
		this.data=tData;
	}
	static getCharaData(){
		return {NAME:"ゴースト",
						HP:5,
						MP:0,
						ATK:19,
						DEF:15,
						SPD:25,
						MOV:3,
						TYPE:"diamond",
						IMAGE:1374010001,
						DECK:Gosuto.getDeck()
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
				TEXT:"シャッフルする(ターン獲得しない)",
				RANGE:[],
				POWER:0,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
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
