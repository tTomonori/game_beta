class Quest(番号) extends Quest{
	constructor(){
		super();
		this.setChoicedCharaData();
		this.setChara();
	}
	static getChoiceCharaNum(){
		return (選択するキャラの数);
	}
	static getText(){
		return "";
	}
	//登場させるキャラを配列に追加
	//{chara:キャラ番号,team:チーム名,position:初期位置,operationNum:操作方法}
	//chra:{charaCategory:,num:}  (charaCategory:"hero"プレイヤーキャラ,"token"トークン,"enemy"的専用キャラ)(num:キャラ番号)
	//team:T or F(Fが敵チーム)
	//position:{x:,y:}
	//operationNum:0ならuser,1以上ならAI番号
	setChara(){
		this.addChara({chara:{charaCategory:"",num:},team:"",position:{x:,y:},operationNum:})
	}
	//ユーザが選択したキャラの配置などの情報セット
	setChoicedCharaData(){
		this.addChoicedCharaData({position:{x:,y:},operationNum:})
	}
	//バトル開始前に呼ぶ
	init(){
		//trueならカードをシャッフルする
		super.init(true);
	}
}
