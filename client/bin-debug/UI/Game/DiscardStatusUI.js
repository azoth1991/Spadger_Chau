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
var DiscardStatusUI = (function (_super) {
    __extends(DiscardStatusUI, _super);
    function DiscardStatusUI(option) {
        if (option === void 0) { option = []; }
        var _this = _super.call(this) || this;
        _this._option = [];
        _this._option = option;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/eui_game/skins/discardStatusSkin.exml";
        return _this;
    }
    DiscardStatusUI.prototype.uiCompHandler = function () {
        this.handleEvent();
        this.drawOption();
    };
    // 高亮按钮
    DiscardStatusUI.prototype.drawOption = function () {
        var _this = this;
        this._peng.selected = false;
        this._hu.selected = false;
        this._gang.selected = false;
        this._chi.selected = false;
        this._peng.touchEnabled = false;
        this._hu.touchEnabled = false;
        this._gang.touchEnabled = false;
        this._chi.touchEnabled = false;
        this._guo.selected = true;
        this._guo.touchEnabled = true;
        this._option.forEach(function (v) {
            switch (v) {
                case 42:
                    _this._peng.selected = true;
                    _this._peng.touchEnabled = true;
                    break;
                case 43:
                    _this._chi.selected = true;
                    _this._chi.touchEnabled = true;
                    break;
                case 44:
                    _this._chi.selected = true;
                    _this._chi.touchEnabled = true;
                    break;
                case 45:
                    _this._hu.selected = true;
                    _this._hu.touchEnabled = true;
                    break;
            }
        });
    };
    DiscardStatusUI.prototype.handleEvent = function () {
        this._hu.addEventListener('touchTap', this.handleStatus, this);
        this._gang.addEventListener('touchTap', this.handleStatus, this);
        this._chi.addEventListener('touchTap', this.handleStatus, this);
        this._peng.addEventListener('touchTap', this.handleStatus, this);
        this._guo.addEventListener('touchTap', this.handleStatus, this);
    };
    DiscardStatusUI.prototype.handleStatus = function (evt) {
        switch (evt.currentTarget) {
            case this._hu:
                MessageCenter.getInstance().sendMessage(GameEvents.WS_SEND_DISCARDSTATUS, { type: GameEvents.WS_HU });
                break;
            case this._gang:
                MessageCenter.getInstance().sendMessage(GameEvents.WS_SEND_DISCARDSTATUS, { type: GameEvents.WS_GANG });
                break;
            case this._chi:
                MessageCenter.getInstance().sendMessage(GameEvents.WS_SEND_DISCARDSTATUS, { type: GameEvents.WS_CHI });
                break;
            case this._peng:
                MessageCenter.getInstance().sendMessage(GameEvents.WS_SEND_DISCARDSTATUS, { type: GameEvents.WS_PENG });
                break;
            case this._guo:
                MessageCenter.getInstance().sendMessage(GameEvents.WS_SEND_DISCARDSTATUS, { type: GameEvents.WS_GUO });
                break;
        }
        // todo销毁
        this.visible = false;
    };
    DiscardStatusUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return DiscardStatusUI;
}(eui.Component));
__reflect(DiscardStatusUI.prototype, "DiscardStatusUI");
