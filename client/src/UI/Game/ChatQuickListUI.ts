class ChatSoundUI extends eui.Component {
    private listChat:eui.List;
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_game/skins/chatListSkin.exml";
    }

   
    uiCompHandler() {
        /// 填充数据
        var dsListFriend:Array<Object> = [
        ];
        this.listChat.dataProvider = new eui.ArrayCollection(dsListFriend);
        this.listChat.itemRenderer = ChatlistIRUI;        
    }
    
    protected createChildren():void {
        super.createChildren();
    }

}