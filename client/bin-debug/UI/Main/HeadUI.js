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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var HeadUI = (function (_super) {
    __extends(HeadUI, _super);
    function HeadUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/eui_main/skins/headSkin.exml";
        _this.info = __assign({}, GameMode.accountInfo, GameMode.userInfo);
        console.log(11111, _this.info);
        return _this;
    }
    HeadUI.prototype.uiCompHandler = function () {
        this._addTool.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dialogHandler, this);
        this._addMoney.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dialogHandler, this);
        this._addCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dialogHandler, this);
    };
    HeadUI.prototype.dialogHandler = function (evt) {
        GameSound.playClickSound();
        switch (evt.currentTarget) {
            case this._addTool:
                this._shopType = ShopTypes.ADDTOOL;
                break;
            case this._addMoney:
                this._shopType = ShopTypes.ADDMONEY;
                break;
            case this._addCard:
                this._shopType = ShopTypes.ADDCARD;
                break;
        }
        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_SHOW_DIALOG, { type: DialogTypes.SHOP, data: { shopType: this._shopType } });
    };
    HeadUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return HeadUI;
}(eui.Component));
__reflect(HeadUI.prototype, "HeadUI");
