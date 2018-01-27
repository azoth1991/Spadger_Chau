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
var MessageCenter = (function (_super) {
    __extends(MessageCenter, _super);
    function MessageCenter() {
        var _this = this;
        if (MessageCenter._isInit) {
            throw new Error("MessageCenter为单例模式，请使用 MessageCenter.getInstance()获取实例！");
        }
        _this = _super.call(this) || this;
        return _this;
    }
    //获取单例
    MessageCenter.getInstance = function () {
        if (MessageCenter._this == null) {
            MessageCenter._isInit = false;
            MessageCenter._this = new MessageCenter();
            MessageCenter._isInit = true;
        }
        return MessageCenter._this;
    };
    //发送消息
    MessageCenter.prototype.sendMessage = function (message, data) {
        var event = new egret.Event(message);
        event.data = data;
        this.dispatchEvent(event);
    };
    MessageCenter.EVT_LOAD_PAGE = "EVT_LOAD_PAGE";
    MessageCenter.EVT_BACK_HOME = "EVT_BACK_HOME";
    MessageCenter._this = null; //私有对象，为单例模式提供支持
    MessageCenter._isInit = true; //私有对象，为单例模式提供支持
    return MessageCenter;
}(egret.EventDispatcher));
__reflect(MessageCenter.prototype, "MessageCenter");
