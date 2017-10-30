class Quest1 extends Quest{
	constructor(){
		super(1);
		this.setChoicedCharaData();
		this.setChara();
		this.renewDownFunction();
	}
	static getChoiceCharaNum(){
		return 2;
	}
	//クエストの説明
	static getText(){
		return "ヴァルキリーを倒せ";
	}
	//勝利条件説明
	static getWinCondition(){
		return "ヴァルキリーを倒す";
	}
	//敗北条件説明
	static getLoseCondition(){
		return "味方一人が倒される";
	}
	//自軍
	static getMyTeam(){
		return ["選択1","選択2"];
	}
	//敵軍
	static getEnemyTeam(){
		return ["ヴァルキリー"];
	}
	//友軍
	static getFriendTeam(){
		return ["なし"];
	}
	//登場させるキャラを配列に追加
	//{chara:キャラ番号,team:チーム名,position:初期位置,operationNum:操作方法}
	//chra:{charaCategory:,num:}  (charaCategory:"hero"プレイヤーキャラ,"token"トークン,"enemy"的専用キャラ)(num:キャラ番号)
	//team:T or F(Fが敵チーム)
	//position:{x:,y:}
	//operationNum:0ならuser,1以上ならAI番号
	setChara(){
		this.addChara({chara:{charaCategory:"hero",num:0},team:"F",position:{x:4,y:3},operationNum:1})
	}
	//ユーザが選択したキャラの配置などの情報セット
	setChoicedCharaData(){
		this.addChoicedCharaData({position:{x:2,y:2},operationNum:0})
		this.addChoicedCharaData({position:{x:2,y:4},operationNum:0})
	}
	//キャラが倒された時に呼ぶ関数更新
	renewDownFunction(){
		//味方
		this.setAllyDownFunction("one")//一人倒れたら
		//敵
		this.setEnemyDownFunction("one")//一人倒れたら
	}
	//バトル開始前に呼ぶ
	init(){
		//trueならカードをシャッフルする
		super.init(true);
	}
}