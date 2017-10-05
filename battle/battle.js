//URLから引数を取得
//[[選択されたキャラクター,チーム],...]
const mSelectedCharas=location.search.substring(1).split("&")[0].split("=")[1].split(",");
const mPlayerNum=location.search.substring(1).split("&")[1].split("=")[1].split(",");

//flag==trueのとき操作不能
var mEventFlag=true;
//キャラクターのデータを取得
var mCharaData=loadChara();
//delayのリスト
var mDelayList = new Array();

//トランプ
var mCard=new Array();
// var mBattleBoard=new Array();
//トランプ＋２枚生成
for(let i=0;i<56;i++){
	mCard.push(i);
	//0から12がスペード
	//13から25がクラブ
	//26から38がダイヤ
	//39から51がハート
	//52,53がジョーカー
	//54,55がスカ
}
//シャッフルする
mCard=shuffle(mCard);
//トランプを並べる
displayCard();


//チームのリスト
var mTrueTeam=new Array();
var mFalseTeam=new Array();

//チームの人数を数える
let tTNum=0;
let tFNum=0;
for(let i=1;i<mSelectedCharas.length;i+=2){
	if(mSelectedCharas[i]=="T"){
		tTNum++;
	}
	else{
		tFNum++;
	}
}

//初期配置
let tTCharaPosition;
let tFCharaPosition;
if(tTNum==1){
	tTCharaPosition=[[1,3]]
}
else if(tTNum==2){
	tTCharaPosition=[[1,2],[1,4]]
}
else if(tTNum==3){
	tTCharaPosition=[[1,1],[1,3],[1,5]]
}
if(tFNum==1){
	tFCharaPosition=[[6,3]]
}
else if(tFNum==2){
	tFCharaPosition=[[6,2],[6,4]]
}
else if(tFNum==3){
	tFCharaPosition=[[6,1],[6,3],[6,5]]
}
//実際に配置
for(let i=0;i<mSelectedCharas.length;i+=2){
	if(mSelectedCharas[i+1]=="T"){
		mTrueTeam.push(new Chara(mCharaData[mSelectedCharas[i]],tTCharaPosition[0][0],tTCharaPosition[0][1]))
		tTCharaPosition.shift()
	}
	else{
		mFalseTeam.push(new Chara(mCharaData[mSelectedCharas[i]],tFCharaPosition[0][0],tFCharaPosition[0][1]))
		tFCharaPosition.shift()
	}
}
//初期delayを設定
mDelayList = initDelay(mTrueTeam,mFalseTeam);

//ここまでで初期設定が完了
//バトルのメイン関数
battleMain();



// for(let i=0;i<7;i++){
// 	mBattleBoard.push(mCard.slice(i*8,i*8+8));
// }

//トランプを並べる（表示）
function displayCard() {
	let tTable="";
	for(let i=0;i<7;i++){
		tTable+="<tr>";
		for(let j=0;j<8;j++){
			tTable+="<td style='width:70px;height:20px:position:relative'>";

			let tMark=mCard[i*8+j]/13;
			let tNum=mCard[i*8+j]%13;
			if(tMark>=4){
				if(tNum<=1){
					tNum="JOKER";
				}
				else{
					tNum="";
				}
				tMark="";
			}
			else {
				//マーク
				if(tMark<=1){
					tMark="spade.png";
				}
				if(tMark<=2){
					tMark="club.png";
				}
				if(tMark<=3){
					tMark="diamond.png";
				}
				if(tMark<=4){
					tMark="heart.png";
				}
				//数字
				if(tNum==0){
					tNum="A";
				}
				else if(tNum==10){
					tNum="J";
				}
				else if(tNum==11){
					tNum="Q";
				}
				else if(tNum==12){
					tNum="K";
				}
				else {
					tNum=tNum+1;
				}
			}
			tTable+="<img src='../image/card.png' style='width:70px;height:70px;'>";
			if(tMark!=""){
				tTable+="<img src='../image/"+tMark+"' style='width:50px;height:50px;position:absolute;margin-left:-57px;margin-top:13px'>";
				tTable+="<p style='position:absolute;margin-top:-63px;margin-left:12px'>"+tNum+"</p>";
				// tTable+=mCard[i*7+j];
			}
			else if(tNum=="JOKER"){
				tTable+="<p style='position:absolute;margin-top:-63px;margin-left:12px'>"+"JOKER"+"</p>";

			}

			tTable+="</td>";
		}
		tTable+="</tr>";
	}
	$("#cardTable")[0].innerHTML=tTable;
}

//トランプシャッフル
function shuffle(aCard){
	//取り出す範囲(箱の中)を末尾から狭める繰り返し
	for(let i = aCard.length -1;i>0;i--){
	    //乱数生成を使ってランダムに取り出す値を決める
	    let r = Math.floor(Math.random()*(i+1));
	    //取り出した値と箱の外の先頭の値を交換する
	    let tmp = aCard[i];
	    aCard[i] = aCard[r];
	    aCard[r] = tmp;
	}
	return aCard;
}


////////////////////////////////////////////////////////////////////////////////////////


var mDelayChara = new Array();//選択キャラ[[delay],[チーム],[番号]]
var mMovable = new Array();//移動可能リスト
function battleMain(){
	//ターン管理
	//行動キャラの選択
	mDelayChara = mDelayList[0];//先頭のキャラが一番delayの値が少ない
	mTrueTeam = delayMinus(mTrueTeam,mDelayChara[0]); //全体のdelay値を下げる
	mFalseTeam = delayMinus(mFalseTeam,mDelayChara[0]);//全体のdelay値を下げる

	var tCharaTeam = new Array();
	if(mDelayChara[1]=="T"){
		tCharaTeam = mTrueTeam;
	}
	else{
		tCharaTeam = mFalseTeam;
	}

	//移動
	mMovable = movableSquares(tCharaTeam[mDelayChara[2]]);//移動先のリスト
	//移動先のトランプの色を変えたい


	//操作
	if(mPlayerNum==0){
		mEventFlag = false;//操作可能に
	}
	else{
		com();
	}
}

function com(){
	battleMain();
}

function ClickCards(aX,aY){//ボタン未実装
	if(mEventFlag==true)//操作不可
		return;
	if(mMovable.indexOf([aX,aY])<0)//移動できない
		return;
	mEventFlag = true;//操作不可能に




	//以下、行動後に実装
	//Delay変動
	//判定

	battleMain();
}
