class MessageCenter extends egret.EventDispatcher
{

    public static EVT_LOAD_PAGE:string = "EVT_LOAD_PAGE";
    public static EVT_BACK_HOME:string = "EVT_BACK_HOME";
    public static EVT_SHOW_DIALOG:string ="EVT_SHOW_DIALOG";
    private static _this   : MessageCenter = null ; //私有对象，为单例模式提供支持
    private static _isInit : boolean       = true ; //私有对象，为单例模式提供支持

    public constructor()
    {
        if( MessageCenter._isInit )
        {
            throw new Error( "MessageCenter为单例模式，请使用 MessageCenter.getInstance()获取实例！" );
        }
        super();
    }

    //获取单例
    public static getInstance():MessageCenter
    {
        if( MessageCenter._this==null )
        {
            MessageCenter._isInit = false;
            MessageCenter._this = new MessageCenter();
            MessageCenter._isInit = true;
        }
        return MessageCenter._this
    }

    //发送消息
    public sendMessage( message:string, data:any ):void
    {
        var event:egret.Event = new egret.Event( message );
        event.data = data;
        this.dispatchEvent( event );
    }
}