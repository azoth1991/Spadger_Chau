class GameUI extends eui.Component {
    constructor(id) {
        super();
        this.roomId = id;
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_game/skins/gameSkin.exml";

        
    }

    uiCompHandler() {
        // headIconList
        /// 填充数据
        this.initGameUI();
        
    }

    private chatBox() {
        this._chatUI = new ChatUI();
        this.addChild(this._chatUI);
    }

    private initGameUI() {
        var startPosition:Array<Object> = [
            { x: 158, y: 576 },
            { x: 158, y: 330 },
            { x: 563, y: 106 },
            { x: 892, y: 305 },
        ];
        var dsListIcon:Array<any> = [
            { icon: "head-i-2_png", name: "伊文捷琳", id: "123" },
            { icon: "head-i-2_png", name: "亚特伍德", id: "234" },
            { icon: "head-i-2_png", name: "伊妮德", id: "134"},
            { icon: "head-i-2_png", name: "鲁宾", id: "1234" }
        ];
        startPosition.map( (v,k) => {
            for (var key in v) {
                dsListIcon[k][key] = v[key];
            }
        })
        this._icon0 = new FriendIcon(1, dsListIcon[0]);
        this._icon1 = new FriendIcon(1, dsListIcon[1]);
        this._icon2 = new FriendIcon(1, dsListIcon[2]);
        this._icon3 = new FriendIcon(1, dsListIcon[3]);
        this.addChild(this._icon0);
        this.addChild(this._icon1);
        this.addChild(this._icon2);
        this.addChild(this._icon3);
        //聊天框
        this.chatBox();
        this._start.addEventListener( egret.TouchEvent.TOUCH_TAP, this.handleStart, this );
        this._ready.addEventListener( egret.TouchEvent.TOUCH_TAP, this.handleReady, this );
        this._back.addEventListener( egret.TouchEvent.TOUCH_TAP, this.backHome, this );
        this._chat.addEventListener( egret.TouchEvent.TOUCH_TAP, this._chatUI.toggleVisible, this._chatUI );

        // 开始游戏  分享
        this.addEventListener(GameEvents.EVT_LOAD_PAGE, this.startGame, this);
    }

    private backHome(e:egret.TouchEvent):void {
        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, {type:GamePages.BACK_HOME});
    }

    public startGameUI(data):void {
        console.log('startGameUI',data)
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
        var models = [
            1,2,0,1,3,2,0,0,0,
            1,0,0,0,0,0,0,0,0,
            1,0,0,0,0,0,0,0,0,
            1,0,0,0,0,0,
        ];
        var cards = this.getCards(models);
        console.log(cards);
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

    public changeReady(){
        this._ready.enabled = false;
        this._ready.$children[1].text = "已准备";
        console.log(this._ready);
        // this._readyText.text = '已准备';
    }

    private handleStart(e:egret.TouchEvent):void {
        MessageCenter.getInstance().sendMessage( GameEvents.WS_START, {id:this.roomId});        
    }
    private handleReady(e:egret.TouchEvent):void {
        MessageCenter.getInstance().sendMessage( GameEvents.WS_READY, {id:this.roomId});
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
    private roomId:any;
    private _readyText:eui.Label;
}

