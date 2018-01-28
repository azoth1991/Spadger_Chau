var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameEvents = (function () {
    function GameEvents() {
    }
    GameEvents.EVT_SHOW_DIALOG = "EVT_SHOW_DIALOG";
    GameEvents.EVT_LOAD_PAGE = "EVT_LOAD_PAGE";
    return GameEvents;
}());
__reflect(GameEvents.prototype, "GameEvents");
