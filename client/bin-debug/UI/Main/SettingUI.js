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
var SettingUI = (function (_super) {
    __extends(SettingUI, _super);
    function SettingUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/eui_main/skins/settingSkin.exml";
        return _this;
    }
    SettingUI.prototype.uiCompHandler = function () {
        var _this = this;
        this.initData();
        this._close.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            MessageCenter.getInstance().sendMessage(GameEvents.TOGGLE_SETTING, null);
        }, this);
        var rdlist = [this.radio1, this.radio2, this.radio3, this.radio4, this.radio5, this.radio6, this.radio7, this.radio8, this.radio9, this.radio10];
        rdlist.forEach(function (rd) {
            rd.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
                switch (evt.currentTarget) {
                    case _this.radio1:
                        GameMode.billingMode = 1;
                        break;
                    case _this.radio2:
                        GameMode.billingMode = 2;
                        break;
                    case _this.radio3:
                        GameMode.type = 1;
                        break;
                    case _this.radio4:
                        GameMode.type = 2;
                        break;
                    case _this.radio5:
                        GameMode.winPoints = 1;
                        break;
                    case _this.radio6:
                        GameMode.winPoints = 16;
                        break;
                    case _this.radio7:
                        GameMode.winPoints = 32;
                        break;
                    case _this.radio8:
                        GameMode.winPoints = 64;
                        break;
                    case _this.radio9:
                        GameMode.limitPoints = 300;
                        break;
                    case _this.radio10:
                        GameMode.limitPoints = 500;
                        break;
                }
            }, _this);
        });
    };
    SettingUI.prototype.initData = function () {
        if (GameMode.billingMode == 1) {
            this.radio1.selected = true;
        }
        if (GameMode.billingMode == 2) {
            this.radio2.selected = true;
        }
        if (GameMode.type == 1) {
            this.radio3.selected = true;
        }
        if (GameMode.type == 2) {
            this.radio4.selected = true;
        }
        if (GameMode.winPoints == 1) {
            this.radio5.selected = true;
        }
        if (GameMode.winPoints == 16) {
            this.radio6.selected = true;
        }
        if (GameMode.winPoints == 32) {
            this.radio7.selected = true;
        }
        if (GameMode.winPoints == 64) {
            this.radio8.selected = true;
        }
        if (GameMode.limitPoints == 300) {
            this.radio9.selected = true;
        }
        if (GameMode.limitPoints == 500) {
            this.radio10.selected = true;
        }
    };
    SettingUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return SettingUI;
}(eui.Component));
__reflect(SettingUI.prototype, "SettingUI");
