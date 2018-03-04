class DialogUI extends eui.Component {
    constructor(data) {
        super();
        this._message = data.shopType || {shopType: ShopTypes.ADDMONEY};
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        console.log('dialogName==>',data);
        switch (data.type) {
            case DialogTypes.ENTERROOM:
                this.skinName = "resource/eui_main/skins/enterRoomSkin.exml";
                break;
            case DialogTypes.PLAY:
                this.skinName = "resource/eui_main/skins/dialogSkin.exml";
                break;
            case DialogTypes.SHOP:
                this.skinName = "resource/eui_main/skins/dialogShopSkin.exml"
                break;
            default:
                this.skinName = "resource/eui_main/skins/dialogSkin.exml";
        }
    }

    uiCompHandler() {
        if(this._back){
            this._back.addEventListener( egret.TouchEvent.TOUCH_TAP, this.backHome, this );
        }
        if(this._enterRoom){
            this._enterRoom.addEventListener( egret.TouchEvent.TOUCH_TAP, this.enterRoom, this );
        }
        if(this._firstBuy) {
            this._shopLabels = [this._firstBuy, this._addCard, this._addMoney, this._addTool]
            this._shopLabels.forEach(label=> {
                label.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeShopLabel, this);
            })
            const shopType = this._message.shopType;
            // console.log(`shopType --> ${shopType}`);
            var dsShopContents:Array<Object> = [
                { icon: "head-i-2_png", purpose: "伊文捷琳", desc: "评价：樱桃小丸子", amount: "10元"}
                , { icon: "head-i-2_png", purpose: "史帝文", desc: "评价：咖啡不加糖", amount: "20元" }
                , { icon: "head-i-2_png", purpose: "哈瑞斯", desc: "评价：猪一样的队友", amount: "30元" }
                , { icon: "head-i-2_png", purpose: "史帝文", desc: "评价：咖啡不加糖", amount: "20元" }
                , { icon: "head-i-2_png", purpose: "哈瑞斯", desc: "评价：猪一样的队友", amount: "30元" }, { icon: "head-i-2_png", purpose: "史帝文", desc: "评价：咖啡不加糖", amount: "20元" }
                , { icon: "head-i-2_png", purpose: "哈瑞斯", desc: "评价：猪一样的队友", amount: "30元" }
            ];
            this._shopContents.dataProvider = new eui.ArrayCollection( dsShopContents );
            this._shopContents.itemRenderer = ShopContentIRUI;
        }
    }

    private backHome(e:egret.TouchEvent):void {
        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, {type:GamePages.BACK_HOME});
    }

    private enterRoom(e:egret.TouchEvent):void {
        GameMode.roomId = this._input.text;
        console.log(`enterRoom${GameMode.roomId}`);
        // MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, {type:GamePages.CREATE_ROOM,id:this._input.text});
        MessageCenter.getInstance().sendMessage( GameEvents.WS_ENTER_ROOM, {type:GamePages.CREATE_ROOM});
    }

    private changeShopLabel(e:egret.TouchEvent):void {
        const target = e.currentTarget;
        this._shopLabels = this._shopLabels.map(label => {
            label.selected = label === target;
            return label;
        })
        // 后台请求商品数据
    }

    protected createChildren():void {
        super.createChildren();
    }
    private _back:eui.Button;
    private _enterRoom:eui.Button;
    private _input:eui.TextInput;
    private _firstBuy:eui.ToggleButton;
    private _addMoney:eui.ToggleButton;
    private _addCard:eui.ToggleButton;
    private _addTool:eui.ToggleButton;
    private _shopLabels:Array<eui.ToggleButton> = [];
    private _message:Object = { shopType: '' };
    private _shopContents:eui.List;
}

class ShopContentIRUI extends eui.ItemRenderer {
    constructor() {
        super();
        this.skinName = "resource/eui_main/skins/shopContentIRSkin.exml";
    }

    protected createChildren():void {
        super.createChildren();
    }
}
