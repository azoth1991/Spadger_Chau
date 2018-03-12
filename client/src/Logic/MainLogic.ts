class MainLogic
{
    private _root     : egret.DisplayObjectContainer;
    private _homeUI:HomeUI;
    private imgBg;
    private _pageFocused:string;
    private _uiFocused:eui.Component;
    private _gameUI:GameUI;
    private _pageName:string;
    private _websocket:ESocket;
    private _dialogUI:DialogUI;
    private _mainUI:MainUI;
    private _settingUI:SettingUI;
    //启动逻辑模块
    //root参数为显示列表根，当前Demo所有显示内容全部放置于root中
    public start( root:egret.DisplayObjectContainer )
    {
        this.createScene( root );
        this._websocket = new ESocket();
        this.createMessageListener();        
    }

    //创建场景
    private createScene( root:egret.DisplayObjectContainer )
    {
        this._root = root;
        this._homeUI = new HomeUI();
        this._root.addChild(this._homeUI);
        this._mainUI = new MainUI();
        this._uiFocused = this._mainUI;
        this._homeUI.addChild(this._uiFocused);
        this._settingUI = new SettingUI();
    }

    private toggleSettingUI(){
        if (this._homeUI.contains(this._settingUI)){
            this._homeUI.removeChild(this._settingUI)
        } else {
            this._homeUI.addChild(this._settingUI);
        }
    }
    //监听消息中心
    private createMessageListener()
    {
        MessageCenter.getInstance().addEventListener( GameEvents.pageReadyHandler, this.pageReadyHandler, this );
        MessageCenter.getInstance().addEventListener( MessageCenter.EVT_LOAD_PAGE, this._homeUI.handleRouter, this._homeUI );
        MessageCenter.getInstance().addEventListener( MessageCenter.EVT_SHOW_DIALOG, this._homeUI.handleDialog, this._homeUI );
        MessageCenter.getInstance().addEventListener( GameEvents.WS_ENTER_ROOM, this._websocket.enterRoom, this._websocket );
        MessageCenter.getInstance().addEventListener( MessageCenter.GAME_READY, this.changeReadyUI, this );
        MessageCenter.getInstance().addEventListener( MessageCenter.GAME_START, this.startGameUI, this );
        MessageCenter.getInstance().addEventListener( GameEvents.WS_READY, this._websocket.getReady, this._websocket );
        MessageCenter.getInstance().addEventListener( GameEvents.WS_START, this._websocket.startGame, this._websocket );
        MessageCenter.getInstance().addEventListener( GameEvents.WS_JOIN, this.joinGame, this );
        MessageCenter.getInstance().addEventListener( GameEvents.WS_GET_CHAT, this.chat, this );
        MessageCenter.getInstance().addEventListener( GameEvents.WS_GAMEOVER, this.gameOver, this );
        MessageCenter.getInstance().addEventListener( GameEvents.WS_GET_DISCARDSTATUS, this.getDiscardStatus, this );
        MessageCenter.getInstance().addEventListener( GameEvents.WS_SEND_CARDSTATUS, this.sendCardStatus, this );
        MessageCenter.getInstance().addEventListener( GameEvents.WS_SEND_CARD, this._websocket.sendCard, this._websocket );
        MessageCenter.getInstance().addEventListener( GameEvents.WS_GET_CARD, this.getCard, this );
        MessageCenter.getInstance().addEventListener( GameEvents.WS_SEND_CHAT, this._websocket.sendChat, this._websocket );
        MessageCenter.getInstance().addEventListener( GameEvents.TOGGLE_SETTING, this.toggleSettingUI, this );
        MessageCenter.getInstance().addEventListener( GameEvents.WS_GET_DISCARDPOS, this.getdiscardPos, this );
        MessageCenter.getInstance().addEventListener( GameEvents.WS_GET_DISCARDSPS, this.getdiscardSPs, this );
        MessageCenter.getInstance().addEventListener( GameEvents.WS_SEND_DISCARDSTATUS, this._websocket.sendDiscardStatus, this._websocket );
    }
    private getDiscardStatus(evt){
        this._gameUI.showDiscardStatus(evt);
    }
    private getdiscardSPs(evt){
        this._gameUI.getdiscardSPs(evt);
    }
    private gameOver(evt){
        this._gameUI.gameOver(evt);
    }

    private getdiscardPos(evt){
        this._gameUI.getdiscardPos(evt);
    }
    private chat(evt){
        this._gameUI.sendMsg(evt.data.info,evt.data.name);
    }
    private joinGame(data){
        this._gameUI.joinGame(data);
    }
    private sendCardStatus(data){
        this._gameUI.showDiscardStatus(data);
    }
    private getCard(data){
        this._gameUI.getCard(data);
    }
    private changeReadyUI(evt) {
        this._gameUI.changeReady(evt.data.info);
    }
    private startGameUI(data) {
        this._gameUI.startGameUI(data);
    }

    public pageReadyHandler( evt ):void{
        console.log('router ===>', evt.data);
        this._homeUI.removeChild(this._uiFocused);
        var data = evt.data.data;
        var type = evt.data.type;
        switch ( type ){
            case GamePages.CREATE_ROOM:
                this._gameUI = new GameUI();
                this._homeUI.imgBg.source = 'game_bg_jpg';
                this._uiFocused = this._gameUI;
                break;
            case GamePages.RELOAD:
                this._gameUI = new GameUI();
                this._homeUI.imgBg.source = 'game_bg_jpg';
                this._uiFocused = this._gameUI;
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
    }
}