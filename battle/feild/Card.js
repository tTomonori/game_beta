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
			this.shuffledFunction.push({function:(aCard)=>{aCard.makeRevers();},infinity:true,name:"revers"})
		}
		this.createCardImage();
		this.setCardImage();
		this.trapEffect=new Array();

		//特殊なカードに変更するためのメンバ
		this.specialInfo=null;
		this.specialSkill=()=>{};
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
		this.specialImage=document.createElement("img");
		this.specialImage.style="position:absolute;top:0;left:0;width:50px;height:50px;position:absolute;margin-left:10px;margin-top:10px;display:none;"
		this.specialSrc="";
		this.specialOnerColorBack=document.createElement("div");
		this.specialOnerColorBack.style="position:absolute;top:10px;left:10px;width:38px;height:38px;border-radius:5px;display:none;";
		// this.specialOnerColorBack.style="position:absolute;top:10px;left:10px;width:46px;height:46px;border-radius:5px;display:none;";
		this.reversImage=document.createElement("img");
		this.reversImage.src="../image/card_back.png";
		this.reversImage.style="position:absolute;top:0;left:0;width:65px;height:65px;"
		if(!this.revers) this.reversImage.style.display="none";
		this.numberImage=document.createElement("p");
		if(this.number!="suka") this.numberImage.textContent=this.number;
		this.numberImage.style="position:absolute;top:-5px;left:12px;"

		this.cardContainer.appendChild(this.cardImage);
		this.cardContainer.appendChild(this.specialOnerColorBack);
		this.cardContainer.appendChild(this.sootImage);
		this.cardContainer.appendChild(this.specialImage);
		this.cardContainer.appendChild(this.numberImage);
		this.cardContainer.appendChild(this.reversImage);
	}
	//カード表示を更新する
	setCardImage(){
		//マーク
		if(["spade","club","diamond","heart"].indexOf(this.getSoot())!=-1){
			this.sootImage.src="../image/"+this.soot+".png";
			this.sootImage.style.display="block";
		}
		else {
			this.sootImage.src="";
			this.sootImage.style.display="none";
		}
		this.specialImage.src="";
		this.specialImage.style.display="none";
		this.specialOnerColorBack.style.display="none";
		//数字
		if(this.number!="suka"&&this.number!="special"){
			this.numberImage.textContent=this.number;
		}
		else{
			this.numberImage.textContent="";
			if(this.number=="special"){//特殊なカード
				this.specialImage.style.display="block";
				this.specialImage.src=this.specialSrc;
				this.specialOnerColorBack.style.display="block";
				this.specialOnerColorBack.style.border="solid 4px "+this.specialInfo.orner.getTeamColor();
				// this.specialOnerColorBack.style.background=this.specialInfo.orner.getTeamColor();
			}
		}
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
	//カード番号を変更
	setNumber(aNum){
		this.number=aNum;
		if(aNum=="joker"||aNum=="suka"){
			this.soot="";
			this.resetSpecial();
		}
		this.setCardImage();
	}
	//カードのスートを変更
	setSoot(aSoot){
		this.soot=aSoot;
		this.setCardImage();
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
			this.shuffledFunction[i].function(this);
			if(this.shuffledFunction[i].infinity==false){
				this.shuffledFunction.splice(i,1);
			}
		}
	}
	//シャッフル時に実行する関数セット
	setShuffledFunction(aFunction){
		this.shuffledFunction.push(aFunction);
	}
	//シャッフル時に実行する関数リセット
	resetShuffledFunction(aName){
		for(let i=0;i<this.shuffledFunction.length;i++){
			if(this.shuffledFunction[i].name==aName){
				this.shuffledFunction.splice(i,1);
				return;
			}
		}
	}
	//マス効果追加(aEffect=[effect:効果,value:効果値,owner:設置したチーム,target:効果の影響を受けるチームの配列,remove:trueなら一回のみ発動])
	setTrap(aEffect){
		this.trapEffect.push(aEffect);
	}
	//マス効果発動
	trap(aChara){
		return new Promise((res,rej)=>{
			if(this.trapEffect.length==0){
				res();
				return;
			}
			//効果発動
			Support(this.trapEffect.concat(),aChara).then(()=>{
				let tNewEffect=new Array();
				//一回制限の効果を削除する
				for(let i=0;i<this.trapEffect.length;i++){
					if(!this.trapEffect[i].remove||this.trapEffect[i].target.indexOf(aChara.getTeam())==-1)
						tNewEffect.push(this.trapEffect[i]);
				}
				this.trapEffect=tNewEffect;
				res();
			})
		})
	}
	//カードを特殊な効果をもつカードに変える
	changeSpecial(aName,aImage,aSkill,aChara,aStyle){
		this.number="special";
		this.specialSrc="../image/chara/material/"+aImage;
		this.specialImage.style="position:absolute;top:0;left:0;width:50px;height:50px;position:absolute;margin-left:10px;margin-top:10px;display:none;"
		for(let i=0;i<aStyle.length;i++){
			this.specialImage.style[aStyle[i][0]]=aStyle[i][1];
		}
		this.soot="";
		this.specialInfo={}
		this.specialInfo.name=aName;
		this.specialInfo.orner=aChara;//このカードを変えたキャラ
		this.specialSkill=(aOrner,aChara)=>{return aSkill(aOrner,aChara)};
		this.setCardImage();
	}
	resetSpecial(){
		this.specialSrc="";
		this.specialImage.style="display:none;";
		this.specialInfo={};
		this.specialSkill=()=>{}
	}
	getSpecialSkill(aChara){
		return this.specialSkill(this.specialInfo.orner,aChara);
	}
	//このカードが特殊なカードならカード情報({name:カード名,orner:このカードを変えたキャラ})を返す
	getSpecialInfo(){
		if(this.getNumber()=="special")return this.specialInfo;
		else return null;
	}
}

function cardNumberToInt(aNum){
	if(aNum=="A") return 1;
	if(aNum=="J") return 11;
	if(aNum=="Q") return 12;
	if(aNum=="K") return 13;
	if(aNum=="joker") return 14;
	if(aNum=="suka") return 15;
	if(aNum=="special") return 16;
	return aNum;
}
