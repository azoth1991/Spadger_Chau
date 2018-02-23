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
var ChatListUI = (function (_super) {
    __extends(ChatListUI, _super);
    function ChatListUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/eui_game/skins/chatListSkin.exml";
        return _this;
    }
    ChatListUI.prototype.uiCompHandler = function () {
        /// 填充数据
        var dsListFriend = [
            { icon: "head-i-2_png", count: "评价：樱桃小丸子" },
            { icon: "head-i-2_png", count: "评价：樱桃小丸子评价：樱桃小丸子评价：樱桃小丸子评价：樱桃小丸子评价：樱桃小丸子评价：樱桃小丸子" },
            { icon: "head-i-2_png", count: "评价：樱桃小丸子" },
            { icon: "head-i-2_png", count: "评价：樱桃小丸子" },
            { icon: "head-i-2_png", count: "评价：樱桃小丸子" },
        ];
        this.listChat.dataProvider = new eui.ArrayCollection(dsListFriend);
        this.listChat.itemRenderer = ChatlistIRUI;
    };
    ChatListUI.prototype.pushChat = function (data) {
        console.log('pushChat123');
        this.listChat.dataProvider.addItem(data);
        // this.listChat.itemRenderer = ChatlistIRUI;                     
    };
    ChatListUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return ChatListUI;
}(eui.Component));
__reflect(ChatListUI.prototype, "ChatListUI");
var ChatlistIRUI = (function (_super) {
    __extends(ChatlistIRUI, _super);
    function ChatlistIRUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/eui_game/skins/chatlistIRSkin.exml";
        return _this;
    }
    ChatlistIRUI.prototype.uiCompHandler = function () {
        var _this = this;
        var height = 60;
        var maxWidth = 580;
        var l;
        setTimeout(function () {
            l = parseInt("" + _this.chatLabel.width / maxWidth);
            if (l > 0) {
                _this.chatBg.width = maxWidth + 30;
                _this.chatLabel.width = maxWidth;
            }
            else {
                _this.chatBg.width = _this.chatLabel.width + 30;
            }
            _this.chatLabel.height = height * (l + 1);
            _this.chatBg.height = height * (l + 1);
        }, 0);
    };
    ChatlistIRUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return ChatlistIRUI;
}(eui.ItemRenderer));
__reflect(ChatlistIRUI.prototype, "ChatlistIRUI");
