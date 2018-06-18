var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameMode = (function () {
    function GameMode() {
    }
    GameMode.billingMode = 1; // 1:aa 2:房主
    GameMode.type = 121; // 121:红中发财 122:前痞后赖 123 武汉晃晃
    GameMode.winPoints = 1; //1 16 32 64
    GameMode.limitPoints = 300; //300 500
    GameMode.pointType = 131; // 131开口番 132口口番 
    GameMode.totalNum = 4;
    GameMode.inRoom = false;
    GameMode.playerList = [];
    GameMode.isDiscard = false;
    GameMode.joker = []; //赖子
    GameMode.jokerPi = []; //皮
    GameMode.bgmSwitch = false;
    GameMode.soundEffectSwitch = true;
    GameMode.pos = '';
    GameMode.draw = -1; //出的牌
    GameMode.isSP = false; // 只有特殊操作的时候才可以选中多张
    GameMode.gangNum = -1;
    GameMode.chiNum = 0;
    GameMode.canChowChoice = [[]];
    GameMode.option = [];
    GameMode.currentPlayer = '';
    GameMode.upList = [];
    GameMode.userInfo = {};
    GameMode.startGame = false;
    GameMode.actionCard = -1;
    GameMode.gameInfo = '';
    GameMode.accountInfo = {};
    GameMode.hornorJoker = false;
    GameMode.originJoker = false;
    GameMode.isUnderTake = false;
    GameMode.showZhanji = true;
    return GameMode;
}());
__reflect(GameMode.prototype, "GameMode");
