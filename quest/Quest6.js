class Quest6 extends Quest{
	constructor(){
		super(6);
		this.setChoicedCharaData();
		this.setChara();
		this.renewDownFunction();
	}
	static getNumber(){
		return 6;
	}
	static getChoiceCharaNum(){
		return 2;
	}
	//クエストの説明
	static getText(){
		return "洗脳された王女を救出せよ";
	}
	//勝利条件説明
	static getWinCondition(){
		return "呪術師を倒す";
	}
	//敗北条件説明
	static getLoseCondition(){
		return "味方の全滅,王女が倒される";
	}
	//自軍
	static getMyTeam(){
		return ["選択1","選択2"];
	}
	//敵軍
	static getEnemyTeam(){
		return ["呪術師(ザーウィン)","王女(ガーベラ)"];
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
		this.addChara({chara:{charaCategory:"hero",num:9},team:"F",position:{x:5,y:2},operationNum:1,status:[["NAME","王女"],["SPD",15],["HP",30]]})
		this.addChara({chara:{charaCategory:"hero",num:13},team:"F",position:{x:6,y:4},operationNum:1,status:[["NAME","呪術師"],["nowMP",20]]})
	}
	//ユーザが選択したキャラの配置などの情報セット
	setChoicedCharaData(){
		this.addChoicedCharaData({position:{x:1,y:2},operationNum:0})
		this.addChoicedCharaData({position:{x:1,y:4},operationNum:0})
	}
	//キャラが倒された時に呼ぶ関数更新
	renewDownFunction(){
		//味方
		this.setAllyDownFunction("all")//全員倒れたら
		//敵
		this.setEnemyDownFunction((aChara)=>{//その他
			if(aChara.getName()=="王女") return "lose";
			if(aChara.getName()=="呪術師"){
				for(let i=0;i<mFalseTeam.length;i++){
					let tChara=mFalseTeam[i];
					if(tChara.getName()=="王女"){
						if(tChara.HP>0) return "win";
					}
				}
				return ""
			}
		})
	}
	//バトル開始前に呼ぶ
	init(){
		//trueならカードをシャッフルする
		super.init(true);
	}
}
