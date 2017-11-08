class Quest7 extends Quest{
	constructor(){
		super(7);
		this.setChoicedCharaData();
		this.setChara();
		this.renewDownFunction();
	}
	static getNumber(){
		return 7;
	}
	static getChoiceCharaNum(){
		return 1;
	}
	//クエストの説明
	static getText(){
		return "王国のスパイ";
	}
	//勝利条件説明
	static getWinCondition(){
		return "悪の組織幹部(味方)を倒す";
	}
	//敗北条件説明
	static getLoseCondition(){
		return "女王が倒される";
	}
	//自軍
	static getMyTeam(){
		return ["王国のスパイ(選択1)"];
	}
	//敵軍
	static getEnemyTeam(){
		return ["女王(フレイヤ)"];
	}
	//友軍
	static getFriendTeam(){
		return ["悪の組織幹部(ゼロ)"];
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
		this.addChara({chara:{charaCategory:"hero",num:6},team:"friend",position:{x:1,y:2},operationNum:1,status:[["NAME","悪の組織幹部"],["HP",60]]})
		this.addChara({chara:{charaCategory:"hero",num:11},team:"F",position:{x:6,y:3},operationNum:1,status:[["NAME","女王"],["ATK",1]]})
	}
	//ユーザが選択したキャラの配置などの情報セット
	setChoicedCharaData(){
		this.addChoicedCharaData({position:{x:1,y:4},operationNum:0,status:[["NAME","王国のスパイ"],["MOV",3]]})
	}
	//キャラが倒された時に呼ぶ関数更新
	renewDownFunction(){
		//味方
		this.setAllyDownFunction((aChara)=>{//その他
			if(aChara.getName()=="悪の組織幹部") return "win";
			else return "lose";
			// return "win"or"lose"or"";
		})
		//敵
		this.setEnemyDownFunction("one")//一人倒れたら
	}
	//バトル開始前に呼ぶ
	init(){
		//trueならカードをシャッフルする
		super.init(true);
	}
}
