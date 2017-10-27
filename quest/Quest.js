class Quest{
	constructor(){
		this.charas=new Array();
		this.choicedCharas=new Array();
	}
	//選択するキャラの数を返す(オーバーライドする)
	// getChoiceCharaNum(){
	// 	return ;
	// }
	//登場させるキャラを追加
	addChara(aCharaData){
		this.charas.push(aCharaData);
	}
	//ユーザが選択したキャラの位置など設定
	addChoicedCharaData(aData){
		this.choicedCharas.push(aData);
	}
	//ユーザが選択したキャラを追加
	addChoicedChara(aNum){
		let tData=this.choicedCharas.shift();
		console.log(aNum);
		tData.chara={charaCategory:"hero",num:aNum};
		tData.team="T";
		this.addChara(tData)
	}
	//バトル開始前に呼ぶ
	init(aShuffle){
		this.arrangeCard();
		this.displayChara();
		//初期delayを設定
		mDelayList = initDelay(mTrueTeam,mFalseTeam);
		initDisplay();
		displayStatus();
		displayDelay();
		if(aShuffle){
			Feild.shuffleAnimate().then(()=>{
				this.start();
			})
		}
		else{
			this.start();
		}
	}
	//カードを並べる
	arrangeCard(){
		//トランプを表示
		Feild.displayCard();
	}
	//キャラを表示
	displayChara(){
		for(let i=0;i<this.charas.length;i++){
			let tCharaData=this.charas[i];
			let tCharaClass;
			if(tCharaData.chara.charaCategory=="hero") tCharaClass=CharaList.getCharaClass(tCharaData.chara.num);
			else if(tCharaData.chara.charaCategory=="token") tCharaClass=TokenList.getTokenClass(tCharaData.chara.num);
			else if(tCharaData.chara.charaCategory=="enemy") tCharaClass=EnemyList.getEnemyClass(tCharaData.chara.num);

			let tTeam=(tCharaData.team=="T")?mTrueTeam:mFalseTeam;
			tTeam.push(new tCharaClass(tCharaData.position.x,tCharaData.position.y,tCharaData.team,tCharaData.operationNum))
		}
	}
	//バトル開始
	start(){
		flowBand("バトルスタート").then(()=>{
			battleMain();
		})
	}
	//終了条件の[キャラが一人倒れたら]を取り除く
	removeWinCondition(){

	}
	//勝利or敗北判定(ターン終了時に呼ぶ)
	judge(){

	}
}
