class Quest8 extends Quest{
	constructor(){
		super(8);
		this.setChoicedCharaData();
		this.setChara();
		this.renewDownFunction();
	}
	static getNumber(){
		return 8;
	}
	static getChoiceCharaNum(){
		return 2;
	}
	//クエストの説明
	static getText(){
		return "ダイヤ探索隊";
	}
	//勝利条件説明
	static getWinCondition(){
		return "味方がダイヤカードの上でターンを終える";
	}
	//敗北条件説明
	static getLoseCondition(){
		return "敵がダイヤカードの上でターンを終える,味方の全滅";
	}
	//自軍
	static getMyTeam(){
		return ["選択1","選択2"];
	}
	//敵軍
	static getEnemyTeam(){
		return ["リザード","ハイリザード"];
	}
	//友軍
	static getFriendTeam(){
		return ["なし"];
	}
	//特殊条件
	static getCondition(){
		return ["全カード裏向き","ダイヤカード一枚,他はタイプなし","jokerなし","カードのタイプ変更効果無効"];
	}
	//登場させるキャラを配列に追加
	//{chara:キャラ番号,team:チーム名,position:初期位置,operationNum:操作方法,status:ステータス}
	//chra:{charaCategory:,num:}  (charaCategory:"hero"プレイヤーキャラ,"token"トークン,"enemy"的専用キャラ)(num:キャラ番号)
	//team:T or F(Fが敵チーム)
	//position:{x:,y:}
	//operationNum:0ならuser,1以上ならAI番号
	//status:[[変更するステータス名:変更後の値]]
	setChara(){
		this.addChara({chara:{charaCategory:"enemy",num:2},team:"F",position:{x:6,y:2},operationNum:1,status:[["HP",250]]})
		this.addChara({chara:{charaCategory:"enemy",num:1},team:"F",position:{x:6,y:4},operationNum:1,status:[["HP",200]]})
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
			return ""
		})
	}
	//バトル開始前に呼ぶ
	init(){
		//カード変更
		let tCards=Feild.getArrangeCard();
		for(let i=0;i<52;i++){
			tCards[i].setSoot("");
			tCards[i].makeRevers();
		}
		tCards[52].setNumber("suka")
		tCards[53].setNumber("suka")
		tCards[54].setNumber("suka")
		tCards[55].setNumber("suka")
		tCards[55].setSoot("diamond")
		tCards[52].makeRevers();
		tCards[53].makeRevers();
		tCards[54].makeRevers();
		tCards[55].makeRevers();
		tCards[55].makeRevers();
		tCards[52].resetShuffledFunction("revers");
		tCards[53].resetShuffledFunction("revers");
		tCards[54].resetShuffledFunction("revers");
		tCards[55].resetShuffledFunction("revers");
		tCards[55].resetShuffledFunction("revers");
		//毎ターン勝敗判定
		this.judge(()=>{
			for(let i=0;i<mDelayList.length;i++){
				let tPosition=mDelayList[i].getPosition();
				let tCard=Feild.getCard(tPosition.x,tPosition.y);
				if(!tCard.isReverse()&&tCard.getSoot()=="diamond"){
					return (mDelayList[i].getTeam()=="T")?"win":"lose";
				}
			}
			return "";
		})
		//カードのマーク変更効果無効化
		this.disabledSupport(["changeCardType"]);
		//trueならカードをシャッフルする
		super.init(true);
	}
}
