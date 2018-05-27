class CreateRoomSettingUI extends eui.Component {
    private _close:eui.Button;
    private _enterRoom:eui.Button;
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_main/skins/createRoomSettingSkin.exml";
    }

    uiCompHandler() {
        this.initData();
        this._enterRoom.addEventListener( egret.TouchEvent.TOUCH_TAP,()=>{
            MessageCenter.getInstance().sendMessage( GameEvents.TOGGLE_CREATEROOM,null);
            this.sendCreateRoom();
        }, this);
        this._close.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            MessageCenter.getInstance().sendMessage( GameEvents.TOGGLE_CREATEROOM,null);
        }, this );
        var rdlist = [this.radio1_1,this.radio1_2,this.radio2_1,this.radio2_2,this.radio2_3,this.radio3_1,this.radio3_2,this.radio3_3,this.radio3_4,this.radio4_1,this.radio4_2];
        rdlist.forEach(rd=>{
            rd.addEventListener( egret.TouchEvent.TOUCH_TAP, (evt)=>{
                switch(evt.currentTarget) {
                    case  this.radio1_1:
                        GameMode.pointType = 131;
                        break;
                    case  this.radio1_2:
                        GameMode.pointType = 132;
                        break;
                    case  this.radio2_1:
                        GameMode.type = 121;
                        break;
                    case  this.radio2_2:
                        GameMode.type = 122;
                        break;
                    case  this.radio2_3:
                        GameMode.type = 123;
                        break;
                    case  this.radio3_1:
                        GameMode.winPoints = 1;
                        break;
                    case  this.radio3_2:
                        GameMode.winPoints = 16;
                        break;
                    case  this.radio3_3:
                        GameMode.winPoints = 32;
                        break;
                    case  this.radio3_4:
                        GameMode.winPoints = 64;
                        break;
                    case  this.radio4_1:
                        GameMode.limitPoints = 300;
                        break;
                    case  this.radio4_2:
                        GameMode.limitPoints = 500;
                        break;
                }
            }, this );
        })
        var toggleList = [this.radio5_1, this.radio5_2, this.radio5_3];
        toggleList.forEach(tg=>{
            tg.addEventListener( egret.TouchEvent.TOUCH_TAP, (evt)=>{
                switch(evt.currentTarget) {
                    case  this.radio5_1:
                        GameMode.hornorJoker = evt.currentTarget.selected;
                        break;
                    case  this.radio5_2:
                        GameMode.originJoker = evt.currentTarget.selected;
                        break;
                    case  this.radio5_3:
                        GameMode.isUnderTake = evt.currentTarget.selected;
                        break;
                }
            }, this );
        })
    }

    private sendCreateRoom() {
        var params = JSON.stringify({
            host:GameMode.wechatId,billingMode:GameMode.billingMode,
            type:GameMode.type,winPoints:GameMode.winPoints,
            limitPoints:GameMode.limitPoints,
            pointType:GameMode.pointType,
            hornorJoker:GameMode.hornorJoker,
            originJoker:GameMode.originJoker,
            isUnderTake:GameMode.isUnderTake,
        });
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        console.log('gameparams',params)
        request.open(encodeURI(`http://101.37.151.85:8008/socket/create?param=${params}&wechatId=${GameMode.wechatId}`),egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE,(evt)=>{
            var response = <egret.HttpRequest>evt.currentTarget;
            var res = JSON.parse(response.response);
            if (res.code == 1) {
                GameMode.roomId = res.result.roomId;
                console.log('createroom',GameMode.roomId);
                MessageCenter.getInstance().sendMessage( GameEvents.WS_ENTER_ROOM, {type:GamePages.CREATE_ROOM});
            } else {
                alert('创建房间失败')
            }
        },this);
    }

    private initData() {
        this.radio1_1.selected = true;
        this.radio2_1.selected = true;
        this.radio3_1.selected = true;
        this.radio4_1.selected = true;
    }

    protected createChildren():void {
        super.createChildren();
    }
    private radio1_1:eui.RadioButton;
    private radio1_2:eui.RadioButton;
    private radio2_1:eui.RadioButton;
    private radio2_2:eui.RadioButton;
    private radio2_3:eui.RadioButton;
    private radio3_1:eui.RadioButton;
    private radio3_2:eui.RadioButton;
    private radio3_3:eui.RadioButton;
    private radio3_4:eui.RadioButton;
    private radio4_1:eui.RadioButton;
    private radio4_2:eui.RadioButton;
    private radio5_1:eui.RadioButton;
    private radio5_2:eui.RadioButton;
    private radio5_3:eui.RadioButton;
}
