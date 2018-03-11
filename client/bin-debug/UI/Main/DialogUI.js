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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var DialogUI = (function (_super) {
    __extends(DialogUI, _super);
    function DialogUI(data) {
        var _this = _super.call(this) || this;
        _this._labelContainer = [];
        _this._headerMessage = data.data || { shopType: ShopTypes.ADDMONEY };
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        console.log('dialogName==>', data);
        _this._dialogType = data.type;
        switch (data.type) {
            case DialogTypes.ENTERROOM:
                _this.skinName = "resource/eui_main/skins/enterRoomSkin.exml";
                break;
            case DialogTypes.PLAY:
                _this.skinName = "resource/eui_main/skins/dialogSkin.exml";
                break;
            case DialogTypes.SHOP:
                _this.skinName = "resource/eui_main/skins/dialogShopSkin.exml";
                break;
            case DialogTypes.NEWS:
                _this.skinName = "resource/eui_main/skins/dialogMailSkin.exml";
                break;
            case DialogTypes.MYROOM:
                _this.skinName = "resource/eui_main/skins/myRoomSkin.exml";
                break;
            case DialogTypes.ZHANJI:
                _this.skinName = "resource/eui_main/skins/gameHistorySkin.exml";
                break;
            default:
                _this.skinName = "resource/eui_main/skins/dialogSkin.exml";
        }
        return _this;
    }
    DialogUI.prototype.uiCompHandler = function () {
        var _this = this;
        if (this._back) {
            this._back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backHome, this);
        }
        if (this._enterRoom) {
            this._enterRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterRoom, this);
        }
        if (this._mailScroller) {
            this.generateMailState();
        }
        if (this._gameHistoryScroller) {
            this.generateHistoryState();
        }
        if (this._shopScroller) {
            this._labelContainer = [this._firstBuy, this._addCard, this._addMoney, this._addTool];
            this.generateShopState();
        }
        if (this._roomScroller) {
            this._labelContainer = [this._freeRoom, this._busyRoom];
            this.generateMyRoomState();
        }
        if (this._labelContainer.length > 0) {
            this._labelContainer.forEach(function (label) {
                label.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.switchLabel, _this);
            });
        }
    };
    DialogUI.prototype.backHome = function (e) {
        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, { type: GamePages.BACK_HOME });
    };
    DialogUI.prototype.enterRoom = function (e) {
        GameMode.roomId = this._input.text;
        console.log("enterRoom" + GameMode.roomId);
        // MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, {type:GamePages.CREATE_ROOM,id:this._input.text});
        MessageCenter.getInstance().sendMessage(GameEvents.WS_ENTER_ROOM, { type: GamePages.CREATE_ROOM });
    };
    DialogUI.prototype.generateShopState = function () {
        var shopType = this._headerMessage.shopType;
        switch (shopType) {
            case ShopTypes.ADDCARD:
                this._addCard.selected = true;
                break;
            case ShopTypes.ADDMONEY:
                this._addMoney.selected = true;
                break;
            case ShopTypes.ADDSJ:
                this._addTool.selected = true;
                break;
            default:
                this._firstBuy.selected = true;
                break;
        }
        var dsShopContents = [
            { icon: "head-i-2_png", purpose: "伊文捷琳", desc: "评价：樱桃小丸子", price: "10元" },
            { icon: "head-i-2_png", purpose: "史帝文", desc: "评价：咖啡不加糖", price: "20元" },
            { icon: "head-i-2_png", purpose: "哈瑞斯", desc: "评价：猪一样的队友", price: "30元" },
            { icon: "head-i-2_png", purpose: "史帝文", desc: "评价：咖啡不加糖", price: "20元" },
            { icon: "head-i-2_png", purpose: "哈瑞斯", desc: "评价：猪一样的队友", price: "30元" },
            { icon: "head-i-2_png", purpose: "史帝文", desc: "评价：咖啡不加糖", price: "20元" },
            { icon: "head-i-2_png", purpose: "哈瑞斯", desc: "评价：猪一样的队友", price: "30元" }
        ];
        this._shopContents.dataProvider = new eui.ArrayCollection(dsShopContents);
        this._shopContents.itemRenderer = ShopContentIRUI;
    };
    DialogUI.prototype.generateHistoryState = function () {
        var history = [
            { roomId: 1000, roomOwner: '陈志伟', gameCount: 1, gameDuration: '10分钟', overTime: '2017-02-12 10:23:23', record: 20 },
            { roomId: 1230, roomOwner: '周菲特', gameCount: 4, gameDuration: '30分钟', overTime: '2017-02-12 10:23:23', record: -20 },
            { roomId: 1430, roomOwner: '阳神', gameCount: 5, gameDuration: '2分钟', overTime: '2017-02-12 10:23:23', record: 3 },
            { roomId: 1023, roomOwner: '一点兄', gameCount: 12, gameDuration: '23分钟', overTime: '2017-02-12 10:23:23', record: 210 },
            { roomId: 1120, roomOwner: '解老', gameCount: 14, gameDuration: '43分钟', overTime: '2017-02-12 10:23:23', record: -121 },
            { roomId: 1002, roomOwner: '春节', gameCount: 111, gameDuration: '23分钟', overTime: '2017-02-12 10:23:23', record: 302 },
        ];
        this._gameHistory.dataProvider = new eui.ArrayCollection(history);
        this._gameHistory.itemRenderer = GameHistoryIRUI;
    };
    DialogUI.prototype.generateMailState = function () {
        var mailContents = [
            { mailIcon: "mail_closed_png", mailInfo: '梦一样的遐想', opened: true, remainTime: '已启', date: '20180305' },
            { mailIcon: "mail_opened_png", mailInfo: '从前的你和我', opened: false, remainTime: '10 days', date: '20180305' },
            { mailIcon: "mail_opened_png", mailInfo: '手一挥就再见', opened: true, remainTime: '已启', date: '20180305' },
            { mailIcon: "mail_opened_png", mailInfo: '嘴一翘就笑', opened: false, remainTime: '10 days', date: '20180305' },
            { mailIcon: "mail_closed_png", mailInfo: '啊漫天的回想', opened: false, remainTime: '10 days', date: '20180305' },
            { mailIcon: "mail_closed_png", mailInfo: '云上去云上看云上走一趟', opened: false, remainTime: '10 days', date: '20180305' },
        ];
        mailContents = mailContents.map(function (item) {
            var textColor = item.opened ? '0x6BAE2D' : '0xD1AB98';
            return __assign({}, item, { textColor: textColor });
        });
        this._mailContents.dataProvider = new eui.ArrayCollection(mailContents);
        this._mailContents.itemRenderer = MailContentIRUI;
    };
    DialogUI.prototype.generateMyRoomState = function () {
        var rooms = [
            { roomId: 1000 },
            { roomId: 1032 },
            { roomId: 1234 },
            { roomId: 1546 },
            { roomId: 1023 },
            { roomId: 1103 },
        ];
        this._myRooms.dataProvider = new eui.ArrayCollection(rooms);
        this._myRooms.itemRenderer = MyRoomIRUI;
    };
    DialogUI.prototype.switchLabel = function (e) {
        var target = e.currentTarget;
        this._labelContainer = this._labelContainer.map(function (label) {
            label.selected = label === target;
            return label;
        });
    };
    DialogUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return DialogUI;
}(eui.Component));
__reflect(DialogUI.prototype, "DialogUI");
var ShopContentIRUI = (function (_super) {
    __extends(ShopContentIRUI, _super);
    function ShopContentIRUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/eui_main/skins/shopContentIRSkin.exml";
        return _this;
    }
    ShopContentIRUI.prototype.uiCompHandler = function () {
        var _this = this;
        setTimeout(function () {
            _this._buyTool.$children[1].text = _this._price.text;
        }, 0);
    };
    ShopContentIRUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return ShopContentIRUI;
}(eui.ItemRenderer));
__reflect(ShopContentIRUI.prototype, "ShopContentIRUI");
var MailContentIRUI = (function (_super) {
    __extends(MailContentIRUI, _super);
    function MailContentIRUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_main/skins/mailContentIRSkin.exml";
        return _this;
    }
    MailContentIRUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return MailContentIRUI;
}(eui.ItemRenderer));
__reflect(MailContentIRUI.prototype, "MailContentIRUI");
var MyRoomIRUI = (function (_super) {
    __extends(MyRoomIRUI, _super);
    function MyRoomIRUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_main/skins/myRoomIRSkin.exml";
        return _this;
    }
    MyRoomIRUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return MyRoomIRUI;
}(eui.ItemRenderer));
__reflect(MyRoomIRUI.prototype, "MyRoomIRUI");
var GameHistoryIRUI = (function (_super) {
    __extends(GameHistoryIRUI, _super);
    function GameHistoryIRUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_main/skins/gameHistoryIRSkin.exml";
        return _this;
    }
    GameHistoryIRUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return GameHistoryIRUI;
}(eui.ItemRenderer));
__reflect(GameHistoryIRUI.prototype, "GameHistoryIRUI");
