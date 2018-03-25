class UserPickerUI extends eui.Component {
    private _close:eui.Button;
    private _confirmTarget:eui.Button;
    private _players: eui.Group;

    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_game/skins/userPickerSkin.exml";
    }

    uiCompHandler() {
        let playerList = GameMode.playerList
        this._close.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            MessageCenter.getInstance().sendMessage( GameEvents.PICK_TOOL_TARGET,{action: 'close_dialog'});
        }, this );
        this.initRadioGroup();
        this._confirmTarget.addEventListener( egret.TouchEvent.TOUCH_TAP, this.confirmTarget, this);
    }

    confirmTarget() {
        // 用户名唯一
        GameMode.playerList;
    }

    initRadioGroup() {
        const currentPlayer = {
            name: '1'
        };
        let targetList = GameMode.playerList.filter(player => player.name !== currentPlayer.name);
        targetList.forEach((player, index) => {
           let radio = new eui.RadioButton();
           radio.label = player.name;
           radio.value = player.id;
           radio.x = 132;
           radio.y = 12 + 30 * index;
           radio.addEventListener(egret.TouchEvent.TOUCH_TAP,(event) => {
               console.log(radio.label + radio.value);
           }, this)
           this._players.addChild(radio);
       })
    }

    static pickPlayer(name) {
        let index = 0;
    }
}