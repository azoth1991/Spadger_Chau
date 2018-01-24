class GameUI extends eui.Component {
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_game/skins/gameSkin.exml";
    }

    uiCompHandler() {
        // headIconList
        /// 填充数据
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
        this._invent.addEventListener( egret.TouchEvent.TOUCH_TAP, this.handleInvent, this );

        // 开始游戏  分享
        this.addEventListener(GameEvents.EVT_LOAD_PAGE, this.startGame, this);
    }

    private startGame(e:egret.TouchEvent):void {
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
    }

    private handleInvent(e:egret.TouchEvent):void {

        this.dispatchEventWith( GameEvents.EVT_LOAD_PAGE, false );
    }

    protected createChildren():void {
        super.createChildren();
    }
    private _icon0:FriendIcon;
    private _icon1:FriendIcon;
    private _icon2:FriendIcon;
    private _icon3:FriendIcon;
    private _invent:eui.Button;
}

