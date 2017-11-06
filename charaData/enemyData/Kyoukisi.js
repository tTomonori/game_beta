class Kyoukisi extends Enemy{
	getText(){
		//キャラ説明
		return "移動力はないが近づいた相手に強力な攻撃を行う";
	}
	constructor(aX,aY,aTeam,aOperationNum){
		let tData=Kyoukisi.getCharaData();
		super(aX,aY,aTeam,tData,aOperationNum);
		this.data=tData;
	}
	static getCharaData(){
		return {NAME:"狂騎士",
						HP:200,
						MP:0,
						ATK:50,
						DEF:35,
						SPD:10,
						MOV:1,
						TYPE:"spade",
						IMAGE:1084010003,
						DECK:Kyoukisi.getDeck()
		}
	}

	static getDeck(){
		let tSkill={NUMBER:1,
			TEXT:"隣接した4マスに威力10のダメージ",
			RANGE:[["circumference",1]],
			POWER:10,
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
			ANIMATION:[4,3]
		};

		return [
			tSkill,
			tSkill,
			tSkill,
			tSkill,
			tSkill,
			tSkill,
			tSkill,
			tSkill,
			tSkill,
			tSkill,
			tSkill,
			tSkill,
			tSkill,
			tSkill,
			tSkill,]
	}
}
