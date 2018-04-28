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
            case DialogTypes.ZHANJI:
                this.skinName = "resource/eui_main/skins/gameHistorySkin.exml";
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
        if (this._gameHistoryScroller) {
            this.generateHistoryState();
        }
        if(this._shopScroller) {
            this._labelContainer = [this._firstBuy, this._addMoney, this._addCard,this._addTool]
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

    private buyList0 = [
            { icon: "head-i-2_png", purpose: "牌局消耗的道具", desc: "钻石6个", price: "6元"}
        ];

    private buyList1 = [
        { icon: "12_png", purpose: "牌局消耗的道具", desc: "钻石6个", price: "6元"}
        , { icon: "22_png", purpose: "牌局消耗的道具", desc: "钻石18个", price: "18元" }
        , { icon: "32_png", purpose: "牌局消耗的道具", desc: "钻石36个", price: "36元" }
        , { icon: "42_png", purpose: "牌局消耗的道具", desc: "钻石69个", price: "69元" }
        , { icon: "52_png", purpose: "牌局消耗的道具", desc: "钻石98个", price: "98元" },
        { icon: "62_png", purpose: "牌局消耗的道具", desc: "钻石198个", price: "198元" },
    ];

    private buyList2 = [
        { icon: "card_png", purpose: "牌局消耗的道具", desc: "钻石6个", price: "6元"}
        , { icon: "card_png", purpose: "牌局消耗的道具", desc: "钻石18个", price: "18元" }
        , { icon: "card_png", purpose: "牌局消耗的道具", desc: "钻石36个", price: "36元" }
        , { icon: "card_png", purpose: "牌局消耗的道具", desc: "钻石69个", price: "69元" }
        , { icon: "card_png", purpose: "牌局消耗的道具", desc: "钻石98个", price: "98元" },
        { icon: "card_png", purpose: "牌局消耗的道具", desc: "钻石198个", price: "198元" },
    ];

    private buyList3 = [
        { icon: "boom_png", purpose: "牌局可使用的道具", desc: "炸弹=10钻石", price: "购买"}
        , { icon: "shit_png", purpose: "牌局可使用的道具", desc: "便便=10钻石", price: "购买" }
        , { icon: "egg_png", purpose: "牌局可使用的道具", desc: "臭鸡蛋=10钻石", price: "购买" }
        , { icon: "rose_png", purpose: "牌局可使用的道具", desc: "玫瑰=10钻石", price: "购买" },
        { icon: "kiss_png", purpose: "牌局可使用的道具", desc: "吻=10钻石", price: "购买" },
        { icon: "papa_png", purpose: "牌局可使用的道具", desc: "鼓掌=10钻石", price: "购买" },
    ];

    private generateShopState() {
        const shopType = this._headerMessage.shopType;
        console.log(11111,shopType)
        switch (shopType) {
            case ShopTypes.ADDCARD: 
                this._addCard.selected = true;
                this.showList(this.buyList2);
                break;
            case ShopTypes.ADDMONEY:
                this._addMoney.selected = true;
                this.showList(this.buyList1);
                break;
            case ShopTypes.ADDTOOL:
                this._addTool.selected = true;
                this.showList(this.buyList3);
                break;
            default :
                this._firstBuy.selected = true;
                this.showList(this.buyList0);
                break;
        }
        
        
    }
    private showList(list) {
        console.log(3333,list)
        var dsShopContents:Array<Object> = list;
        this._shopContents.dataProvider = new eui.ArrayCollection( dsShopContents );
        this._shopContents.itemRenderer = ShopContentIRUI;
    }

    private generateHistoryState() {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(encodeURI(`http://101.37.151.85:8008/socket/queryBunko?wechatId=${GameMode.wechatId}`),egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE,(evt)=>{
            var response = <egret.HttpRequest>evt.currentTarget;
            var res = JSON.parse(response.response);
            if (res.code == 1) {
                console.log('history',res.result);
                var history:Array<Object> = [
                    {roomId: 1000, roomOwner: '陈志伟', gameCount: 1, gameDuration: '10分钟', overTime: '2017-02-12 10:23:23', record: 20},
                    {roomId: 1230, roomOwner: '周菲特', gameCount: 4, gameDuration: '30分钟', overTime: '2017-02-12 10:23:23', record: -20},
                    {roomId: 1430, roomOwner: '阳神', gameCount: 5, gameDuration: '2分钟', overTime: '2017-02-12 10:23:23', record: 3},
                    {roomId: 1023, roomOwner: '一点兄', gameCount: 12, gameDuration: '23分钟', overTime: '2017-02-12 10:23:23', record: 210},
                    {roomId: 1120, roomOwner: '解老', gameCount: 14, gameDuration: '43分钟', overTime: '2017-02-12 10:23:23', record: -121},
                    {roomId: 1002, roomOwner: '春节', gameCount: 111, gameDuration: '23分钟', overTime: '2017-02-12 10:23:23', record: 302},            
                ]
                this._gameHistory.dataProvider = new eui.ArrayCollection( history );
                this._gameHistory.itemRenderer = GameHistoryIRUI;
            } else {
                alert('请在微信中打开')
            }
        },this);

    }

    private generateMailState() {
        var mailContents:Array<MailContentType> = [
            { mailIcon: "mail_closed_png", mailInfo: '梦一样的遐想', opened:true,  remainTime: '已启', date: '20180305'},
            { mailIcon: "mail_opened_png", mailInfo: '从前的你和我', opened:false, remainTime: '10 days', date: '20180305' },
            { mailIcon: "mail_opened_png", mailInfo: '手一挥就再见', opened:true, remainTime: '已启', date: '20180305' },
            { mailIcon: "mail_opened_png", mailInfo: '嘴一翘就笑', opened:false, remainTime: '10 days', date: '20180305' },
            { mailIcon: "mail_closed_png", mailInfo: '啊漫天的回想', opened:false, remainTime: '10 days', date: '20180305' },
            { mailIcon: "mail_closed_png", mailInfo: '云上去云上看云上走一趟', opened:false, remainTime: '10 days', date: '20180305' },
        ];
        mailContents = mailContents.map(item => {
            const textColor = item.opened ? '0x6BAE2D' : '0xD1AB98';
            return {...item, textColor};
        });
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
        this._labelContainer = this._labelContainer.map((label, key) => {
            label.selected = label === target;
            if (label === target){
                this.showList(this[`buyList${key}`]);
            }
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
    private _gameHistory: eui.List;
    private _mailScroller:eui.Scroller;
    private _shopScroller:eui.Scroller;
    private _roomScroller:eui.Scroller;
    private _gameHistoryScroller:eui.Scroller;
}

class ShopContentIRUI extends eui.ItemRenderer {
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_main/skins/shopContentIRSkin.exml";
    }

    private uiCompHandler() {
        this._buyTool.addEventListener( egret.TouchEvent.TOUCH_TAP, this.buyToolfunc, this );
        setTimeout(() => {
            this._buyTool.$children[1].text = this._price.text;
        }, 0);
    }
    private buyToolfunc(){
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(encodeURI(`http://101.37.151.85:8008/socket/wx/preOrder?openid=${GameMode.wechatId}&buyNum=0.01`),egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE,(evt)=>{
            var response = <egret.HttpRequest>evt.currentTarget;
            var res = JSON.parse(response.response);
            wx.chooseWXPay({  
                timestamp: res.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符  
                nonceStr: res.nonce_str, // 支付签名随机串，不长于 32 位  
                package: `prepay_id=${res.prepay_id}`, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）  
                signType: 'HMAC-SHA256', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'  
                paySign: res.sign, // 支付签名  
                success: function (res) {
                    // 支付成功后的回调函数  
                }  
            });  
        },this);
    }
    private _buyTool:eui.Button;
    private _price:eui.Label;
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

class GameHistoryIRUI  extends eui.ItemRenderer {
    constructor() {
        super();
        this.skinName = "resource/eui_main/skins/gameHistoryIRSkin.exml";
    }

    protected createChildren():void {
        super.createChildren();
    }
}

interface MailContentType {
    mailIcon: string,
    mailInfo: string,
    opened: boolean,
    remainTime: string,
    date: string
}