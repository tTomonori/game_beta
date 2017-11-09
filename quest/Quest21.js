class Quest21 extends Quest{
	constructor(){
		super(21);
		this.setChoicedCharaData();
		this.setChara();
		this.renewDownFunction();
	}
	static getNumber(){
		return 21;
	}
	static getChoiceCharaNum(){
		return 3;
	}
	//クエストの説明
	static getText(){
		return "疾風の獣";
	}
	//勝利条件説明
	static getWinCondition(){
		return "ガルムを倒す";
	}
	//敗北条件説明
	static getLoseCondition(){
		return "味方の全滅";
	}
	//自軍
	static getMyTeam(){
		return ["選択1","選択2","選択3"];
	}
	//敵軍
	static getEnemyTeam(){
		return ["ガルム","シルフェ","ユニコーン"];
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
		this.addChara({chara:{charaCategory:"hero",num:18},team:"F",position:{x:5,y:3},operationNum:1,status:[["HP",120],["SPD",40]]})
		this.addChara({chara:{charaCategory:"hero",num:3},team:"F",position:{x:7,y:1},operationNum:1,status:[["HP",50]]})
		this.addChara({chara:{charaCategory:"enemy",num:4},team:"F",position:{x:7,y:5},operationNum:1,status:[]})
	}
	//ユーザが選択したキャラの配置などの情報セット
	setChoicedCharaData(){
		this.addChoicedCharaData({position:{x:1,y:1},operationNum:0})
		this.addChoicedCharaData({position:{x:1,y:3},operationNum:0})
		this.addChoicedCharaData({position:{x:1,y:5},operationNum:0})
	}
	//キャラが倒された時に呼ぶ関数更新
	renewDownFunction(){
		//味方
		this.setAllyDownFunction("all")//全員倒れたら
		//敵
		this.setEnemyDownFunction((aChara)=>{//その他
			if(aChara.getName()=="ガルム")return "win";
			else return "";
		})
	}
	//バトル開始前に呼ぶ
	init(){
		//trueならカードをシャッフルする
		super.init(true);
	}
}
