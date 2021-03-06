class Hirudo extends Chara{
	static getText(){
		//キャラ説明
		return "エンハンスタイプ：<br>衣装を強化（最大５段階）すると、ATKとDEFが4上がるが、速さが2下がる。攻撃されると元に戻る";
	}
	constructor(aX,aY,aTeam,aOperationNum){
		let tData=Hirudo.getCharaData();
		super(aX,aY,aTeam,tData,aOperationNum);
		this.data=tData;
	}
	static getCharaNatureSkill(){
		//特性の説明
		return "なし";
	}
	static getCharaData(){
		return {NAME:"ヒルド",
						HP:105,
						MP:5,
						ATK:20,
						DEF:20,
						SPD:30,
						MOV:2,
						TYPE:"spade",
						IMAGE:1058010001,
						DECK:Hirudo.getDeck(),
						CHANGECLOTH:0
		}
	}
	static getDeck(){
		return [
			{NUMBER:101,
				TEXT:"隣のマスに威力４のダメージ　衣装を強化",
				RANGE:[["distance",1]],
				POWER:4,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[{effect:"Retrofits"}],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[4]
			},
			{NUMBER:102,
				TEXT:"２マス隣に威力３のダメージ　衣装を強化",
				RANGE:[["distance",2]],
				POWER:3,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[{effect:"Retrofits"}],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[0]
			},
			{NUMBER:103,
				TEXT:"３マス隣に威力３のダメージ　衣装を強化",
				RANGE:[["distance",3]],
				POWER:3,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[{effect:"Retrofits"}],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[0]
			},
			{NUMBER:104,
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
			{NUMBER:105,
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
				ANIMATION:[0]
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
				ANIMATION:[0]
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
			{NUMBER:110,
				TEXT:"隣のマスに敵味方無視の威力７のダメージ",
				RANGE:[["distance",1]],
				POWER:7,
				DELAY:5,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:true,
		    E_ATTACK:true,
				ANIMATION:[4,3]
			},
			{NUMBER:111,
				TEXT:"衣装を強化しDelayを５０下げる",
				RANGE:[],
				POWER:0,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[{effect:"Retrofits"},{effect:"delay",value:-50}],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[3]
			},
			{NUMBER:112,
				TEXT:"自分に威力５の回復",
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
			{NUMBER:114,
				TEXT:"衣装を２段階強化してDelayを50下げる その後シャッフル",
				RANGE:[],
				POWER:0,
				DELAY:0,
				MAGIC:0,
				SUPPORT_Be_Myself:[],
				SUPPORT_Af_Myself:[{effect:"Retrofits"},{effect:"Retrofits"},{effect:"delay",value:-50}],
				SUPPORT_Be_Enemy:[],
				SUPPORT_Af_Enemy:[],
				SUPPORT_Otherwise:[{effect:"revers"},{effect:"shuffle"}],
				M_ATTACK:0,
				F_ATTACK:false,
		    E_ATTACK:true,
				ANIMATION:[34]
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
	addDamage(aDamage){
		return new Promise((res,rej)=>{
			super.addDamage(aDamage).then(()=>{
				if (aDamage<0) res();
				else{
					attackAnimate(this,this,[10],()=>{
						this.changeClothes("down");
					res()})
				}
			})
		})
	}
	changeClothes(tChange){
		if(tChange=="down"){
			if(this.data.CHANGECLOTH>0){
				this.data.CHANGECLOTH--;
				this.plusStatus("ATK",-4);
				this.plusStatus("DEF",-4);
				this.plusStatus("SPD",2);
				addLog((this.data.CHANGECLOTH+1)+"段階の衣装に弱化");
			}
			else addLog("これ以上変化しない")
		}
		else if(tChange=="up"){
			if(this.data.CHANGECLOTH<5){
				this.data.CHANGECLOTH++;
				this.plusStatus("ATK",4);
				this.plusStatus("DEF",4);
				this.plusStatus("SPD",-2);
				addLog((this.data.CHANGECLOTH+1)+"段階の衣装に強化");
			}
			else addLog("これ以上変化しない")
		}
		this.img.src=this.getActorUrl();
	}
	getActorUrl(){
		return '../image/chara/3_sv_actors/'+String(this.image+300+(10000-10000*Math.floor(this.data.CHANGECLOTH/3))+(this.data.CHANGECLOTH%3))+'.png';
	}

}
