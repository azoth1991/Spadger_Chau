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
    function CardUI(type, num, deraction, scale) {
        if (deraction === void 0) { deraction = 0; }
        if (scale === void 0) { scale = 1; }
        var _this = _super.call(this) || this;
        _this._type = type;
        _this._num = num;
        _this._deraction = deraction;
        _this.status = 'down';
        _this.scaleX = scale;
        _this.scaleY = scale;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        if (num || num == 0) {
            _this.addEventListener('touchTap', _this.handleClick, _this);
        }
        _this.skinName = "resource/eui_game/skins/cardIRSkin.exml";
        return _this;
    }
    CardUI.prototype.upCard = function () {
        if (this.status == 'down') {
            this.y = this.y - 28;
            this.status = 'up';
        }
    };
    CardUI.prototype.handleClick = function () {
        var _this = this;
        console.log('handleclick', GameMode.isDiscard, this.status);
        // 皮赖杠，没有按起 可以出牌 出的皮赖 唤起弹框
        GameMode.gangNum = -1;
        if (this.status == 'down' && GameMode.isDiscard && (GameMode.joker.indexOf(this._num) > -1 || GameMode.jokerPi.indexOf(this._num) > -1)) {
            // 唤起弹窗
            GameMode.gangNum = this._num;
            setTimeout(function () {
                _this.upCard();
            }, 10);
            MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDSTATUS, { option: [44] });
        }
        // MessageCenter.getInstance().sendMessage( GameEvents.WS_GANG_NUM, {discardNum:this._num} );
        // 如果处于有特殊操作的状态下可以立起多张，但是不能出牌
        if (this.status == 'down') {
            if (!GameMode.isSP) {
                // 所有牌倒下
                MessageCenter.getInstance().sendMessage(GameEvents.DOWN_CARDS, null);
                setTimeout(function () {
                    _this.upCard();
                }, 10);
            }
        }
        else {
            this.downCard();
            // 如果能够发票则发牌
            if (GameMode.isDiscard) {
                // 可以吃的时候点击牌可以直接出牌
                if (GameMode.isSP) {
                    var extkey = -1;
                    for (var i = 0; i < GameMode.canChowChoice.length; i++) {
                        if (GameMode.canChowChoice[i].indexOf(this._num) > -1) {
                            GameMode.chiNum = i;
                            break;
                        }
                    }
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_SEND_DISCARDSTATUS, { type: GameEvents.WS_CHI });
                    MessageCenter.getInstance().sendMessage(GameEvents.HIDE_DISCARDSP, null);
                }
                else {
                    // 关闭discardsp
                    console.log('HIDE_DISCARDSP');
                    MessageCenter.getInstance().sendMessage(GameEvents.HIDE_DISCARDSP, null);
                    // 唤起弹窗
                    MessageCenter.getInstance().sendMessage(GameEvents.WS_SEND_CARD, { discardNum: this._num });
                    GameMode.isDiscard = false;
                }
            }
        }
    };
    CardUI.prototype.downCard = function () {
        if (this.status == 'up') {
            this.y = this.y + 28;
            this.status = 'down';
        }
    };
    CardUI.prototype.clickCard = function (e) {
        console.log('clickCard');
    };
    CardUI.prototype.uiCompHandler = function () {
        var _this = this;
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
        setTimeout(function () {
            _this.rotation = parseInt(_this._deraction) * 90;
        }, 10);
        // switch (this._deraction) {
        //     case 1:
        //         this._cardBg.rotation = 90;
        //         this._cardBg.anchorOffsetY = 110;                
        //         break;
        //     case 2:
        //         this._cardBg.rotation = 180;
        //         this._cardBg.anchorOffsetX = 78;
        //         this._cardBg.anchorOffsetY = 110;
        //         break;
        //     case 3:
        //         this._cardBg.rotation = 270;
        //         this._cardBg.anchorOffsetX = 78;
        //         break;
        //     case 0:
        //         this._cardBg.rotation = 0;
        //         break;
        // }    
    };
    CardUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return CardUI;
}(eui.Component));
__reflect(CardUI.prototype, "CardUI");
