class MainUI extends eui.Component {
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_main/skins/mainSkin.exml";
    }

    uiCompHandler() {
        // header
        this._headui = new HeadUI();

        // _friendListIR
        /// 填充数据
        var dsListFriend:Array<Object> = [
            { icon: "head-i-2_png", name: "伊文捷琳", count: "评价：樱桃小丸子"}
            , { icon: "head-i-2_png", name: "亚特伍德", count: "评价：离了我你不行的" }
            , { icon: "head-i-2_png", name: "伊妮德", count: "评价：猴子请来的逗比"}
            , { icon: "head-i-2_png", name: "鲁宾", count: "评价：我勒个去" }
            , { icon: "head-i-2_png", name: "威弗列德", count: "评价：这货碉堡了" }
            , { icon: "head-i-2_png", name: "史帝文", count: "评价：咖啡不加糖" }
            , { icon: "head-i-2_png", name: "哈瑞斯", count: "评价：猪一样的队友" }
        ];
        this.listFriend.dataProvider = new eui.ArrayCollection( dsListFriend );

        this.listFriend.itemRenderer = FriendIRUI;
        //需要在scroller添加到舞台上面之后再访问verticalScrollBar
        this.addChildAt( this._headui, this.getChildIndex( this.imgBg ) + 1 );

        // 绑定按钮
        this.createRoom.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            MessageCenter.getInstance().sendMessage( GameEvents.TOGGLE_CREATEROOM,null);
        }, this );
        this.myRoom.addEventListener( egret.TouchEvent.TOUCH_TAP, this.dialogHandler, this );
        this.enterRoom.addEventListener( egret.TouchEvent.TOUCH_TAP, this.dialogHandler, this );

        // dialog点击
        this._myI.addEventListener( egret.TouchEvent.TOUCH_TAP, this.dialogHandler, this );
        this._toolsI.addEventListener( egret.TouchEvent.TOUCH_TAP, this.dialogHandler, this );
        this._zhanjiI.addEventListener( egret.TouchEvent.TOUCH_TAP, this.dialogHandler, this );
        this._newsI.addEventListener( egret.TouchEvent.TOUCH_TAP, this.dialogHandler, this );
        this._playI.addEventListener( egret.TouchEvent.TOUCH_TAP, this.dialogHandler, this );
        this._setI.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            MessageCenter.getInstance().sendMessage( GameEvents.TOGGLE_SETTING,null);
        }, this );

    }

    private mbtnHandler( evt ):void{
        switch ( evt.currentTarget ){
            case this.createRoom:
                this._pageFocused = GamePages.CREATE_ROOM;
                break;
            case this.enterRoom:
                this._pageFocused = GamePages.ENTER_ROOM ;
                break;
            case this.myRoom:
                this._pageFocused = GamePages.MY_ROOM ;
                break;
        }
        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, {type:this._pageFocused});
    }

    private dialogHandler( evt:egret.TouchEvent ):void{
        switch ( evt.currentTarget ){
            case this._myI:
                this._dialogType = DialogTypes.MY;
                break;
            case this._toolsI:
                this._dialogType = DialogTypes.SHOP;
                break;
            case this._zhanjiI:
                this._dialogType = DialogTypes.ZHANJI ;
                break;
            case this._newsI:
                this._dialogType = DialogTypes.NEWS;
                break;
            case this._playI:
                this._dialogType = DialogTypes.PLAY ;
                break;
            case this._setI:
                this._dialogType = DialogTypes.SET ;
                break;
            case this.enterRoom:
                this._dialogType = DialogTypes.ENTERROOM;
                break;
            case this.myRoom:
                this._dialogType = DialogTypes.MYROOM;
                break;
        }
        if (this._dialogType === DialogTypes.SHOP) {
            MessageCenter.getInstance().sendMessage(MessageCenter.EVT_SHOW_DIALOG, {type:this._dialogType,data:{ shopType: ShopTypes.ADDTOOL }});
        } else {
            MessageCenter.getInstance().sendMessage(MessageCenter.EVT_SHOW_DIALOG, {type:this._dialogType,data:{}});
        }
        
    }

    protected createChildren():void {
        super.createChildren();
    }
    private imgBg;
    private _headui:HeadUI;
    private listFriend:eui.List;
    private createRoom:eui.Button;
    private enterRoom:eui.Button;
    private myRoom:eui.Button;
    private _pageFocused:string;

    private _myI:eui.Button;
    private _toolsI:eui.Button;
    private _zhanjiI:eui.Button;
    private _newsI:eui.Button;
    private _playI:eui.Button;
    private _setI:eui.Button;
    private _dialogType:string;
}
