class Quest5 extends Quest{
	constructor(){
		super();
		this.setChoicedCharaData();
		this.setChara();
		this.renewDownFunction();
	}
	static getChoiceCharaNum(){
		return 3;
	}
	//クエストの説明
	static getText(){
		return "ボス:ウンディーネを討伐せよ";
	}
	//勝利条件説明
	static getWinCondition(){
		return "ウンディーネを倒す";
	}
	//敗北条件説明
	static getLoseCondition(){
		return "味方が全員倒される";
	}
	//自軍
	static getMyTeam(){
		return ["選択1","選択2","選択3"];
	}
	//敵軍
	static getEnemyTeam(){
		return ["ウンディーネ"];
	}
	//友軍
	static getFriendTeam(){
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
		this.addChara({chara:{charaCategory:"enemy",num:0},team:"F",position:{x:6,y:3},operationNum:1,status:[]})
	}
	//ユーザが選択したキャラの配置などの情報セット
	setChoicedCharaData(){
		this.addChoicedCharaData({position:{x:1,y:1},operationNum:0})
		this.addChoicedCharaData({position:{x:1,y:3},operationNum:0})
		this.addChoicedCharaData({position:{x:1,y:5},operationNum:0})
	}
	//キャラが倒された時に呼ぶ関数更新
	renewDownFunction(){
		//aChara:倒されたキャラ aPreFunction:元々呼ばれていた関数
		this.setDownFunction((aChara,aPreFunction)=>{
			return new Promise((res,rej)=>{
				let tMyTeam=(aChara.getTeam()=="T")?mTrueTeam:mFalseTeam;
				if(tMyTeam.length>1){
					aChara.container.remove();
					removeChara(aChara);
					res();
				}
				else{
					aPreFunction();
				}
			})
		})
	}
	//バトル開始前に呼ぶ
	init(){
		//trueならカードをシャッフルする
		super.init(true);
	}
}
