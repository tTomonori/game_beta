class QuestDebug extends Quest{
	constructor(){
		super("Debug");
		this.setChoicedCharaData();
		this.setChara();
		this.renewDownFunction();
	}
	static getNumber(){
		return "Debug";
	}
	static getChoiceCharaNum(){
		return 1;
	}
	//クエストの説明
	static getText(){
		return "運に身を任せ";
	}
	//勝利条件説明
	static getWinCondition(){
		return "敵１人倒す";
	}
	//敗北条件説明
	static getLoseCondition(){
		return "味方１人がやられる";
	}
	//自軍
	static getMyTeam(){
		return ["選択1"];
	}
	//敵軍
	static getEnemyTeam(){
		return ["ランダム１","ランダム２"];
	}
	//友軍
	static getFriendTeam(){
		return ["ランダム1"];
	}
	//特殊条件
	static getCondition(){
		return ["自軍AIによる自動操作","観戦クエスト"];
	}
	//登場させるキャラを配列に追加
	//{chara:キャラ番号,team:チーム名,position:初期位置,operationNum:操作方法,status:ステータス}
	//chra:{charaCategory:,num:}  (charaCategory:"hero"プレイヤーキャラ,"token"トークン,"enemy"的専用キャラ)(num:キャラ番号)
	//team:T or F(Fが敵チーム)
	//position:{x:,y:}
	//operationNum:0ならuser,1以上ならAI番号
	//status:[[変更するステータス名:変更後の値]]
	setChara(){
		this.addChara({chara:{charaCategory:"hero",num:Math.floor(Math.random()*CharaList.classList.length)},team:"F",position:{x:6,y:2},operationNum:1,status:[]})
		this.addChara({chara:{charaCategory:"hero",num:Math.floor(Math.random()*CharaList.classList.length)},team:"F",position:{x:6,y:4},operationNum:1,status:[]})
		this.addChara({chara:{charaCategory:"hero",num:Math.floor(Math.random()*CharaList.classList.length)},team:"friend",position:{x:1,y:4},operationNum:1,status:[]})
	}
	//ユーザが選択したキャラの配置などの情報セット
	setChoicedCharaData(){
		this.addChoicedCharaData({position:{x:1,y:2},operationNum:1})
	}
	//キャラが倒された時に呼ぶ関数更新
	renewDownFunction(){
		//味方
		this.setAllyDownFunction("one")//一人倒れたら
		// this.setAllyDownFunction("all")//全員倒れたら
		// this.setAllyDownFunction((aChara)=>{//その他
			// return "win"or"lose"or"";
		// })
		//敵
		this.setEnemyDownFunction("one")//一人倒れたら
		// this.setEnemyDownFunction("all")//全員倒れたら
		// this.setEnemyDownFunction((aChara)=>{//その他
			// return "win"or"lose"or"";
		// })
	}
	//バトル開始前に呼ぶ
	init(){
		//trueならカードをシャッフルする
		super.init(true);
	}
}
