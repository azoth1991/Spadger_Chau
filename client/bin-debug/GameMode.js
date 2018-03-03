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
    GameMode.pointType = 131; // 131 132
    GameMode.totalNum = 4;
    GameMode.inRoom = false;
    GameMode.playerList = [];
    GameMode.isDiscard = false;
    return GameMode;
}());
__reflect(GameMode.prototype, "GameMode");
