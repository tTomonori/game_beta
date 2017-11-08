class Quest12 extends Quest{
	constructor(){
		super(12);
		this.setChoicedCharaData();
		this.setChara();
		this.renewDownFunction();
	}
	static getNumber(){
		return 12;
	}
	static getChoiceCharaNum(){
		return 1;
	}
	//クエストの説明
	static getText(){
		return "力比べ:オオクニヌシ";
	}
	//勝利条件説明
	static getWinCondition(){
		return "オオクニヌシを倒す";
	}
	//敗北条件説明
	static getLoseCondition(){
		return "味方一人が倒される";
	}
	//自軍
	static getMyTeam(){
		return ["選択1"];
	}
	//敵軍
	static getEnemyTeam(){
		return ["オオクニヌシ"];
	}
	//友軍
	static getFriendTeam(){
		return ["なし"];
	}
	//特殊条件
	static getCondition(){
		return ["なし"];
	}
	//登場させるキャラを配列に追加
	//{chara:キャラ番号,team:チーム名,position:初期位置,operationNum:操作方法,status:ステータス}
	//chra:{charaCategory:,num:}  (charaCategory:"hero"プレイヤーキャラ,"token"トークン,"enemy"的専用キャラ)(num:キャラ番号)
	//team:T or F(Fが敵チーム)
	//position:{x:,y:}
	//operationNum:0ならuser,1以上ならAI番号
	//status:[[変更するステータス名:変更後の値]]
	setChara(){
		this.addChara({chara:{charaCategory:"hero",num:2},team:"F",position:{x:6,y:3},operationNum:1,status:[]})
	}
	//ユーザが選択したキャラの配置などの情報セット
	setChoicedCharaData(){
		this.addChoicedCharaData({position:{x:1,y:3},operationNum:0})
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
