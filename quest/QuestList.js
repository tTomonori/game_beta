class QuestList{
	static getQuestClass(aNum){
		return QuestList.classList[aNum-1];
	}
	static getQuestNum(){
		return QuestList.classList.length;
	}
}

QuestList.classList=[
	QuestDebug,
	Quest1,
	Quest2,
	Quest3,
	Quest4,
	Quest5,
	Quest6,
	Quest7,
	Quest8,
	Quest9,
	Quest10,
	Quest11,
	Quest12,
	Quest13,
	Quest14,
	Quest15,
	Quest16,
	Quest17,
	Quest18,
	Quest19,
	Quest20,
	Quest21,
	Quest22,
	Quest23
]
