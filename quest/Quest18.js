class Quest18 extends Quest{
	constructor(){
		super(18);
		this.setChoicedCharaData();
		this.setChara();
		this.renewDownFunction();
	}
	static getNumber(){
		return 18;
	}
	static getChoiceCharaNum(){
		return 2;
	}
	//クエストの説明
	static getText(){
		return "ドラゴン討伐隊";
	}
	//勝利条件説明
	static getWinCondition(){
		return "ドラゴンを討伐";
	}
	//敗北条件説明
	static getLoseCondition(){
		return "味方の全滅";
	}
	//自軍
	static getMyTeam(){
		return ["選択１","選択２"];
	}
	//敵軍
	static getEnemyTeam(){
		return ["ドラゴン"];
	}
	//友軍
	static getFriendTeam(){
		return [""];
	}
	//特殊条件
	static getCondition(){
		return ["味方のMPが10の状態で開始する"];
	}
	//登場させるキャラを配列に追加
	//{chara:キャラ番号,team:チーム名,position:初期位置,operationNum:操作方法,status:ステータス}
	//chra:{charaCategory:,num:}  (charaCategory:"hero"プレイヤーキャラ,"token"トークン,"enemy"的専用キャラ)(num:キャラ番号)
	//team:T or F(Fが敵チーム)
	//position:{x:,y:}
	//operationNum:0ならuser,1以上ならAI番号
	//status:[[変更するステータス名:変更後の値]]
	setChara(){
		this.addChara({chara:{charaCategory:"hero",num:4},team:"F",position:{x:5,y:3},operationNum:1,status:[["HP",300],["NAME","ドラゴン"],["ATK",50]]})
	}
	//ユーザが選択したキャラの配置などの情報セット
	setChoicedCharaData(){
		this.addChoicedCharaData({position:{x:2,y:2},operationNum:0,status:[["nowMP",10]]})
		this.addChoicedCharaData({position:{x:2,y:4},operationNum:0,status:[["nowMP",10]]})
	}
	//キャラが倒された時に呼ぶ関数更新
	renewDownFunction(){
		//味方
		// this.setAllyDownFunction("one")//一人倒れたら
		this.setAllyDownFunction("all")//全員倒れたら
		// this.setAllyDownFunction((aChara)=>{//その他
			// return "win"or"lose"or"";
		// })
		//敵
		// this.setEnemyDownFunction("one")//一人倒れたら
		this.setEnemyDownFunction("all")//全員倒れたら
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
