class ESocket {
    private _websocket:any;
    private _roomId:any;
    private totalNum = 3;
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
                    if (GameMode.inRoom == false){
                        console.log(`sendMessage=>进入房间${GameMode.roomId}`)  
                        var list = info.model.entered;
                        var index = list.indexOf(GameMode.wechatId);
                        list.unshift(list[list.length-1]);
                        list.pop();
                        GameMode.playerList = list.map((v)=>{
                            return {
                                icon: "head-i-2_png", name: v, id: "123"
                            }
                        });
                        var l = 4-GameMode.playerList.length;
                        var newlist = [];
                        newlist.push(GameMode.playerList[0]);
                        for(var i =0;i<l;i++){
                            newlist.push('');
                        }

                        GameMode.playerList = [...newlist,...GameMode.playerList.slice(1)]
                        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, {type:GamePages.CREATE_ROOM});
                        GameMode.inRoom = true;
                    } else {
                        console.log(`sendMessage=>房价占位`) 
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_JOIN, {info:info.model.cur});
                    }
                    break;
                case 2:
                    // 聊天
                    console.log(`getMessage=>聊天信息`) 
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_CHAT, {info:info.model,name:info.prevailing});
                case 3:
                    MessageCenter.getInstance().sendMessage(MessageCenter.GAME_READY, {info:info.model});
                    break;
                case 7:
                    console.log(`sendMessage=>开始游戏`)
                    MessageCenter.getInstance().sendMessage(MessageCenter.GAME_START, info.model);
                    break;
                case 10:
                    console.log(`重连`);
                    var list = info.model.entered;
                    var index = list.indexOf(GameMode.wechatId);

                    GameMode.playerList[0] = {icon: "head-i-2_png", name: GameMode.wechatId, id: "123" };                                     
                    while (index > 0){
                        index--;
                        GameMode.playerList[3-index] = { icon: "head-i-2_png", name: list[index], id: "123" };
                    }
                    GameMode.playerList;
                    MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, {type:GamePages.CREATE_ROOM});
                    GameMode.inRoom = true;
                    break;
                case 41:
                    console.log('出牌');
                    if(info.model.cards){
                        var cards = info.model.cards;
                        var discard = info.discard;
                        var prevailing = info.prevailing;
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_CARD, {cards,discard,prevailing});
                    }
                    if (info.model.status ==23) {
                        GameMode.isDiscard = true;
                    } else {
                        GameMode.isDiscard = false;
                    }
                    // 谁出牌
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDPOS, {pos:info.currentPlayer});
                    if(info.model.option.length > 0){
                        // 显示碰杠吃
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_SEND_CARDSTATUS, {option:info.model.option});
                        // // 碰
                        // if(info.model.option.indexOf(42) >= 0){
                        //     $('button.pong').removeAttr('disabled');
                        //     $('button.discard').attr('disabled', '')
                        // }
                        // // 杠
                        // if(info.model.option.indexOf(44) >= 0){
                        //     $('button.kong').removeAttr('disabled');
                        //     $('button.discard').attr('disabled', '')
                        // }
                        // // 吃
                        // if(info.model.option.indexOf(43) >= 0){
                        //     $('button.chow').removeAttr('disabled');
                        //     $('button.discard').attr('disabled', '')
                        // }
                        // // 胡
                        // if(info.model.option.indexOf(45) >= 0){
                        //     $('button.hu').removeAttr('disabled');
                        //     $('button.discard').attr('disabled', '')
                        // }
                    }
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
                action: 1,
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
            action: 7,
            wechatId: GameMode.wechatId,
        };
        this._websocket.send(JSON.stringify(info));
    }
    public sendChat(evt){
        console.log('sendMSG',evt.data)
        var info = {
            roomId: GameMode.roomId,
            action: 2,
            wechatId: GameMode.wechatId,
            textMsg: evt.data.info
        };
        this._websocket.send(JSON.stringify(info));
    }
    public sendCard(evt){
        console.log('sendCard',evt.data)
        var info = {
            roomId: GameMode.roomId,
            action: 41,
            wechatId: GameMode.wechatId,
            discardNum: evt.data.discardNum
        };
        this._websocket.send(JSON.stringify(info));
    }
    
}