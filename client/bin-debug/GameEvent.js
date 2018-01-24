var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameEvents = (function () {
    function GameEvents() {
    }
    GameEvents.EVT_RETURN = "EVT_RETURN";
    GameEvents.EVT_LOAD_PAGE = "EVT_LOAD_PAGE";
    GameEvents.EVT_CLOSE_ABOUT = "EVT_CLOSE_ABOUT";
    GameEvents.EVT_START_GAME = "EVT_START_GAME";
    return GameEvents;
}());
__reflect(GameEvents.prototype, "GameEvents");
