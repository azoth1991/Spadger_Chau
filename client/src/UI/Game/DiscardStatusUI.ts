class DiscardStatusUI extends eui.Component {
    constructor(option = []) {
        super();
        this._option = option;
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_game/skins/discardStatusSkin.exml";
    }

    uiCompHandler() {
        this.handleEvent();
        this.drawOption();
    }
    // 高亮按钮
    private drawOption(){
        this._peng.selected = false;
        this._hu.selected = false;
        this._gang.selected = false;
        this._chi.selected = false;
        this._option.forEach((v)=>{
            switch(v){
                case 42:
                    this._peng.selected = true;
                    break;
                case 43:
                    this._chi.selected = true;
                    break;
                case 44:
                    this._gang.selected = true;
                    break;
                case 45:
                    this._hu.selected = true;
                    break;
            }
        });
    }
    private handleEvent(){
        this._hu.addEventListener('touchTap',this.handleStatus,this);
        this._gang.addEventListener('touchTap',this.handleStatus,this);
        this._chi.addEventListener('touchTap',this.handleStatus,this);
        this._peng.addEventListener('touchTap',this.handleStatus,this);
    }
    private handleStatus(evt){
        if (evt.currentTarget.selected == true){
            switch (evt.currentTarget) {
                case this._hu:
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_SEND_DISCARDSTATUS, {type:GameEvents.WS_HU});
                    break;
                case this._gang:
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_SEND_DISCARDSTATUS, {type:GameEvents.WS_GANG});
                    break;
                case this._chi:
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_SEND_DISCARDSTATUS, {type:GameEvents.WS_CHI});
                    break;
                case this._peng:
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_SEND_DISCARDSTATUS, {type:GameEvents.WS_PENG});
                    break;

            }
            // todo销毁
            this.visible = false;
        }
        
    }


    protected createChildren():void {
        super.createChildren();
    }
    private _peng:eui.ToggleButton;
    private _gang:eui.ToggleButton;
    private _chi:eui.ToggleButton;
    private _hu:eui.ToggleButton;
    private _option = [];
}
