var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameUI = (function (_super) {
    __extends(GameUI, _super);
    function GameUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/eui_game/skins/gameSkin.exml";
        return _this;
    }
    GameUI.prototype.uiCompHandler = function () {
        // headIconList
        /// 填充数据
        var startPosition = [
            { x: 158, y: 576 },
            { x: 158, y: 330 },
            { x: 563, y: 106 },
            { x: 892, y: 305 },
        ];
        var dsListIcon = [
            { icon: "head-i-2_png", name: "伊文捷琳", id: "123" },
            { icon: "head-i-2_png", name: "亚特伍德", id: "234" },
            { icon: "head-i-2_png", name: "伊妮德", id: "134" },
            { icon: "head-i-2_png", name: "鲁宾", id: "1234" }
        ];
        startPosition.map(function (v, k) {
            for (var key in v) {
                dsListIcon[k][key] = v[key];
            }
        });
        this._icon0 = new FriendIcon(1, dsListIcon[0]);
        this._icon1 = new FriendIcon(1, dsListIcon[1]);
        this._icon2 = new FriendIcon(1, dsListIcon[2]);
        this._icon3 = new FriendIcon(1, dsListIcon[3]);
        this.addChild(this._icon0);
        this.addChild(this._icon1);
        this.addChild(this._icon2);
        this.addChild(this._icon3);
        this._invent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleInvent, this);
        this._back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backHome, this);
        // 开始游戏  分享
        this.addEventListener(GameEvents.EVT_LOAD_PAGE, this.startGame, this);
    };
    GameUI.prototype.backHome = function (e) {
        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, GamePages.BACK_HOME);
    };
    GameUI.prototype.startGame = function (e) {
        var position = [
            { x: 60, y: 597 },
            { x: 60, y: 293 },
            { x: 206, y: 50 },
            { x: 1209, y: 295 },
        ];
        this._icon0.changeSkin(position[0]);
        this._icon1.changeSkin(position[1]);
        this._icon2.changeSkin(position[2]);
        this._icon3.changeSkin(position[3]);
    };
    GameUI.prototype.handleInvent = function (e) {
        this.removeChild(this._invent);
        this.dispatchEventWith(GameEvents.EVT_LOAD_PAGE, false);
    };
    GameUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return GameUI;
}(eui.Component));
__reflect(GameUI.prototype, "GameUI");
