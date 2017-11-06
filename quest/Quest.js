class Quest{
	constructor(aNum){
		this.questNum=aNum;
		this.allyDownFunction=undefined;
		this.enemyDownFunction=undefined;
		this.charas=new Array();
		this.choicedCharas=new Array();
		this.endFlag=false;
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
	questStart(){
		this.displayChara();
		this.init();
	}
	init(aShuffle){
		this.arrangeCard();
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
					switch (tCharaData.status[i][0]) {
						case "ATK":
						case "DEF":
						case "SPD":
						case "MOV":
							tChara[tCharaData.status[i][0]]=tCharaData.status[i][1]
							tChara["original"+tCharaData.status[i][0]]=tCharaData.status[i][1]
							break;
						case "HP":
							tChara.HP=tCharaData.status[i][1];
							tChara.originalHP=tCharaData.status[i][1];
							tChara.maxHP=tCharaData.status[i][1];
							break;
						case "MP":
							tChara.originalMP=tCharaData.status[i][1];
							tChara.maxMP=tCharaData.status[i][1];
							break;
						case "nowMP":
							tChara.MP=tCharaData.status[i][1];
							if(tChara.originalMP<tChara.MP){
								tChara.originalMP=tCharaData.status[i][1];
								tChara.maxMP=tCharaData.status[i][1];
							}
							break;
						default:
							tChara[tCharaData.status[i][0]]=tCharaData.status[i][1]
					}
				tChara.initDelay();
			}
		}
			//倒れた時の関数更新
			tChara.down=(tChara.getTeam()=="T")?
				()=>{return this.allyDownFunction(tChara)}:
				()=>{return this.enemyDownFunction(tChara)};
			tTeam.push(tChara)
		}
	}
	//バトル開始
	start(){
		flowBand("バトルスタート").then(()=>{
			battleMain();
		})
	}
	//味方キャラが倒された時の勝敗判定(aFunction:"one" or "ally" or function(aChara){return ("win"or"lose)})
	setAllyDownFunction(aFunction){
		if(aFunction=="one"){//一人倒れたら
			this.allyDownFunction=(aChara)=>{
				newLog([aChara,"は倒れた"])
				return new Promise((res,rej)=>{
					aChara.setImgaeNum(6,5);
					this.loseQuest()
				})
			}
		}
		else if(aFunction=="all"){//全員倒れたら
			this.allyDownFunction=(aChara)=>{
				newLog([aChara,"は倒れた"])
				return new Promise((res,rej)=>{
					if(mTrueTeam.length>1){
						removeChara(aChara)
						res();
					}
					else{
						aChara.setImgaeNum(6,5);
						this.loseQuest()
					}
				})
			}
		}
		else{//その他
			this.allyDownFunction=(aChara)=>{
				newLog([aChara,"は倒れた"])
				return new Promise((res,rej)=>{
					switch(aFunction(aChara,res)){
						case "win":
							aChara.setImgaeNum(6,5);
							this.clearQuest();
							break;
						case "lose":
							aChara.setImgaeNum(6,5);
							this.loseQuest();
							break;
						default:
							removeChara(aChara)
							res();
					}
				})
			}
		}
	}
	//敵キャラが倒された時の勝敗判定(aFunction:"one" or "ally" or function(aChara){return ("win"or"lose)})
	setEnemyDownFunction(aFunction){
		if(aFunction=="one"){//一人倒れたら
			this.enemyDownFunction=(aChara)=>{
				newLog([aChara,"は倒れた"])
				return new Promise((res,rej)=>{
					aChara.setImgaeNum(6,5);
					this.clearQuest()
				})
			}
		}
		else if(aFunction=="all"){//全員倒れたら
			this.enemyDownFunction=(aChara)=>{
				newLog([aChara,"は倒れた"])
				return new Promise((res,rej)=>{
					if(mFalseTeam.length>1){
						removeChara(aChara)
						res();
					}
					else{
						aChara.setImgaeNum(6,5);
						this.clearQuest()
					}
				})
			}
		}
		else{//その他
			this.enemyDownFunction=(aChara)=>{
				newLog([aChara,"は倒れた"])
				return new Promise((res,rej)=>{
					switch(aFunction(aChara,res)){
						case "win":
							aChara.setImgaeNum(6,5);
							this.clearQuest();
							break;
						case "lose":
							aChara.setImgaeNum(6,5);
							this.loseQuest();
							break;
						default:
							removeChara(aChara)
							res();
					}
				})
			}
		}
	}
	//勝利or敗北判定(ターン開始時に呼ぶ)
	judge(aJudge){
		let tPreBattleMain=battleMain;
		battleMain=()=>{
			switch (aJudge()) {
				case "win":
						this.clearQuest();
					break;
				case "lose":
					this.loseQuest();
					break;
				default:
					tPreBattleMain();
			}
		}
	}
	//指定した効果を向こうにする
	disabledSupport(aSupport){
		let tPreSupportPlay=SupportPlay;
		SupportPlay=(aSupportnums,aChara)=>{
			if(aSupport.indexOf(aSupportnums.effect)!=-1){
				aSupportnums.effect="";
			}
			return tPreSupportPlay(aSupportnums,aChara);
		}
	}
	//全てのスキルに指定した効果をつける
	addSupport(aSupport){
		let tPreSupport=Support;
		Support=(aSupportnums,aChara)=>{
			for(let i=0;i<aSupport.length;i++)
				aSupportnums.push({effect:aSupport[i]});
			return tPreSupport(aSupportnums,aChara);
		}
	}
	//クエストクリア
	clearQuest(){
		if(this.endFlag)return;
		this.endFlag=true;
		flowBand("ミッション達成")
		addLog("ミッション達成")
		//データベースに記録
		saveQuestClear(this.questNum);
		document.getElementById("text").innerHTML="ミッション達成";
		$("#finishButton")[0].style.display="block"
	}
	//クエスト失敗
	loseQuest(){
		if(this.endFlag)return;
		this.endFlag=true;
		flowBand("ミッション失敗")
		addLog("ミッション失敗")
		document.getElementById("text").innerHTML="ミッション失敗";
		$("#finishButton")[0].style.display="block"
	}
}
