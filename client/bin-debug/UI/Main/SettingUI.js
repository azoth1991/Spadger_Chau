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
        _this.settingCache = {
            soundEffectSwitch: true,
            bgmSwitch: true,
        };
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
        this._confirmSetting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeGameSound, this);
        var rdlist = [this._effectOpen, this._effectClose, this._bgmOpen, this._bgmClose];
        rdlist.forEach(function (rd) {
            rd.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
                switch (evt.currentTarget) {
                    case _this._effectOpen:
                        _this.settingCache.soundEffectSwitch = true;
                        break;
                    case _this._effectClose:
                        _this.settingCache.soundEffectSwitch = false;
                        break;
                    case _this._bgmOpen:
                        _this.settingCache.bgmSwitch = true;
                        break;
                    case _this._bgmClose:
                        _this.settingCache.bgmSwitch = false;
                        break;
                }
            }, _this);
        });
    };
    SettingUI.prototype.changeGameSound = function () {
        GameMode.bgmSwitch = this.settingCache.bgmSwitch;
        GameMode.soundEffectSwitch = this.settingCache.soundEffectSwitch;
        if (!GameMode.bgmSwitch) {
            GameSound.stopBGM();
        }
        else if (!GameSound._bgmSoundChannel) {
            GameSound.playBGM();
        }
    };
    SettingUI.prototype.initData = function () {
        if (GameMode.bgmSwitch == true) {
            this._bgmOpen.selected = true;
        }
        else {
            this._bgmClose.selected = true;
        }
        if (GameMode.soundEffectSwitch == true) {
            this._effectOpen.selected = true;
        }
        else {
            this._effectClose.selected = true;
        }
    };
    SettingUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return SettingUI;
}(eui.Component));
__reflect(SettingUI.prototype, "SettingUI");
