class Quest22 extends Quest{
	constructor(){
		super(22);
		this.setChoicedCharaData();
		this.setChara();
		this.renewDownFunction();
	}
	static getNumber(){
		return 22;
	}
	static getChoiceCharaNum(){
		return 0;
	}
	//クエストの説明
	static getText(){
		return "寂しがりのザーウィン";
	}
	//勝利条件説明
	static getWinCondition(){
		return "トークンを5対以上召喚している状態にする";
	}
	//敗北条件説明
	static getLoseCondition(){
		return "ザーウィンが倒される";
	}
	//自軍
	static getMyTeam(){
		return ["ザーウィン"];
	}
	//敵軍
	static getEnemyTeam(){
		return ["ゴブリン","リザード","ユニコーン"];
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
		this.addChara({chara:{charaCategory:"hero",num:13},team:"T",position:{x:1,y:3},operationNum:0,status:[]})
		this.addChara({chara:{charaCategory:"enemy",num:6},team:"F",position:{x:5,y:1},operationNum:1,status:[["HP",120]]})
		this.addChara({chara:{charaCategory:"enemy",num:4},team:"F",position:{x:6,y:3},operationNum:1,status:[["HP",120]]})
		this.addChara({chara:{charaCategory:"enemy",num:1},team:"F",position:{x:5,y:5},operationNum:1,status:[["HP",120]]})
	}
	//ユーザが選択したキャラの配置などの情報セット
	setChoicedCharaData(){
		// this.addChoicedCharaData({position:{x:,y:},operationNum:})
	}
	//キャラが倒された時に呼ぶ関数更新
	renewDownFunction(){
		//味方
		this.setAllyDownFunction("one")//一人倒れたら
		//敵
		this.setEnemyDownFunction((aChara)=>{//その他
			return "";
		})
	}
	//バトル開始前に呼ぶ
	init(){
		let tPreBattleMain=battleMain;
		battleMain=()=>{
			if(mTrueTeam.length>5){
				this.clearQuest();
			}
			else{
				tPreBattleMain();
			}
		}
		//trueならカードをシャッフルする
		super.init(true);
	}
}
