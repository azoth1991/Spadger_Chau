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
        this._peng.touchEnabled = false;
        this._hu.touchEnabled = false;
        this._gang.touchEnabled = false;
        this._chi.touchEnabled = false;

        // this._peng.visible = false;
        // this._hu.visible = false;
        // this._gang.visible = false;
        // this._chi.visible = false;

        this._guo.selected = true;
        this._guo.touchEnabled = true;
        console.log('option', this._option)
        this._option.forEach((v,k)=>{
            switch(v){
                case 42:
                    this._peng.selected = true;
                    this._peng.touchEnabled = true;
                    // this._peng.visible = true;
                    // this._peng.x = this.pos + k*this.des;
                    // this._peng.y = 494;
                    break;
                case 43:
                    this._chi.selected = false;
                    this._chi.touchEnabled = false;
                    // this._chi.visible = true;
                    // this._chi.x = this.pos + k*this.des;
                    // this._chi.y = 494;
                    break;
                case 44:
                    this._gang.selected = true;
                    this._gang.touchEnabled = true;
                    // this._gang.visible = true;
                    // this._gang.x = this.pos + k*this.des;
                    // this._gang.y = 494;
                    break;
                case 45:
                    this._hu.selected = true;
                    this._hu.touchEnabled = true;
                    // this._hu.visible = true;
                    // this._hu.x = this.pos + k*this.des;
                    // this._hu.y = 494;
                    break;
            }
        });
    }

    public showChi() {
        this._chi.selected = true;
        this._chi.touchEnabled = true;        
    }
    private handleEvent(){
        this._hu.addEventListener('touchTap',this.handleStatus,this);
        this._gang.addEventListener('touchTap',this.handleStatus,this);
        this._chi.addEventListener('touchTap',this.handleStatus,this);
        this._peng.addEventListener('touchTap',this.handleStatus,this);
        this._guo.addEventListener('touchTap',this.handleStatus,this);
    }
    private handleStatus(evt){
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
            case this._guo:
                MessageCenter.getInstance().sendMessage(GameEvents.WS_SEND_DISCARDSTATUS, {type:GameEvents.WS_GUO});
                break;
        }
        // todo销毁
        this.visible = false;
        GameMode.isSP = false;
        // 所有牌倒下
        MessageCenter.getInstance().sendMessage( GameEvents.DOWN_CARDS, null );
    }

    protected createChildren():void {
        super.createChildren();
    }
    private _peng:eui.ToggleButton;
    private _gang:eui.ToggleButton;
    private _chi:eui.ToggleButton;
    private _hu:eui.ToggleButton;
    private _guo:eui.ToggleButton;
    private _option = [];
    private pos = 702;
    private des = 115;
}