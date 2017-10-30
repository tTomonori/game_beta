class QuestList{
	static getQuestClass(aNum){
		return QuestList.classList[aNum-1];
	}
}

QuestList.classList=[
	Quest1,
	Quest2,
	Quest3,
	Quest4
]
