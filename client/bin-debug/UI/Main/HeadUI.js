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
var HeadUI = (function (_super) {
    __extends(HeadUI, _super);
    function HeadUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/eui_main/skins/headSkin.exml";
        return _this;
    }
    HeadUI.prototype.uiCompHandler = function () {
    };
    HeadUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return HeadUI;
}(eui.Component));
__reflect(HeadUI.prototype, "HeadUI");