class HomeUI extends eui.Component {
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_main/homeSkin.exml";
    }

    uiCompHandler() {
        // header
        this.imgBg.source = "bg_jpg";
        // this._mainUI = new MainUI();
        // this._uiFocused = this._mainUI;
        // this.addChild(this._uiFocused);

    }
     public async handleRouter(evt:egret.Event) {
         console.log('hanldeRouter=>',evt.data)
        this._pageName = evt.data.type;
        const trueLoadingUI = new TrueLoadingUI();                
        try {
            switch (this._pageName){
                case GamePages.CREATE_ROOM:
                    await this.addChild(trueLoadingUI);
                    await RES.loadGroup("game", 0, trueLoadingUI);
                    await this.removeChild(trueLoadingUI);
                    break;
                case GamePages.DIALOG:     
                    await this.addChild(trueLoadingUI);
                    await RES.loadGroup("dialog", 0, trueLoadingUI);
                    await this.removeChild(trueLoadingUI);
                    break;
            }
            // await this.pageReadyHandler( this._pageName, evt.data );  
            await MessageCenter.getInstance().sendMessage( GameEvents.pageReadyHandler, {type:this._pageName,data:evt.data});            
        }
        catch (e) {
            console.error(e);
        }        
    }

    public async handleDialog(evt:egret.Event) {
        this._dialogName = evt.data.type;
        const trueLoadingUI = new TrueLoadingUI();           
        try {
            await this.addChild(trueLoadingUI);
            await RES.loadGroup("dialog", 0, trueLoadingUI);
            await this.removeChild(trueLoadingUI);
            // await this.pageReadyHandler( GamePages.DIALOG, evt.data );   
            MessageCenter.getInstance().sendMessage( GameEvents.pageReadyHandler, {type:GamePages.DIALOG,data:evt.data});         
        }
        catch (e) {
            console.error(e);
        }        
    }
    

    // public pageReadyHandler( pageName:string,data:any ):void{
    //     console.log('router ===>', pageName);
    //     this.removeChild(this._uiFocused);
    //     switch ( pageName ){
    //         case GamePages.CREATE_ROOM:
    //             this._gameUI = new GameUI(data.id);
    //             this.imgBg.source = 'game_bg_jpg';
    //             this._uiFocused = this._gameUI;
    //             break;
    //         case GamePages.MY_ROOM:
    //             break;
    //         case GamePages.DIALOG:
    //             this._dialogUI = new DialogUI(data);
    //             this.imgBg.source = 'dialog-bg_jpg';
    //             this._uiFocused = this._dialogUI;
    //             break;
    //         case GamePages.BACK_HOME:
    //             this.imgBg.source = 'bg_jpg';            
    //             this._uiFocused = this._mainUI;
    //             break;
    //     }
    //     this.addChild(this._uiFocused);
    // }
    protected createChildren():void {
        super.createChildren();
    }
    public imgBg;
    private _mainUI:MainUI;
    private _pageFocused:string;
    private _uiFocused:eui.Component;
    private _gameUI:GameUI;
    private _pageName:string;
    private _dialogName:string;
    private _dialogUI:DialogUI;

}