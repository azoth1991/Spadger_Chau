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
var DialogUI = (function (_super) {
    __extends(DialogUI, _super);
    function DialogUI(data) {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/eui_main/skins/dialogSkin.exml";
        return _this;
    }
    DialogUI.prototype.uiCompHandler = function () {
        this._back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backHome, this);
    };
    DialogUI.prototype.backHome = function (e) {
        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, GamePages.BACK_HOME);
    };
    DialogUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return DialogUI;
}(eui.Component));
__reflect(DialogUI.prototype, "DialogUI");
