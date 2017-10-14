function Support_B_M(aSupportnums,aChara){
	return new Promise((res,rej)=>{
		if(aSupportnums.length>0){
			Support_B_M_Play(aSupportnums[0],aChara).then(()=>{
				aSupportnums.shift()
				Support_B_M(aSupportnums,aChara).then(()=>{
					res();
				})
			})
		}
		else
		res();
	})
}

function Support_B_M_Play(aSupportnum,aChara) {
	return new Promise((res,rej)=>{
	// if(var i=0;i<aSupportnums.length;i++){
		switch (aSupportnum) {
			case 0:
				break;
			case 1://MPを3回復
				var tGainMP = 3;

				var tCard=mCard[aChara.x+aChara.y*8];
				if(tCard[1]==aChara.TYPE){
					tGainMP++;//同タイプでさらに１回復
				}
				aChara.MP += tGainMP;

				if(aChara.MP>aChara.originalMP) aChara.MP=aChara.originalMP;
				freeLog(aChara,"MP",tGainMP+"回復")
				attackAnimate(aChara,aChara,[15],()=>{
				 res()})
				break;
			case 2:
				break;
			case 3:
				break;
			default:
				res();
		}
	})
}

function Support_A_M(aSupportnums,aChara){
	return new Promise((res,rej)=>{
		if(aSupportnums.length>0){
			Support_A_M_Play(aSupportnums[0],aChara).then(()=>{
				aSupportnums.shift();
				Support_A_M(aSupportnums,aChara).then(()=>{
					res();
				})
			})
		}
		else
			res();
	})
}
function Support_A_M_Play(aSupportnum,aChara) {
	return new Promise((res,rej)=>{
	// for(var i=0;i<aSupportnums.length;i++){
		switch (aSupportnum) {
			case 0:
				var tDelay = Math.floor(50000/aChara.SPD);//効果値50
				aChara.Delay= (-tDelay);
				freeLog(aChara,"DELAY","50下がった")
				attackAnimate(aChara,aChara,[7],()=>{
				res()})
				break;
			case 1:
				var tDelay = Math.floor(100000/aChara.SPD);//初期値
				aChara.Delay= (-tDelay);
				res();
				break;
			case 2:
				var tRandom = Math.floor(Math.random()*4)
				if(tRandom==0){
					tRandom = "spade";
				}
				else if(tRandom==1){
					tRandom = "club";
				}
				else if(tRandom==2){
					tRandom = "diamond";
				}
				else if(tRandom==3){
					tRandom = "heart";
				}
				aChara.TYPE = tRandom;
				freeLog(aChara,"タイプ",tRandom+"に変わった")
				attackAnimate(aChara,aChara,[10],()=>{
				res()})
				break;
			case 3:
				var tUp = 2;
				var tCard=mCard[aChara.x+aChara.y*8];
				if(tCard[1]==aChara.TYPE){
					tUp++;//同タイプでさらに１アップ
				}
				aChara.ATK += tUp;
				freeLog(aChara,"ATK",tUp+"アップ")
				attackAnimate(aChara,aChara,[19],()=>{
				 res()})
				break;
			case 4:
				var tUp = 2;
				var tCard=mCard[aChara.x+aChara.y*8];
				if(tCard[1]==aChara.TYPE){
					tUp++;//同タイプでさらに１アップ
				}
				aChara.DEF += tUp;
				freeLog(aChara,"DEF",tUp+"アップ")
				attackAnimate(aChara,aChara,[19],()=>{
				 res()})
				break;
			case 5:
				var tUp = 2;
				var tCard=mCard[aChara.x+aChara.y*8];
				if(tCard[1]==aChara.TYPE){
					tUp++;//同タイプでさらに１アップ
				}
				aChara.SPD += tUp;
				freeLog(aChara,"SPD",tUp+"アップ")
				attackAnimate(aChara,aChara,[19],()=>{
				 res()})
				break;
			case 6:
				var tUp = 1;
				aChara.MOV += tUp;
				freeLog(aChara,"MOV",tUp+"アップ")
				attackAnimate(aChara,aChara,[19],()=>{
				 res()})
				break;
			case 7:
				var tUp = 1;
				aChara.ATK = aChara.originalATK;
				aChara.DEF = aChara.originalDEF;
				aChara.SPD = aChara.originalSPD;
				aChara.MOV = aChara.originalMOV;
				freeLog(aChara,"ステータス","元に戻った")
				attackAnimate(aChara,aChara,[20],()=>{
				 res()})
				break;
			default:
				res();
		}
	})
}

function Support_B_E(aSupportnums,aChara){
	return new Promise((res,rej)=>{
		if(aSupportnums.length>0){
			Support_B_E_Play(aSupportnums[0],aChara).then(()=>{
				aSupportnums.shift();
				Support_B_E(aSupportnums,aChara).then(()=>{
					res();
				})
			})
		}
		else
		res();
	})
}
function Support_B_E_Play(aSupportnum,aChara) {
	return new Promise((res,rej)=>{
	// for(var i=0;i<aSupportnums.length;i++){
		switch (aSupportnum) {
			case 0:
				break;
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			default:

		}
		res();
	})
}

function Support_A_E(aSupportnums,aChara){
	return new Promise((res,rej)=>{
		if(aSupportnums.length>0){
			Support_A_E_Play(aSupportnums[0],aChara).then(()=>{
				aSupportnums.shift();
				Support_A_E(aSupportnums,aChara).then(()=>{
					res();
				})
			})
		}
		else
		res();
	})
}
function Support_A_E_Play(aSupportnum,aChara) {
	return new Promise((res,rej)=>{
		console.log(aSupportnum)
	// for(var i=0;i<aSupportnums.length;i++){
		switch (aSupportnum) {
			case 0://ディレイを50下げる
				aChara.minusDelay(50000);
				attackAnimate(aChara,aChara,[9],()=>{
				sortDelayList();
				res()})
				break;
			case 1://ディレイを50下げる
				aChara.minusDelay(100000);
				attackAnimate(aChara,aChara,[9],()=>{
				sortDelayList();
				res()})
				break;
			case 2://MPを2回復
				aChara.addMp(2)
				attackAnimate(aChara,aChara,[15],()=>{
				res()})
				break;
			case 3:
				break;
			default:
			res();
		}
	})
}

function Support_O(aSupportnums,aChara){
	return new Promise((res,rej)=>{
		if(aSupportnums.length>0){
			Support_O_Play(aSupportnums[0],aChara).then(()=>{
				aSupportnums.shift();
				Support_O(aSupportnums,aChara).then(()=>{
					res();
				})
			})
		}
		else
		res();
	})
}
function Support_O_Play(aSupportnum,aChara) {
	return new Promise((res,rej)=>{
	// for(var i=0;i<aSupportnums.length;i++){
		switch (aSupportnum) {
			case 0:
				//シャッフルする
				shuffleAnimate(mCard).then(()=>{
				addLog("シャッフル");
				res();
				})

				break;
			case 1://裏カードを表に向ける
				$("#cardTable")[0].getElementsByTagName("tr")[aChara.y].getElementsByTagName("td")[aChara.x].getElementsByTagName("img")[0].src="../image/card.png";
				res();
				break;
			case 2:
				break;
			case 3:
				break;
			default:
			res();
		}
	})
}
