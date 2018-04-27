class HeadUI extends eui.Component {
    private _addTool:eui.Button;
    private _addMoney:eui.Button;
    private _addCard:eui.Button;
    private _shopType:string;
    private info;
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_main/skins/headSkin.exml";
        this.info = {...GameMode.accountInfo,...GameMode.userInfo};
        console.log(11111, this.info)
    }

    uiCompHandler() {
        this._addTool.addEventListener( egret.TouchEvent.TOUCH_TAP, this.dialogHandler, this );
        this._addMoney.addEventListener( egret.TouchEvent.TOUCH_TAP, this.dialogHandler, this );
        this._addCard.addEventListener( egret.TouchEvent.TOUCH_TAP, this.dialogHandler, this );  
    }

    private dialogHandler( evt:egret.TouchEvent ):void{
        GameSound.playClickSound();
        switch ( evt.currentTarget ){
            case this._addTool:
                this._shopType = ShopTypes.ADDTOOL;
                break;
            case this._addMoney:
                this._shopType = ShopTypes.ADDMONEY;
                break;
            case this._addCard:
                this._shopType = ShopTypes.ADDCARD;
                break;
        }
        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_SHOW_DIALOG, {type:DialogTypes.SHOP, data:{shopType: this._shopType}});
    }

    protected createChildren():void {
        super.createChildren();
    }
}
