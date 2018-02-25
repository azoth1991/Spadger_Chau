var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameMode = (function () {
    function GameMode() {
    }
    GameMode.billingMode = 1; // 1:aa 2:房主
    GameMode.type = 1; // 1:红中发财 2:前痞后赖
    GameMode.winPoints = 1; //1 16 32 64
    GameMode.limitPoints = 300; //300 500
    GameMode.totalNum = 4;
    GameMode.inRoom = false;
    GameMode.playerList = [];
    return GameMode;
}());
__reflect(GameMode.prototype, "GameMode");
