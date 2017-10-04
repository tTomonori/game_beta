var mSetDelay=100000;
class Chara{
	constructor(aData,aX,aY){
		this.originalHP=aData.HP;
		this.originalMP=aData.MP;
		this.originalATK=aData.ATK;
		this.originalDEF=aData.DEF;
		this.originalSPD=aData.SPD;
		this.originalTYPE=aData.TYPE;
		this.HP=this.originalHP;
		this.MP=this.originalMP;
		this.ATK=this.originalATK;
		this.DEF=this.originalDEF;
		this.SPD=this.originalSPD;
		this.TYPE=this.originalTYPE;
		this.Delay=Math.floor(mSetDelay/(this.SPD*(Math.random(0.2)+0.9)));
		this.x=aX;
		this.y=aY;
	}
	getDelay(){
		return this.Delay;
	}
}
