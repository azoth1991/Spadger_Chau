class MainUI extends eui.Component {
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_main/skins/mainSkin.exml";
    }

    uiCompHandler() {
        // header
        this.imgBg.source = "bg_jpg";
        this._headui = new HeadUI();

        // _friendListIR
        /// 填充数据
        var dsListFriend:Array<Object> = [
            { icon: "head-i-2_png", name: "伊文捷琳", count: "评价：樱桃小丸子"}
            , { icon: "head-i-2_png", name: "亚特伍德", count: "评价：离了我你不行的" }
            , { icon: "head-i-2_png", name: "伊妮德", count: "评价：猴子请来的逗比"}
            , { icon: "head-i-2_png", name: "鲁宾", count: "评价：我勒个去" }
            , { icon: "head-i-2_png", name: "威弗列德", count: "评价：这货碉堡了" }
            , { icon: "head-i-2_png", name: "史帝文", count: "评价：咖啡不加糖" }
            , { icon: "head-i-2_png", name: "哈瑞斯", count: "评价：猪一样的队友" }
        ];
        this.listFriend.dataProvider = new eui.ArrayCollection( dsListFriend );

        this.listFriend.itemRenderer = FriendIRUI;
        //需要在scroller添加到舞台上面之后再访问verticalScrollBar
        this.addChildAt( this._headui, this.getChildIndex( this.imgBg ) + 1 );
    }

    protected createChildren():void {
        super.createChildren();
    }
    private imgBg;
    private _headui:HeadUI;
    private listFriend:eui.List;
    private scrListFriend:eui.Scroller;

}
class FriendIRUI extends eui.ItemRenderer {

    private cb:eui.CheckBox;

    constructor() {
        super();
        this.skinName = "friendIRSkin";
    }

    protected createChildren():void {
        super.createChildren();
    }

}
