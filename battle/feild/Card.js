class Card{
	constructor(aNumber,aSoot){
		this.originalNumber=aNumber;
		this.originalSoot=aSoot;
		this.number=aNumber;
		this.soot=aSoot;
		this.shuffledFunction=new Array();//シャッフルされた時に実行する関数
		this.revers=false;//裏返しならtrue
		if(aNumber=="joker"||aNumber=="suka"){
			this.revers=true;
			this.shuffledFunction.push([()=>{this.makeRevers();},true])
		}
		this.createCardImage();
	}
	//カードのタグを生成
	createCardImage(){
		this.cardContainer=document.createElement("div");
		this.cardContainer.style.position="relative";
		this.cardContainer.style="position:absolute;top:0;left:0;"
		this.cardImage=document.createElement("img");
		this.cardImage.src="../image/card.png";
		this.cardImage.style="position:absolute;top:0;left:0;width:65px;height:65px;"
		this.sootImage=document.createElement("img");
		this.sootImage.style="position:absolute;top:0;left:0;width:50px;height:50px;position:absolute;margin-left:10px;margin-top:10px"
		if(this.soot!="joker"&&this.soot!="suka"){this.sootImage.src="../image/"+this.soot+".png";}
		else {this.sootImage.src="";this.sootImage.style.display="none";}
		this.reversImage=document.createElement("img");
		this.reversImage.src="../image/card_back.png";
		this.reversImage.style="position:absolute;top:0;left:0;width:65px;height:65px;"
		if(!this.revers) this.reversImage.style.display="none";
		this.numberImage=document.createElement("p");
		if(this.number!="suka") this.numberImage.textContent=this.number;
		this.numberImage.style="position:absolute;top:-5px;left:12px;"

		this.cardContainer.appendChild(this.cardImage);
		this.cardContainer.appendChild(this.sootImage);
		this.cardContainer.appendChild(this.numberImage);
		this.cardContainer.appendChild(this.reversImage);
	}
	//カードのタグを返す
	getCardImage(){
		return this.cardContainer;
	}
	//カードの番号(or joker,suka)を返す
	getNumber(){
		return this.number;
	}
	//カードのスート(マーク)を返す
	getSoot(){
		return this.soot;
	}
	//カードを裏返す
	makeRevers(){
		this.reversImage.style.display="block";
		this.revers=true;
	}
	//カードを面にする
	makeFace(){
		this.reversImage.style.display="none";
		this.revers=false;
	}
	//裏向きならtrue
	isReverse(){
		return this.revers;
	}
	//引数の座標のマスにカードを表示する
	display(aX,aY){
		this.getCardImage().remove();
		let tCardCell=$("#cardTable")[0].getElementsByTagName("tr")[aY].getElementsByTagName("td")[aX];
		tCardCell.appendChild(this.getCardImage());
	}
	//シャッフル時に実行する関数
	shuffled(){
		for(let i=0;i<this.shuffledFunction.length;i++){
			this.shuffledFunction[i][0]();
			if(this.shuffledFunction[i][1]==false){
				this.shuffledFunction.splice(i,1);
			}
		}
	}
}
