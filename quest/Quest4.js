class Quest4 extends Quest{
	constructor(){
		super(4);
		this.setChoicedCharaData();
		this.setChara();
		this.renewDownFunction();
	}
	static getNumber(){
		return 4;
	}
	static getChoiceCharaNum(){
		return 0;
	}
	//クエストの説明
	static getText(){
		return "狙われた妖精を守り抜け";
	}
	//勝利条件説明
	static getWinCondition(){
		return "敵の全滅";
	}
	//敗北条件説明
	static getLoseCondition(){
		return "妖精が倒される";
	}
	//自軍
	static getMyTeam(){
		return ["ヴァルキリー","ランスロット"];
	}
	//敵軍
	static getEnemyTeam(){
		return ["ハンター(グレン)x2"];
	}
	//友軍
	static getFriendTeam(){
		return ["妖精(ロゼッタ)"];
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
		this.addChara({chara:{charaCategory:"hero",num:0},team:"T",position:{x:2,y:2},operationNum:0,status:[]})
		this.addChara({chara:{charaCategory:"hero",num:1},team:"T",position:{x:2,y:4},operationNum:0,status:[]})
		this.addChara({chara:{charaCategory:"hero",num:8},team:"friend",position:{x:0,y:3},operationNum:1,status:[["NAME","妖精"],["HP",60],["MP",0],["MOV",1],["SPD",3]]})
		this.addChara({chara:{charaCategory:"hero",num:10},team:"F",position:{x:6,y:2},operationNum:1,status:[["NAME","ハンター"],["ATK",20],["DEF",10],["SPD",20]]})
		this.addChara({chara:{charaCategory:"hero",num:10},team:"F",position:{x:6,y:4},operationNum:1,status:[["NAME","ハンター"],["ATK",20],["DEF",10],["SPD",20]]})
	}
	//ユーザが選択したキャラの配置などの情報セット
	setChoicedCharaData(){
		// this.addChoicedCharaData({position:{x:,y:},operationNum:})
	}
	//キャラが倒された時に呼ぶ関数更新
	renewDownFunction(){
		//味方
		this.setAllyDownFunction((aChara)=>{//その他
			if(aChara.getName()=="妖精"){
				return "lose";
			}
			else{
				return "";
			}
		})
		//敵
		this.setEnemyDownFunction("all")//全員倒れたら
	}
	//バトル開始前に呼ぶ
	init(){
		//trueならカードをシャッフルする
		super.init(true);
	}
}
