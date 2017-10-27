class Quest1 extends Quest{
	constructor(){
		super();
		this.setChoicedCharaData();
		this.setChara();
	}
	static getChoiceCharaNum(){
		return 2;
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
	//バトル開始前に呼ぶ
	init(){
		//trueならカードをシャッフルする
		super.init(true);
	}
}
