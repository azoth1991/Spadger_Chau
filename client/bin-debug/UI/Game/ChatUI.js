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
var ChatUI = (function (_super) {
    __extends(ChatUI, _super);
    function ChatUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/eui_game/skins/chatSkin.exml";
        _this.visible = false;
        return _this;
    }
    ChatUI.prototype.uiCompHandler = function () {
        var _this = this;
        console.log('chatui');
        this._buttons = [this._biaoqing, this._quickchat, this._chatlist];
        this._chatlist.selected = true;
        this.initItem();
        this._buttons.forEach(function (btn) {
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.handleTag, _this);
        });
        this._send.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendMsg, this);
    };
    ChatUI.prototype.sendMsg = function () {
        console.log('发送信息');
        this._chatListUI.pushChat({ icon: "head-i-2_png", count: "欢迎来到麻将" });
    };
    ChatUI.prototype.initItem = function () {
        // 表情
        this._chatExListUI = new eui.Component();
        this._chatExListUI.skinName = "resource/eui_game/skins/chatExListSkin.exml";
        // 聊天列表
        this._chatListUI = new ChatListUI();
        this.currentBox = this._chatListUI;
        this.addChild(this.currentBox);
    };
    ChatUI.prototype.handleTag = function (evt) {
        console.log('chatBtn', evt);
        this.removeChild(this.currentBox);
        this._buttons.forEach(function (value) {
            value.selected = false;
        });
        evt.target.selected = true;
        switch (evt.target) {
            case this._biaoqing:
                this.currentBox = this._chatExListUI;
                break;
            case this._quickchat:
                this.currentBox = this._chatListUI;
                break;
            case this._chatlist:
                this.currentBox = this._chatListUI;
                break;
        }
        this.addChild(this.currentBox);
    };
    ChatUI.prototype.toggleVisible = function () {
        console.log('toggle');
        this.visible = !this.visible;
    };
    ChatUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return ChatUI;
}(eui.Component));
__reflect(ChatUI.prototype, "ChatUI");
