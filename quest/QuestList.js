class QuestList{
	static getQuestClass(aNum){
		return QuestList.classList[aNum-1];
	}
	static getQuestNum(){
		return QuestList.classList.length;
	}
}

QuestList.classList=[
	Quest1,
	Quest2,
	Quest3,
	Quest4,
	Quest5
]