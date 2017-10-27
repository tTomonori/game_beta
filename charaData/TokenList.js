//クエストで登場させないトークンはこのクラスに追加する必要なし
class TokenList{
	static getTokenClass(aNum){
		return TokenList.classList[aNum];
	}
}

TokenList.classList=[
	Gosuto,
	Zonbi,
	Satan
]
