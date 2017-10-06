function Support_B_M(aSupportnums,aChara) {
	for(var i=0;i<aSupportnums.length;i++){
		switch (aSupportnums[i]) {
			case 0:
				var tDamege = calcDamage(aChara.ATK,aChara.DEF);

				if(tCard[1]==aChara.TYPE){
					tDamege *= Math.floor(tDamege*1.5);
				}

				aChara.HP-=tDamege;
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
				break;
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			default:

		}
	}
}
function Support_A_M(aSupportnums,aChara) {
	for(var i=0;i<aSupportnums.length;i++){
		switch (aSupportnums[i]) {
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
	}
}
function Support_B_E(aSupportnums) {
	for(var i=0;i<aSupportnums.length;i++){
		switch (aSupportnums[i]) {
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
	}
}
function Support_A_E(aSupportnums) {
	for(var i=0;i<aSupportnums.length;i++){
		switch (aSupportnums[i]) {
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
	}
}
function Support_O(aSupportnums) {
	for(var i=0;i<aSupportnums.length;i++){
		switch (aSupportnums[i]) {
			case 0:
				//シャッフルする
				mCard=shuffle(mCard);
				//トランプを並べる
				displayCard();
				break;
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			default:

		}
	}
}