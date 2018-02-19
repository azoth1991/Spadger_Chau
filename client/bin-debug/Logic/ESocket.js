var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ESocket = (function () {
    function ESocket() {
        this.totalNum = 2;
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
                    console.log("sendMessage=>\u8FDB\u5165\u623F\u95F4");
                    MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, { type: GamePages.CREATE_ROOM, id: this._roomId });
                    break;
                case 3:
                    if (info.model && info.model.readyNum == this.totalNum)
                        MessageCenter.getInstance().sendMessage(MessageCenter.GAME_READY, null);
                    break;
                case 7:
                    console.log("sendMessage=>\u5F00\u59CB\u6E38\u620F");
                    MessageCenter.getInstance().sendMessage(MessageCenter.GAME_START, null);
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
    ESocket.prototype.enterRoom = function (_a) {
        var data = _a.data;
        console.log(data, this.getUrlParam("wechatId"));
        var roomId = data.id;
        this._roomId = roomId;
        if (roomId !== "") {
            var info = {
                roomId: roomId,
                action: 61,
                wechatId: this.getUrlParam("wechatId"),
            };
            this._websocket.send(JSON.stringify(info));
        }
        else {
            alert('请输入房间号');
        }
    };
    ESocket.prototype.getReady = function (_a) {
        var data = _a.data;
        console.log(data, this.getUrlParam("wechatId"));
        var roomId = data.id;
        var info = {
            roomId: roomId,
            action: 3,
            wechatId: this.getUrlParam("wechatId"),
        };
        this._websocket.send(JSON.stringify(info));
    };
    ESocket.prototype.startGame = function (_a) {
        var data = _a.data;
        console.log(data, this.getUrlParam("wechatId"));
        var roomId = data.id;
        var info = {
            roomId: roomId,
            action: 52,
            wechatId: this.getUrlParam("wechatId"),
        };
        this._websocket.send(JSON.stringify(info));
    };
    ESocket.prototype.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        // if (r!=null) return unescape(r[2]);
        if (r != null)
            return r[2];
        return null;
    };
    return ESocket;
}());
__reflect(ESocket.prototype, "ESocket");
