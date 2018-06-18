class ESocket {
    private _websocket:any;
    private _roomId:any;
    private totalNum = 3;
    private ext;
    constructor() {
        this._websocket = new WebSocket("ws://101.37.151.85:8008//socket/maj/room");
        this.watchSocket();
    }

    private onReceiveMessage({data}){
        console.log('onReceiveMessage',JSON.parse(data));
        const info = JSON.parse(data);
        GameMode.draw = -1;
        GameMode.canChowChoice = [];
        GameMode.chiNum = 0;
        GameMode.actionCard = -1;
        GameMode.option = [];
        if (info.actionCard) {
            GameMode.actionCard = info.actionCard;
        }
        if (info.code == 0){
            alert(info.msg);
        } else {
            switch (info.type) {
                case 1:
                    // 进入房价
                    if (GameMode.inRoom == false){
                        console.log(`sendMessage=>进入房间${GameMode.roomId}`)  
                        // var list = info.entered;
                        // var index = 0;
                        // list.forEach((v,k)=>{
                        //     if (v.wechatId == GameMode.wechatId) {
                        //         index = k;
                        //     }
                        // });
                        // list.unshift(list[list.length-1]);
                        // list.pop();
                        GameMode.playerList = [...info.entered];
                        // var l = 4-GameMode.playerList.length;
                        // var newlist = [];
                        // newlist.push(GameMode.playerList[0]);
                        // for(var i =0;i<l;i++){
                        //     newlist.push('');
                        // }

                        // GameMode.playerList = [...newlist,...GameMode.playerList.slice(1)]
                        if (!GameMode.gameInfo) {
                            GameMode.gameInfo = `${info.gameType} ${info.pointType} ${info.winPoint}`;
                        }
                        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, {type:GamePages.CREATE_ROOM});
                        GameMode.inRoom = true;
                    } else {
                        console.log(`sendMessage=>房价占位`,info) 
                        // for (var k = 0;k<4;k++){
                        //     if (!GameMode.playerList[k]) {
                        //         GameMode.playerList[k] = {
                        //             icon: "head-i-2_png",
                        //             name: info.cur,
                        //             id: "123",
                        //         };
                        //         break;
                        //     }
                        // }
                        GameMode.playerList = [...info.entered];
                        // GameMode.playerList = list.map((v)=>{
                        //     return {
                        //         icon: v.headImageUrl, name: v.wechatNick,id:v.id,wechatId:v.wechatId
                        //     }
                        // });
                        console.log('GameMode',GameMode.playerList)
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_JOIN, null);
                    }
                    break;
                case 2:
                    // 聊天
                    console.log(`getMessage=>聊天信息`) 
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_CHAT, {info:info.model,name:info.prevailing});
                case 3:
                // 准备
                    MessageCenter.getInstance().sendMessage(MessageCenter.GAME_READY, {info:info.model});
                    break;
                case 7:
                    console.log(`sendMessage=>开始游戏`)
                    this.setJoker(info.model);
                    var playerList = GameMode.playerList;
                    var index = info.positionMap[GameMode.wechatId];
                    var newplist = [];
                    playerList.forEach((v,k)=>{
                        if(parseInt(info.positionMap[v.wechatId])>=index) {
                            newplist[parseInt(info.positionMap[v.wechatId])-index] = v;
                        } else {
                            newplist[parseInt(info.positionMap[v.wechatId])+4-index] = v;
                        }
                    });
                    GameMode.playerList = newplist;
                    MessageCenter.getInstance().sendMessage(MessageCenter.GAME_START, info.model);
                    break;
                case 10:
                    console.log(`重连`);
                    if (GameMode.inRoom == false) {
                        var list = info.entered;
                        var index = list.indexOf(GameMode.wechatId);

                        if(info.model.option.length > 0){
                            // 显示碰杠吃
                            GameMode.option = info.model.option;
                            // MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDSTATUS, {option:info.model.option});
                        }
                        if (info.model.canChowChoice&& info.model.canChowChoice.length>0){
                            GameMode.canChowChoice = info.model.canChowChoice;
                        }
                        if (info.currentPlayer) {
                            GameMode.currentPlayer = info.currentPlayer;
                        }
                        GameMode.playerList[0] = {icon: "head-i-2_png", name: GameMode.wechatId, id: "123" };                                     
                        while (index > 0){
                            index--;
                            GameMode.playerList[3-index] = { icon: "head-i-2_png", name: list[index], id: "123" };
                        }
                        GameMode.playerList = list.map((v)=>{
                            return {
                                icon: "head-i-2_png", name: v, id: "123"
                            };
                        });
                        // 显示出牌
                        if (info.draw>-1){
                            GameMode.draw = info.draw;
                        }
                        // 谁出牌
                        // GameMode.pos = info.currentPlayer;
                        this.setJoker(info.model);
                        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, {type:GamePages.RELOAD,cards:info.model});
                        GameMode.inRoom = true;

                    }
                    
                    break;
                case 41:
                    console.log('出牌');
                    // 显示出牌
                    GameMode.draw = info.draw;
                    if (info.model.status ==23) {
                        GameMode.isDiscard = true;
                    } else {
                        GameMode.isDiscard = false;
                    }
                    if (info.model.canChowChoice&& info.model.canChowChoice.length>0){
                        GameMode.canChowChoice = info.model.canChowChoice;
                    }
                    if(info.model.cards){
                        var cards = info.model.cards;
                        var prevailing = info.prevailing;
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_CARD, {cards,discard: info.playsInfo,prevailing});
                    }
                    
                    // 谁出牌
                    // GameMode.pos = info.currentPlayer;
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDPOS, {pos:info.currentPlayer});
                    // MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDSTATUS, {option:[42,43,44,45]});
                    
                    
                    if(info.model.option.length > 0){
                        // 显示碰杠吃
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDSTATUS, {option:info.model.option});
                    }
        
                    
                    break;
                case 44:
                    // 杠 流程
                    // 显示出牌
                    GameMode.draw = info.draw;
                    // 显示牌组
                    if(info.model.cards){
                        var cards = info.model.cards;
                        var prevailing = info.prevailing;
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_CARD, {cards,discard: info.playsInfo,prevailing});
                    }
                    if (info.model.status ==23) {
                        GameMode.isDiscard = true;
                    } else {
                        GameMode.isDiscard = false;
                    }
                    
                    // 谁出牌
                    // GameMode.pos = info.currentPlayer;
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDPOS, {pos:info.currentPlayer});
                    // 显示吃
                    // console.log(info.actionCard);
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDSPS, {playsInfo: info.playsInfo});
                    if(info.model.option.length > 0){
                        // 显示碰杠吃
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDSTATUS, {option:info.model.option});
                    }
                    // if(info.actionCard) {
                    //     MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_CARD, {cards,discard:info.actionCard,prevailing});
                    // }
                    
                    break;
                case 48:
                    // 暗杠 流程
                    // 显示出牌
                    GameMode.draw = info.draw;
                    // 显示牌组
                    if(info.model.cards){
                        var cards = info.model.cards;
                        var prevailing = info.prevailing;
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_CARD, {cards,discard: info.playsInfo,prevailing});                        
                    }
                    if (info.model.status ==23) {
                        GameMode.isDiscard = true;
                    } else {
                        GameMode.isDiscard = false;
                    }
                    
                    // 谁出牌
                    // GameMode.pos = info.currentPlayer;
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDPOS, {pos:info.currentPlayer});
                    // 显示吃
                    // console.log(info.actionCard);
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDSPS, {playsInfo: info.playsInfo});
                    // if(info.actionCard) {
                    //     MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_CARD, {cards,discard:info.actionCard,prevailing});
                    // }
                    
                    break;
                case 43:
                    // 吃 流程
                    // 显示牌组
                    GameMode.draw = info.draw;
                    if(info.model.cards){
                        var cards = info.model.cards;
                        var prevailing = info.prevailing;
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_CARD, {cards,discard: info.playsInfo,prevailing});
                    }
                    if (info.model.status ==23) {
                        GameMode.isDiscard = true;
                    } else {
                        GameMode.isDiscard = false;
                    }
                    // 谁出牌
                    // GameMode.pos = info.currentPlayer;
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDPOS, {pos:info.currentPlayer});
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDSPS, {playsInfo: info.playsInfo});break;
                case 42:
                    // 碰 流程
                    // 显示牌组
                    // GameMode.draw = info.draw;
                    if(info.model.cards){
                        var cards = info.model.cards;
                        var prevailing = info.prevailing;
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_CARD, {cards,discard: info.playsInfo,prevailing});
                    }
                    if (info.model.status ==23) {
                        GameMode.isDiscard = true;
                    } else {
                        GameMode.isDiscard = false;
                    }
                    if(info.model.option.length > 0){
                        // 显示碰杠吃
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDSTATUS, {option:info.model.option});
                    }
                    // 谁出牌
                    // GameMode.pos = info.currentPlayer;
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDPOS, {pos:info.currentPlayer});
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDSPS, {playsInfo: info.playsInfo});
                    break;
                case 46:
                    // 过 流程
                    // 谁出牌
                    // GameMode.pos = info.currentPlayer;
                    GameMode.draw = info.draw;
                    if(info.model.cards){
                        var cards = info.model.cards;
                        var prevailing = info.prevailing;
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_CARD, {cards,discard: info.playsInfo,prevailing});                        
                    }
                    if (info.model.status ==23) {
                        GameMode.isDiscard = true;
                    } else {
                        GameMode.isDiscard = false;
                    }
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDPOS, {pos:info.currentPlayer});
                    if(info.model.option.length > 0){
                        // 显示碰杠吃
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDSTATUS, {option:info.model.option});
                    }
                    break;

                case 45:
                    // 胡牌 游戏结束
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GAMEOVER, {info:info});
            }
        }
    }
    private setJoker(info){
        if (info.joker>=0){
            GameMode.joker = [info.joker];
        }
        if (info.jokerPi[0]>=0){
            GameMode.jokerPi = info.jokerPi;
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
    public sendDiscardStatus(evt){
        console.log('sendDsicardstatus',evt);
        switch (evt.data.type) {
            case GameEvents.WS_HU:
                this.action(45);
                break;
            case GameEvents.WS_GANG:
                this.action(44);
                break;
            case GameEvents.WS_CHI:
                this.action(43);
                break;
            case GameEvents.WS_PENG:
                this.action(42);
                break;
            case GameEvents.WS_GUO:
                this.action(46);
                break;
        }
    }
    private action(actionid) {
        
        let info = {
            roomId: GameMode.roomId,
            action: actionid,
            wechatId: GameMode.wechatId,
        };
        if (actionid == 43){
            info.ext = GameMode.chiNum;
        }
        if (actionid == 44){
            info.discardNum = GameMode.gangNum;
        }
        this._websocket.send(JSON.stringify(info));
    }
    
}