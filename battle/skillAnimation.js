var mAttackCharaOfAnimation;
var mDamagedCharaOfAnimation;
var mAnimationNumList;
var mAnimationNum;
var mCallbackOfAnimation;
var mAnimatingNum;
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
	if(mAnimatingNum!=0) return;
	//アニメーションが全て終了
	if(mAnimationNumList.length<=mAnimationNum) mCallbackOfAnimation();

	switch (mAnimationNumList[mAnimationNum++]) {
		case 0:
			animateAllChara(mDamagedCharaOfAnimation,(aChara)=>{
				pipoEffect(aChara.x,aChara.y,"001");
			})
			break;
		default:

	}
}
function animateAllChara(aTargetCharaList,aAnimationFunction){
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
			pipo(aX,aY,"001",5,600,120);
			break;
		default:

	}
}
//pipo-btleffectを再生
//再生するx座標,再生するy座標,画像の番号,コマ数,画像の幅,画像の高さ
function pipo(aX,aY,aNum,aComa,aWidth,aHeight) {
	let tAnimationTag=document.createElement("div");
	let tEffectTag=document.createElement("img");
	tEffectTag.src=getEffectFileName(aNum);
	tAnimationTag.style.width=(aWidth/aComa)+"px";
	tAnimationTag.style.height=(aHeight)+"px";
	tAnimationTag.style.position="fixed";
	tAnimationTag.style.overflow="hidden";

	tAnimationTag.appendChild(tEffectTag);
	document.getElementsByTagName("body")[0].appendChild(tAnimationTag);

	
}
//番号からファイル名を生成
function getEffectFileName(aNum){
	let tFolderName;
	if(Number(aNum)<21){
		tFolderName="戦闘エフェクトアニメ1";
	}
	else{
		tFolderName="戦闘エフェクトアニメ2";
	}
	return "../image/animation/"+tFolderName+"/320×240/pipo-btleffect"+aNum+".png";
}
