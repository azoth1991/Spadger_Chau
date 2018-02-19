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
    //启动逻辑模块
    //root参数为显示列表根，当前Demo所有显示内容全部放置于root中
    public start( root:egret.DisplayObjectContainer )
    {
        this.createScene( root );
        this.createMessageListener();
        this._websocket = new ESocket();
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
    }
    //监听消息中心
    private createMessageListener()
    {
        MessageCenter.getInstance().addEventListener( GameEvents.pageReadyHandler, this.pageReadyHandler, this );
        MessageCenter.getInstance().addEventListener( MessageCenter.EVT_LOAD_PAGE, this._homeUI.handleRouter, this._homeUI );
        MessageCenter.getInstance().addEventListener( MessageCenter.EVT_SHOW_DIALOG, this._homeUI.handleDialog, this._homeUI );
        MessageCenter.getInstance().addEventListener( GameEvents.WS_ENTER_ROOM, this.enterRoom, this );
        MessageCenter.getInstance().addEventListener( MessageCenter.GAME_READY, this.changeReadyUI, this );
        MessageCenter.getInstance().addEventListener( MessageCenter.GAME_START, this.startGameUI, this );
        MessageCenter.getInstance().addEventListener( GameEvents.WS_READY, this.ready, this );
        MessageCenter.getInstance().addEventListener( GameEvents.WS_START, this.startGame, this );

    }
    private enterRoom(data){
        this._websocket.enterRoom(data);
    }
    private ready(data){
        this._websocket.getReady(data);
    }
    private startGame(data){
        this._websocket.startGame(data);
    }
    private changeReadyUI() {
        this._gameUI.changeReady();
    }
    private startGameUI() {
        this._gameUI.startGameUI();
    }

    public pageReadyHandler( evt ):void{
        console.log('router ===>', evt);
        this._homeUI.removeChild(this._uiFocused);
        var data = evt.data.data;
        var type = evt.data.type;
        switch ( type ){
            case GamePages.CREATE_ROOM:
                this._gameUI = new GameUI(data.id);
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
                this._homeUI.imgBg.source = 'bg_jpg';            
                this._uiFocused = this._mainUI;
                break;
        }
        this._homeUI.addChild(this._uiFocused);
    }
}