class HomeUI extends eui.Component {
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_main/homeSkin.exml";
    }

    uiCompHandler() {
        // header
        this.imgBg.source = "bg_jpg";
        this._mainui = new MainUI();
        this._uiFocused = this._mainui;
        this.addChild(this._uiFocused);
        this._mainui.addEventListener( GameEvents.EVT_LOAD_PAGE, this.handleRouter , this );
    }
     protected async handleRouter(evt:egret.Event) {
        this._pageName = evt.data;
        try {
            const trueLoadingUI = new TrueLoadingUI();        
            await this.addChild(trueLoadingUI);
            await RES.loadGroup("game", 0, trueLoadingUI);
            await this.removeChild(trueLoadingUI);
            await this.pageReadyHandler( this._pageName );
        }
        catch (e) {
            console.error(e);
        }        
    }
    public pageReadyHandler( pageName:string ):void{
        console.log('pageReadyHandler', pageName);
        this.removeChild(this._uiFocused);
        switch ( pageName ){
            case GamePages.CREATE_ROOM:
                this._gameUI = new GameUI();
                this.imgBg.source = 'game_bg_jpg';
                this._uiFocused = this._gameUI;
                break;
            case GamePages.MY_ROOM:
                break;
            case GamePages.ENTER_ROOM:
                break;
        }
        this.addChild(this._uiFocused);
    }
    protected createChildren():void {
        super.createChildren();
    }
    private imgBg;
    private _mainui:MainUI;
    private _pageFocused:string;
    private _uiFocused:eui.Component;
    private _gameUI:GameUI;
    private _pageName:string;

}