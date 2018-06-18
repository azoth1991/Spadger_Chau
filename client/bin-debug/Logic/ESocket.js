var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ESocket = (function () {
    function ESocket() {
        this.totalNum = 3;
        this._websocket = new WebSocket("ws://101.37.151.85:8008//socket/maj/room");
        this.watchSocket();
    }
    ESocket.prototype.onReceiveMessage = function (_a) {
        var data = _a.data;
        console.log('onReceiveMessage', JSON.parse(data));
        var info = JSON.parse(data);
        GameMode.draw = -1;
        GameMode.canChowChoice = [];
        GameMode.chiNum = 0;
        GameMode.actionCard = -1;
        GameMode.option = [];
        if (info.actionCard) {
            GameMode.actionCard = info.actionCard;
        }
        if (info.code == 0) {
            alert(info.msg);
        }
        else {
            switch (info.type) {
                case 1:
                    // 进入房价
                    if (GameMode.inRoom == false) {
                        console.log("sendMessage=>\u8FDB\u5165\u623F\u95F4" + GameMode.roomId);
                        // var list = info.entered;
                        // var index = 0;
                        // list.forEach((v,k)=>{
                        //     if (v.wechatId == GameMode.wechatId) {
                        //         index = k;
                        //     }
                        // });
                        // list.unshift(list[list.length-1]);
                        // list.pop();
                        GameMode.playerList = info.entered.slice();
                        // var l = 4-GameMode.playerList.length;
                        // var newlist = [];
                        // newlist.push(GameMode.playerList[0]);
                        // for(var i =0;i<l;i++){
                        //     newlist.push('');
                        // }
                        // GameMode.playerList = [...newlist,...GameMode.playerList.slice(1)]
                        if (!GameMode.gameInfo) {
                            GameMode.gameInfo = info.gameType + " " + info.pointType + " " + info.winPoint;
                        }
                        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, { type: GamePages.CREATE_ROOM });
                        GameMode.inRoom = true;
                    }
                    else {
                        console.log("sendMessage=>\u623F\u4EF7\u5360\u4F4D", info);
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
                        GameMode.playerList = info.entered.slice();
                        // GameMode.playerList = list.map((v)=>{
                        //     return {
                        //         icon: v.headImageUrl, name: v.wechatNick,id:v.id,wechatId:v.wechatId
                        //     }
                        // });
                        console.log('GameMode', GameMode.playerList);
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_JOIN, null);
                    }
                    break;
                case 2:
                    // 聊天
                    console.log("getMessage=>\u804A\u5929\u4FE1\u606F");
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_CHAT, { info: info.model, name: info.prevailing });
                case 3:
                    // 准备
                    MessageCenter.getInstance().sendMessage(MessageCenter.GAME_READY, { info: info.model });
                    break;
                case 7:
                    console.log("sendMessage=>\u5F00\u59CB\u6E38\u620F");
                    this.setJoker(info.model);
                    var playerList = GameMode.playerList;
                    var index = info.positionMap[GameMode.wechatId];
                    var newplist = [];
                    playerList.forEach(function (v, k) {
                        if (parseInt(info.positionMap[v.wechatId]) >= index) {
                            newplist[parseInt(info.positionMap[v.wechatId]) - index] = v;
                        }
                        else {
                            newplist[parseInt(info.positionMap[v.wechatId]) + 4 - index] = v;
                        }
                    });
                    GameMode.playerList = newplist;
                    MessageCenter.getInstance().sendMessage(MessageCenter.GAME_START, info.model);
                    break;
                case 10:
                    console.log("\u91CD\u8FDE");
                    if (GameMode.inRoom == false) {
                        var list = info.entered;
                        var index = list.indexOf(GameMode.wechatId);
                        if (info.model.option.length > 0) {
                            // 显示碰杠吃
                            GameMode.option = info.model.option;
                            // MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDSTATUS, {option:info.model.option});
                        }
                        if (info.model.canChowChoice && info.model.canChowChoice.length > 0) {
                            GameMode.canChowChoice = info.model.canChowChoice;
                        }
                        if (info.currentPlayer) {
                            GameMode.currentPlayer = info.currentPlayer;
                        }
                        GameMode.playerList[0] = { icon: "head-i-2_png", name: GameMode.wechatId, id: "123" };
                        while (index > 0) {
                            index--;
                            GameMode.playerList[3 - index] = { icon: "head-i-2_png", name: list[index], id: "123" };
                        }
                        GameMode.playerList = list.map(function (v) {
                            return {
                                icon: "head-i-2_png", name: v, id: "123"
                            };
                        });
                        // 显示出牌
                        if (info.draw > -1) {
                            GameMode.draw = info.draw;
                        }
                        // 谁出牌
                        // GameMode.pos = info.currentPlayer;
                        this.setJoker(info.model);
                        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, { type: GamePages.RELOAD, cards: info.model });
                        GameMode.inRoom = true;
                    }
                    break;
                case 41:
                    console.log('出牌');
                    // 显示出牌
                    GameMode.draw = info.draw;
                    if (info.model.status == 23) {
                        GameMode.isDiscard = true;
                    }
                    else {
                        GameMode.isDiscard = false;
                    }
                    if (info.model.canChowChoice && info.model.canChowChoice.length > 0) {
                        GameMode.canChowChoice = info.model.canChowChoice;
                    }
                    if (info.model.cards) {
                        var cards = info.model.cards;
                        var prevailing = info.prevailing;
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_CARD, { cards: cards, discard: info.playsInfo, prevailing: prevailing });
                    }
                    // 谁出牌
                    // GameMode.pos = info.currentPlayer;
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDPOS, { pos: info.currentPlayer });
                    // MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDSTATUS, {option:[42,43,44,45]});
                    if (info.model.option.length > 0) {
                        // 显示碰杠吃
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDSTATUS, { option: info.model.option });
                    }
                    break;
                case 44:
                    // 杠 流程
                    // 显示出牌
                    GameMode.draw = info.draw;
                    // 显示牌组
                    if (info.model.cards) {
                        var cards = info.model.cards;
                        var prevailing = info.prevailing;
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_CARD, { cards: cards, discard: info.playsInfo, prevailing: prevailing });
                    }
                    if (info.model.status == 23) {
                        GameMode.isDiscard = true;
                    }
                    else {
                        GameMode.isDiscard = false;
                    }
                    // 谁出牌
                    // GameMode.pos = info.currentPlayer;
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDPOS, { pos: info.currentPlayer });
                    // 显示吃
                    // console.log(info.actionCard);
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDSPS, { playsInfo: info.playsInfo });
                    if (info.model.option.length > 0) {
                        // 显示碰杠吃
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDSTATUS, { option: info.model.option });
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
                    if (info.model.cards) {
                        var cards = info.model.cards;
                        var prevailing = info.prevailing;
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_CARD, { cards: cards, discard: info.playsInfo, prevailing: prevailing });
                    }
                    if (info.model.status == 23) {
                        GameMode.isDiscard = true;
                    }
                    else {
                        GameMode.isDiscard = false;
                    }
                    // 谁出牌
                    // GameMode.pos = info.currentPlayer;
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDPOS, { pos: info.currentPlayer });
                    // 显示吃
                    // console.log(info.actionCard);
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDSPS, { playsInfo: info.playsInfo });
                    // if(info.actionCard) {
                    //     MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_CARD, {cards,discard:info.actionCard,prevailing});
                    // }
                    break;
                case 43:
                    // 吃 流程
                    // 显示牌组
                    GameMode.draw = info.draw;
                    if (info.model.cards) {
                        var cards = info.model.cards;
                        var prevailing = info.prevailing;
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_CARD, { cards: cards, discard: info.playsInfo, prevailing: prevailing });
                    }
                    if (info.model.status == 23) {
                        GameMode.isDiscard = true;
                    }
                    else {
                        GameMode.isDiscard = false;
                    }
                    // 谁出牌
                    // GameMode.pos = info.currentPlayer;
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDPOS, { pos: info.currentPlayer });
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDSPS, { playsInfo: info.playsInfo });
                    break;
                case 42:
                    // 碰 流程
                    // 显示牌组
                    // GameMode.draw = info.draw;
                    if (info.model.cards) {
                        var cards = info.model.cards;
                        var prevailing = info.prevailing;
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_CARD, { cards: cards, discard: info.playsInfo, prevailing: prevailing });
                    }
                    if (info.model.status == 23) {
                        GameMode.isDiscard = true;
                    }
                    else {
                        GameMode.isDiscard = false;
                    }
                    if (info.model.option.length > 0) {
                        // 显示碰杠吃
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDSTATUS, { option: info.model.option });
                    }
                    // 谁出牌
                    // GameMode.pos = info.currentPlayer;
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDPOS, { pos: info.currentPlayer });
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDSPS, { playsInfo: info.playsInfo });
                    break;
                case 46:
                    // 过 流程
                    // 谁出牌
                    // GameMode.pos = info.currentPlayer;
                    GameMode.draw = info.draw;
                    if (info.model.cards) {
                        var cards = info.model.cards;
                        var prevailing = info.prevailing;
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_CARD, { cards: cards, discard: info.playsInfo, prevailing: prevailing });
                    }
                    if (info.model.status == 23) {
                        GameMode.isDiscard = true;
                    }
                    else {
                        GameMode.isDiscard = false;
                    }
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDPOS, { pos: info.currentPlayer });
                    if (info.model.option.length > 0) {
                        // 显示碰杠吃
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDSTATUS, { option: info.model.option });
                    }
                    break;
                case 45:
                    // 胡牌 游戏结束
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_GAMEOVER, { info: info });
            }
        }
    };
    ESocket.prototype.setJoker = function (info) {
        if (info.joker >= 0) {
            GameMode.joker = [info.joker];
        }
        if (info.jokerPi[0] >= 0) {
            GameMode.jokerPi = info.jokerPi;
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
                action: 1,
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
            action: 7,
            wechatId: GameMode.wechatId,
        };
        this._websocket.send(JSON.stringify(info));
    };
    ESocket.prototype.sendChat = function (evt) {
        console.log('sendMSG', evt.data);
        var info = {
            roomId: GameMode.roomId,
            action: 2,
            wechatId: GameMode.wechatId,
            textMsg: evt.data.info
        };
        this._websocket.send(JSON.stringify(info));
    };
    ESocket.prototype.sendCard = function (evt) {
        console.log('sendCard', evt.data);
        var info = {
            roomId: GameMode.roomId,
            action: 41,
            wechatId: GameMode.wechatId,
            discardNum: evt.data.discardNum
        };
        this._websocket.send(JSON.stringify(info));
    };
    ESocket.prototype.sendDiscardStatus = function (evt) {
        console.log('sendDsicardstatus', evt);
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
    };
    ESocket.prototype.action = function (actionid) {
        var info = {
            roomId: GameMode.roomId,
            action: actionid,
            wechatId: GameMode.wechatId,
        };
        if (actionid == 43) {
            info.ext = GameMode.chiNum;
        }
        if (actionid == 44) {
            info.discardNum = GameMode.gangNum;
        }
        this._websocket.send(JSON.stringify(info));
    };
    return ESocket;
}());
__reflect(ESocket.prototype, "ESocket");
