var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MainLogic = (function () {
    function MainLogic() {
    }
    //启动逻辑模块
    //root参数为显示列表根，当前Demo所有显示内容全部放置于root中
    MainLogic.prototype.start = function (root) {
        this.createScene(root);
        this.createMessageListener();
    };
    //创建场景
    MainLogic.prototype.createScene = function (root) {
        this._root = root;
        this._homeUI = new HomeUI();
        this._root.addChild(this._homeUI);
    };
    //监听消息中心
    MainLogic.prototype.createMessageListener = function () {
        MessageCenter.getInstance().addEventListener(MessageCenter.EVT_LOAD_PAGE, this._homeUI.handleRouter, this._homeUI);
        MessageCenter.getInstance().addEventListener(MessageCenter.EVT_SHOW_DIALOG, this._homeUI.handleDialog, this._homeUI);
    };
    return MainLogic;
}());
__reflect(MainLogic.prototype, "MainLogic");
