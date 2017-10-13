function Support_B_M(aSupportnums,aChara){
	return new Promise((res,rej)=>{
		if(aSupportnums.length>0){
			Support_B_M_Play(aSupportnums[0],aChara).then(()=>{
				Support_B_M(aSupportnums.shift,aChara).then(()=>{
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
			case 0://自傷　威力１
				var tDamege = calcDamage(aChara.ATK,aChara.DEF,1);

				var tCard=mCard[aChara.x+aChara.y*8];
				if(tCard[1]==aChara.TYPE){
					tDamege = Math.floor(tDamege*1.5);
				}

				aChara.HP-=tDamege;
				damageLog(aChara,tDamege);
				displayStatus();
				if(aChara.HP<=0){
					aChara.HP=0;
					if(aChara.team=="T"){
						winner("F");
					}
					else{
						winner("T");
					}
				}

				res();
				break;
			case 1://MPを3回復
				aChara.MP += 3;

				var tCard=mCard[aChara.x+aChara.y*8];
				if(tCard[1]==aChara.TYPE){
					aChara.MP+=1;//同タイプでさらに１回復
				}

				if(aChara.MP>aChara.originalMP) aChara.MP=aChara.originalMP;
				freeLog(aChara,"MP","3回復")
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
				Support_A_M(aSupportnums.shift,aChara).then(()=>{
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
			case 0://威力５の回復
				var tDamege = calcDamage(aChara.ATK,aChara.DEF,5);
				var tCard=mCard[aChara.x+aChara.y*8];
				if(tCard[1]==aChara.TYPE){
					tDamege = Math.floor(tDamege*1.5);
				}

				aChara.HP+=tDamege;
				damageLog(aChara,-tDamege);
				if(aChara.HP>aChara.originalHP){
					aChara.HP = aChara.originalHP;
				}
				displayStatus();
				break;
			case 1:
				var tDelay = Math.floor(100000/aChara.SPD);//初期値
				aChara.Delay= (-tDelay);
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

function Support_B_E(aSupportnums,aChara){
	return new Promise((res,rej)=>{
		if(aSupportnums.length>0){
			Support_B_E_Play(aSupportnums[0],aChara).then(()=>{
				Support_B_E(aSupportnums.shift,aChara).then(()=>{
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
				Support_A_E(aSupportnums.shift,aChara).then(()=>{
					res();
				})
			})
		}
		else
		res();
	})
}
function Support_A_E_Play(aSupportnum,aChara) {
	new Promise((res,rej)=>{
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

function Support_O(aSupportnums,aChara){
	return new Promise((res,rej)=>{
		if(aSupportnums.length>0){
			Support_O_Play(aSupportnums[0],aChara).then(()=>{
				Support_O(aSupportnums.shift,aChara).then(()=>{
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
				mCard=shuffle(mCard);
				//トランプを並べる
				displayCard();
				addLog("シャッフル");
				break;
			case 1://裏カードを表に向ける
				$("#cardTable")[0].getElementsByTagName("tr")[aChara.y].getElementsByTagName("td")[aChara.x].getElementsByTagName("img")[0].src="../image/card.png";
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
