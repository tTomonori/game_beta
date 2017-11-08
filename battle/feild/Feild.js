class Feild{
	static init(){
		this.cards=new Array();//スート,番号順
		this.cardsLine=new Array();//現在の配置
		let tCard
		for(let i=1;i<=13;i++){
			let tNum;
			if(i==1) tNum="A";
			else if(i==11) tNum="J";
			else if(i==12) tNum="Q";
			else if(i==13) tNum="K";
			else tNum=i;
			tCard=new Card(tNum,"spade")
			this.cards.push(tCard);
			this.cardsLine.push(tCard);
			tCard=new Card(tNum,"club")
			this.cards.push(tCard);
			this.cardsLine.push(tCard);
			tCard=new Card(tNum,"diamond")
			this.cards.push(tCard);
			this.cardsLine.push(tCard);
			tCard=new Card(tNum,"heart")
			this.cards.push(tCard);
			this.cardsLine.push(tCard);
		}
		tCard=new Card("joker","")
		this.cards.push(tCard);
		this.cardsLine.push(tCard);
		tCard=new Card("joker","")
		this.cards.push(tCard);
		this.cardsLine.push(tCard);
		tCard=new Card("suka","")
		this.cards.push(tCard);
		this.cardsLine.push(tCard);
		tCard=new Card("suka","")
		this.cards.push(tCard);
		this.cardsLine.push(tCard);

		this.resetTable();
	}
	static getCard(aX,aY){
		return this.cardsLine[aY*8+aX];
	}
	static getAllCard(){
		return this.cardsLine.concat();
	}
	static getArrangeCard(){
		return this.cards;
	}
	//裏向きのカードの数
	static getReversCardNum(){
		let tNum=0;
		for(let i=0;i<this.cardsLine.length;i++){
			if(this.cardsLine[i].isReverse())
				tNum++;
		}
		return tNum;
	}
	//テーブルを空にする
	static resetTable(){
		let tTable="";
		for(let i=0;i<7;i++){
			tTable+="<tr>";
			for(let j=0;j<8;j++){
				tTable+="<td style='width:70px;height:70px;position:relative' onclick='move("+j+","+i+")' onmouseover='attackable("+j+","+i+")' onmouseout='if(mEventFlag)returnMoveable();else returnAttackable()'>";
				tTable+="</td>";
			}
			tTable+="</tr>";
		}
		$("#cardTable")[0].innerHTML=tTable;
	}
	//カードを表示
	static displayCard(){
		for(let i=0;i<this.cardsLine.length;i++){
			this.cardsLine[i].display(i%8,Math.floor(i/8));
		}
	}
	//カードの並びを初期化
	static resetCardLine(){
		this.cardsLine=this.cards.concat();
	}
	//カードをシャッフル
	static shuffle(aRandomFunction){
		//取り出す範囲(箱の中)を末尾から狭める繰り返し
		for(let i = this.cards.length -1;i>0;i--){
				//乱数生成を使ってランダムに取り出す値を決める
				let r = Math.floor(aRandomFunction()*(i+1));
				//取り出した値と箱の外の先頭の値を交換する
				let tmp = this.cardsLine[i];
				this.cardsLine[i] = this.cardsLine[r];
				this.cardsLine[r] = tmp;
		}
		this.displayCard();
	}
	//カードシャッフルのアニメーション
	static shuffleAnimate(){
		for(let i=0;i<this.cardsLine.length;i++){
			this.cardsLine[i].shuffled();
		}
		return new Promise((res,rej)=>{
			let tTimes=20;
			let tFps=100;
			for(let i=0;i<tTimes-1;i++){
				setTimeout(()=>{
					this.shuffle(Math.random);
					this.displayCard();
				},i*tFps)
			}
			setTimeout(()=>{
				this.resetCardLine();
				this.shuffle(makeRandom);
				res();
			},(tTimes-1)*tFps);
		})
	}
}
Feild.init();
