class Zawin extends Chara{
	static getText(){
		//キャラ説明
		return "サモンタイプ：<br>死者や魔王を召喚して戦わせる";
	}
	constructor(aX,aY,aTeam,aOperationNum){
		let tData=Zawin.getCharaData();
		super(aX,aY,aTeam,tData,aOperationNum);
		this.data=tData;
	}
	static getCharaData(){
		return {NAME:"ザーウィン",
						HP:90,
						MP:20,
						ATK:18,
						DEF:20,
						SPD:23,
						MOV:2,
						TYPE:"diamond",
						IMAGE:1220010001,
						DECK:Zawin.getDeck()
		}
	}
	static getDeck(){
		return [
			{NUMBER:1401,
				TEXT:"上下2マスにゴーストを召喚する（消費MP3）",
				RANGE:[],
				POWER:0,
				DELAY:0,
				MAGIC:3,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[{effect:"summon",value:1,position:{x:0,y:-1},operationNum:"player",delay:0},{effect:"summon",value:1,position:{x:0,y:1},operationNum:"player",delay:0}],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[]
			},
			{NUMBER:1402,
				TEXT:"正面のマスにゴーストを召喚する（消費MP1）",
				RANGE:[],
				POWER:0,
				DELAY:0,
				MAGIC:1,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[{effect:"summon",value:1,position:{x:1,y:0},operationNum:"player",delay:0}],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[]
			},
			{NUMBER:1403,
				TEXT:"正面のマスにゴーストを召喚する（消費MP1）",
				RANGE:[],
				POWER:0,
				DELAY:0,
				MAGIC:1,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[{effect:"summon",value:1,position:{x:1,y:0},operationNum:"player",delay:0}],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[]
			},
			{NUMBER:1404,
				TEXT:"隣のマスに威力4のダメージ",
				RANGE:[["distance",1]],
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
				ANIMATION:[4]
			},
			{NUMBER:1405,
				TEXT:"周囲８マスに威力3のダメージ",
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
			{NUMBER:1406,
				TEXT:"十字に威力3ダメージ",
				RANGE:[["vertical",1],["horizontal",1]],
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
			{NUMBER:1408,
				TEXT:"相手全体に威力1のダメージ（DELAY　5）",
				RANGE:[["enemy"]],
				POWER:1,
				DELAY:5,
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
			{NUMBER:1409,
				TEXT:"周囲24マスに威力2のダメージ（DELAY　10）",
				RANGE:[["square",5]],
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
				ANIMATION:[0]
			},
			{NUMBER:1410,
				TEXT:"周囲24マスに威力2のダメージ（DELAY　10）",
				RANGE:[["square",5]],
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
				ANIMATION:[0]
			},
			{NUMBER:1411,
				TEXT:"正面のマスにゾンビを召喚する（消費MP2）",
				RANGE:[],
				POWER:0,
				DELAY:0,
				MAGIC:2,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[{effect:"summon",value:0,position:{x:1,y:0},operationNum:"player",delay:30}],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[]
			},
			{NUMBER:1412,
				TEXT:"正面のマスにゾンビを召喚する（消費MP2）",
				RANGE:[],
				POWER:0,
				DELAY:0,
				MAGIC:2,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[{effect:"summon",value:0,position:{x:1,y:0},operationNum:"player",delay:30}],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[]
			},
			{NUMBER:1413,
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
			{NUMBER:1414,
				TEXT:"正面のマスにサタンを召喚する その後シャッフル（消費MP3）",
				RANGE:[],
				POWER:0,
				DELAY:0,
				MAGIC:3,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[{effect:"summon",value:2,position:{x:1,y:0},operationNum:"player",delay:20}],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[{effect:"revers"},{effect:"shuffle"}],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[0]
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
		return Zawin.getTokenClass(aNum);
	}
	static getTokenClass(aNum){
		let tTokens=[
			Zonbi,
			Gosuto,
			Satan
		]
		return tTokens[aNum];
	}
}
