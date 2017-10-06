var mSetDelay=100000;
class Chara{
	constructor(aData,aX,aY,aTeam,aNum){
		this.NAME=aData.NAME;
		this.originalHP=aData.HP;
		this.originalMP=aData.MP;
		this.originalATK=aData.ATK;
		this.originalDEF=aData.DEF;
		this.originalSPD=aData.SPD;
		this.originalTYPE=aData.TYPE;
		this.originalMOV=aData.MOV;
		this.HP=this.originalHP;
		this.MP=this.originalMP;
		this.ATK=this.originalATK;
		this.DEF=this.originalDEF;
		this.SPD=this.originalSPD;
		this.TYPE=this.originalTYPE;
		this.MOV=this.originalMOV;
		this.image=aData.IMAGE;
		this.Delay=Math.floor(mSetDelay/(this.SPD*(Math.random(0.2)+0.9)));
		this.x=aX;
		this.y=aY;
		this.team=aTeam;
		this.num=aNum;
		if(this.team=="T"){
			this.teamColor=mTTeamColor;
		}
		else{
			this.teamColor=mFTeamColor;
		}
		this.deck=aData.DECK;
	}
	getDelay(){
		return this.Delay;
	}
	initDisplay(){
		this.img=document.createElement("img");
		this.img.src=this.getActorUrl();
		if(this.team=="T"){
			this.img.style.transform="scale(-1, 1)"
		}
		this.container=document.createElement("div");
		this.container.style.width="64px";
		this.container.style.height="64px";
		this.container.style.overflow="hidden";
		this.container.style.position="fixed";
		this.container.style.zIndex="1";
		this.setImgaeNum(0,0);

		this.container.appendChild(this.img);
		$("#charaImages")[0].appendChild(this.container);
		this.display();
		this.setMouseOver();
	}
	setImgaeNum(aX,aY){
		if(this.team=="T"){
			aY=8-aY;
		}
		this.img.style.marginTop=-aX*64+"px";
		this.img.style.marginLeft=-aY*64+"px";
	}
	display(){
		let tMas=$("#cardTable")[0].getElementsByTagName("tr")[this.y].getElementsByTagName("td")[this.x];
		let tPosition=tMas.getBoundingClientRect();

		this.container.style.marginTop=(tPosition.top-5)+"px";
		this.container.style.marginLeft=(tPosition.left+5)+"px";
	}
	//マウスオーバーでステータス表示
	setMouseOver(){
		this.container.onmouseover=()=>{
			$("#status")[0].innerHTML=
			"<div style='background:"+this.teamColor+";color:#ffffff;width:85%;border-radius:10px;padding:5px'>"+
			this.NAME+"<br>"+
			"HP:"+this.HP+"/"+this.originalHP+"<br>"+this.getHPBar()+
			"MP:"+this.MP+"/"+this.originalMP+"<br>"+this.getMPBar()+
			"ATK:"+this.ATK+"<br>"+
			"DEF:"+this.DEF+"<br>"+
			"SPD:"+this.SPD+"<br>"+
			"TYPE:"+"<img src='../image/"+this.TYPE+".png' style='height:18px;margin-top:0px;position:absolute'>"+"<br>"+
			"MOV:"+this.MOV+"<br>"+
			"<img src="+this.getFaceUrl()+">"+
			"</div>"
		}
		this.container.onmouseout=()=>{
			displayStatus();
		}
	}
	getFaceUrl(){
		return '../image/chara/1_face/'+String(this.image+100)+'.png';
	}
	getStandUrl(){
		return '../image/chara/2_stand/'+String(this.image+200)+'.png';
	}
	getActorUrl(){
		return '../image/chara/3_sv_actors/'+String(this.image+300)+'.png';
	}
	getHPBar(){
		return "<div style='width:80%;height:5px;background:#ff0000;'><div style='width:"+(this.HP/this.originalHP*100)+"%;height:100%;background:#00ff22;'></div></div>"
	}
	getMPBar(){
		return "<div style='width:80%;height:5px;background:#cf03d4;'><div style='width:"+(this.MP/this.originalMP*100)+"%;height:100%;background:#30d4ff;'></div></div>"
	}
	move(aX,aY){
		//瞬間移動
		this.x=aX;
		this.y=aY;
		this.display();
	}
	addDelay(aDelay){
		this.delay+=aDelay;
	}
}
var mTTeamColor="rgba(0, 136, 255,0.6)";
var mFTeamColor="rgba(255, 90, 0, 0.6)";
