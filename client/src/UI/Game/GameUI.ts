class GameUI extends eui.Component {
    constructor() {
        super();
        this.dsListIcon = GameMode.playerList;
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_game/skins/gameSkin.exml";
    }

    uiCompHandler() {
        // headIconList
        /// 填充数据
        this.initGameUI();
        this.createListener();
    }
    private createListener() {
        this._setting.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            MessageCenter.getInstance().sendMessage( GameEvents.TOGGLE_SETTING,null);
        }, this );
    }
    public joinGame(evt) {
        console.log('joinGame',this.dsListIcon)
        for (var k = 0;k<4;k++){
            if (!this.dsListIcon[k]) {
                this.dsListIcon[k] = {
                    icon: "head-i-2_png",
                    name: evt.data.info, 
                    id: "123",
                };
                this[`_icon${k}`] = new FriendIcon(1, {...this.dsListIcon[k],...this.startPosition[k]});
                this._gameBox.addChild(this[`_icon${k}`]);
                break;
            }
        }
        
    }

    private chatBox() {
        this._chatUI = new ChatUI();
        this.addChild(this._chatUI);
    }
    public sendMsg(info,name) {
        this._chatUI.sendMsg(info);
    }

    private initGameUI() {
        this._gameBox = new eui.Component();
        this.addChild(this._gameBox);
        let that = this;
        console.log('dslist',this.dsListIcon)
        this.dsListIcon.map( (v,k) => {
            if (v) {
                this[`_icon${k}`] = new FriendIcon(1, {...this.dsListIcon[k],...this.startPosition[k]});
                that._gameBox.addChild(this[`_icon${k}`]);
            }
        })
        this._start.enabled = false;
        
        //聊天框
        this.chatBox();
        this._start.addEventListener( egret.TouchEvent.TOUCH_TAP, this.handleStart, this );
        this._ready.addEventListener( egret.TouchEvent.TOUCH_TAP, this.handleReady, this );
        this._back.addEventListener( egret.TouchEvent.TOUCH_TAP, this.backHome, this );
        this._chat.addEventListener( egret.TouchEvent.TOUCH_TAP, this._chatUI.toggleVisible, this._chatUI );

        // 开始游戏  分享
        this.addEventListener(GameEvents.EVT_LOAD_PAGE, this.startGameUI, this);
    }

    private backHome(e:egret.TouchEvent):void {
        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, {type:GamePages.BACK_HOME});
    }

    public startGameUI(evt):void {
        console.log('startGameUI',evt.data)
        var position:Array<any> = [
            { x: 60, y: 597 },
            { x: 60, y: 293 },
            { x: 206, y: 50 },            
            { x: 1209, y: 295 },
        ]
        this._icon0.changeSkin(position[0]);
        this._icon1.changeSkin(position[1]);
        this._icon2.changeSkin(position[2]);
        this._icon3.changeSkin(position[3]);
        var models = evt.data.cards;
        var cards = this.getCards(models);
        // 移除按钮
        this.removeChild(this._ready);
        this.removeChild(this._start);
        // 画牌
        this.cardsBox = new eui.Component();        
        this.drawCard(cards);
        this._gameBox.addChild(this.cardsBox);
        // 画其他三家
        this.drawOtherCard();
    }
    public getCards(arr:Array<any>){
        var res = [];
        arr.forEach((val,key)=>{
            while(val>0){
                res.push(key);
                val--;
            }
        });
        return res;
    }

    public changeReady(info){
        if (info.readyNum >= GameMode.totalNum) {
            this._start.$children[0].source = 'yellow_btn_png';
            this._start.enabled = true;
        }
        if(this.dsListIcon[0].name == info.player) {
            this._ready.$children[0].source = 'yellow_btn_down_png';
            this._ready.$children[1].text = "已准备";
            this._ready.enabled = false;
        }
    }

    private handleStart(e:egret.TouchEvent):void {
        MessageCenter.getInstance().sendMessage( GameEvents.WS_START, {id:GameMode.roomId});        
    }
    private handleReady(e:egret.TouchEvent):void {
        MessageCenter.getInstance().sendMessage( GameEvents.WS_READY, {id:GameMode.roomId});
    }

    private drawCard(cards:Array<any>){
        var des = 80;
        cards.forEach((value, key) => {
            var card = new CardUI(2,value);
            card.x = 1100 - key*des;
            card.y = 591;
            this.cardsBox.addChild(card);
        })
        
    }
    private drawOtherCard(){
        var desX = 29;
        var desY = 52;
        for (var cardLength = 0; cardLength<13;cardLength++) {
            // 左边
            var letfCard = new CardUI(5,null);
            letfCard.x = 145;
            letfCard.y = 128 +  cardLength * desX;
            this._gameBox.addChild(letfCard);
            // 右边
            var rightCard = new CardUI(5,null);
            rightCard.x = 1168;
            rightCard.y = 128 +  cardLength * desX;
            this._gameBox.addChild(rightCard);
            // 上面
            var letfCard = new CardUI(4,null);
            letfCard.x = 322 + cardLength * desY;
            letfCard.y = 53;
            this._gameBox.addChild(letfCard);

        }
    }

    protected createChildren():void {
        super.createChildren();
    }
    private _icon0:FriendIcon;
    private _icon1:FriendIcon;
    private _icon2:FriendIcon;
    private _icon3:FriendIcon;
    private _start:eui.Button;
    private _ready:eui.Button;
    private _back:eui.Button;
    private _chatUI:ChatUI;
    private _chat:eui.Button;
    private _readyText:eui.Label;
    private _gameBox:eui.Component;
    private card;
    private cardsBox;
    private _info;
    private _setting:eui.Button;
    private startPosition:Array<Object> = [
            { x: 158, y: 576 },
            { x: 158, y: 330 },
            { x: 563, y: 106 },
            { x: 892, y: 305 },
        ];
    private dsListIcon:Array<any> = [
    ];
}

