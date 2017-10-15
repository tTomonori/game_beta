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
		this.MP=0;
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
		//キャラ画像
		this.img=document.createElement("img");
		this.img.src=this.getActorUrl();
		if(this.team=="T"){
			this.img.style.transform="scale(-1, 1)"
		}
		this.container=document.createElement("div");
		this.container.id="chara"+this.team+this.num;
		this.container.style.width="64px";
		this.container.style.height="64px";
		this.container.style.overflow="hidden";
		this.container.style.position="fixed";
		this.container.style.zIndex="1";
		this.setImgaeNum(0,0);
		//チーム色でキャラを強調
		this.teamMerker=document.createElement("div");
		this.teamMerker.style.position="absolute";
		this.teamMerker.style.zIndex="-1";
		this.teamMerker.style.top="0";
		this.teamMerker.style.left="0";
		this.teamMerker.style.width="60%";
		this.teamMerker.style.height="65%";
		this.teamMerker.style.marginTop="27%";
		this.teamMerker.style.marginLeft="21%";
		this.teamMerker.style.opacity="0.6"
		this.teamMerker.style.background=this.teamColor;
		this.teamMerker.style.borderRadius="70px";

		this.container.appendChild(this.teamMerker);
		this.container.appendChild(this.img);
		$("#charaImages")[0].appendChild(this.container);
		this.display();
		this.setMouseOver();
	}
	setImgaeNum(aX,aY){
		if(this.team=="T"){
			aX=8-aX;
		}
		this.img.style.marginTop=-aY*64+"px";
		this.img.style.marginLeft=-aX*64+"px";
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
	move(aX,aY,aCallback){
		$("#"+this.container.id).animate({
			marginLeft:"+="+((aX-this.x)*72),
			marginTop:"+="+((aY-this.y)*76)
		},500,()=>{
			//移動アニメーション終了時の処理
			this.x=aX;
			this.y=aY;
			this.display();
			aCallback();
		})
	}
	addDelay(aDelay){
		this.Delay+=aDelay;
	}
	//ディレイを減少させる(引数は効果値)
	minusDelay(aDelay){
		let tDelay = Math.floor((aDelay*1000)/this.SPD);
		this.Delay-=tDelay;
		(aDelay>0)?freeLog(this,"DELAY",aDelay+"下がった"):freeLog(this,"DELAY",-aDelay+"上がった");
	}
	changeType(aType){
		if(aType=="random"){
			var tRandom = Math.floor(Math.random()*4)
			if(tRandom==0) aType = "spade";
			else if(tRandom==1) aType = "club";
			else if(tRandom==2) aType = "diamond";
			else if(tRandom==3) aType = "heart";
		}
		this.TYPE=aType;
		freeLog(this,"タイプ",aType+"に変わった")
	}
	initDelay(aAddDelay){
		this.Delay=Math.floor(100000/this.SPD)+aAddDelay;//初期値+追加ディレイ
	}
	plusStatus(aStatus,aValue){
		aStatus=aStatus.toUpperCase();
		this[aStatus]+=aValue;
		(aValue>0)?freeLog(this,aStatus,aValue+"アップ"):freeLog(this,aStatus,-aValue+"ダウン");
	}
	resetStatus(aStatus){
		aStatus=aStatus.toUpperCase();
		if(aStatus=="All"){
			this.AP=this.originalAP;
			this.DEF=this.originalDEF;
			this.SPD=this.originalSPD;
			this.MOV=this.originalMOV;
			freeLog(this,"ステータス","元に戻った")
		}
		else{
			this[aStatus]=this["original"+aStatus];
			freeLog(this,aStatus,"元に戻った")
		}
	}
	MpMinus(aMp){
		this.MP-=aMp;
		if(this.MP>this.originalMP)
			this.MP=this.originalMP;
		return new Promise((res,rej)=>{
			res();
		})
	}
	addMp(aMp){
		if(aMp==0) return;
		this.MP+=aMp;
		if(this.MP>this.originalMP) this.MP=this.originalMP;
		if(this.MP<0) this.MP=0;

		(aMp>0)?freeLog(this,"MP",aMp+"回復"):freeLog(this,"MP",-aMp+"減少");
	}
	//ダメージを与える(引数が負なら回復)
	addDamage(aDamage){
		if(aDamage==0) return;
		let tBar=this.getHPBar();
		this.HP-=aDamage;
		//HP超過
		if(this.HP>this.originalHP) this.HP=this.originalHP;
		if(this.HP<=0){
			//戦闘不能
			this.down();
			return;
		}
		//ログ
		damageLog(this,aDamage);
		//HP変化アニメーション
		let tCardCell=$("#cardTable")[0].getElementsByTagName("tr")[this.y].getElementsByTagName("td")[this.x];
		let tPosition=tCardCell.getBoundingClientRect();
		let tBarContainer=document.createElement("div");
		tBarContainer.id=this.NAME+this.team+"HPBarAnimation";
		tBarContainer.style.zIndex="1";
		tBarContainer.style.position="absolute";
		tBarContainer.style.pointerEvents="none";
		tBarContainer.style.marginLeft=(tPosition.left+5)+"px";
		tBarContainer.style.marginTop=(tPosition.top-5)+"px";
		tBarContainer.style.top="0";
		tBarContainer.style.left="0";
		tBarContainer.style.width="64px";
		tBarContainer.style.height="70px";
		tBarContainer.innerHTML=tBar;
		tBarContainer.firstChild.style.width="100%";
		$("#field")[0].appendChild(tBarContainer);
		let tBarId=tBarContainer.id+"CurrentHPBar";
		tBarContainer.firstChild.firstChild.id=tBarId;
		let tDamageChar=document.createElement("b");
		tDamageChar.id=this.NAME+this.team+"DamageChar";
		tDamageChar.innerHTML=-aDamage;
		tDamageChar.style.position="absolute";
		tDamageChar.style.top="0";
		tDamageChar.style.left="0";
		tDamageChar.style.width="100%";
		tDamageChar.style.height="100%";
		tDamageChar.style.fontSize="30px";
		tDamageChar.style.textAlign="center";
		tDamageChar.style.color=(aDamage>0)?"#f00":"#0f0";
		tBarContainer.appendChild(tDamageChar);
		//アニメーションの実行
		(aDamage>0)?this.setImgaeNum(0,4):this.setImgaeNum(5,5);
		$("#"+tDamageChar.id).animate({
			top:"-20px"
		},1000,"linear",()=>{
			tDamageChar.remove();
		});
		$("#"+tBarId).animate({
			width:(this.HP/this.originalHP*100)+"%"
		},700,"linear",()=>{
			this.setImgaeNum(0,0);
			setTimeout(()=>{tBarContainer.remove()},500);
		})
	}
	down(){
		this.setImgaeNum(6,5);
		this.team=="T"?winner("F"):winner("T");
	}
	transform(aCharaNum){
		let tChara=mFunnel[aCharaNum]
		this.NAME=tChara.NAME;
		this.ATK=tChara.ATK;
		this.DEF=tChara.DEF;
		this.SPD=tChara.SPD;
		this.MOV=tChara.MOV;
		this.TYPE=tChara.TYPE;
		this.originalHP=tChara.HP;
		this.originalMP=tChara.MP;
		this.originalATK=tChara.ATK;
		this.originalDEF=tChara.DEF;
		this.originalSPD=tChara.SPD;
		this.originalMOV=tChara.MOV;
		this.originalTYPE=tChara.TYPE;
		this.image=tChara.IMAGE;
		this.deck=tChara.DECK;

		this.HP+=(tChara.HP-this.originalHP);
		this.ATK+=(tChara.ATK-this.originalATK);
		this.DEF+=(tChara.DEF-this.originalDEF);
		this.SPD+=(tChara.SPD-this.originalSPD);
		this.MOV+=(tChara.MOV-this.originalMOV);
		this.img.src=this.getActorUrl();
	}
}
var mTTeamColor="rgba(0, 136, 255,0.6)";
var mFTeamColor="rgba(255, 90, 0, 0.6)";
