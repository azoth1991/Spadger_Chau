class HeadUI extends eui.Component {
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_main/skins/headSkin.exml";
    }

    uiCompHandler() {
    }

    protected createChildren():void {
        super.createChildren();
    }
}
