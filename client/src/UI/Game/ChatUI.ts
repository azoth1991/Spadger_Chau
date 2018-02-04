class ChatUI extends eui.Component {
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_game/skins/chatSkin.exml";
        this.visible = false;
    }

    uiCompHandler() {

        this._buttons = [this._biaoqing, this._quickchat, this._chatlist];
        this._chatlist.selected = true;
        
        this.initItem();
        this._buttons.forEach((btn)=>{
            btn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.handleTag, this );
        })
    }

    private initItem(){
        this._chatExListUI = new eui.Component();
        this._chatExListUI.skinName = "resource/eui_game/skins/chatExListSkin.exml";
        this.currentBox = this._chatExListUI;
        this.addChild(this.currentBox);

        this._chatListUI = new eui.Component();
        this._chatListUI.skinName = "resource/eui_game/skins/chatListSkin.exml";
    }

    private handleTag(evt:egret.Event) {
        console.log('chatBtn', evt)
        this.removeChild(this.currentBox);
        this._buttons.forEach(value=>{
            value.selected = false;
        });
        evt.target.selected = true;

        switch (evt.target) {
            case this._biaoqing:
                this.currentBox = this._chatExListUI;
                break;
            case this._quickchat:
                this.currentBox = this._chatListUI;
                break;
            case this._chatlist:
                this.currentBox = this._chatListUI;
                break;
        }
        this.addChild(this.currentBox);
    }

    public toggleVisible(){
        this.visible = !this.visible;
    }

    protected createChildren():void {
        super.createChildren();
    }
    private _biaoqing:eui.ToggleButton;
    private _quickchat:eui.ToggleButton;
    private _chatlist:eui.ToggleButton;
    private _id:eui.Label;
    private _count:eui.Label;
    private _icon:eui.Image;
    private _buttons:any;
    private _chatExListUI:eui.Component;
    private _chatListUI:eui.Component;
    private currentBox:eui.Component;
}
