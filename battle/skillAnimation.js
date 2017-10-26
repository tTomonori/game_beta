var mAttackCharaOfAnimation;//攻撃するキャラ
var mDamagedCharaOfAnimation;//攻撃されるキャラ
var mAnimationNumList;//アニメーションの番号のリスト
var mAnimationNum;//再生するアニメーションのindex
var mCallbackOfAnimation;//アニメーション終了時に実行する関数
var mAnimatingNum;//実行中のアニメーションの数
function attackAnimate(aAttackChara,aDamagedChara,aAnimationNumList,aCallback){
	// mAttackCharaOfAnimation=aAttackChara;
	// mDamagedCharaOfAnimation=aDamagedCharas;
	// mAnimationNumList=aAnimationNumList;
	// mAnimationNum=0;
	// mCallbackOfAnimation=aCallback;
	// mAnimatingNum=0;
	battleEffectAnimate({"Attack":aAttackChara,"Defence":aDamagedChara,"List":aAnimationNumList,"Num":0,"Function":aCallback});
}

function battleEffectAnimate(aData){
	//アニメーションが全て終了
	if(aData.List.length<=aData.Num) aData.Function();

	switch (aData.List[aData.Num++]) {
		case 0:
				pipoEffect(aData.Defence.x,aData.Defence.y,"001",aData);
			break;
		case 2:
				pipoEffect(aData.Defence.x,aData.Defence.y,"002",aData);
			break;
		case 3:
			pipoEffect(aData.Defence.x,aData.Defence.y,"003",aData);
			break;
		case 4:
			pipoEffect(aData.Defence.x,aData.Defence.y,"004",aData);
			break;
		case 5:
			pipoEffect(aData.Defence.x,aData.Defence.y,"005",aData);
			break;
		case 6:
			pipoEffect(aData.Defence.x,aData.Defence.y,"006",aData);
			break;
		case 7:
			pipoEffect(aData.Defence.x,aData.Defence.y,"007",aData);
			break;
		case 9:
			pipoEffect(aData.Defence.x,aData.Defence.y,"009",aData);
			break;
		case 10:
			pipoEffect(aData.Defence.x,aData.Defence.y,"010",aData);
			break;
		case 12:
			pipoEffect(aData.Defence.x,aData.Defence.y,"012",aData);
			break;
		case 15:
			pipoEffect(aData.Defence.x,aData.Defence.y,"015",aData);
			break;
		case 17:
			pipoEffect(aData.Defence.x,aData.Defence.y,"017",aData);
			break;
		case 18:
			pipoEffect(aData.Defence.x,aData.Defence.y,"018",aData);
			break;
		case 19:
			pipoEffect(aData.Defence.x,aData.Defence.y,"019",aData);
			break;
		case 20:
			pipoEffect(aData.Defence.x,aData.Defence.y,"020",aData);
			break;
		case 23:
			pipoEffect(aData.Defence.x,aData.Defence.y,"023",aData);
			break;
		case 24:
			pipoEffect(aData.Defence.x,aData.Defence.y,"024",aData);
			break;
		case 25:
			pipoEffect(aData.Defence.x,aData.Defence.y,"025",aData);
			break;
		case 34:
			pipoEffect(aData.Defence.x,aData.Defence.y,"034",aData);
			break;
		case 36:
			pipoEffect(aData.Defence.x,aData.Defence.y,"036",aData);
			break;
		case 37:
			pipoEffect(aData.Defence.x,aData.Defence.y,"037",aData);
			break;
		case 39:
			pipoEffect(aData.Defence.x,aData.Defence.y,"039",aData);
			break;
		default:

	}
}
// //list内の全てのキャラ対してアニメーションを再生
// function animateAllChara(aTargetCharaList,aAnimationFunction){
// 	if(aTargetCharaList.length==0) battleEffectAnimate();
// 	for(let i=0;i<aTargetCharaList.length;i++){
// 		mAnimatingNum++;
// 		aAnimationFunction(aTargetCharaList[i]);
// 	}
// }
//pipo-btleffectを再生
//再生するx座標,再生するy座標,画像の番号
function pipoEffect(aX,aY,aNum,aData){
	switch (aNum) {
		case "001":
			pipo(aX,aY,aNum,5,"width",{width:600,height:120},"center","center",aData);
			break;
		case "002":
			pipo(aX,aY,aNum,9,"width",{width:1080,height:120},"center","center",aData);
			break;
		case "003":
			pipo(aX,aY,aNum,5,"width",{width:600,height:120},"center","center",aData);
			break;
		case "004":
			pipo(aX,aY,aNum,7,"width",{width:840,height:120},"center","center",aData);
			break;
		case "005":
			pipo(aX,aY,aNum,9,"width",{width:1080,height:120},"center","center",aData,"revers");
			break;
		case "006":
			pipo(aX,aY,aNum,7,"width",{width:840,height:120},"center","center",aData,"revers");
			break;
		case "007":
			pipo(aX,aY,aNum,14,"width",{width:1680,height:120},"center","center",aData);
			break;
		case "009":
			pipo(aX,aY,aNum,8,"width",{width:960,height:120},"center","center",aData);
			break;
		case "010":
			pipo(aX,aY,aNum,8,"width",{width:960,height:120},"center","center",aData);
			break;
		case "012":
			pipo(aX,aY,aNum,9,"height",{width:320,height:1080},"center","center",aData);
			break;
		case "015":
			pipo(aX,aY,aNum,8,"width",{width:960,height:120},"center","center",aData);
			break;
		case "017":
			pipo(aX,aY,aNum,8,"width",{width:960,height:120},"center","center",aData);
			break;
		case "018":
			pipo(aX,aY,aNum,8,"width",{width:960,height:120},"center","center",aData);
			break;
		case "019":
			pipo(aX,aY,aNum,10,"width",{width:1200,height:120},"center","center",aData);
			break;
		case "020":
			pipo(aX,aY,aNum,10,"width",{width:1200,height:120},"center","center",aData);
			break;
		case "023":
			pipo(aX,aY,aNum,9,"height",{width:320,height:1080},"center",-20,aData);
			break;
		case "024":
			pipo(aX,aY,aNum,8,"width",{width:960,height:120},"center","center",aData);
			break;
		case "025":
			pipo(aX,aY,aNum,8,"width",{width:960,height:120},"center","center",aData);
			break;
		case "034":
			pipo(aX,aY,aNum,8,"height",{width:320,height:960},"center",-20,aData);
			break;
		case "036":
			pipo(aX,aY,aNum,7,"width",{width:840,height:120},"center","center",aData);
			break
		case "037":
			pipo(aX,aY,aNum,8,"width",{width:960,height:120},"center","center",aData);
			break;
		case "039":
			pipo(aX,aY,aNum,8,"width",{width:960,height:120},"center","center",aData);
			break;
		default:

	}
}
//pipo-btleffectを再生
//再生するx座標,再生するy座標,画像の番号,コマ数,コマが並んでいる方向,画像サイズ,マスから右にずらす距離,マスから下にずらす距離
function pipo(aX,aY,aNum,aComa,aComaDir,aSize,aMarginLeft,aMarginTop,aData,aRevers) {
	let tAnimationTag=document.createElement("div");
	let tEffectTag=document.createElement("img");
	if(aRevers=="revers"){//画像を上下反転
		tEffectTag.style.transform="scale(1, -1)";
	}
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
				battleEffectAnimate(aData);
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
	else if(Number(aNum)<43){
		tFolderName="戦闘エフェクトアニメ２";
	}
	else if(Number(aNum)<72){
		tFolderName="戦闘エフェクトアニメ８";
	}
	return "../image/animation/"+tFolderName+"/320×240/pipo-btleffect"+aNum+".png";
}
