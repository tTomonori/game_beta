class Quest23 extends Quest{
	constructor(){
		super(23);
		this.setChoicedCharaData();
		this.setChara();
		this.renewDownFunction();
	}
	static getNumber(){
		return 23;
	}
	static getChoiceCharaNum(){
		return 0;
	}
	//クエストの説明
	static getText(){
		return "トランプナイト";
	}
	//勝利条件説明
	static getWinCondition(){
		return "A〜K(13種類)のマスにそれぞれ1回以上止まる";
	}
	//敗北条件説明
	static getLoseCondition(){
		return "A〜K(13種類)のマスにそれぞれ1回以上止まる,味方の全滅";
	}
	//自軍
	static getMyTeam(){
		return ["ヴァルキリー"];
	}
	//敵軍
	static getEnemyTeam(){
		return ["ランスロット","狂戦士"];
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
		this.addChara({chara:{charaCategory:"hero",num:0},team:"T",position:{x:1,y:3},operationNum:0,status:[]})
		this.addChara({chara:{charaCategory:"hero",num:1},team:"F",position:{x:6,y:1},operationNum:1,status:[["HP",200]]})
		this.addChara({chara:{charaCategory:"enemy",num:5},team:"F",position:{x:6,y:5},operationNum:1,status:[]})
	}
	//ユーザが選択したキャラの配置などの情報セット
	setChoicedCharaData(){
		// this.addChoicedCharaData({position:{x:,y:},operationNum:})
	}
	//キャラが倒された時に呼ぶ関数更新
	renewDownFunction(){
		//味方
		this.setAllyDownFunction("all")//全員倒れたら
		//敵
		this.setEnemyDownFunction((aChara)=>{//その他
			return "";
		})
	}
	//バトル開始前に呼ぶ
	init(){
		this.tTeamTread=[false,false,false,false,false,false,false,false,false,false,false,false,false];
		this.fTeamTread=[false,false,false,false,false,false,false,false,false,false,false,false,false];
		let tPreAttackFunction=attack;
		attack=(aChara)=>{
			//踏んだカード更新
			let tTread=(mTurnChara.getTeam()=="T")?this.tTeamTread:this.fTeamTread;
			let tPosition=mTurnChara.getPosition();
			let tCard=Feild.getCard(tPosition.x,tPosition.y);
			let tIndex=cardNumberToInt(tCard.getNumber())-1;
			if(!(tIndex>13)) tTread[tIndex]=true;
			//全部踏んだか確認
			if(this.fTeamTread.indexOf(false)==-1){
				this.loseQuest();
				return new Promise(()=>{});
			}
			if(this.tTeamTread.indexOf(false)==-1){
				this.clearQuest();
				return new Promise(()=>{});
			}
			return tPreAttackFunction(aChara);
		}
		//trueならカードをシャッフルする
		super.init(true);
	}
}
