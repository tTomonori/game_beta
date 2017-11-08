class Quest15 extends Quest{
	constructor(){
		super(15);
		this.setChoicedCharaData();
		this.setChara();
		this.renewDownFunction();
	}
	static getNumber(){
		return 15;
	}
	static getChoiceCharaNum(){
		return 3;
	}
	//クエストの説明
	static getText(){
		return "覚醒少女";
	}
	//勝利条件説明
	static getWinCondition(){
		return "覚醒ガーベラを倒す";
	}
	//敗北条件説明
	static getLoseCondition(){
		return "味方の全滅";
	}
	//自軍
	static getMyTeam(){
		return ["選択１","選択２","選択３"];
	}
	//敵軍
	static getEnemyTeam(){
		return ["覚醒ガーベラ"];
	}
	//友軍
	static getFriendTeam(){
		return [""];
	}
	//特殊条件
	static getCondition(){
		return ["ガーベラが常に変身状態でMPが毎ターン回復する","ガーベラの変身効果を持ったカードのスキルを変更"];
	}
	//登場させるキャラを配列に追加
	//{chara:キャラ番号,team:チーム名,position:初期位置,operationNum:操作方法,status:ステータス}
	//chra:{charaCategory:,num:}  (charaCategory:"hero"プレイヤーキャラ,"token"トークン,"enemy"的専用キャラ)(num:キャラ番号)
	//team:T or F(Fが敵チーム)
	//position:{x:,y:}
	//operationNum:0ならuser,1以上ならAI番号
	//status:[[変更するステータス名:変更後の値]]
	setChara(){
		this.addChara({chara:{charaCategory:"hero",num:9},team:"F",position:{x:5,y:3},operationNum:1,status:[["HP",150],["ATK",28],["DEF",25],["SPD",35],["NAME","覚醒ガーベラ"]]})
	}
	//ユーザが選択したキャラの配置などの情報セット
	setChoicedCharaData(){
		this.addChoicedCharaData({position:{x:2,y:1},operationNum:0})
		this.addChoicedCharaData({position:{x:1,y:3},operationNum:0})
		this.addChoicedCharaData({position:{x:2,y:5},operationNum:0})
	}
	//キャラが倒された時に呼ぶ関数更新
	renewDownFunction(){
		//味方
		// this.setAllyDownFunction("one")//一人倒れたら
		this.setAllyDownFunction("all")//全員倒れたら
		// this.setAllyDownFunction((aChara)=>{//その他
		// 	return "win"or"lose"or"";
		// })
		//敵
		// this.setEnemyDownFunction("one")//一人倒れたら
		this.setEnemyDownFunction("all")//全員倒れたら
		// this.setEnemyDownFunction((aChara)=>{//その他
		// 	return "win"or"lose"or"";
		// })
	}
	//バトル開始前に呼ぶ
	init(){
		let tChara=mFalseTeam[0]
		let tStart=tChara.startTurn
		tChara.preStart=tStart
		tChara.startTurn=()=>{
			return new Promise((res,rej)=>{
				if(!tChara.additionalTurnFlag){
					Support([{effect:"mp",value:20}],tChara).then(()=>{
						tChara.preStart().then(()=>{
							res();
						})
					});
				}
				else{
					res();
				}
			})
		}
			tChara.image=tChara.getTransformData(1).IMAGE;
			tChara.deck=tChara.getTransformData(1).DECK;

			tChara.deck[0].SUPPORT_Af_Myself=[{effect:"getTurn"}];
			tChara.deck[13]=			{NUMBER:114,
				TEXT:"相手全体に威力5のダメージ その後シャッフル",
				RANGE:[["enemy"]],
				POWER:5,
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
				ANIMATION:[34]
			}
			//trueならカードをシャッフルする
			super.init(true);

	}
}
