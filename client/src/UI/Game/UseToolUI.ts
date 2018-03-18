class UseToolUI extends eui.Component {
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_game/skins/useToolSkin.exml";      
    }

    uiCompHandler() {
        this._useToolBg.addEventListener( egret.TouchEvent.TOUCH_TAP, () => {
            MessageCenter.getInstance().sendMessage( GameEvents.TOGGLE_USETOOL,null);
        },  this );
        var dsList:Array<Object> = [
            { bg: "toolItem-bg_png", icon: "card_png", count: "5"},
            { bg: "toolItem-bg_png", icon: "clap_png", count: "20" },
            { bg: "toolItem-bg_png", icon: "crystal_png", count: "20" },
            { bg: "toolItem-bg_png", icon: "cannon_png", count: "20" },
            { bg: "toolItem-bg_png", icon: "kiss_png", count: "20" },
            { bg: "toolItem-bg_png", icon: "rose_png", count: "20" },
            { bg: "toolItem-bg_png", icon: "shit_png", count: "20" },
            { bg: "toolItem-bg_png", icon: "egg_png", count: "20" },
            { bg: "toolItem-bg_png", icon: "boom_png", count: "20" },
        ];
        this.ownTools.dataProvider = new eui.ArrayCollection( dsList );

        this.ownTools.itemRenderer = ToolIRUI;
    }

    public clickHandler(target) {
        console.log(target)
    }


    private ownTools:eui.List;
    private _useToolBg:eui.Image;
}

class ToolIRUI extends eui.ItemRenderer {
    constructor() {
        super();
        this.skinName = "resource/eui_game/skins/toolIRUISkin.exml";
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, UseToolUI.clickHandler, this)
    }

    clickHandler() {
        
    }

    protected createChildren():void {
        super.createChildren();
    }

}