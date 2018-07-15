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
        var x = _a.x, y = _a.y, wechatNick = _a.wechatNick, id = _a.id, headImageUrl = _a.headImageUrl, wechatId = _a.wechatId, pos = _a.pos;
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/eui_game/skins/headIcon1.exml";
        _this.x = x;
        _this.y = y;
        _this._name.text = wechatNick;
        _this._id.text = "id:" + id;
        _this._icon.source = headImageUrl;
        _this._name1 = wechatNick;
        _this._icon1 = headImageUrl;
        _this._wechatid = wechatId;
        return _this;
    }
    FriendIcon.prototype.uiCompHandler = function () {
        if (this._wechatid == GameMode.zhuangid) {
            this._zhuang.visible = true;
        }
    };
    FriendIcon.prototype.changeSkin = function (_a) {
        var x = _a.x, y = _a.y;
        this.x = x;
        this.y = y;
        this.skinName = "resource/eui_game/skins/headIcon2.exml";
        this._icon.source = this._icon1;
        this._count.text = this._name1;
    };
    FriendIcon.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return FriendIcon;
}(eui.Component));
__reflect(FriendIcon.prototype, "FriendIcon");
