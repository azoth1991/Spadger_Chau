class CardUI extends eui.Component {
    constructor(type,num,deraction = 0) {
        super();
        this._type = type;
        this._num = num;
        this._deraction = deraction;
        this.status = 'down';
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        if (num||num==0) {
            this.addEventListener('touchTap', this.handleClick, this);
        }
        this.skinName = "resource/eui_game/skins/cardIRSkin.exml";
    }

    public upCard(){
        this.y = this.y - 28;
        this.status = 'up';
    }
    private handleClick() {
        console.log('handleclick',GameMode.isDiscard,this.status)        
        if (this.status == 'down') {
            this.upCard();
        } else {
            this.downCard();
            // 如果能够发票则发牌
            if (GameMode.isDiscard){
                MessageCenter.getInstance().sendMessage( GameEvents.WS_SEND_CARD, {discardNum:this._num} );
                GameMode.isDiscard = false;
            }
        }
    }

    public downCard(){
        this.y = this.y + 28;
        this.status = 'down';        
    }

    private clickCard(e){
        console.log('clickCard');
    }

    uiCompHandler() {
        this._bg.source = `dipai${this._type}_png`;
        if (this._num || this._num == 0){
            this._cardBg.source = `p${this._num}_png`;
        }
        if (GameMode.joker.indexOf(this._num)>=0){
            this._joker.source = 'joker2_png';
        }
        if (GameMode.jokerPi.indexOf(this._num)>=0){
            this._joker.source = 'joker1_png';
        }

        switch (this._deraction) {
             case 1:
-                this._cardBg.rotation = 90;
-                this._cardBg.anchorOffsetY = 110;
                 break;
             case 2:
-                this._cardBg.rotation = 180;
-                this._cardBg.anchorOffsetX = 78;
-                this._cardBg.anchorOffsetY = 110;
                 break;
             case 3:
-                this._cardBg.rotation = 270;
-                this._cardBg.anchorOffsetX = 78;
                 break;
             case 0:
-                this._cardBg.rotation = 0;
                 break;
         }

        
        

        
    }

    protected createChildren():void {
        super.createChildren();
    }
    public _bg:eui.Image;
    public _cardBg:eui.Image;
    private _type;
    private _num;
    private _deraction;
    public status;
    private _joker:eui.Image;

}
