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
        this._websocket = new ESocket();
        this.createMessageListener();
    };
    //创建场景
    MainLogic.prototype.createScene = function (root) {
        this._root = root;
        this._homeUI = new HomeUI();
        this._root.addChild(this._homeUI);
        this._mainUI = new MainUI();
        this._uiFocused = this._mainUI;
        this._homeUI.addChild(this._uiFocused);
        this._settingUI = new SettingUI();
    };
    MainLogic.prototype.toggleSettingUI = function () {
        if (this._homeUI.contains(this._settingUI)) {
            this._homeUI.removeChild(this._settingUI);
        }
        else {
            this._homeUI.addChild(this._settingUI);
        }
    };
    //监听消息中心
    MainLogic.prototype.createMessageListener = function () {
        MessageCenter.getInstance().addEventListener(GameEvents.pageReadyHandler, this.pageReadyHandler, this);
        MessageCenter.getInstance().addEventListener(MessageCenter.EVT_LOAD_PAGE, this._homeUI.handleRouter, this._homeUI);
        MessageCenter.getInstance().addEventListener(MessageCenter.EVT_SHOW_DIALOG, this._homeUI.handleDialog, this._homeUI);
        MessageCenter.getInstance().addEventListener(GameEvents.WS_ENTER_ROOM, this.enterRoom, this);
        MessageCenter.getInstance().addEventListener(MessageCenter.GAME_READY, this.changeReadyUI, this);
        MessageCenter.getInstance().addEventListener(MessageCenter.GAME_START, this.startGameUI, this);
        MessageCenter.getInstance().addEventListener(GameEvents.WS_READY, this.ready, this);
        MessageCenter.getInstance().addEventListener(GameEvents.WS_START, this.startGame, this);
        MessageCenter.getInstance().addEventListener(GameEvents.WS_JOIN, this.joinGame, this);
        MessageCenter.getInstance().addEventListener(GameEvents.WS_GET_CHAT, this.chat, this);
        MessageCenter.getInstance().addEventListener(GameEvents.WS_SEND_CARD, this._websocket.sendCard, this._websocket);
        MessageCenter.getInstance().addEventListener(GameEvents.WS_SEND_CHAT, this._websocket.sendChat, this._websocket);
        MessageCenter.getInstance().addEventListener(GameEvents.TOGGLE_SETTING, this.toggleSettingUI, this);
    };
    MainLogic.prototype.enterRoom = function () {
        this._websocket.enterRoom();
    };
    MainLogic.prototype.chat = function (evt) {
        console.log('chat', evt.data);
        this._gameUI.sendMsg(evt.data.info, evt.data.name);
    };
    MainLogic.prototype.joinGame = function (data) {
        this._gameUI.joinGame(data);
    };
    MainLogic.prototype.ready = function (data) {
        this._websocket.getReady(data);
    };
    MainLogic.prototype.startGame = function (data) {
        this._websocket.startGame(data);
    };
    MainLogic.prototype.changeReadyUI = function (evt) {
        this._gameUI.changeReady(evt.data.info);
    };
    MainLogic.prototype.startGameUI = function (data) {
        this._gameUI.startGameUI(data);
    };
    MainLogic.prototype.pageReadyHandler = function (evt) {
        console.log('router ===>', evt.data);
        this._homeUI.removeChild(this._uiFocused);
        var data = evt.data.data;
        var type = evt.data.type;
        switch (type) {
            case GamePages.CREATE_ROOM:
                this._gameUI = new GameUI();
                this._homeUI.imgBg.source = 'game_bg_jpg';
                this._uiFocused = this._gameUI;
                break;
            case GamePages.MY_ROOM:
                break;
            case GamePages.DIALOG:
                this._dialogUI = new DialogUI(data);
                this._homeUI.imgBg.source = 'dialog-bg_jpg';
                this._uiFocused = this._dialogUI;
                break;
            case GamePages.BACK_HOME:
                GameMode.inRoom = false;
                this._homeUI.imgBg.source = 'bg_jpg';
                this._uiFocused = this._mainUI;
                break;
        }
        this._homeUI.addChild(this._uiFocused);
    };
    return MainLogic;
}());
__reflect(MainLogic.prototype, "MainLogic");
