class Quest14 extends Quest{
	constructor(){
		super(14);
		this.setChoicedCharaData();
		this.setChara();
		this.renewDownFunction();
	}
	static getNumber(){
		return 14;
	}
	static getChoiceCharaNum(){
		return 2;
	}
	//クエストの説明
	static getText(){
		return "鉄壁のヴァルキリー";
	}
	//勝利条件説明
	static getWinCondition(){
		return "鉄壁ヴァルキリーを倒す";
	}
	//敗北条件説明
	static getLoseCondition(){
		return "味方の全滅";
	}
	//自軍
	static getMyTeam(){
		return ["線択１","選択２"];
	}
	//敵軍
	static getEnemyTeam(){
		return ["鉄壁のヴァルキリー"];
	}
	//友軍
	static getFriendTeam(){
		return ["なし"];
	}
	//特殊条件
	static getCondition(){
		return ["敵へのダメージを１に固定"];
	}
	//登場させるキャラを配列に追加
	//{chara:キャラ番号,team:チーム名,position:初期位置,operationNum:操作方法,status:ステータス}
	//chra:{charaCategory:,num:}  (charaCategory:"hero"プレイヤーキャラ,"token"トークン,"enemy"的専用キャラ)(num:キャラ番号)
	//team:T or F(Fが敵チーム)
	//position:{x:,y:}
	//operationNum:0ならuser,1以上ならAI番号
	//status:[[変更するステータス名:変更後の値]]
	setChara(){
		this.addChara({chara:{charaCategory:"hero",num:0},team:"F",position:{x:6,y:3},operationNum:1,status:[["HP",20],["DEF",Infinity],["NAME","鉄壁のヴァルキリー"]]})
	}
	//ユーザが選択したキャラの配置などの情報セット
	setChoicedCharaData(){
		this.addChoicedCharaData({position:{x:2,y:2},operationNum:0})
		this.addChoicedCharaData({position:{x:2,y:4},operationNum:0})
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
		let tChara=mFalseTeam[0];
		tChara.preAddDamage=tChara.addDamage;
		tChara.addDamage=(aDamage)=>{
			let tDamage=(aDamage>=0)?1:-1;
			return tChara.preAddDamage(tDamage);
		}
		//trueならカードをシャッフルする
		super.init(true);
	}
}
