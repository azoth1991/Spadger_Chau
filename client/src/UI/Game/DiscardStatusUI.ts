class DiscardStatusUI extends eui.Component {
    constructor(type, {x,y,name,id,icon}) {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_game/skins/discardStatusSkin.exml";
    }

    uiCompHandler() {
    }


    protected createChildren():void {
        super.createChildren();
    }
    private _peng:eui.Button;
    private _gang:eui.Button;
    private _chi:eui.Button;
    private _hu:eui.Button;
}
