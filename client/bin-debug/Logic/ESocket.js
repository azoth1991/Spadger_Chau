var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ESocket = (function () {
    function ESocket() {
        this.totalNum = 3;
        this._inRoom = false;
        this._websocket = new WebSocket("ws://101.37.151.85:8080//socket/maj/room");
        this.watchSocket();
    }
    ESocket.prototype.onReceiveMessage = function (_a) {
        var data = _a.data;
        console.log('onReceiveMessage', JSON.parse(data));
        var info = JSON.parse(data);
        if (info.code == 0) {
            alert(info.msg);
        }
        else {
            switch (info.type) {
                case 1:
                    // 进入房价
                    if (this._inRoom == false) {
                        console.log("sendMessage=>\u8FDB\u5165\u623F\u95F4" + GameMode.roomId);
                        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, { type: GamePages.CREATE_ROOM });
                        this._inRoom = true;
                    }
                    else {
                        console.log("sendMessage=>\u623F\u4EF7\u5360\u4F4D");
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_JOIN, { info: info.model.cur });
                    }
                    break;
                case 3:
                    MessageCenter.getInstance().sendMessage(MessageCenter.GAME_READY, { info: info.model });
                    break;
                case 7:
                    console.log("sendMessage=>\u5F00\u59CB\u6E38\u620F");
                    MessageCenter.getInstance().sendMessage(MessageCenter.GAME_START, info.model);
                    break;
            }
        }
    };
    ESocket.prototype.onSocketOpen = function () {
        console.log("WebSocketOpen");
    };
    ESocket.prototype.watchSocket = function () {
        this._websocket.onopen = this.onSocketOpen.bind(this);
        this._websocket.onmessage = this.onReceiveMessage.bind(this);
    };
    ESocket.prototype.enterRoom = function () {
        var roomId = GameMode.roomId;
        if (roomId !== "") {
            var info = {
                roomId: roomId,
                action: 61,
                wechatId: GameMode.wechatId,
            };
            this._websocket.send(JSON.stringify(info));
        }
        else {
            alert('请输入房间号');
        }
    };
    ESocket.prototype.getReady = function (_a) {
        var data = _a.data;
        var roomId = data.id;
        var info = {
            roomId: roomId,
            action: 3,
            wechatId: GameMode.wechatId,
        };
        this._websocket.send(JSON.stringify(info));
    };
    ESocket.prototype.startGame = function (_a) {
        var data = _a.data;
        var roomId = data.id;
        var info = {
            roomId: roomId,
            action: 52,
            wechatId: GameMode.wechatId,
        };
        this._websocket.send(JSON.stringify(info));
    };
    return ESocket;
}());
__reflect(ESocket.prototype, "ESocket");
