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
        console.log('pushChat123',data);
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
    private serverId = '';
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
            console.log('seltime', this);
            l = parseInt(`${this.chatLabel.width/maxWidth}`);            
            if (l>0){
                this.chatBg.width = maxWidth+30;
                this.chatLabel.width = maxWidth;
            } else {
                this.chatBg.width = this.chatLabel.width + 30;
            }

            this.chatLabel.height = height*(l+1);
            this.chatBg.height = height*(l+1);
            if (this.data.count.indexOf('@&#$')>-1){
                this.serverId = this.data.count.split('@&#$')[1];
                this.chatLabel.text = '点击播放';
                this.addEventListener( egret.TouchEvent.TOUCH_TAP, this.play, this );
            }
        },20);
        
    }
    private play() {
        wx.downloadVoice({
        serverId: this.serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
        isShowProgressTips: 1,// 默认为1，显示进度提示
        success: function (res) {
            var localId = res.localId; // 返回音频的本地ID
            wx.playVoice({
                localId: localId, // 需要播放的音频的本地ID，由stopRecord接口获得
            });
        }
    });
    }

    protected createChildren():void {
        super.createChildren();
    }

}