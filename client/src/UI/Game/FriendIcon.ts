class FriendIcon extends eui.Component {
    constructor(type, {x,y,name,id,icon,wechatId}) {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_game/skins/headIcon1.exml";
        this.x = x;
        this.y = y;
        this._name.text = name;
        this._id.text = `id:${id}`;
        this._icon.source = icon;
        this._name1 = name;
        this._icon1 = icon;
        this._wechatid = wechatId;
    }

    uiCompHandler() {
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

}
