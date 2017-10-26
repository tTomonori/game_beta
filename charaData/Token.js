class Token extends Chara{
	constructor(aX,aY,aTeam,aData,aOperationNum,aDelay){
		let tOperationNum=aOperationNum;
		if(tOperationNum=="player"){
			tOperationNum=(mMyTeam.indexOf(aTeam)!=-1)?0:mPlayerNum;
		}
		super(aX,aY,aTeam,aData,tOperationNum);
		this.Delay=0;
		this.addDelay(aDelay);
	}
	setId(aId){
		this.container.id=aId;
	}
	//倒された(オーバーライド)
	down(){
		return new Promise((res,rej)=>{
			this.container.remove();
			removeChara(this);
			freeLog(this,"召喚","解除された")
			res();
		})
	}
}
