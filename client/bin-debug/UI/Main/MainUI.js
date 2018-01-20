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
var MainUI = (function (_super) {
    __extends(MainUI, _super);
    function MainUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/eui_main/skins/mainSkin.exml";
        return _this;
    }
    MainUI.prototype.uiCompHandler = function () {
        // header
        this._headui = new HeadUI();
        // _friendListIR
        /// 填充数据
        var dsListFriend = [
            { icon: "head-i-2_png", name: "伊文捷琳", count: "评价：樱桃小丸子" },
            { icon: "head-i-2_png", name: "亚特伍德", count: "评价：离了我你不行的" },
            { icon: "head-i-2_png", name: "伊妮德", count: "评价：猴子请来的逗比" },
            { icon: "head-i-2_png", name: "鲁宾", count: "评价：我勒个去" },
            { icon: "head-i-2_png", name: "威弗列德", count: "评价：这货碉堡了" },
            { icon: "head-i-2_png", name: "史帝文", count: "评价：咖啡不加糖" },
            { icon: "head-i-2_png", name: "哈瑞斯", count: "评价：猪一样的队友" }
        ];
        this.listFriend.dataProvider = new eui.ArrayCollection(dsListFriend);
        this.listFriend.itemRenderer = FriendIRUI;
        //需要在scroller添加到舞台上面之后再访问verticalScrollBar
        this.addChildAt(this._headui, this.getChildIndex(this.imgBg) + 1);
        // 绑定按钮
        this.createRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this);
        this.myRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this);
        this.enterRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this);
    };
    MainUI.prototype.mbtnHandler = function (evt) {
        switch (evt.currentTarget) {
            case this.createRoom:
                this._pageFocused = GamePages.CREATE_ROOM;
                break;
            case this.enterRoom:
                this._pageFocused = GamePages.ENTER_ROOM;
                break;
            case this.myRoom:
                this._pageFocused = GamePages.MY_ROOM;
                break;
        }
        this.dispatchEventWith(GameEvents.EVT_LOAD_PAGE, false, this._pageFocused);
    };
    MainUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return MainUI;
}(eui.Component));
__reflect(MainUI.prototype, "MainUI");
var FriendIRUI = (function (_super) {
    __extends(FriendIRUI, _super);
    function FriendIRUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "friendIRSkin";
        return _this;
    }
    FriendIRUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return FriendIRUI;
}(eui.ItemRenderer));
__reflect(FriendIRUI.prototype, "FriendIRUI");
