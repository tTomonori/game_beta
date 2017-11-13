var db;
// var NeDB=require("nedb")
var NeDB=require(__dirname+"/../node_modules/nedb")

//ファイルを開く
//パッケージ化の時用
// loadDB(__dirname+"/../../../../../savedata/questData.db")
//開発中の時用
loadDB(__dirname+"/../savedata/questData.db")
function loadDB(aFilePath){
	let fileName=aFilePath;
	db=new NeDB({
		filename:fileName,
		autoload:true
	})
}

//引数の番号のクエストがクリア済みならCallBackの引数にtrue
function isQuestCrelar(aNum,aCallBack){
	db.find({Data:"quest",Num:aNum},(err,doc)=>{
		let tIsClear;
		if(doc.length==0) tIsClear=false;
		else{
			if(doc[0].Value=="clear") tIsClear=true;
		}
		aCallBack(tIsClear)
	})
}
//引数の番号のクエストをクリアしたことをセーブ
function saveQuestClear(aNum){
	db.insert({Data:"quest",Num:aNum,Value:"clear",_id:"q"+aNum})
}
