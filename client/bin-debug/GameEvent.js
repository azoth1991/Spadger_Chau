var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameEvents = (function () {
    function GameEvents() {
    }
    GameEvents.EVT_SHOW_DIALOG = "EVT_SHOW_DIALOG";
    GameEvents.EVT_LOAD_PAGE = "EVT_LOAD_PAGE";
    GameEvents.WS_ENTER_ROOM = "WS_ENTER_ROOM";
    GameEvents.WS_READY = "WS_READY";
    GameEvents.WS_START = "WS_START";
    GameEvents.WS_JOIN = "WS_JOIN";
    GameEvents.WS_GET_CHAT = "WS_GET_CHAT";
    GameEvents.WS_SEND_CHAT = "WS_SEND_CHAT";
    GameEvents.WS_SEND_CARD = "WS_SEND_CARD";
    GameEvents.pageReadyHandler = "pageReadyHandler";
    GameEvents.TOGGLE_SETTING = "TOGGLE_SETTING";
    GameEvents.WS_GET_CARD = "WS_GET_CARD";
    GameEvents.WS_HU = "WS_HU";
    GameEvents.WS_GANG = "WS_GANG";
    GameEvents.WS_CHI = "WS_CHI";
    GameEvents.WS_PENG = "WS_PENG";
    GameEvents.WS_GUO = "WS_GUO";
    GameEvents.WS_GAMEOVER = "WS_GAMEOVER";
    GameEvents.WS_SEND_DISCARDSTATUS = "WS_SEND_DISCARDSTATUS";
    GameEvents.WS_SEND_CARDSTATUS = "WS_SEND_CARDSTATUS";
    GameEvents.WS_GET_DISCARDPOS = "WS_GET_DISCARDPOS";
    GameEvents.WS_GET_DISCARDSTATUS = "WS_GET_DISCARDSTATUS";
    GameEvents.WS_GET_DISCARDSPS = "WS_GET_DISCARDSPS";
    GameEvents.TOGGLE_CREATEROOM = "TOGGLE_CREATEROOM";
    GameEvents.TOGGLE_USETOOL = "TOGGLE_USETOOL";
    GameEvents.WS_SHOW_DRAW = "WS_SHOW_DRAW";
    GameEvents.DOWN_CARDS = "DOWN_CARDS";
    GameEvents.WS_GANG_NUM = "WS_GANG_NUM";
    GameEvents.HIDE_DISCARDSP = "HIDE_DISCARDSP";
    GameEvents.WS_CONTINUE = "WS_CONTINUE";
    return GameEvents;
}());
__reflect(GameEvents.prototype, "GameEvents");
