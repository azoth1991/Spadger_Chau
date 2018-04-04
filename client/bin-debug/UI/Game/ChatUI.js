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
        this._buttons = [this._chatlist];
        this._chatlist.selected = true;
        this.initItem();
        this._buttons.forEach(function (btn) {
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.handleTag, _this);
        });
        this._send.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleChat, this);
        this._record.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startRecord, this);
        this._record.addEventListener(egret.TouchEvent.TOUCH_END, this.endRecord, this);
    };
    ChatUI.prototype.sendMsg = function (info) {
        this._chatListUI.pushChat({ icon: "head-i-2_png", count: info });
    };
    // 开始录音
    ChatUI.prototype.startRecord = function (evt) {
        evt.currentTarget.text = '录音中';
        wx.ready(function () {
            wx.startRecord();
        });
        wx.onVoiceRecordEnd({
            // 录音时间超过一分钟没有停止的时候会执行 complete 回调
            complete: function (res) {
                var localId = res.localId;
            }
        });
    };
    // 结束路由，并上传
    ChatUI.prototype.endRecord = function (evt) {
        evt.currentTarget.text = '录音';
        wx.ready(function () {
            wx.stopRecord({
                success: function (res) {
                    console.log('stopRecord');
                    var localId = res.localId;
                    wx.uploadVoice({
                        localId: localId,
                        isShowProgressTips: 0,
                        success: function (res) {
                            var serverId = res.serverId; // 返回音频的服务器端ID
                            // 发送服务消息
                            MessageCenter.getInstance().sendMessage(GameEvents.WS_SEND_CHAT, { info: serverId });
                        }
                    });
                }
            });
        });
    };
    ChatUI.prototype.handleChat = function (evt) {
        if (this._textInupt.text) {
            MessageCenter.getInstance().sendMessage(GameEvents.WS_SEND_CHAT, { info: this._textInupt.text });
            this._textInupt.text = '';
        }
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
            // case this._biaoqing:
            //     this.currentBox = this._chatExListUI;
            //     break;
            // case this._quickchat:
            //     this.currentBox = this._chatListUI;
            //     break;
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
