var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var GameUI = (function (_super) {
    __extends(GameUI, _super);
    function GameUI() {
        var _this = _super.call(this) || this;
        _this._cardStatuslist = [];
        _this.startPosition = [
            { x: 158, y: 576 },
            { x: 158, y: 330 },
            { x: 563, y: 106 },
            { x: 892, y: 305 },
        ];
        _this.dsListIcon = [];
        _this._discardList0 = [];
        _this._discardList1 = [];
        _this._discardList2 = [];
        _this._discardList3 = [];
        _this.canDiscard = false;
        _this.dsListIcon = GameMode.playerList;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/eui_game/skins/gameSkin.exml";
        return _this;
    }
    GameUI.prototype.uiCompHandler = function () {
        // headIconList
        /// 填充数据
        this.initGameUI();
        this.createListener();
    };
    GameUI.prototype.createListener = function () {
        this._setting.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            MessageCenter.getInstance().sendMessage(GameEvents.TOGGLE_SETTING, null);
        }, this);
    };
    GameUI.prototype.joinGame = function (evt) {
        console.log('joinGame', this.dsListIcon);
        for (var k = 0; k < 4; k++) {
            if (!this.dsListIcon[k]) {
                this.dsListIcon[k] = {
                    icon: "head-i-2_png",
                    name: evt.data.info,
                    id: "123",
                };
                this["_icon" + k] = new FriendIcon(1, __assign({}, this.dsListIcon[k], this.startPosition[k]));
                this._gameBox.addChild(this["_icon" + k]);
                break;
            }
        }
    };
    GameUI.prototype.getCard = function (evt) {
        console.log('getCard', evt);
        // 画牌  
        var cards = this.getCards(evt.data.cards);
        this._gameBox.removeChild(this.cardsBox);
        this.cardsBox = new eui.Component();
        this.drawCard(cards);
        this._gameBox.addChild(this.cardsBox);
        // 弃牌
        if (evt.data.discard && evt.data.discard > 0) {
            var discard = evt.data.discard;
            this._gameBox.removeChild(this.discardBox);
            var posName = evt.data.prevailing;
            var pos = 0;
            this.dsListIcon.forEach(function (v, k) {
                if (v.name == posName) {
                    pos = k;
                }
            });
            this["_discardList" + pos].push(discard);
            this.drawDiscard(this["_discardList" + pos], pos);
            this._gameBox.addChild(this.discardBox);
        }
        // 吃碰的牌
    };
    GameUI.prototype.dropCard = function (pos, num) {
    };
    // 显示吃胡碰杠
    GameUI.prototype.showDiscardStatus = function (evt) {
        console.log('showDiscardStatus', evt);
        var option = evt.data.option;
        this._discardStatusUI = new DiscardStatusUI(option);
        this.addChild(this._discardStatusUI);
    };
    GameUI.prototype.chatBox = function () {
        this._chatUI = new ChatUI();
        this.addChild(this._chatUI);
    };
    GameUI.prototype.sendMsg = function (info, name) {
        this._chatUI.sendMsg(info);
    };
    GameUI.prototype.initGameUI = function () {
        var _this = this;
        this._gameBox = new eui.Component();
        this.addChild(this._gameBox);
        var that = this;
        console.log('dslist', this.dsListIcon);
        this.dsListIcon.map(function (v, k) {
            if (v) {
                _this["_icon" + k] = new FriendIcon(1, __assign({}, _this.dsListIcon[k], _this.startPosition[k]));
                that._gameBox.addChild(_this["_icon" + k]);
            }
        });
        this._start.enabled = false;
        //聊天框
        this.chatBox();
        this._start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleStart, this);
        this._ready.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleReady, this);
        this._invest.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { alert("\u623F\u95F4\u53F7\u4E3A" + GameMode.roomId); }, this);
        this._back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backHome, this);
        this._chat.addEventListener(egret.TouchEvent.TOUCH_TAP, this._chatUI.toggleVisible, this._chatUI);
        // 开始游戏  分享
        this.addEventListener(GameEvents.EVT_LOAD_PAGE, this.startGameUI, this);
    };
    GameUI.prototype.backHome = function (e) {
        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, { type: GamePages.BACK_HOME });
    };
    GameUI.prototype.showZj = function (num) {
        this["_zj1"].visible = false;
        this["_zj2"].visible = false;
        this["_zj3"].visible = false;
        this["_zj4"].visible = false;
        this["_zj" + num].visible = true;
    };
    GameUI.prototype.sendCardStatus = function (evt) {
        console.log('cardStatus', evt);
        this.showDiscardStatus(evt.data.option);
    };
    GameUI.prototype.startGameUI = function (evt) {
        console.log('startGameUI', evt.data);
        this.showZj(evt.data.pos);
        if (evt.data.pos == 1) {
            GameMode.isDiscard = true;
        }
        var position = [
            { x: 60, y: 597 },
            { x: 60, y: 293 },
            { x: 206, y: 50 },
            { x: 1209, y: 295 },
        ];
        this._icon0.changeSkin(position[0]);
        this._icon1.changeSkin(position[1]);
        this._icon2.changeSkin(position[2]);
        this._icon3.changeSkin(position[3]);
        var models = evt.data.cards;
        var cards = this.getCards(models);
        // 移除按钮
        this.removeChild(this._ready);
        this.removeChild(this._start);
        this.removeChild(this._invest);
        // 画牌
        this.cardsBox = new eui.Component();
        console.log(cards);
        this.drawCard(cards);
        this._gameBox.addChild(this.cardsBox);
        // 画其他三家
        this.drawOtherCard();
        // 弃牌
        this.discardBox = new eui.Component();
        this._gameBox.addChild(this.discardBox);
    };
    //获取当前出牌人位置
    GameUI.prototype.getdiscardPos = function (evt) {
        console.log('getdiscardPos', evt);
        var pos = 0;
        this.dsListIcon.forEach(function (v, k) {
            if (v.name == evt.data.pos) {
                switch (k) {
                    case 0:
                        pos = 1;
                        GameMode.isDiscard = true;
                        break;
                    case 1:
                        pos = 4;
                        break;
                    case 2:
                        pos = 3;
                        break;
                    case 3:
                        pos = 2;
                }
            }
        });
        this.showZj(pos);
    };
    // 获取
    GameUI.prototype.getCards = function (arr) {
        var res = [];
        arr.forEach(function (val, key) {
            while (val > 0) {
                res.push(key);
                val--;
            }
        });
        console.log(res);
        return res;
    };
    // 准备
    GameUI.prototype.changeReady = function (info) {
        if (info.readyNum >= GameMode.totalNum) {
            this._start.$children[0].source = 'yellow_btn_png';
            this._start.enabled = true;
        }
        if (this.dsListIcon[0].name == info.player) {
            this._ready.$children[0].source = 'yellow_btn_down_png';
            this._ready.$children[1].text = "已准备";
            this._ready.enabled = false;
        }
    };
    // 游戏结束
    GameUI.prototype.gameOver = function (evt) {
        console.log('gameOver', evt);
        var gameoverInfo = evt.data.info;
        gameoverInfo = {
            status: 0,
            type: 121,
            result: [
                {
                    fan: 1,
                    points: -16,
                    name: 'a1',
                },
                {
                    fan: 2,
                    points: -16,
                    name: 'a2',
                },
                {
                    fan: 1,
                    points: -16,
                    name: 'a3',
                },
                {
                    fan: 4,
                    points: -16,
                    name: 'a4',
                }
            ]
        };
        this._gameOverUI = new GameOverUI(gameoverInfo);
        this.addChild(this._gameOverUI);
    };
    GameUI.prototype.handleStart = function (e) {
        MessageCenter.getInstance().sendMessage(GameEvents.WS_START, { id: GameMode.roomId });
    };
    GameUI.prototype.handleReady = function (e) {
        MessageCenter.getInstance().sendMessage(GameEvents.WS_READY, { id: GameMode.roomId });
    };
    GameUI.prototype.drawCard = function (cards) {
        var _this = this;
        var des = 80;
        cards.forEach(function (value, key) {
            var card = new CardUI(2, value);
            var scale = 0.8;
            card.scaleX = scale;
            card.scaleY = scale;
            card.x = 1100 - key * des * scale;
            card.y = 591;
            _this.cardsBox.addChild(card);
        });
    };
    GameUI.prototype.drawDiscard = function (discards, pos) {
        var _this = this;
        console.log('pos=>', pos);
        var desx, desy, startx, starty, type, drection, anchorOffsetX, anchorOffsetY;
        desx = 35;
        desy = 55;
        switch (pos) {
            case 0:
                startx = 365;
                starty = 395;
                type = 1;
                break;
            case 1:
                startx = 489;
                starty = 173;
                type = 3;
                break;
            case 2:
                startx = 1067;
                starty = 328;
                type = 1;
                break;
            case 3:
                startx = 806;
                starty = 498;
                type = 3;
                break;
        }
        discards.forEach(function (value, key) {
            var card = new CardUI(type, value, pos);
            var scale = 0.45;
            card.scaleX = scale;
            card.scaleY = scale;
            console.log(parseInt("" + key / 4));
            switch (pos) {
                case 0:
                    card.x = startx + (key % 4) * desx;
                    card.y = starty + parseInt("" + key / 4) * desy;
                    break;
                case 1:
                    card.x = startx - parseInt("" + key / 5) * desy;
                    card.y = starty + (key % 5) * desx;
                    break;
                case 2:
                    card.x = startx - (key % 4) * desx;
                    card.y = starty - parseInt("" + key / 4) * desy;
                    break;
                case 3:
                    card.x = startx + parseInt("" + key / 5) * desy;
                    card.y = starty - (key % 5) * desx;
                    break;
            }
            _this.discardBox.addChild(card);
        });
    };
    GameUI.prototype.drawOtherCard = function () {
        var desX = 29;
        var desY = 52;
        for (var cardLength = 0; cardLength < 13; cardLength++) {
            // 左边
            var letfCard = new CardUI(5, null);
            letfCard.x = 145;
            letfCard.y = 128 + cardLength * desX;
            this._gameBox.addChild(letfCard);
            // 右边
            var rightCard = new CardUI(5, null);
            rightCard.x = 1168;
            rightCard.y = 128 + cardLength * desX;
            this._gameBox.addChild(rightCard);
            // 上面
            var letfCard = new CardUI(4, null);
            letfCard.x = 322 + cardLength * desY;
            letfCard.y = 53;
            this._gameBox.addChild(letfCard);
        }
    };
    GameUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return GameUI;
}(eui.Component));
__reflect(GameUI.prototype, "GameUI");
