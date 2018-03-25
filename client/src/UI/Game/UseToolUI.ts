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
        this._toolItems = [ this._clap, this._crystal, this._card, this._kiss, this._cannon, this._rose, this._shit, this._egg, this._boom ];
        this._toolItems.forEach(item => item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this));
    }

    public clickHandler(e) {
        const tool = e.target;
        const count = parseInt(tool.$children[2].text) || 0;
        console.log(this._toolItems);
        this._toolItems = this._toolItems.map(item => {
            item.selected = item === tool ? true : false; 
            return item;
        })
        if (count > 0) {
            MessageCenter.getInstance().sendMessage( GameEvents.PICK_TOOL_TARGET, {action: 'swtich_tool', tool:'1'});
        }   
    }


    private ownTools:eui.List;
    private _useToolBg:eui.Image;
    private _card:eui.ToggleButton;
    private _clap:eui.ToggleButton;
    private _crystal:eui.ToggleButton;
    private _cannon:eui.ToggleButton;
    private _kiss:eui.ToggleButton;
    private _rose:eui.ToggleButton;
    private _shit:eui.ToggleButton;
    private _egg:eui.ToggleButton;
    private _boom:eui.ToggleButton;
    private _toolItems = [];
}
