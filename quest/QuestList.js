class QuestList{
	static getQuestClass(aNum){
		return QuestList.classList[aNum-1];
	}
	static getQuestNum(){
		return QuestList.classList.length;
	}
}

QuestList.classList=[
	QuestDebug,//運に身を任せ
	Quest1,//小手調べ
	Quest2,//二人の騎士との決闘
	Quest12,//力比べ:オオクニヌシ
	Quest3,//ゾンビの大群を全滅させよ
	Quest19,//森のゴブリン
	Quest5,//ボス:ウンディーネの討伐
	Quest6,//洗脳された王女を救出せよ
	Quest8,//ダイヤ探索隊
	Quest7,//王国のスパイ
	Quest10,//荒れ狂う騎士
	Quest18,//ドラゴン討伐隊
	Quest13,//力比べ:ランスロット
	Quest16,//ハロウィンパーティー
	Quest9,//強敵 インビジブル
	Quest14,//鉄壁のバルキリー
	Quest22,//寂しがりのザーウィン
	Quest21,//疾風の獣
	Quest4,//狙われた妖精を守り抜け
	Quest20,//突撃!! 幽霊屋敷
	Quest11,//強敵 維持神
	Quest15,//覚醒少女
	Quest17,//3人の女戦士
	Quest23//トランプナイト
]
