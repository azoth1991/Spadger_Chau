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
var DialogUI = (function (_super) {
    __extends(DialogUI, _super);
    function DialogUI(data) {
        var _this = _super.call(this) || this;
        _this._shopLabels = [];
        _this._message = { shopType: '' };
        _this._message = data.shopType || { shopType: ShopTypes.ADDMONEY };
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        console.log('dialogName==>', data);
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
        if (this._firstBuy) {
            this._shopLabels = [this._firstBuy, this._addCard, this._addMoney, this._addTool];
            this._shopLabels.forEach(function (label) {
                label.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.changeShopLabel, _this);
            });
            var shopType = this._message.shopType;
            // console.log(`shopType --> ${shopType}`);
            var dsShopContents = [
                { icon: "head-i-2_png", purpose: "伊文捷琳", desc: "评价：樱桃小丸子", amount: "10元" },
                { icon: "head-i-2_png", purpose: "史帝文", desc: "评价：咖啡不加糖", amount: "20元" },
                { icon: "head-i-2_png", purpose: "哈瑞斯", desc: "评价：猪一样的队友", amount: "30元" },
                { icon: "head-i-2_png", purpose: "史帝文", desc: "评价：咖啡不加糖", amount: "20元" },
                { icon: "head-i-2_png", purpose: "哈瑞斯", desc: "评价：猪一样的队友", amount: "30元" }, { icon: "head-i-2_png", purpose: "史帝文", desc: "评价：咖啡不加糖", amount: "20元" },
                { icon: "head-i-2_png", purpose: "哈瑞斯", desc: "评价：猪一样的队友", amount: "30元" }
            ];
            this._shopContents.dataProvider = new eui.ArrayCollection(dsShopContents);
            this._shopContents.itemRenderer = ShopContentIRUI;
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
    DialogUI.prototype.changeShopLabel = function (e) {
        var target = e.currentTarget;
        this._shopLabels = this._shopLabels.map(function (label) {
            label.selected = label === target;
            return label;
        });
        // 后台请求商品数据
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
        _this.skinName = "resource/eui_main/skins/shopContentIRSkin.exml";
        return _this;
    }
    ShopContentIRUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return ShopContentIRUI;
}(eui.ItemRenderer));
__reflect(ShopContentIRUI.prototype, "ShopContentIRUI");
