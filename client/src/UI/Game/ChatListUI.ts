class ChatListUI extends eui.Component {
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
    public pushChat(data){
        console.log('pushChat123');
        this.listChat.dataProvider.addItem(data);
        // this.listChat.itemRenderer = ChatlistIRUI;                     
    }

    protected createChildren():void {
        super.createChildren();
    }
}
class ChatlistIRUI extends eui.ItemRenderer {
    private chatLabel:eui.Label;
    private chatBg:eui.Image;
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_game/skins/chatlistIRSkin.exml";
    }
    private uiCompHandler() {
        var height = 60;
        var maxWidth = 580;
        var l;
        setTimeout(()=>{
            l = parseInt(`${this.chatLabel.width/maxWidth}`);            
            if (l>0){
                this.chatBg.width = maxWidth+30;
                this.chatLabel.width = maxWidth;
            } else {
                this.chatBg.width = this.chatLabel.width + 30;
            }

            this.chatLabel.height = height*(l+1);
            this.chatBg.height = height*(l+1);
        },20);
        
        
    }

    protected createChildren():void {
        super.createChildren();
    }

}