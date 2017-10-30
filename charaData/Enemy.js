class Enemy extends Chara{
	constructor(aX,aY,aTeam,aData,aOperationNum){
		super(aX,aY,aTeam,aData,aOperationNum);
	}
	getFaceUrl(){
		return '../image/chara/4_unit/'+String(this.image+400)+'.png';
	}
	getStandUrl(){
		return '../image/chara/4_unit/'+String(this.image+400)+'.png';
	}
	getActorUrl(){
		return '../image/chara/3_sv_actors/'+String(this.image+300)+'.png';
	}
	//倒された(オーバーライド)
	down(){
		return new Promise((res,rej)=>{
			this.container.remove();
			removeChara(this);
			newLog(this,"は倒れた")
			res();
		})
	}
}
