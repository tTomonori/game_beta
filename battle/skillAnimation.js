var mAttackCharaOfAnimation;//攻撃するキャラ
var mDamagedCharaOfAnimation;//攻撃されるキャラ
var mAnimationNumList;//アニメーションの番号のリスト
var mAnimationNum;//再生するアニメーションのindex
var mCallbackOfAnimation;//アニメーション終了時に実行する関数
var mAnimatingNum;//実行中のアニメーションの数
function attackAnimate(aAttackChara,aDamagedCharas,aAnimationNumList,aCallback){
	mAttackCharaOfAnimation=aAttackChara;
	mDamagedCharaOfAnimation=aDamagedCharas;
	mAnimationNumList=aAnimationNumList;
	mAnimationNum=0;
	mCallbackOfAnimation=aCallback;
	mAnimatingNum=0;
	battleEffectAnimate();
}

function battleEffectAnimate(){
	//アニメーション再生中
	if(mAnimatingNum!=0) return;
	//アニメーションが全て終了
	if(mAnimationNumList.length<=mAnimationNum) mCallbackOfAnimation();

	switch (mAnimationNumList[mAnimationNum++]) {
		case 0:
			animateAllChara(mDamagedCharaOfAnimation,(aChara)=>{
				pipoEffect(aChara.x,aChara.y,"001");
			})
			break;
		case 3:
			animateAllChara(mDamagedCharaOfAnimation,(aChara)=>{
				pipoEffect(aChara.x,aChara.y,"003");
			})
			break;
		case 4:
			animateAllChara(mDamagedCharaOfAnimation,(aChara)=>{
				pipoEffect(aChara.x,aChara.y,"004");
			})
			break;
		case 7:
			animateAllChara(mDamagedCharaOfAnimation,(aChara)=>{
				pipoEffect(aChara.x,aChara.y,"007");
			})
			break;
		case 34:
			animateAllChara(mDamagedCharaOfAnimation,(aChara)=>{
				pipoEffect(aChara.x,aChara.y,"034");
			})
			break;
		default:

	}
}
//list内の全てのキャラ対してアニメーションを再生
function animateAllChara(aTargetCharaList,aAnimationFunction){
	if(aTargetCharaList.length==0) battleEffectAnimate();
	for(let i=0;i<aTargetCharaList.length;i++){
		mAnimatingNum++;
		aAnimationFunction(aTargetCharaList[i]);
	}
}
//pipo-btleffectを再生
//再生するx座標,再生するy座標,画像の番号
function pipoEffect(aX,aY,aNum){
	switch (aNum) {
		case "001":
			pipo(aX,aY,aNum,5,"width",{width:600,height:120},"center","center");
			break;
		case "003":
			pipo(aX,aY,aNum,5,"width",{width:600,height:120},"center","center");
			break;
		case "004":
			pipo(aX,aY,aNum,7,"width",{width:840,height:120},"center","center");
			break;
		case "007":
			pipo(aX,aY,aNum,14,"width",{width:1680,height:120},"center","center");
			break;
		case "034":
			pipo(aX,aY,aNum,8,"height",{width:320,height:960},"center",-20);
			break;
		default:

	}
}
//pipo-btleffectを再生
//再生するx座標,再生するy座標,画像の番号,コマ数,コマが並んでいる方向,画像サイズ,マスから右にずらす距離,マスから下にずらす距離
function pipo(aX,aY,aNum,aComa,aComaDir,aSize,aMarginLeft,aMarginTop) {
	let tAnimationTag=document.createElement("div");
	let tEffectTag=document.createElement("img");
	let tMargin="marginTop";
	let aNotComaDir="width";//コマが並んでいる方向の逆方向
	if(aComaDir=="width"){
		aNotComaDir="height";
		tMargin="marginLeft";
	}
	//centerなら画像がキャラの中心にくるようにする
	if(aMarginLeft=="center"){
		if(aComaDir=="width") aMarginLeft=-(((aSize.width/aComa)/2)-32);
		else aMarginLeft=-((aSize.width/2)-32);
	}
	if(aMarginTop=="center"){
		if(aComaDir=="height") aMarginTop=-(((aSize.height/aComa)/2)-32);
		else aMarginTop=-((aSize.height/2)-32);
	}
	let tComaSize=aSize[aComaDir]/aComa;
	tEffectTag.src=getEffectFileName(aNum);
	tAnimationTag.style[aComaDir]=tComaSize+"px";
	tAnimationTag.style[aNotComaDir]=aSize[aNotComaDir]+"px";
	tAnimationTag.style.position="fixed";
	tAnimationTag.style.overflow="hidden";

	//エフェクトをだすマスとその座標
	let tMas=$("#cardTable")[0].getElementsByTagName("tr")[aY].getElementsByTagName("td")[aX];
	let tPosition=tMas.getBoundingClientRect();
	tAnimationTag.style.marginTop=(tPosition.top-5+aMarginTop)+"px";
	tAnimationTag.style.marginLeft=(tPosition.left+5+aMarginLeft)+"px";

	tAnimationTag.appendChild(tEffectTag);
	document.getElementById("effectImages").appendChild(tAnimationTag);

	//画像を順番に変更する
	for(let i=0;i<aComa+1;i++){
		setTimeout(()=>{
			tEffectTag.style[tMargin]=-tComaSize*i+"px";
			if(i==aComa){
				document.getElementById("effectImages").removeChild(tAnimationTag);
				mAnimatingNum--;
				//次のアニメーション
				battleEffectAnimate();
			}
		},100*i);
	}
}
//番号からファイル名を生成
function getEffectFileName(aNum){
	let tFolderName;
	if(Number(aNum)<21){
		tFolderName="戦闘エフェクトアニメ1";
	}
	else{
		tFolderName="戦闘エフェクトアニメ２";
	}
	return "../image/animation/"+tFolderName+"/320×240/pipo-btleffect"+aNum+".png";
}
