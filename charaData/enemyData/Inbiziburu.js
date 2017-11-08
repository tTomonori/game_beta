class Inbiziburu extends Enemy{
	getText(){
		//キャラ説明
		return "攻撃力は高くないが,毎ターン2体のゴーストを召喚する";
	}
	constructor(aX,aY,aTeam,aOperationNum){
		let tData=Inbiziburu.getCharaData();
		super(aX,aY,aTeam,tData,aOperationNum);
		this.data=tData;
		//初期MP
		this.MP=20;
	}
	static getCharaData(){
		return {NAME:"インビジブル",
						HP:200,
						MP:50,
						ATK:20,
						DEF:30,
						SPD:15,
						MOV:1,
						TYPE:"spade",
						IMAGE:1452010002,
						DECK:Inbiziburu.getDeck()
		}
	}

	static getDeck(){
		let tSkill={NUMBER:1,
			TEXT:"周囲24マスに威力1のダメージ",
			RANGE:[["square",5]],
			POWER:1,
			DELAY:0,
			MAGIC:1,
			SUPPORT_Be_Myself:[],
			SUPPORT_Af_Myself:[],
			SUPPORT_Be_Enemy:[],
			SUPPORT_Af_Enemy:[],
			SUPPORT_Otherwise:[],
			M_ATTACK:0,
			F_ATTACK:false,
			E_ATTACK:true,
			ANIMATION:[18]
		};
		let tSkill2={NUMBER:1,
			TEXT:"前後のマスにゴーストを召喚",
			RANGE:[["square",5]],
			POWER:2,
			DELAY:0,
			MAGIC:5,
			SUPPORT_Be_Myself:[],
			SUPPORT_Af_Myself:[],
			SUPPORT_Be_Enemy:[],
			SUPPORT_Af_Enemy:[],
			SUPPORT_Otherwise:[{effect:"summon",value:0,position:{x:-1,y:0},operationNum:"player",delay:20},
			{effect:"summon",value:0,position:{x:1,y:0},operationNum:"player",delay:20}],
			M_ATTACK:0,
			F_ATTACK:false,
			E_ATTACK:true,
			ANIMATION:[]
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
				SUPPORT_Otherwise:[{effect:"shuffle"},{effect:"getTurn"}],
				M_ATTACK:0,
				F_ATTACK:false,
				E_ATTACK:true,
				ANIMATION:[]
			},
			tSkill,
			tSkill,
			tSkill,
			tSkill,
			tSkill,
			tSkill,
			{NUMBER:14,
				TEXT:"相手全体に威力3のダメージ その後シャッフル",
				RANGE:[["enemy"]],
				POWER:3,
				DELAY:0,
				MAGIC:5,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[{effect:"revers"},{effect:"shuffle"}],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[18]
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
	getTokenClass(aNum){
		return Inbiziburu.getTokenClass(aNum);
	}
	static getTokenClass(aNum){
		let tTokens=[
			Gosuto
		]
		return tTokens[aNum];
	}
	startTurn(){
		return new Promise((res,rej)=>{
			super.startTurn().then(()=>{
				//上下左右のうちの２マスにゴースト
				if(!this.additionalTurnFlag){
					let tSummon=[{effect:"summon",value:0,position:{},operationNum:"player",delay:20},
												{effect:"summon",value:0,position:{},operationNum:"player",delay:20}];
					let tPosition=[{x:0,y:1},{x:1,y:0},{x:-1,y:0},{x:0,y:-1}];
					for(let i=0;i<2;i++){
						let tSummonPosition=tPosition.splice(makeRandom(3-i),1)[0];
						tSummon[i].position=tSummonPosition;
					}
					Support(tSummon,this).then(()=>{
						res();
					})
				}
				else {
					res();
				}
			})
		})
	}
}
