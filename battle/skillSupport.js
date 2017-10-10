function Support_B_M(aSupportnums,aChara) {
	for(var i=0;i<aSupportnums.length;i++){
		switch (aSupportnums[i]) {
			case 0://自傷　威力１
				var tDamege = calcDamage(aChara.ATK,aChara.DEF,1);

				var tCard=mCard[aChara.x+aChara.y*8];
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
			case 0://威力５の回復
				var tDamege = calcDamage(aChara.ATK,aChara.DEF,5);
				var tCard=mCard[aChara.x+aChara.y*8];
				if(tCard[1]==aChara.TYPE){
					tDamege *= Math.floor(tDamege*1.5);
				}

				aChara.HP+=tDamege;
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
	}
}
function Support_B_E(aSupportnums,aChara) {
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
function Support_A_E(aSupportnums,aChara) {
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
function Support_O(aSupportnums,aChara) {
	for(var i=0;i<aSupportnums.length;i++){
		switch (aSupportnums[i]) {
			case 0:
				//シャッフルする
				mCard=shuffle(mCard);
				//トランプを並べる
				displayCard();
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
	}
}