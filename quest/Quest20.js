class Quest20 extends Quest{
	constructor(){
		super(20);
		this.setChoicedCharaData();
		this.setChara();
		this.renewDownFunction();
	}
	static getNumber(){
		return 20;
	}
	static getChoiceCharaNum(){
		return 2;
	}
	//クエストの説明
	static getText(){
		return "突撃!! 幽霊屋敷";
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
		return ["ゴーストx18"];
	}
	//友軍
	static getFriendTeam(){
		return ["なし"];
	}
	//特殊条件
	static getCondition(){
		return ["味方の全体攻撃スキル無効"];
	}
	//登場させるキャラを配列に追加
	//{chara:キャラ番号,team:チーム名,position:初期位置,operationNum:操作方法,status:ステータス}
	//chra:{charaCategory:,num:}  (charaCategory:"hero"プレイヤーキャラ,"token"トークン,"enemy"的専用キャラ)(num:キャラ番号)
	//team:T or F(Fが敵チーム)
	//position:{x:,y:}
	//operationNum:0ならuser,1以上ならAI番号
	//status:[[変更するステータス名:変更後の値]]
	setChara(){
		this.addChara({chara:{charaCategory:"token",num:0},team:"F",position:{x:0,y:0},operationNum:1,status:[]})
		this.addChara({chara:{charaCategory:"token",num:0},team:"F",position:{x:0,y:6},operationNum:1,status:[]})
		this.addChara({chara:{charaCategory:"token",num:0},team:"F",position:{x:2,y:0},operationNum:1,status:[]})
		this.addChara({chara:{charaCategory:"token",num:0},team:"F",position:{x:2,y:6},operationNum:1,status:[]})
		this.addChara({chara:{charaCategory:"token",num:0},team:"F",position:{x:3,y:1},operationNum:1,status:[]})
		this.addChara({chara:{charaCategory:"token",num:0},team:"F",position:{x:3,y:5},operationNum:1,status:[]})
		this.addChara({chara:{charaCategory:"token",num:0},team:"F",position:{x:4,y:0},operationNum:1,status:[]})
		this.addChara({chara:{charaCategory:"token",num:0},team:"F",position:{x:4,y:3},operationNum:1,status:[]})
		this.addChara({chara:{charaCategory:"token",num:0},team:"F",position:{x:4,y:6},operationNum:1,status:[]})
		this.addChara({chara:{charaCategory:"token",num:0},team:"F",position:{x:5,y:1},operationNum:1,status:[]})
		this.addChara({chara:{charaCategory:"token",num:0},team:"F",position:{x:5,y:5},operationNum:1,status:[]})
		this.addChara({chara:{charaCategory:"token",num:0},team:"F",position:{x:6,y:0},operationNum:1,status:[]})
		this.addChara({chara:{charaCategory:"token",num:0},team:"F",position:{x:6,y:2},operationNum:1,status:[]})
		this.addChara({chara:{charaCategory:"token",num:0},team:"F",position:{x:6,y:4},operationNum:1,status:[]})
		this.addChara({chara:{charaCategory:"token",num:0},team:"F",position:{x:6,y:6},operationNum:1,status:[]})
		this.addChara({chara:{charaCategory:"token",num:0},team:"F",position:{x:7,y:1},operationNum:1,status:[]})
		this.addChara({chara:{charaCategory:"token",num:0},team:"F",position:{x:7,y:3},operationNum:1,status:[]})
		this.addChara({chara:{charaCategory:"token",num:0},team:"F",position:{x:7,y:5},operationNum:1,status:[]})
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
		this.setEnemyDownFunction("all")//全員倒れたら
	}
	//バトル開始前に呼ぶ
	init(){
		//全体攻撃無効
		let tPreRange=calcRange;
		calcRange=(aSkillRange,aPosition)=>{
			if(mTurnChara.getTeam()=="T"){
				for(let i=0;i<aSkillRange.length;i++){
					if(aSkillRange[i][0]=="enemy"){
						aSkillRange.splice(i,1);
						break;
					}
				}
			}
			return tPreRange(aSkillRange,aPosition);
		}
		//trueならカードをシャッフルする
		super.init(true);
	}
}
