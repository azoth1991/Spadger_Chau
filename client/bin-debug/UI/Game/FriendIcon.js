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
var FriendIcon = (function (_super) {
    __extends(FriendIcon, _super);
    function FriendIcon(type, _a) {
        var x = _a.x, y = _a.y, name = _a.name, id = _a.id, icon = _a.icon;
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/eui_game/skins/headIcon1.exml";
        _this.x = x;
        _this.y = y;
        _this._name.text = name;
        _this._id.text = "id:" + id;
        _this._icon.source = icon;
        return _this;
    }
    FriendIcon.prototype.uiCompHandler = function () {
    };
    FriendIcon.prototype.changeSkin = function (_a) {
        var x = _a.x, y = _a.y;
        this.x = x;
        this.y = y;
        this.skinName = "resource/eui_game/skins/headIcon2.exml";
        this._count.text = "0";
    };
    FriendIcon.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return FriendIcon;
}(eui.Component));
__reflect(FriendIcon.prototype, "FriendIcon");
