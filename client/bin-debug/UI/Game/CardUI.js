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
var CardUI = (function (_super) {
    __extends(CardUI, _super);
    function CardUI(type, num, deraction) {
        if (deraction === void 0) { deraction = 0; }
        var _this = _super.call(this) || this;
        _this._type = type;
        _this._num = num;
        _this._deraction = deraction;
        _this.status = 'down';
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        if (num || num == 0) {
            _this.addEventListener('touchTap', _this.handleClick, _this);
        }
        _this.skinName = "resource/eui_game/skins/cardIRSkin.exml";
        return _this;
    }
    CardUI.prototype.upCard = function () {
        this.y = this.y - 28;
        this.status = 'up';
    };
    CardUI.prototype.handleClick = function () {
        console.log('handleclick', GameMode.isDiscard, this.status);
        if (this.status == 'down') {
            this.upCard();
        }
        else {
            this.downCard();
            // 如果能够发票则发牌
            if (GameMode.isDiscard) {
                MessageCenter.getInstance().sendMessage(GameEvents.WS_SEND_CARD, { discardNum: this._num });
                GameMode.isDiscard = false;
            }
        }
    };
    CardUI.prototype.downCard = function () {
        this.y = this.y + 28;
        this.status = 'down';
    };
    CardUI.prototype.clickCard = function (e) {
        console.log('clickCard');
    };
    CardUI.prototype.uiCompHandler = function () {
        this._bg.source = "dipai" + this._type + "_png";
        if (this._num || this._num == 0) {
            this._cardBg.source = "p" + this._num + "_png";
        }
        if (GameMode.joker.indexOf(this._num) >= 0) {
            this._joker.source = 'joker2_png';
        }
        if (GameMode.jokerPi.indexOf(this._num) >= 0) {
            this._joker.source = 'joker1_png';
        }
        switch (this._deraction) {
            case 1:
                this.rotation = 90;
                break;
            case 2:
                this.rotation = 180;
                break;
            case 3:
                this.rotation = 270;
                break;
            case 0:
                this.rotation = 0;
                break;
        }
    };
    CardUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return CardUI;
}(eui.Component));
__reflect(CardUI.prototype, "CardUI");
