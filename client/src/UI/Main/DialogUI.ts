class DialogUI extends eui.Component {
    constructor(data) {
        super();
        this._headerMessage = data.data || {shopType: ShopTypes.ADDMONEY};
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        console.log('dialogName==>',data);
        this._dialogType = data.type;
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
            case DialogTypes.NEWS:
                this.skinName = "resource/eui_main/skins/dialogMailSkin.exml";
                break;
            case DialogTypes.MYROOM:
                this.skinName = "resource/eui_main/skins/myRoomSkin.exml";
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
        if(this._mailScroller) {
            this.generateMailState();
        }
        if(this._shopScroller) {
            this._labelContainer = [this._firstBuy, this._addCard, this._addMoney, this._addTool]
            this.generateShopState();
        }
        if (this._roomScroller) {
            this._labelContainer = [this._freeRoom, this._busyRoom];
            this.generateMyRoomState();
        }
        if(this._labelContainer.length > 0) {
            this._labelContainer.forEach(label=> {
                label.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchLabel, this);
            })
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

    private generateShopState() {
        const shopType = this._headerMessage.shopType;
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
            default :
                this._firstBuy.selected = true;
                break;
        }
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

    private generateMailState() {
        var mailContents:Array<Object> = [
            { mailIcon: "mail_closed_png", mailInfo: '梦一样的遐想', remainTime: '10 days', date: '20180305' },
            { mailIcon: "mail_opened_png", mailInfo: '从前的你和我', remainTime: '10 days', date: '20180305' },
            { mailIcon: "mail_opened_png", mailInfo: '手一挥就再见', remainTime: '10 days', date: '20180305' },
            { mailIcon: "mail_opened_png", mailInfo: '嘴一翘就笑', remainTime: '10 days', date: '20180305' },
            { mailIcon: "mail_closed_png", mailInfo: '啊漫天的回想', remainTime: '10 days', date: '20180305' },
            { mailIcon: "mail_closed_png", mailInfo: '云上去云上看云上走一趟', remainTime: '10 days', date: '20180305' },
        ];
        this._mailContents.dataProvider = new eui.ArrayCollection(mailContents);
        this._mailContents.itemRenderer = MailContentIRUI;
    }

    private generateMyRoomState() {
        var rooms:Array<Object> = [
            {roomId: 1000},
            {roomId: 1032},
            {roomId: 1234},
            {roomId: 1546},
            {roomId: 1023},
            {roomId: 1103},            
        ]
        this._myRooms.dataProvider = new eui.ArrayCollection(rooms);
        this._myRooms.itemRenderer = MyRoomIRUI;
    }

    private switchLabel(e:egret.TouchEvent):void {
        const target = e.currentTarget;
        this._labelContainer = this._labelContainer.map(label => {
            label.selected = label === target;
            return label;
        })
    }

    protected createChildren():void {
        super.createChildren();
    }
    private _dialogType:string;
    private _back:eui.Button;
    private _enterRoom:eui.Button;
    private _input:eui.TextInput;
    private _firstBuy:eui.ToggleButton;
    private _addMoney:eui.ToggleButton;
    private _addCard:eui.ToggleButton;
    private _addTool:eui.ToggleButton;
    private _freeRoom:eui.ToggleButton;
    private _busyRoom:eui.ToggleButton;
    private _labelContainer:Array<eui.ToggleButton> = [];
    private _headerMessage:{ shopType: string };
    private _shopContents:eui.List;
    private _mailContents:eui.List;
    private _myRooms: eui.List;
    private _mailScroller:eui.Scroller;
    private _shopScroller:eui.Scroller;
    private _roomScroller:eui.Scroller;
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

class MailContentIRUI extends eui.ItemRenderer {
    constructor() {
        super();
        this.skinName = "resource/eui_main/skins/mailContentIRSkin.exml";
    }

    protected createChildren():void {
        super.createChildren();
    }
}

class MyRoomIRUI  extends eui.ItemRenderer {
    constructor() {
        super();
        this.skinName = "resource/eui_main/skins/myRoomIRSkin.exml";
    }

    protected createChildren():void {
        super.createChildren();
    }
}