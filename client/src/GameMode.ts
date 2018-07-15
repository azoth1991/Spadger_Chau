class GameMode{
    public static billingMode = 1;// 1:aa 2:房主
    public static type = 121;// 121:红中发财 122:前痞后赖 123 武汉晃晃
    public static winPoints = 1; //1 16 32 64
    public static limitPoints = 400; //400 500
    public static pointType = 131;// 131开口番 132口口番 
    public static totalNum = 4;
    public static roomId;
    public static wechatId;
    public static inRoom = false;
    public static playerList = [];
    public static isDiscard = false;
    public static joker = []; //赖子
    public static jokerPi = []; //皮
    public static bgmSwitch = false;
    public static soundEffectSwitch = true; 
    public static pos = '';
    public static draw = -1; //出的牌
    public static isSP = false; // 只有特殊操作的时候才可以选中多张
    public static gangNum = -1;
    public static chiNum = 0;
    public static kongNum = 0;
    public static canChowChoice = [[]];
    public static canKongChoice = [];
    public static option = [];
    public static currentPlayer = '';
    public static upList = [];
    public static userInfo = {};
    public static startGame = false;
    public static actionCard = -1;
    public static gameInfo = '';
    public static accountInfo = {};
    public static hornorJoker = false;
    public static originJoker = false;
    public static isUnderTake = false;
    public static showZhanji = false;
    public static totalCard = '82';
    public static zhuangid = '';

}