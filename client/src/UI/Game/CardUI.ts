class CardUI extends eui.Component {
    constructor(type,num,deraction = 0,scale = 1) {
        super();
        this._type = type;
        this._num = num;
        this._deraction = deraction;
        this.status = 'down';
        this.scaleX = scale;
        this.scaleY = scale;
        if (this._num == -1) {
            this._type = 4;
            this._num = null;
            this.scaleX = scale*115/80;
            this.scaleY = scale*115/80;
        }
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        if (num||num==0) {
            this.addEventListener('touchTap', this.handleClick, this);
        }
        this.rotation = parseInt(this._deraction)*90;
        this.skinName = "resource/eui_game/skins/cardIRSkin.exml";
    }

    public upCard(){
        let canUp = false;
        GameMode.canChowChoice.forEach((arr)=>{
            if ((arr.indexOf(this._num)>-1)&&(this._num!=GameMode.actionCard)){
                canUp = true;
            }
        })
        console.log('upcard',GameMode.canChowChoice,this._num,GameMode.actionCard,GameMode.isSP)
        if((this.status == 'down' &&!GameMode.isSP) || ((this.status == 'down' && GameMode.isSP) && (canUp || (GameMode.joker.indexOf(this._num)>-1||GameMode.jokerPi.indexOf(this._num)>-1)))){
            this.y = this.y - 28;
            this.status = 'up';
        }
    }
    private handleClick() {
        console.log('handleclick',GameMode.isDiscard,this.status);
        if(!(this.scaleX==0.9)){
            return ;
        }
        // 皮赖杠，没有按起 可以出牌 出的皮赖 唤起弹框
        
        GameMode.chiNum = 0;

        if (this.status == 'down'&&GameMode.isDiscard&&(GameMode.joker.indexOf(this._num)>-1||GameMode.jokerPi.indexOf(this._num)>-1)) {
            // 唤起弹窗
            GameMode.gangNum = this._num;
            setTimeout(()=>{
                this.upCard();
            },10);
            MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDSTATUS, {option: [44]});             
        }
        // MessageCenter.getInstance().sendMessage( GameEvents.WS_GANG_NUM, {discardNum:this._num} );
        // 如果处于有特殊操作的状态下可以立起多张，但是不能出牌
        if (this.status == 'down') {
            if (!GameMode.isSP) {
                // 所有牌倒下
                MessageCenter.getInstance().sendMessage( GameEvents.DOWN_CARDS, null );
                setTimeout(()=>{
                    this.upCard();
                },10);
            }
        } else {
            this.downCard();
            // 如果能够发票则发牌
            if (GameMode.isDiscard) {
                // 可以吃、杠的时候点击牌可以直接出牌
                if(GameMode.isSP){
                    if (GameMode.joker.indexOf(this._num)>-1||GameMode.jokerPi.indexOf(this._num)>-1){
                        // 杠直接点是当普通牌出
                        // MessageCenter.getInstance().sendMessage( GameEvents.WS_SEND_CARD, {discardNum:this._num} );
                    } else {
                        var extkey = 0;
                        for (var i=0;i<GameMode.canChowChoice.length;i++){
                            if(GameMode.canChowChoice[i].indexOf(this._num)>-1){
                                GameMode.chiNum = i;
                                break;
                            }
                        }
                        
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_SEND_DISCARDSTATUS, {type:GameEvents.WS_CHI});                    
                    }
                    GameMode.isSP = false;
                    MessageCenter.getInstance().sendMessage( GameEvents.HIDE_DISCARDSP, null ); 
                } else {
                    // 关闭discardsp
                    console.log('HIDE_DISCARDSP')
                    MessageCenter.getInstance().sendMessage( GameEvents.HIDE_DISCARDSP, null ); 
                    // 唤起弹窗
                    MessageCenter.getInstance().sendMessage( GameEvents.WS_SEND_CARD, {discardNum:this._num} );            
                }
                
            }
        }
    }

    public downCard(){
        GameMode.gangNum = -1;
        if (this.status == 'up'){
            this.y = this.y + 28;
            this.status = 'down';   
        }
             
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
        if (this._num == -1) {
            this._bg.source = `dipai4_png`;
            this._joker.source = '';
            this._cardBg.source = '';
        }
        

        // switch (this._deraction) {
        //     case 1:
        //         this._cardBg.rotation = 90;
        //         this._cardBg.anchorOffsetY = 110;                
        //         break;
        //     case 2:
        //         this._cardBg.rotation = 180;
        //         this._cardBg.anchorOffsetX = 78;
        //         this._cardBg.anchorOffsetY = 110;
        //         break;
        //     case 3:
        //         this._cardBg.rotation = 270;
        //         this._cardBg.anchorOffsetX = 78;
        //         break;
        //     case 0:
        //         this._cardBg.rotation = 0;
        //         break;
        // }    
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
