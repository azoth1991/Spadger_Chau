class FriendIcon extends eui.Component {
    constructor(type, {x,y,wechatNick,id,headImageUrl,wechatId,pos}) {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_game/skins/headIcon1.exml";
        this.x = x;
        this.y = y;
        this._name.text = wechatNick;
        this._id.text = `id:${id}`;
        this._icon.source = headImageUrl;
        this._name1 = wechatNick;
        this._icon1 = headImageUrl;
        this._wechatid = wechatId;
    }

    uiCompHandler() {
        if (this._wechatid == GameMode.zhuangid){
            this._zhuang.visible = true;
        }
    }

    public changeSkin({x,y}){
        this.x = x;
        this.y = y;
        this.skinName = "resource/eui_game/skins/headIcon2.exml";
        this._icon.source = this._icon1;
        this._count.text = this._name1;
    }

    protected createChildren():void {
        super.createChildren();
    }
    private _name:eui.Label;
    private _id:eui.Label;
    private _count:eui.Label;
    private _icon:eui.Image;
    private _name1;
    private _icon1;
    private _wechatid;
    private _zhuang:eui.Image;

}
