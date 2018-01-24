class FriendIcon extends eui.Component {
    constructor(type, {x,y,name,id,icon}) {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_game/skins/headIcon1.exml";
        this.x = x;
        this.y = y;
        this._name.text = name;
        this._id.text = `id:${id}`;
        this._icon.source = icon;
    }

    uiCompHandler() {
    }

    public changeSkin({x,y}){
        this.x = x;
        this.y = y;
        this.skinName = "resource/eui_game/skins/headIcon2.exml";
        this._count.text = "0";
    }

    protected createChildren():void {
        super.createChildren();
    }
    private _name:eui.Label;
    private _id:eui.Label;
    private _count:eui.Label;
    private _icon:eui.Image;
}
