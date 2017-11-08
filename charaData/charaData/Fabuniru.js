class Fabuniru extends Chara{
	static getText(){
		//キャラ説明
		return "スキルタイプ：<br>ジョーカーで強力なスキルを発動できるが魔力を多く必要とする";
	}
	constructor(aX,aY,aTeam,aOperationNum){
		let tData=Fabuniru.getCharaData();
		super(aX,aY,aTeam,tData,aOperationNum);
		this.data=tData;
	}
	static getCharaNatureSkill(){
		//特性の説明
		return "MPが最大まで溜まっているならMOV+1";
	}
	static getCharaData(){
		return {NAME:"ファーブニル",
						HP:200,
						MP:20,
						ATK:35,
						DEF:20,
						SPD:20,
						MOV:1,
						TYPE:"spade",
						IMAGE:1011010002,
						DECK:Fabuniru.getDeck()
		}
	}
	static getDeck(){
		let tSkill={NUMBER:501,
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
		};
		return [
			tSkill,
			tSkill,
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
			tSkill,
			tSkill,
			tSkill,
			tSkill,
			tSkill,
			tSkill,
			{NUMBER:514,
				TEXT:"相手全体に威力２０のダメージ その後シャッフル",
				RANGE:[["enemy"]],
				POWER:20,
				DELAY:0,
				MAGIC:20,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[{effect:"revers"},{effect:"shuffle"}],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[23]
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
	startTurn(){
		return new Promise((res,rej)=>{
			super.startTurn().then(()=>{
				if(this.MP==this.maxMP){
					this.MOV++;
					this.natureSkillFlag=true;
				}
				res();
			})
		})
	}
	endTurn(aDelay){
		if(this.natureSkillFlag){
			this.MOV--;
		}
		this.natureSkillFlag=false;
		return super.endTurn(aDelay);
	}
}
