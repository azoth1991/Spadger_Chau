class GameUI extends eui.Component {
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_game/skins/gameSkin.exml";
    }

    uiCompHandler() {
    }

    protected createChildren():void {
        super.createChildren();
    }
}
