class SettingUI extends eui.Component {
    private _close:eui.Button;
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_main/skins/settingSkin.exml";
    }

    uiCompHandler() {
        this.initData();
        this._close.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            MessageCenter.getInstance().sendMessage( GameEvents.TOGGLE_SETTING,null);
        }, this );
        this._confirmSetting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeGameSound, this);
        var rdlist = [this._effectOpen, this._effectClose, this._bgmOpen, this._bgmClose];
        rdlist.forEach(rd=>{
            rd.addEventListener( egret.TouchEvent.TOUCH_TAP, (evt)=>{
                switch(evt.currentTarget) {
                   case this._effectOpen: 
                        this.settingCache.soundEffectSwitch = true;
                        break;
                   case this._effectClose:
                        this.settingCache.soundEffectSwitch = false;
                        break;
                   case this._bgmOpen:
                        this.settingCache.bgmSwitch = true;
                        break;
                   case this._bgmClose:
                        this.settingCache.bgmSwitch = false;
                        break;
                }
            }, this );
        })
    }

    private changeGameSound () {
        GameMode.bgmSwitch = this.settingCache.bgmSwitch;
        GameMode.soundEffectSwitch = this.settingCache.soundEffectSwitch;
        if (!GameMode.bgmSwitch) {
            GameSound.stopBGM()
        } else if (!GameSound._bgmSoundChannel) {
            GameSound.playBGM();
        }
    }
    
    private initData() {
        if (GameMode.bgmSwitch == true){
            this._bgmOpen.selected = true;
        } else {
            this._bgmClose.selected = true;
        }
        if (GameMode.soundEffectSwitch == true){
            this._effectOpen.selected = true;
        } else {
            this._effectClose.selected = true;
        }
    }

    protected createChildren():void {
        super.createChildren();
    }
    private _effectOpen:eui.RadioButton;
    private _effectClose:eui.RadioButton;
    private _bgmOpen:eui.RadioButton;
    private _bgmClose:eui.RadioButton;
    private _confirmSetting:eui.Button;
    private settingCache ={
            soundEffectSwitch: true,
            bgmSwitch: true,
    };
}
