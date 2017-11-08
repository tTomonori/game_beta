class Quest3 extends Quest{
	constructor(){
		super(3);
		this.setChoicedCharaData();
		this.setChara();
		this.renewDownFunction();
	}
	static getNumber(){
		return 3;
	}
	static getChoiceCharaNum(){
		return 2;
	}
	//クエストの説明
	static getText(){
		return "ゾンビの大群を全滅させよ";
	}
	//勝利条件説明
	static getWinCondition(){
		return "敵の全滅";
	}
	//敗北条件説明
	static getLoseCondition(){
		return "味方の全滅";
	}
	//自軍
	static getMyTeam(){
		return ["選択1","選択2"];
	}
	//敵軍
	static getEnemyTeam(){
		return ["ゾンビx5"];
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
	//{chara:キャラ番号,team:チーム名,position:初期位置,operationNum:操作方法}
	//chra:{charaCategory:,num:}  (charaCategory:"hero"プレイヤーキャラ,"token"トークン,"enemy"的専用キャラ)(num:キャラ番号)
	//team:T or F(Fが敵チーム)
	//position:{x:,y:}
	//operationNum:0ならuser,1以上ならAI番号
	setChara(){
		this.addChara({chara:{charaCategory:"token",num:1},team:"F",position:{x:6,y:1},operationNum:1,status:[["HP",65]]})
		this.addChara({chara:{charaCategory:"token",num:1},team:"F",position:{x:6,y:3},operationNum:1,status:[["HP",65]]})
		this.addChara({chara:{charaCategory:"token",num:1},team:"F",position:{x:6,y:5},operationNum:1,status:[["HP",65]]})
		this.addChara({chara:{charaCategory:"token",num:1},team:"F",position:{x:4,y:2},operationNum:1,status:[["HP",65]]})
		this.addChara({chara:{charaCategory:"token",num:1},team:"F",position:{x:4,y:4},operationNum:1,status:[["HP",65]]})
	}
	//ユーザが選択したキャラの配置などの情報セット
	setChoicedCharaData(){
		this.addChoicedCharaData({position:{x:1,y:2},operationNum:0})
		this.addChoicedCharaData({position:{x:1,y:4},operationNum:0})
	}
	//キャラが倒された時に呼ぶ関数更新
	renewDownFunction(){
		//aChara:倒されたキャラ aPreFunction:元々呼ばれていた関数
		this.setDownFunction((aChara,aPreFunction)=>{
			return new Promise((res,rej)=>{
				let tMyTeam=(aChara.getTeam()=="T")?mTrueTeam:mFalseTeam;
				newLog([aChara,"は倒れた"])
				if(tMyTeam.length>1){
					aChara.container.remove();
					removeChara(aChara);
					res();
				}
				else{
					aChara.container.remove();
					removeChara(aChara);
					(aChara.getTeam()=="T")?winner("F"):winner("T");
				}
			})
		})
	}
	//キャラが倒された時に呼ぶ関数更新
	renewDownFunction(){
		//味方
		this.setAllyDownFunction("all")//全員倒れたら
		//敵
		this.setEnemyDownFunction("all")//全員倒れたら
	}
	//バトル開始前に呼ぶ
	init(){
		//trueならカードをシャッフルする
		super.init(true);
	}
}
