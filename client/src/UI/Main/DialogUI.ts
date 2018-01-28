class DialogUI extends eui.Component {
    constructor(data) {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_main/skins/dialogSkin.exml";
    }

    uiCompHandler() {
        this._back.addEventListener( egret.TouchEvent.TOUCH_TAP, this.backHome, this );
    }

    private backHome(e:egret.TouchEvent):void {
        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, GamePages.BACK_HOME);
    }

    protected createChildren():void {
        super.createChildren();
    }
    private _back:eui.Button;
}
