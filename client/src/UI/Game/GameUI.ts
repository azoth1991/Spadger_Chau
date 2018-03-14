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
    // 加入游戏
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
    public getdiscardSPs(evt) {
        console.log('getdiscardSPs',evt);
        var pos = 0;
        this.dsListIcon.forEach((v,k)=>{
            if (v.name == evt.data.pos){
                pos = k;
            }
        });
        var actionResult = evt.data.actionResult;
        this[`_discardSPList${pos}`].push(actionResult);
        this.drawDiscardSPs();
    }
    // 画丢弃的牌
    private drawDiscardSPs(){
        this.removeChild(this._discardSPsBox);
        this._discardSPsBox = new eui.Component();
        this.addChild(this._discardSPsBox);
        var sum0 = 0;
        var sum1 = 0;
        var sum2 = 0;
        var sum3 = 0;
    
        this._discardSPList0.forEach((value,key)=>{
            value.forEach((v,k)=>{
                var discardSP = new CardUI(1,v,0);
                discardSP.x = 1194-(k+key*0.1+sum0)*79*0.6;
                discardSP.y = 600;        
                discardSP.scaleX = 0.6;    
                discardSP.scaleY = 0.6;    
                this._discardSPsBox.addChild(discardSP);
            });
            sum0 += value.length;
        });
        this._discardSPList1.forEach((value,key)=>{
            value.forEach((v,k)=>{
                var discardSP = new CardUI(1,v,1);
                discardSP.x = 195;
                discardSP.y = 572-(k+key*0.1+sum1)*79*0.6;        
                discardSP.scaleX = 0.6;    
                discardSP.scaleY = 0.6;    
                this._discardSPsBox.addChild(discardSP);
            });
            sum1 += value.length;
        });
        this._discardSPList2.forEach((value,key)=>{
            value.forEach((v,k)=>{            
                var discardSP = new CardUI(1,v,2);
                discardSP.x = 1194-(k+key*0.1+sum2)*79*0.6;
                discardSP.y = 128;        
                discardSP.scaleX = 0.6;    
                discardSP.scaleY = 0.6;    
                this._discardSPsBox.addChild(discardSP);
            });
            sum2 += value.length;
            
        });
        this._discardSPList3.forEach((value,key)=>{
            value.forEach((v,k)=>{   
                var discardSP = new CardUI(1,v,3);
                discardSP.x = 195;
                discardSP.y = 1140-(k+key*0.1+sum3)*79*0.6;        
                discardSP.scaleX = 0.6;    
                discardSP.scaleY = 0.6;    
                this._discardSPsBox.addChild(discardSP);
            });
            sum3 += value.length;
        });
    }
    public getCard(evt) {
        console.log('getCard',evt)
        // 画牌  
        var cards = this.getCards(evt.data.cards);
        this._gameBox.removeChild(this.cardsBox);
        this.cardsBox = new eui.Component();
        this.drawCard(cards);
        this._gameBox.addChild(this.cardsBox);
        // 弃牌
        if (evt.data.discard && evt.data.discard>0){
            var discard = evt.data.discard;
            this._gameBox.removeChild(this.discardBox);
            var posName = evt.data.prevailing;
            var pos = 0;
            this.dsListIcon.forEach((v,k)=>{
                if (v.name == posName){
                    pos = k;
                }
            });
            this[`_discardList${pos}`].push(discard);
            this.drawDiscard(this[`_discardList${pos}`],pos);
            this._gameBox.addChild(this.discardBox);
        }

    }
    private dropCard(pos,num) {

    }
    // 显示吃胡碰杠
    public showDiscardStatus(evt){
        console.log('showDiscardStatus',evt);
        var option = evt.data.option;
        this._discardStatusUI = new DiscardStatusUI(option);
        this.addChild(this._discardStatusUI);
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
        this._discardSPsBox = new eui.Component();
        this.addChild(this._gameBox);
        this.addChild(this._discardSPsBox);
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
        this._invest.addEventListener( egret.TouchEvent.TOUCH_TAP,()=>{alert(`房间号为${GameMode.roomId}`)}, this );
        this._back.addEventListener( egret.TouchEvent.TOUCH_TAP, this.backHome, this );
        this._chat.addEventListener( egret.TouchEvent.TOUCH_TAP, this._chatUI.toggleVisible, this._chatUI );

        // 开始游戏  分享
        this.addEventListener(GameEvents.EVT_LOAD_PAGE, this.startGameUI, this);
    }

    private backHome(e:egret.TouchEvent):void {
        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, {type:GamePages.BACK_HOME});
    }

    // 显示中间的方向
    private showZj(num) {
        this[`_zj1`].visible = false;
        this[`_zj2`].visible = false;
        this[`_zj3`].visible = false;
        this[`_zj4`].visible = false;
        this[`_zj${num}`].visible = true;
    }

    public sendCardStatus(evt){
        console.log('cardStatus',evt);
        this.showDiscardStatus(evt.data.option);
    }

    public startGameUI(evt):void {
        console.log('startGameUI',evt.data)
        this.showZj(evt.data.pos)
        if (evt.data.pos == 1){
            GameMode.isDiscard = true;
        }
        
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
        this.removeChild(this._invest);
        // 画牌
        this.cardsBox = new eui.Component();   
        console.log(cards)     
        this.drawCard(cards);
        this._gameBox.addChild(this.cardsBox);
        // 画其他三家
        this.drawOtherCard();
        // 弃牌
        this.discardBox = new eui.Component();
        this._gameBox.addChild(this.discardBox);
    }

    //获取当前出牌人位置
    public getdiscardPos(evt) {
        console.log('getdiscardPos',evt)
        var pos = 0;
        this.dsListIcon.forEach((v,k)=>{
            if(v.name == evt.data.pos) {
                switch (k){
                    case 0:
                        pos = 1;
                        GameMode.isDiscard = true;
                        break;
                    case 1:
                        pos = 4;
                        break;
                    case 2:
                        pos = 3;
                        break;
                    case 3:
                        pos = 2;
                }
            }
        })
        this.showZj(pos);
    }

    // 获取
    public getCards(arr:Array<any>){
        var res = [];
        arr.forEach((val,key)=>{
            while(val>0){
                res.push(key);
                val--;
            }
        });
        console.log(res)
        return res;
    }
    // 准备
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
    // 游戏结束
    public gameOver(evt){
        console.log('gameOver',evt);
        var gameoverInfo = evt.data.info;
        gameoverInfo = {
            status: 0,
            type: 121,
            result:[
                {
                    fan:1,
                    points: -16,
                    name: 'a1',
                },
                {
                    fan:2,
                    points: -16,
                    name: 'a2',
                },
                {
                    fan:1,
                    points: -16,
                    name: 'a3',
                },
                {
                    fan:4,
                    points: -16,
                    name: 'a4',
                }
            ]
        }
        this._gameOverUI = new GameOverUI(gameoverInfo);
        this.addChild(this._gameOverUI);
    }

    private handleStart(e:egret.TouchEvent):void {
        MessageCenter.getInstance().sendMessage( GameEvents.WS_START, {id:GameMode.roomId});        
    }
    private handleReady(e:egret.TouchEvent):void {
        MessageCenter.getInstance().sendMessage( GameEvents.WS_READY, {id:GameMode.roomId});
    }

    private drawCard(cards:Array<any>){
        var des = 80;
        // joker
        this._joker = [];
        this._jokerPi = [];
        cards.filter((value, key) => {
            if(GameMode.joker.length > 0 && GameMode.joker.indexOf(value) >= 0){
                this._joker.push(value);
            } else if (GameMode.jokerPi.length > 0 && GameMode.jokerPi.indexOf(value) >=0 ){
                this._jokerPi.push(value);
            }
            return GameMode.joker.length>0 && GameMode.joker.indexOf(value) >=0;
        }).forEach((value,key)=>{
            var card = new CardUI(2,value);
            var scale = 0.8;
            card.scaleX = scale;
            card.scaleY = scale;
            card.x = 159 + key*des*scale;
            card.y = 591;
            this.cardsBox.addChild(card);
        });
        // jokerpi
        this._jokerPi.forEach((value,key)=>{
            var card = new CardUI(2,value);
            var scale = 0.8;
            card.scaleX = scale;
            card.scaleY = scale;
            card.x = 159 + (key+this._joker.length)*des*scale;
            card.y = 591;
            this.cardsBox.addChild(card);
        });
        console.log('joker',this._joker,this._jokerPi,cards)

        cards.filter((value)=>{
            return ( GameMode.jokerPi.indexOf(value) < 0 && GameMode.joker.indexOf(value) < 0)
        }).forEach((value, key)=>{
            var card = new CardUI(2,value);
            var scale = 0.8;
            card.scaleX = scale;
            card.scaleY = scale;
            card.x = 159 + (key+this._jokerPi.length+this._joker.length)*des*scale;
            card.y = 591;
            this.cardsBox.addChild(card);
        });
    }

    // 画弃牌
    private drawDiscard(discards:Array<any>,pos) {
        console.log('pos=>',pos)
        var desx,desy,startx,starty,type,drection,anchorOffsetX,anchorOffsetY;
        desx = 35;
        desy = 55;
        switch (pos){
            case 0:
                startx = 554;
                starty = 424;
                type = 1;
                break;
            case 1:
                startx = 520;
                starty = 256;
                type = 3;
                break;
            case 2:
                startx = 770;
                starty = 260;
                type = 1;            
                break;
            case 3:
                startx = 776;
                starty = 385;
                type = 3;            
                break;
        }
        
        discards.forEach((value, key) => {
            var card = new CardUI(type,value,pos);
            var scale = 0.45;
            card.scaleX = scale;
            card.scaleY = scale;
            console.log(parseInt(`${key/4}`))
            switch (pos){
                case 0:
                    card.x = startx + (key%5)*desx;
                    card.y = starty + parseInt(`${key/5}`)*desy;
                    break;
                case 1:
                    card.x = startx - parseInt(`${key/5}`)*desy;
                    card.y = starty + (key%5)*desx;                 
                    break;                                 
                case 2:
                    card.x = startx - (key%5)*desx;
                    card.y = starty - parseInt(`${key/5}`)*desy;                
                    break;
                case 3:
                    card.x = startx + parseInt(`${key/5}`)*desy;
                    card.y = starty - (key%5)*desx;                  
                    break;                                  
            }
            this.discardBox.addChild(card);
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
    private _invest;
    private card;
    private cardsBox;
    private discardBox;
    private _info;
    private _setting:eui.Button;
    private _cardStatuslist = [];
    private _zj4;
    private _zj1;
    private _zj2;
    private _zj3;

    private startPosition:Array<Object> = [
            { x: 158, y: 576 },
            { x: 158, y: 330 },
            { x: 563, y: 106 },
            { x: 892, y: 305 },
        ];
    private dsListIcon:Array<any> = [
    ];
    private _discardList0 = [];
    private _discardList1 = [];
    private _discardList2 = [];
    private _discardList3 = [];

    private _discardSPList0 = [];
    private _discardSPList1 = [];
    private _discardSPList2 = [];
    private _discardSPList3 = [];
    private canDiscard = false;
    private _discardStatusUI:DiscardStatusUI;
    private _gameOverUI:GameOverUI;
    private _discardSPsBox;
    private _joker = [];
    private _jokerPi = [];

}

