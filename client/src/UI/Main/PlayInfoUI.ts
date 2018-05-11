class PlayInfoUI extends eui.Component {
    constructor(type) {
        super();
       this.skinName = `resource/eui_main/skins/play${type}.exml`;
    }

    uiCompHandler() {
        
    }

    protected createChildren():void {
        super.createChildren();
    }
    private _label:eui.Label;
}
