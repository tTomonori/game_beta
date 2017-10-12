var mSkillList=[
	//	{NUMBER:番号
	// 	TEXT:表示テキスト
	// 	RANGE:攻撃範囲
	// 	POWER:威力
	// 	DELAY:遅延　1000で表示は１
	// 	SUPPORT_Be_Myself:[]自分にかけるサポート　先
	// 	SUPPORT_Af_Myself:[]自分にかけるサポート　後
	// 	SUPPORT_Be_Enemy:[]敵にかける妨害　範囲はRANGE 先
	// 	SUPPORT_Af_Enemy:[]敵にかける妨害　後
	// 	SUPPORT_Otherwise:[]その他
	// 	F_ATTACK:フレンドアタック
	// },
	{NUMBER:0,
		TEXT:"スカ　何も起こらない",
		RANGE:0,
		POWER:0,
		DELAY:0,
		MAGIC:0,
		SUPPORT_Be_Myself:[],
		SUPPORT_Af_Myself:[],
		SUPPORT_Be_Enemy:[],
		SUPPORT_Af_Enemy:[],
		SUPPORT_Otherwise:[1],
		F_ATTACK:false,
		ANIMATION:[0]
	},
	{NUMBER:1,
		TEXT:"隣のマスに威力５のダメージ",
		RANGE:1,
		POWER:5,
		DELAY:0,
		MAGIC:0,
		SUPPORT_Be_Myself:[],
		SUPPORT_Af_Myself:[],
		SUPPORT_Be_Enemy:[],
		SUPPORT_Af_Enemy:[],
		SUPPORT_Otherwise:[],
		F_ATTACK:false,
		ANIMATION:[0]
	},
	{NUMBER:2,
		TEXT:"２マス隣に威力４のダメージ",
		RANGE:2,
		POWER:4,
		DELAY:0,
		MAGIC:0,
		SUPPORT_Be_Myself:[],
		SUPPORT_Af_Myself:[],
		SUPPORT_Be_Enemy:[],
		SUPPORT_Af_Enemy:[],
		SUPPORT_Otherwise:[],
		F_ATTACK:false,
		ANIMATION:[0]
	},
	{NUMBER:3,
		TEXT:"３マス隣に威力４のダメージ",
		RANGE:3,
		POWER:4,
		DELAY:0,
		MAGIC:0,
		SUPPORT_Be_Myself:[],
		SUPPORT_Af_Myself:[],
		SUPPORT_Be_Enemy:[],
		SUPPORT_Af_Enemy:[],
		SUPPORT_Otherwise:[],
		F_ATTACK:false,
		ANIMATION:[0]
	},
	{NUMBER:4,
		TEXT:"縦一列に威力３のダメージ",
		RANGE:4,
		POWER:3,
		DELAY:0,
		MAGIC:0,
		SUPPORT_Be_Myself:[],
		SUPPORT_Af_Myself:[],
		SUPPORT_Be_Enemy:[],
		SUPPORT_Af_Enemy:[],
		SUPPORT_Otherwise:[],
		F_ATTACK:false,
		ANIMATION:[0]
	},
	{NUMBER:5,
		TEXT:"横一列に威力３ダメージ",
		RANGE:5,
		POWER:3,
		DELAY:0,
		MAGIC:0,
		SUPPORT_Be_Myself:[],
		SUPPORT_Af_Myself:[],
		SUPPORT_Be_Enemy:[],
		SUPPORT_Af_Enemy:[],
		SUPPORT_Otherwise:[],
		F_ATTACK:false,
		ANIMATION:[0]
	},
	{NUMBER:6,
		TEXT:"十字に威力２ダメージ",
		RANGE:6,
		POWER:2,
		DELAY:0,
		MAGIC:0,
		SUPPORT_Be_Myself:[],
		SUPPORT_Af_Myself:[],
		SUPPORT_Be_Enemy:[],
		SUPPORT_Af_Enemy:[],
		SUPPORT_Otherwise:[],
		F_ATTACK:false,
		ANIMATION:[0]
	},
	{NUMBER:7,
		TEXT:"シャッフルしてもう一度行動",
		RANGE:0,
		POWER:0,
		DELAY:0,
		MAGIC:1,
		SUPPORT_Be_Myself:[],
		SUPPORT_Af_Myself:[1],
		SUPPORT_Be_Enemy:[],
		SUPPORT_Af_Enemy:[],
		SUPPORT_Otherwise:[0],
		F_ATTACK:false,
		ANIMATION:[0]
	},
	{NUMBER:8,
		TEXT:"相手全体に威力２のダメージ（DELAY　１０）",
		RANGE:8,
		POWER:2,
		DELAY:10000,
		MAGIC:0,
		SUPPORT_Be_Myself:[],
		SUPPORT_Af_Myself:[],
		SUPPORT_Be_Enemy:[],
		SUPPORT_Af_Enemy:[],
		SUPPORT_Otherwise:[],
		F_ATTACK:false,
		ANIMATION:[0]
	},
	{NUMBER:9,
		TEXT:"周囲８マスに威力３のダメージ",
		RANGE:9,
		POWER:3,
		DELAY:0,
		MAGIC:0,
		SUPPORT_Be_Myself:[],
		SUPPORT_Af_Myself:[],
		SUPPORT_Be_Enemy:[],
		SUPPORT_Af_Enemy:[],
		SUPPORT_Otherwise:[],
		F_ATTACK:false,
		ANIMATION:[0]
	},
	{NUMBER:10,
		TEXT:"隣のマスに敵味方無視の威力７のダメージ（DELAY　５）",
		RANGE:1,
		POWER:7,
		DELAY:5000,
		MAGIC:0,
		SUPPORT_Be_Myself:[],
		SUPPORT_Af_Myself:[],
		SUPPORT_Be_Enemy:[],
		SUPPORT_Af_Enemy:[],
		SUPPORT_Otherwise:[],
		F_ATTACK:true,
		ANIMATION:[4,3]
	},
	{NUMBER:11,
		TEXT:"周囲１２マスに威力５のダメージ（自傷　威力１）",
		RANGE:11,
		POWER:1,
		DELAY:0,
		MAGIC:0,
		SUPPORT_Be_Myself:[0],
		SUPPORT_Af_Myself:[],
		SUPPORT_Be_Enemy:[],
		SUPPORT_Af_Enemy:[],
		SUPPORT_Otherwise:[],
		F_ATTACK:false,
		ANIMATION:[0]
	},
	{NUMBER:12,
		TEXT:"自分に威力５の回復（消費MP３）",
		RANGE:0,
		POWER:0,
		DELAY:0,
		MAGIC:3,
		SUPPORT_Be_Myself:[],
		SUPPORT_Af_Myself:[0],
		SUPPORT_Be_Enemy:[],
		SUPPORT_Af_Enemy:[],
		SUPPORT_Otherwise:[],
		F_ATTACK:false,
		ANIMATION:[7]
	},
	{NUMBER:13,
		TEXT:"味方に威力３の回復（消費MP４）",
		RANGE:13,
		POWER:-3,
		DELAY:0,
		MAGIC:4,
		SUPPORT_Be_Myself:[],
		SUPPORT_Af_Myself:[],
		SUPPORT_Be_Enemy:[],
		SUPPORT_Af_Enemy:[],
		SUPPORT_Otherwise:[],
		F_ATTACK:true,
		ANIMATION:[7]
	},
	{NUMBER:14,
		TEXT:"相手全体に威力5のダメージ その後シャッフル",
		RANGE:8,
		POWER:5,
		DELAY:0,
		MAGIC:0,
		SUPPORT_Be_Myself:[],
		SUPPORT_Af_Myself:[],
		SUPPORT_Be_Enemy:[],
		SUPPORT_Af_Enemy:[],
		SUPPORT_Otherwise:[0,1],
		F_ATTACK:false,
		ANIMATION:[34]
	},
	{NUMBER:15,
		TEXT:"MPを３回復",
		RANGE:0,
		POWER:0,
		DELAY:0,
		MAGIC:0,
		SUPPORT_Be_Myself:[1],
		SUPPORT_Af_Myself:[],
		SUPPORT_Be_Enemy:[],
		SUPPORT_Af_Enemy:[],
		SUPPORT_Otherwise:[],
		F_ATTACK:false,
		ANIMATION:[15]
	},
	{NUMBER:16,
		TEXT:"相手全体に威力２０のダメージ その後シャッフル 消費MP２０",
		RANGE:8,
		POWER:20,
		DELAY:0,
		MAGIC:20,
		SUPPORT_Be_Myself:[],
		SUPPORT_Af_Myself:[],
		SUPPORT_Be_Enemy:[],
		SUPPORT_Af_Enemy:[],
		SUPPORT_Otherwise:[0,1],
		F_ATTACK:false,
		ANIMATION:[23]
	},
	{NUMBER:-1,
		TEXT:"",
		RANGE:2,
		POWER:1,
		DELAY:0,
		MAGIC:0,
		SUPPORT_Be_Myself:[],
		SUPPORT_Af_Myself:[],
		SUPPORT_Be_Enemy:[],
		SUPPORT_Af_Enemy:[],
		SUPPORT_Otherwise:[],
		F_ATTACK:false,
		ANIMATION:[0]
	},
]
