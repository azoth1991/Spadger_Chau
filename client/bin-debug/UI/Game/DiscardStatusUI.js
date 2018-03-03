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
    function DiscardStatusUI(type, _a) {
        var x = _a.x, y = _a.y, name = _a.name, id = _a.id, icon = _a.icon;
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/eui_game/skins/discardStatusSkin.exml";
        return _this;
    }
    DiscardStatusUI.prototype.uiCompHandler = function () {
    };
    DiscardStatusUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return DiscardStatusUI;
}(eui.Component));
__reflect(DiscardStatusUI.prototype, "DiscardStatusUI");
