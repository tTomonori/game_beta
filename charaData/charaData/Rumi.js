class Rumi extends Chara{
	static getText(){
		//キャラ説明
		return "トリックタイプ：<br>カードの効果を変更するスキルを得意とする";
	}
	constructor(aX,aY,aTeam,aOperationNum){
		let tData=Rumi.getCharaData();
		super(aX,aY,aTeam,tData,aOperationNum);
		this.data=tData;
	}
	static getCharaNatureSkill(){
		//特性の説明
		return "なし";
	}
	static getCharaData(){
		return {NAME:"ルーミィ",
						HP:90,
						MP:15,
						ATK:20,
						DEF:22,
						SPD:25,
						MOV:2,
						TYPE:"heart",
						IMAGE:1448010001,
						DECK:Rumi.getDeck()
		}
	}
	getActorUrl(){
		return '../image/chara/3_sv_actors/'+String(this.image+301)+'.png';
	}
	static getDeck(){
		return [
			{NUMBER:101,
				TEXT:"周囲8マスに威力3のダメージ,周囲9マスをランダムな味方のタイプと同じマークに変更する(味方がいないなら自分と同じタイプにする)",
				RANGE:[["square",3]],
				POWER:3,
				DELAY:0,
				MAGIC:2,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[{effect:"changeCardType",value:"ally",range:[["square",3],["my"]]}],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[6]
			},
			{NUMBER:102,
				TEXT:"横1列に威力3のダメージ,横1列をランダムな味方のタイプと同じマークに変更する(味方がいないなら自分と同じタイプにする)",
				RANGE:[["horizontal",1]],
				POWER:3,
				DELAY:0,
				MAGIC:2,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[{effect:"changeCardType",value:"ally",range:[["horizontal",1],["my"]]}],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[6]
			},
			{NUMBER:103,
				TEXT:"縦1列に威力3のダメージ,縦1列をランダムな味方のタイプと同じマークに変更する(味方がいないなら自分と同じタイプにする)",
				RANGE:[["vertical",1]],
				POWER:3,
				DELAY:0,
				MAGIC:2,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[{effect:"changeCardType",value:"ally",range:[["vertical",1],["my"]]}],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[6]
			},
			{NUMBER:104,
				TEXT:"2マス隣に威力4のダメージ",
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
				ANIMATION:[6]
			},
			{NUMBER:105,
				TEXT:"3マス隣に威力4のダメージ",
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
				ANIMATION:[6]
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
				ANIMATION:[6]
			},
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
			{NUMBER:108,
				TEXT:"相手全体に威力２のダメージ",
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
				TEXT:"味方に威力2の回復",
				RANGE:[["ally"]],
				POWER:-2,
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
			},
			{NUMBER:110,
				TEXT:"味方に威力３の回復",
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
			{NUMBER:111,
				TEXT:"このマスをパンプキンカード(味方が止まったなら[相手全体に威力3のダメージ],相手が止まったら[何も起きない])に変える",
				RANGE:[],
				POWER:0,
				DELAY:0,
				MAGIC:2,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[{effect:"changeCardSkill",range:[["my"]],
														img:"pipo-enemy44set/120x120/pipo-enemy038.png",
														style:[["top","-3px"]],
														skill:(aSelf,aChara)=>{
															let tMyTeamName=aSelf.getTeam();
															if(aChara.getTeam()==tMyTeamName){
																//味方が止まったとき
																return 	{NUMBER:115,
																				TEXT:"相手全体に威力3のダメージ",
																				RANGE:[["enemy"]],
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
																				ANIMATION:[6]
																			}
															}
															else{
																//敵が止まったとき
																return 	{NUMBER:115,
																				TEXT:"何も起きない",
																				RANGE:[],
																				POWER:0,
																				DELAY:0,
																				MAGIC:0,
																				SUPPORT_Be_Myself:[],
																				SUPPORT_Af_Myself:[],
																				SUPPORT_Be_Enemy:[],
																				SUPPORT_Af_Enemy:[],
																				SUPPORT_Otherwise:[],
																				M_ATTACK:0,
																				F_ATTACK:false,
																		    E_ATTACK:false,
																				ANIMATION:[]
																			}
															}
														}}],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[]
			},
			{NUMBER:112,
				TEXT:"このマスをスケルトンカード(味方が止まったなら[ATK+2,DEF+2],相手が止まったら[ATK-2,DEF-2])に変える",
				RANGE:[],
				POWER:0,
				DELAY:0,
				MAGIC:1,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[{effect:"changeCardSkill",range:[["my"]],
														img:"pipo-enemy44set/120x120/pipo-enemy039.png",
														style:[["top","-10px"],["left","-2px"]],
														skill:(aSelf,aChara)=>{
															let tMyTeamName=aSelf.getTeam();
															if(aChara.getTeam()==tMyTeamName){
																//味方が止まったとき
																return 	{NUMBER:116,
																				TEXT:"自分のATKとDEFを2上げる",
																				RANGE:[],
																				POWER:0,
																				DELAY:0,
																				MAGIC:0,
																				SUPPORT_Be_Myself:[],
																				SUPPORT_Af_Myself:[{effect:"atk",value:2},{effect:"def",value:2}],
																				SUPPORT_Be_Enemy:[],
																				SUPPORT_Af_Enemy:[],
																				SUPPORT_Otherwise:[],
																				M_ATTACK:0,
																				F_ATTACK:false,
																		    E_ATTACK:false,
																				ANIMATION:[0]
																			}
															}
															else{
																//敵が止まったとき
																return 	{NUMBER:116,
																				TEXT:"自分のATKとDEFを2下げる",
																				RANGE:[],
																				POWER:0,
																				DELAY:0,
																				MAGIC:0,
																				SUPPORT_Be_Myself:[],
																				SUPPORT_Af_Myself:[{effect:"atk",value:-2},{effect:"def",value:-2}],
																				SUPPORT_Be_Enemy:[],
																				SUPPORT_Af_Enemy:[],
																				SUPPORT_Otherwise:[],
																				M_ATTACK:0,
																				F_ATTACK:false,
																		    E_ATTACK:false,
																				ANIMATION:[]
																			}
															}
														}}],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[]
			},
			{NUMBER:113,
				TEXT:"このマスをバットカード(味方が止まったなら[相手全体に威力1のダメージ,自分のdelayを70下げる],相手が止まったら[自分のdelyを30上げる])に変える",
				RANGE:[],
				POWER:0,
				DELAY:0,
				MAGIC:1,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[{effect:"changeCardSkill",range:[["my"]],
														img:"pipo-enemy44set/120x120/pipo-enemy040b.png",
														style:[["top","-5px"],["left","-2px"]],
														skill:(aSelf,aChara)=>{
															let tMyTeamName=aSelf.getTeam();
															if(aChara.getTeam()==tMyTeamName){
																//味方が止まったとき
																return 	{NUMBER:117,
																				TEXT:"相手全体に威力1のダメージ,自分のdelayを70下げる",
																				RANGE:[["enemy"]],
																				POWER:1,
																				DELAY:0,
																				MAGIC:0,
																				SUPPORT_Be_Myself:[],
																				SUPPORT_Af_Myself:[{effect:"delay",value:-70}],
																				SUPPORT_Be_Enemy:[],
																				SUPPORT_Af_Enemy:[],
																				SUPPORT_Otherwise:[],
																				M_ATTACK:0,
																				F_ATTACK:false,
																		    E_ATTACK:true,
																				ANIMATION:[0]
																			}
															}
															else{
																//敵が止まったとき
																return 	{NUMBER:117,
																				TEXT:"自分のdelayを30上げる",
																				RANGE:[],
																				POWER:0,
																				DELAY:0,
																				MAGIC:0,
																				SUPPORT_Be_Myself:[],
																				SUPPORT_Af_Myself:[{effect:"delay",value:30}],
																				SUPPORT_Be_Enemy:[],
																				SUPPORT_Af_Enemy:[],
																				SUPPORT_Otherwise:[],
																				M_ATTACK:0,
																				F_ATTACK:false,
																		    E_ATTACK:false,
																				ANIMATION:[]
																			}
															}
														}}],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[]
			},
			{NUMBER:114,
				TEXT:"自分が生成したパンプキン,スケルトン,バットカードをバンパイヤカード"+
				"(味方が止まったなら[jokerスキルが発動する],相手が止まったら[何も起きない])に変える　その後シャッフル",
				RANGE:[],
				POWER:0,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[{effect:"changeCardSkill",range:[["function",(aCard,aSelf)=>{
					if(aCard.getNumber()!="special") return false;
					if(aCard.getOrner()!=aSelf) return false;
					return true;
				}]],
														img:"pipo-enemy44set/120x120/pipo-boss001.png",
														style:[["top","4px"],["left","-16px"],["width","79px"],["height","35px"]],
														skill:(aSelf,aChara)=>{
															let tMyTeamName=aSelf.getTeam();
															if(aChara.getTeam()==tMyTeamName){
																//味方が止まったとき
																return 	aChara.getSkill(14);
															}
															else{
																//敵が止まったとき
																return 	{NUMBER:115,
																				TEXT:"何も起きない",
																				RANGE:[],
																				POWER:0,
																				DELAY:0,
																				MAGIC:0,
																				SUPPORT_Be_Myself:[],
																				SUPPORT_Af_Myself:[],
																				SUPPORT_Be_Enemy:[],
																				SUPPORT_Af_Enemy:[],
																				SUPPORT_Otherwise:[],
																				M_ATTACK:0,
																				F_ATTACK:false,
																		    E_ATTACK:false,
																				ANIMATION:[]
																			}
															}
														}},{effect:"revers"},{effect:"shuffle"}],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[]
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
