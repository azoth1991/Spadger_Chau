class ESocket {
    private _websocket:any;
    private _roomId:any;
    private totalNum = 2;
    constructor() {
        this._websocket = new WebSocket("ws://101.37.151.85:8080//socket/maj/room");
        this.watchSocket();
    }

    private onReceiveMessage({data}){
        console.log('onReceiveMessage',JSON.parse(data));
        let info = JSON.parse(data);
        if (info.code == 0){
            alert(info.msg);
        } else {
            switch (info.type) {
                case 1:
                console.log(`sendMessage=>进入房间`)
                    MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, {type:GamePages.CREATE_ROOM,id:this._roomId});
                    break;
                case 3:
                    if (info.model && info.model.readyNum == this.totalNum)
                    MessageCenter.getInstance().sendMessage(MessageCenter.GAME_READY, null);
                    break;
                case 7:
                    console.log(`sendMessage=>开始游戏`)
                    MessageCenter.getInstance().sendMessage(MessageCenter.GAME_START, null);
                    break;
            }
        }
    }

    private onSocketOpen():void {
        console.log("WebSocketOpen");
    }

    private watchSocket(){
        this._websocket.onopen = this.onSocketOpen.bind(this);
        this._websocket.onmessage = this.onReceiveMessage.bind(this);
    }
    public enterRoom({data}) {
        console.log(data,this.getUrlParam("wechatId"))
        var roomId = data.id;
        this._roomId = roomId;
        if(roomId !== "") {
            var info = {
                roomId,
                action: 61,
                wechatId: this.getUrlParam("wechatId"),
            };
            this._websocket.send(JSON.stringify(info));
        } else {
            alert('请输入房间号');
        }
    }

    public getReady({data}){
        console.log(data,this.getUrlParam("wechatId"))
        var roomId = data.id;
        var info = {
            roomId,
            action: 3,
            wechatId: this.getUrlParam("wechatId"),
        };
        this._websocket.send(JSON.stringify(info));
    }

    public startGame({data}){
        console.log(data,this.getUrlParam("wechatId"))
        var roomId = data.id;
        var info = {
            roomId,
            action: 52,
            wechatId: this.getUrlParam("wechatId"),
        };
        this._websocket.send(JSON.stringify(info));
    }

    private getUrlParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        // if (r!=null) return unescape(r[2]);
        if (r!=null) return r[2];
        return null;
    }
    
}