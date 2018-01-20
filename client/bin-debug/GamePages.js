var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GamePages = (function () {
    function GamePages() {
    }
    GamePages.CREATE_ROOM = "CREATE_ROOM";
    GamePages.ENTER_ROOM = "ENTER_ROOM";
    GamePages.MY_ROOM = "MY_ROOM";
    return GamePages;
}());
__reflect(GamePages.prototype, "GamePages");
