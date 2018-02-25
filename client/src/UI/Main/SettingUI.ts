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
        var rdlist = [this.radio1,this.radio2,this.radio3,this.radio4,this.radio5,this.radio6,this.radio7,this.radio8,this.radio9,this.radio10];
        rdlist.forEach(rd=>{
            rd.addEventListener( egret.TouchEvent.TOUCH_TAP, (evt)=>{
                switch(evt.currentTarget) {
                    case  this.radio1:
                        GameMode.billingMode = 1;
                        break;
                    case  this.radio2:
                        GameMode.billingMode = 2;
                        break;
                    case  this.radio3:
                        GameMode.type = 1;
                        break;
                    case  this.radio4:
                        GameMode.type = 2;
                        break;
                    case  this.radio5:
                        GameMode.winPoints = 1;
                        break;
                    case  this.radio6:
                        GameMode.winPoints = 16;
                        break;
                    case  this.radio7:
                        GameMode.winPoints = 32;
                        break;
                    case  this.radio8:
                        GameMode.winPoints = 64;
                        break;
                    case  this.radio9:
                        GameMode.limitPoints = 300;
                        break;
                    case  this.radio10:
                        GameMode.limitPoints = 500;
                        break;
                }
            }, this );
        })
    }
    private initData() {
        if (GameMode.billingMode == 1){
            this.radio1.selected = true;
        }
        if (GameMode.billingMode == 2){
            this.radio2.selected = true;
        }
        if (GameMode.type == 1){
            this.radio3.selected = true;
        }
        if (GameMode.type == 2){
            this.radio4.selected = true;
        }
        if (GameMode.winPoints == 1){
            this.radio5.selected = true;
        }
        if (GameMode.winPoints == 16){
            this.radio6.selected = true;
        }
        if (GameMode.winPoints == 32){
            this.radio7.selected = true;
        }
        if (GameMode.winPoints == 64){
            this.radio8.selected = true;
        }
        if (GameMode.limitPoints == 300){
            this.radio9.selected = true;
        }
        if (GameMode.limitPoints == 500){
            this.radio10.selected = true;
        }
    }

    protected createChildren():void {
        super.createChildren();
    }
    private radio1:eui.RadioButton;
    private radio2:eui.RadioButton;
    private radio3:eui.RadioButton;
    private radio4:eui.RadioButton;
    private radio5:eui.RadioButton;
    private radio6:eui.RadioButton;
    private radio7:eui.RadioButton;
    private radio8:eui.RadioButton;
    private radio9:eui.RadioButton;
    private radio10:eui.RadioButton;
}
