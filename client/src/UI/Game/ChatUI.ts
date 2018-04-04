class ChatUI extends eui.Component {
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_game/skins/chatSkin.exml";      
        this.visible = false;
        
    }

    uiCompHandler() {
        console.log('chatui')
        this._buttons = [this._chatlist];
        this._chatlist.selected = true;
        
        this.initItem();
        this._buttons.forEach((btn)=>{
            btn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.handleTag, this );
        })
        this._send.addEventListener( egret.TouchEvent.TOUCH_TAP, this.handleChat, this );
        this._record.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.startRecord, this);
        this._record.addEventListener( egret.TouchEvent.TOUCH_END, this.endRecord, this);
    }

    public sendMsg(info) {
        this._chatListUI.pushChat({ icon: "head-i-2_png", count: info});
    }
    // 开始录音
    private startRecord(evt:egret.Event){
        evt.currentTarget.text = '录音中';
        wx.ready(function(){
            wx.startRecord();
        });
        wx.onVoiceRecordEnd({
        // 录音时间超过一分钟没有停止的时候会执行 complete 回调
            complete: function (res) {
                var localId = res.localId;

            }
        });
    }
    // 结束路由，并上传
    private endRecord(evt:egret.Event){
        evt.currentTarget.text = '录音';
        wx.ready(function(){
            wx.stopRecord({
                success: function (res) {
                    console.log('stopRecord')
                    var localId = res.localId;
                    wx.uploadVoice({
                        localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                        isShowProgressTips: 0, // 默认为1，显示进度提示
                        success: function (res) {
                            var serverId = res.serverId; // 返回音频的服务器端ID
                            // 发送服务消息
                            MessageCenter.getInstance().sendMessage( GameEvents.WS_SEND_CHAT, {info: serverId} );
                        }
                    });
                }
            });
        });
    }
    private handleChat(evt) {
        if (this._textInupt.text) {
            MessageCenter.getInstance().sendMessage( GameEvents.WS_SEND_CHAT, {info: this._textInupt.text} );
            this._textInupt.text = '';                  
        }
    }

    private initItem(){
        // 表情
        this._chatExListUI = new eui.Component();
        this._chatExListUI.skinName = "resource/eui_game/skins/chatExListSkin.exml";
        // 聊天列表
        this._chatListUI = new ChatListUI();
        this.currentBox = this._chatListUI;

        this.addChild(this.currentBox);
    }

    private handleTag(evt:egret.Event) {
        console.log('chatBtn', evt)
        this.removeChild(this.currentBox);
        this._buttons.forEach(value=>{
            value.selected = false;
        });
        evt.target.selected = true;

        switch (evt.target) {
            // case this._biaoqing:
            //     this.currentBox = this._chatExListUI;
            //     break;
            // case this._quickchat:
            //     this.currentBox = this._chatListUI;
            //     break;
            case this._chatlist:
                this.currentBox = this._chatListUI;
                break;
        }
        this.addChild(this.currentBox);
    }

    public toggleVisible(){
        console.log('toggle')
        this.visible = !this.visible;
    }

    protected createChildren():void {
        super.createChildren();
    }
    // private _biaoqing:eui.ToggleButton;
    // private _quickchat:eui.ToggleButton;
    private _chatlist:eui.ToggleButton;
    private _id:eui.Label;
    private _count:eui.Label;
    private _icon:eui.Image;
    private _buttons:any;
    private _chatExListUI:eui.Component;
    private _chatListUI:ChatListUI;
    // private _chatQuickListUI:ChatQuickListUI;
    private currentBox:eui.Component;
    private _send:eui.Button;
    private _textInupt:eui.TextInput;
    private _record:eui.Button;
}
