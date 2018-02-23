class CardUI extends eui.Component {
    constructor(type,num) {
        super();
        this._type = type;
        this._num = num;
        this.status = 'down';
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        if (num) {
            this.addEventListener('touchTap', this.handleClick, this);
        }
        this.skinName = "resource/eui_game/skins/cardIRSkin.exml";
    }

    public upCard(){
        this.y = this.y - 28;
        this.status = 'up';
    }
    private handleClick() {
        if (this.status == 'down') {
            this.upCard();
        } else {
            this.downCard();
            // 如果能够发票则发票
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
        console.log('drewCard');
        if (this._type) {
            this._bg.source = `dipai${this._type}_png`;
        }
        if (this._num) {
            this._cardBg.source = `p${this._num}_png`;
        }
    }

    protected createChildren():void {
        super.createChildren();
    }
    public _bg:eui.Image;
    public _cardBg:eui.Image;
    private _type;
    private _num;
    public status;
}
