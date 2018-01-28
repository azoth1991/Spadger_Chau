class MainLogic
{
    private _root     : egret.DisplayObjectContainer;
    private _homeUI:HomeUI;
    private imgBg;
    private _mainui:MainUI;
    private _pageFocused:string;
    private _uiFocused:eui.Component;
    private _gameUI:GameUI;
    private _pageName:string;

    //启动逻辑模块
    //root参数为显示列表根，当前Demo所有显示内容全部放置于root中
    public start( root:egret.DisplayObjectContainer )
    {
        this.createScene( root );
        this.createMessageListener();
    }
    //创建场景
    private createScene( root:egret.DisplayObjectContainer )
    {
        this._root = root;
        this._homeUI = new HomeUI();
        this._root.addChild(this._homeUI);
    }
    //监听消息中心
    private createMessageListener()
    {
        MessageCenter.getInstance().addEventListener( MessageCenter.EVT_LOAD_PAGE, this._homeUI.handleRouter, this._homeUI );
        MessageCenter.getInstance().addEventListener( MessageCenter.EVT_SHOW_DIALOG, this._homeUI.handleDialog, this._homeUI );
    }
}