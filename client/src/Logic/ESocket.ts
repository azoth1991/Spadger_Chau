class ESocket {
    private _websocket:any;
    private _roomId:any;
    private totalNum = 3;
    private _inRoom=false;
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
                    // 进入房价
                    if (this._inRoom == false){
                        console.log(`sendMessage=>进入房间${GameMode.roomId}`)                        
                        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, {type:GamePages.CREATE_ROOM});
                        this._inRoom = true;                
                    } else {
                        console.log(`sendMessage=>房价占位`) 
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_JOIN, {info:info.model.cur});
                    }
                    break;
                case 3:
                    MessageCenter.getInstance().sendMessage(MessageCenter.GAME_READY, {info:info.model});
                    break;
                case 7:
                    console.log(`sendMessage=>开始游戏`)
                    MessageCenter.getInstance().sendMessage(MessageCenter.GAME_START, info.model);
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
    public enterRoom() {
        var roomId = GameMode.roomId;
        if(roomId !== "") {
            var info = {
                roomId,
                action: 61,
                wechatId: GameMode.wechatId,
            };
            this._websocket.send(JSON.stringify(info));
        } else {
            alert('请输入房间号');
        }
    }

    public getReady({data}){
        var roomId = data.id;
        var info = {
            roomId,
            action: 3,
            wechatId: GameMode.wechatId,
        };
        this._websocket.send(JSON.stringify(info));
    }

    public startGame({data}){
        var roomId = data.id;
        var info = {
            roomId,
            action: 52,
            wechatId: GameMode.wechatId,
        };
        this._websocket.send(JSON.stringify(info));
    }

    
}