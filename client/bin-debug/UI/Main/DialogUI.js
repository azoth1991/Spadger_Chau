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
var DialogUI = (function (_super) {
    __extends(DialogUI, _super);
    function DialogUI(data) {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        console.log('dialogName==>', data);
        switch (data.type) {
            case DialogTypes.ENTERROOM:
                _this.skinName = "resource/eui_main/skins/enterRoomSkin.exml";
                break;
            case DialogTypes.PLAY:
                _this.skinName = "resource/eui_main/skins/dialogSkin.exml";
                break;
            default:
                _this.skinName = "resource/eui_main/skins/dialogSkin.exml";
        }
        return _this;
    }
    DialogUI.prototype.uiCompHandler = function () {
        if (this._back) {
            this._back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backHome, this);
        }
        if (this._enterRoom) {
            this._enterRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterRoom, this);
        }
    };
    DialogUI.prototype.backHome = function (e) {
        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, { type: GamePages.BACK_HOME });
    };
    DialogUI.prototype.enterRoom = function (e) {
        GameMode.roomId = this._input.text;
        console.log("enterRoom" + GameMode.roomId);
        // MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, {type:GamePages.CREATE_ROOM,id:this._input.text});
        MessageCenter.getInstance().sendMessage(GameEvents.WS_ENTER_ROOM, { type: GamePages.CREATE_ROOM });
    };
    DialogUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return DialogUI;
}(eui.Component));
__reflect(DialogUI.prototype, "DialogUI");
