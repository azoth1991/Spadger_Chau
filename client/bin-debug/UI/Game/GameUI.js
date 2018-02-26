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
        _this.startPosition = [
            { x: 158, y: 576 },
            { x: 158, y: 330 },
            { x: 563, y: 106 },
            { x: 892, y: 305 },
        ];
        _this.dsListIcon = [];
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
        this._back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backHome, this);
        this._chat.addEventListener(egret.TouchEvent.TOUCH_TAP, this._chatUI.toggleVisible, this._chatUI);
        // 开始游戏  分享
        this.addEventListener(GameEvents.EVT_LOAD_PAGE, this.startGameUI, this);
    };
    GameUI.prototype.backHome = function (e) {
        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, { type: GamePages.BACK_HOME });
    };
    GameUI.prototype.startGameUI = function (evt) {
        console.log('startGameUI', evt.data);
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
        // 画牌
        this.cardsBox = new eui.Component();
        this.drawCard(cards);
        this._gameBox.addChild(this.cardsBox);
        // 画其他三家
        this.drawOtherCard();
    };
    GameUI.prototype.getCards = function (arr) {
        var res = [];
        arr.forEach(function (val, key) {
            while (val > 0) {
                res.push(key);
                val--;
            }
        });
        return res;
    };
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
            card.x = 1100 - key * des;
            card.y = 591;
            _this.cardsBox.addChild(card);
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
