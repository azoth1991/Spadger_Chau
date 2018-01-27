class HomeUI extends eui.Component {
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_main/homeSkin.exml";
    }

    uiCompHandler() {
        // header
        this.imgBg.source = "bg_jpg";
        this._mainUI = new MainUI();
        this._uiFocused = this._mainUI;
        this.addChild(this._uiFocused);

    }
     public async handleRouter(evt:egret.Event) {
        this._pageName = evt.data;
        try {
            switch (this._pageName){
                case GamePages.CREATE_ROOM:
                    const trueLoadingUI = new TrueLoadingUI();        
                    await this.addChild(trueLoadingUI);
                    await RES.loadGroup("game", 0, trueLoadingUI);
                    await this.removeChild(trueLoadingUI);
                    break;
            }
            await this.pageReadyHandler( this._pageName );            
        }
        catch (e) {
            console.error(e);
        }        
    }
    public pageReadyHandler( pageName:string ):void{
        console.log('router ===>', pageName);
        this.removeChild(this._uiFocused);
        switch ( pageName ){
            case GamePages.CREATE_ROOM:
                this._gameUI = new GameUI();
                this.imgBg.source = 'game_bg_jpg';
                this._uiFocused = this._gameUI;
                break;
            case GamePages.MY_ROOM:
                break;
            case GamePages.BACK_HOME:
                this.imgBg.source = 'bg_jpg';            
                this._uiFocused = this._mainUI;
                break;
        }
        this.addChild(this._uiFocused);
    }
    protected createChildren():void {
        super.createChildren();
    }
    public imgBg;
    private _mainUI:MainUI;
    private _pageFocused:string;
    private _uiFocused:eui.Component;
    private _gameUI:GameUI;
    private _pageName:string;

}