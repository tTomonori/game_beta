class Quest{
	constructor(){
		this.downFunction=undefined;
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
		tData.chara={charaCategory:"hero",num:aNum};
		tData.team="T";
		this.addChara(tData)
	}
	//キャラが倒された時の関数 aFunction(aChara:倒されたキャラ,aPreFunction:元々呼ばれていた関数)
	setDownFunction(aFunction){
		this.downFunction=aFunction
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

			let tTeam=(tCharaData.team=="F")?mFalseTeam:mTrueTeam;
			let tChara=new tCharaClass(tCharaData.position.x,tCharaData.position.y,tCharaData.team,tCharaData.operationNum)
			if(tCharaData.status!=undefined){//ステータス変更
				for(let i=0;i<tCharaData.status.length;i++){
					if(tChara["original"+tCharaData.status[i][0]]!=undefined)
						tChara["original"+tCharaData.status[i][0]]=tCharaData.status[i][1]
					tChara[tCharaData.status[i][0]]=tCharaData.status[i][1]
				}
			}
			if(this.downFunction!=undefined){//倒された時に呼ぶ関数更新
				tChara.preDown=tChara.down
				let tPreDownFunction=()=>{return tChara.preDown()}
				tChara.down=()=>{return this.downFunction(tChara,tPreDownFunction)}
			}
			tTeam.push(tChara)
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
	//クエストクリア
	clear(){
		flowBand("ミッション達成")
		//データベースに記録
		saveQuestClear(this.questNum);
	}
	//クエスト失敗
	lose(){
		flowBand("ミッション失敗")
	}
}
