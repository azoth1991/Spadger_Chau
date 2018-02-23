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
        _this.dsListIcon = [
            { icon: "head-i-2_png", name: GameMode.wechatId, id: "123" },
        ];
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/eui_game/skins/gameSkin.exml";
        return _this;
    }
    GameUI.prototype.uiCompHandler = function () {
        // headIconList
        /// 填充数据
        this.initGameUI();
    };
    GameUI.prototype.joinGame = function (evt) {
        this.dsListIcon.push({
            icon: "head-i-2_png",
            name: evt.data.info,
            id: "123",
        });
        this["_icon" + (this.dsListIcon.length - 1)] = new FriendIcon(1, __assign({}, this.dsListIcon[this.dsListIcon.length - 1], this.startPosition[this.dsListIcon.length - 1]));
        this._gameBox.addChild(this["_icon" + (this.dsListIcon.length - 1)]);
    };
    GameUI.prototype.chatBox = function () {
        this._chatUI = new ChatUI();
        this.addChild(this._chatUI);
    };
    GameUI.prototype.initGameUI = function () {
        var _this = this;
        this._gameBox = new eui.Component();
        this.addChild(this._gameBox);
        var that = this;
        this.dsListIcon.map(function (v, k) {
            _this["_icon" + k] = new FriendIcon(1, __assign({}, _this.dsListIcon[k], _this.startPosition[k]));
            that._gameBox.addChild(_this["_icon" + k]);
        });
        this._start.enabled = false;
        // this._icon0 = new FriendIcon(1, this.dsListIcon[0]);
        // this._icon1 = new FriendIcon(1, this.dsListIcon[1]);
        // this._icon2 = new FriendIcon(1, this.dsListIcon[2]);
        // this._icon3 = new FriendIcon(1, this.dsListIcon[3]);
        // this.addChild(this._icon0);
        // this.addChild(this._icon1);
        // this.addChild(this._icon2);
        // this.addChild(this._icon3);
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
    GameUI.prototype.startGameUI = function (data) {
        console.log('startGameUI', data);
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
        var models = [
            1, 2, 0, 1, 3, 2, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0,
        ];
        var cards = this.getCards(models);
        // 移除按钮
        this.removeChild(this._ready);
        this.removeChild(this._start);
        // 画牌
        this.drawCard(cards);
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
        console.log();
        if (info.readyNum >= 4) {
            // this._start.$children[0].source = 'yellow_btn_png';
            this._start.enabled = true;
        }
        if (this.dsListIcon[0].name == info.player) {
            console.log(this._ready);
            this._ready.$children[0].source = 'yellow_btn_down_png';
            this._ready.$children[1].text = "已准备";
            this._ready.enabled = false;
        }
        console.log(this._ready);
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
            _this._gameBox.addChild(card);
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
