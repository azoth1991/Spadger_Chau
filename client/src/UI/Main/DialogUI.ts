class DialogUI extends eui.Component {
    constructor(data) {
        super();
        this._headerMessage = data.data || {shopType: ShopTypes.ADDMONEY};
        this._playMessage = data.data || {playType: PlayTypes.HZLZG};
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        console.log('dialogName==>',data);
        this._dialogType = data.type;
        switch (data.type) {
            case DialogTypes.ENTERROOM:
                this.skinName = "resource/eui_main/skins/enterRoomSkin.exml";
                break;
            case DialogTypes.PLAY:
                this.skinName = "resource/eui_main/skins/dialogPlaySkin.exml";
                break;
            case DialogTypes.SHOP:
                this.skinName = "resource/eui_main/skins/dialogShopSkin.exml"
                break;
            case DialogTypes.NEWS:
                this.skinName = "resource/eui_main/skins/dialogMailSkin.exml";
                break;
            case DialogTypes.MYROOM:
                this.skinName = "resource/eui_main/skins/myRoomSkin.exml";
                break;
            case DialogTypes.ZHANJI:
                this.skinName = "resource/eui_main/skins/gameHistorySkin.exml";
                break;
            default:
                this.skinName = "resource/eui_main/skins/dialogSkin.exml";
        }
    }

    uiCompHandler() {
        if(this._back){
            this._back.addEventListener( egret.TouchEvent.TOUCH_TAP, this.backHome, this );
        }
        if(this._enterRoom){
            this._enterRoom.addEventListener( egret.TouchEvent.TOUCH_TAP, this.enterRoom, this );
        }
        if(this._mailScroller) {
            this.generateMailState();
        }
        if (this._gameHistoryScroller) {
            this.generateHistoryState();
        }
        if(this._shopScroller) {
            this._labelContainer = [this._firstBuy, this._addMoney, this._addCard,this._addTool]
            this.generateShopState();
        }
        if (this._roomScroller) {
            this._labelContainer = [this._freeRoom, this._busyRoom];
            this.generateMyRoomState();
        }
        if(this._hzfcg) {
            this._hzfcg.selected = true;
            this._labelContainer = [this._hzfcg, this._qphl, this._whhh,this._sm];
            this._playLabel.textFlow = (new egret.HtmlTextParser).parser(this.str0);
        }
        if(this._labelContainer.length > 0) {
            this._labelContainer.forEach(label=> {
                label.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchLabel, this);
            })
        }
    }

    private backHome(e:egret.TouchEvent):void {
        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, {type:GamePages.BACK_HOME});
    }

    private enterRoom(e:egret.TouchEvent):void {
        GameMode.roomId = this._input.text;
        console.log(`enterRoom${GameMode.roomId}`);
        // MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, {type:GamePages.CREATE_ROOM,id:this._input.text});
        MessageCenter.getInstance().sendMessage( GameEvents.WS_ENTER_ROOM, {type:GamePages.CREATE_ROOM});
    }

    private buyList0 = [
            { icon: "head-i-2_png", purpose: "牌局消耗的道具", desc: "钻石6个", price: "6元"}
        ];

    private buyList1 = [
        { icon: "12_png", purpose: "牌局消耗的道具", desc: "钻石6个", price: "6元"}
        , { icon: "22_png", purpose: "牌局消耗的道具", desc: "钻石18个", price: "18元" }
        , { icon: "32_png", purpose: "牌局消耗的道具", desc: "钻石36个", price: "36元" }
        , { icon: "42_png", purpose: "牌局消耗的道具", desc: "钻石69个", price: "69元" }
        , { icon: "52_png", purpose: "牌局消耗的道具", desc: "钻石98个", price: "98元" },
        { icon: "62_png", purpose: "牌局消耗的道具", desc: "钻石198个", price: "198元" },
    ];

    private buyList2 = [
        { icon: "card_png", purpose: "牌局消耗的道具", desc: "钻石6个", price: "6元"}
        , { icon: "card_png", purpose: "牌局消耗的道具", desc: "钻石18个", price: "18元" }
        , { icon: "card_png", purpose: "牌局消耗的道具", desc: "钻石36个", price: "36元" }
        , { icon: "card_png", purpose: "牌局消耗的道具", desc: "钻石69个", price: "69元" }
        , { icon: "card_png", purpose: "牌局消耗的道具", desc: "钻石98个", price: "98元" },
        { icon: "card_png", purpose: "牌局消耗的道具", desc: "钻石198个", price: "198元" },
    ];

    private buyList3 = [
        { icon: "boom_png", purpose: "牌局可使用的道具", desc: "炸弹=10钻石", price: "购买"}
        , { icon: "shit_png", purpose: "牌局可使用的道具", desc: "便便=10钻石", price: "购买" }
        , { icon: "egg_png", purpose: "牌局可使用的道具", desc: "臭鸡蛋=10钻石", price: "购买" }
        , { icon: "rose_png", purpose: "牌局可使用的道具", desc: "玫瑰=10钻石", price: "购买" },
        { icon: "kiss_png", purpose: "牌局可使用的道具", desc: "吻=10钻石", price: "购买" },
        { icon: "papa_png", purpose: "牌局可使用的道具", desc: "鼓掌=10钻石", price: "购买" },
    ];

    private generatePlayState() {
        const playType = this._playMessage.playType;
        console.log(11111,playType)
        switch (playType) {
            case PlayTypes.HZLZG: 
                this._hzfcg.selected = true;
                break;
            case PlayTypes.QPHL:
                this._qphl.selected = true;
                break;
            case PlayTypes.WHHH:
                this._whhh.selected = true;
                
                break;
            case PlayTypes.SM:
                this._sm.selected = true;
                
                break;
            default :
                this._hzfcg.selected = true;
                // var playinfo = new PlayInfoUI(1);
                // this.addChild(playinfo);
                break;
        }
        
    }

    private generateShopState() {
        const shopType = this._headerMessage.shopType;
        console.log(11111,shopType)
        switch (shopType) {
            case ShopTypes.ADDCARD: 
                this._addCard.selected = true;
                this.showList(this.buyList2);
                break;
            case ShopTypes.ADDMONEY:
                this._addMoney.selected = true;
                this.showList(this.buyList1);
                break;
            case ShopTypes.ADDTOOL:
                this._addTool.selected = true;
                this.showList(this.buyList3);
                break;
            default :
                this._firstBuy.selected = true;
                this.showList(this.buyList0);
                break;
        }
        
        
    }
    private showList(list) {
        console.log(3333,list)
        var dsShopContents:Array<Object> = list;
        this._shopContents.dataProvider = new eui.ArrayCollection( dsShopContents );
        this._shopContents.itemRenderer = ShopContentIRUI;
    }

    private generateHistoryState() {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(encodeURI(`http://101.37.151.85:8008/socket/getRecord?wechatId=${GameMode.wechatId}`),egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE,(evt)=>{
            var response = <egret.HttpRequest>evt.currentTarget;
            var res = JSON.parse(response.response);
            if (res.code == 1) {
                console.log('history',res.result);
                // var history:Array<Object> = [
                //     {roomId: 1000, roomOwner: '陈志伟', gameCount: 1, gameDuration: '10分钟', overTime: '2017-02-12 10:23:23', record: 20},
                //     {roomId: 1230, roomOwner: '周菲特', gameCount: 4, gameDuration: '30分钟', overTime: '2017-02-12 10:23:23', record: -20},
                //     {roomId: 1430, roomOwner: '阳神', gameCount: 5, gameDuration: '2分钟', overTime: '2017-02-12 10:23:23', record: 3},
                //     {roomId: 1023, roomOwner: '一点兄', gameCount: 12, gameDuration: '23分钟', overTime: '2017-02-12 10:23:23', record: 210},
                //     {roomId: 1120, roomOwner: '解老', gameCount: 14, gameDuration: '43分钟', overTime: '2017-02-12 10:23:23', record: -121},
                //     {roomId: 1002, roomOwner: '春节', gameCount: 111, gameDuration: '23分钟', overTime: '2017-02-12 10:23:23', record: 302},            
                // ];
                var history:Array<Object> = res.result.map((v)=>{
                    return {
                        ...v,
                        enddate: this.timetrans(v.end_time),
                    }
                });
            
                this._gameHistory.dataProvider = new eui.ArrayCollection( history );
                this._gameHistory.itemRenderer = GameHistoryIRUI;
            } else {
                alert('请在微信中打开')
            }
        },this);

    }
    private timetrans(date){
        var date = new Date(date);//如果date为13位不需要乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y+M+D+h+m+s;
    }

    private generateMailState() {
        var mailContents:Array<MailContentType> = [
            { mailIcon: "mail_closed_png", mailInfo: '梦一样的遐想', opened:true,  remainTime: '已启', date: '20180305'},
            { mailIcon: "mail_opened_png", mailInfo: '从前的你和我', opened:false, remainTime: '10 days', date: '20180305' },
            { mailIcon: "mail_opened_png", mailInfo: '手一挥就再见', opened:true, remainTime: '已启', date: '20180305' },
            { mailIcon: "mail_opened_png", mailInfo: '嘴一翘就笑', opened:false, remainTime: '10 days', date: '20180305' },
            { mailIcon: "mail_closed_png", mailInfo: '啊漫天的回想', opened:false, remainTime: '10 days', date: '20180305' },
            { mailIcon: "mail_closed_png", mailInfo: '云上去云上看云上走一趟', opened:false, remainTime: '10 days', date: '20180305' },
        ];
        mailContents = mailContents.map(item => {
            const textColor = item.opened ? '0x6BAE2D' : '0xD1AB98';
            return {...item, textColor};
        });
        this._mailContents.dataProvider = new eui.ArrayCollection(mailContents);
        this._mailContents.itemRenderer = MailContentIRUI;
    }

    private generateMyRoomState() {
        var rooms:Array<Object> = [
            {roomId: 1000},
            {roomId: 1032},
            {roomId: 1234},
            {roomId: 1546},
            {roomId: 1023},
            {roomId: 1103},            
        ]
        this._myRooms.dataProvider = new eui.ArrayCollection(rooms);
        this._myRooms.itemRenderer = MyRoomIRUI;
    }

    private str3 = `<p>好运plus游戏网游平台使用条款</p>\n
            <p>一、特别提示</p>\n
            <p>好运plus游戏同意按照本协议的规定及其不时发布的操作规则提供基于互联网的相关服务(以下称“网络服务”)，为获得网络服务，服务使用人(以下称“用户”)同意本协议的全部条款并按照页面上的提示完成全部的注册程序。用户在进行注册程序过程中点击“同意”按钮即表示用户完全接受本协议项下的全部条款。这些条款可由好运plus游戏随时更新，修改后的服务协议一旦在页面上公布即有效代替原来的服务协议。用户在使用好运plus游戏提供的各项服务之前，应仔细阅读本服务协议，如用户不同意本服务协议及或随时对其的修改，请停止使用好运plus游戏提供的服务。本应用仅供休闲娱乐用，游戏过程公平公正。任何人不得用于赌博用途，更严禁利用系统漏洞、黑客手段获取不当利益，违者追责，后果自负！</p>\n
            <p>二、著作权声明</p>\n
            <p>好运plus游戏所提供的服务的相关著作权、专利权、商标、营业秘密及其它任何所有权或权利，均属好运plus游戏所有。非经好运plus游戏的同意，任何人或用户均不得擅自重制、传输、改作、编辑，否则应负所有法律责任。</p>\n
            <p>三、用户的基本义务</p>\n
            <p>1、好运plus游戏平台是基于微信端的一款H5棋牌游戏，用户承诺以其真实身份注册微信成为好运plus游戏的用户，并保证所提供的个人身份资料信息真实、完整、有效，依据法律规定和必备条款约定对所提供的信息承担相应的法律责任。</p>\n
            <p>2、由于好运plus游戏基于微信程序，用户有义务妥善保管微信在注册服务时获得的帐号及密码谨防被盗或泄露，好运plus不在此处另设置密码。因微信密码被盗或泄露造成的全部责任和损失均由用户本人承担，好运plus游戏对此概不负责。</p>\n
            <p>3、若用户发现游戏遭他人非法使用或有异常使用的情形，应及时登入自己微信以便暂停登录和使用。因此而造成的损失好运plus游戏不承担赔偿责任。</p>\n
            <p>4、好运plus游戏不提供用户的通知暂停用户帐号的登录和使用的，好运plus游戏要求用户自行保管好自己的微信账号及其密码。</p>\n
            <p>5、用户没有提供其个人注册微信有效身份证件或者用户提供的个人有效身份证件与所注册的身份信息不一致的，好运plus游戏有权拒绝用户上述请求。</p>\n
            <p>6、用户应该妥善保管自己微信账号及其密码，好运plus游戏进入基于用户本人微信账号，游戏端不提供微信账号密码找回功能。</p>\n
            <p>7、用户同意若发现任何非法使用用户帐号或利用安全漏洞的情况，立即通告好运plus游戏平台相关人员，且须承诺在申请帐号时遵循如下规定：</p>\n
            <p>a、用户名和中文昵称的注册及使用须尊重网络道德，遵守中华人民共和国的有关法律法规。</p>\n
            <p>b、用户名和中文昵称中不得含有任何威胁、恐吓、漫骂、庸俗、亵渎、色情、淫秽、非法、反动、前后矛盾、攻击性、伤害性、骚扰性、诽谤性、辱骂性的或侵害他人知识产权的文字。不得涉及政治、国家领导人及近音国家领导人，以及任何可能引起法律纠纷的文字。</p>\n
            <p>8、若用户将帐号与他人于现实生活中进行交易或互易行为而产生的纠纷，好运plus游戏概不负责。</p>\n
            <p>9、用户使用在好运plus游戏注册的用户名在好运plus游戏中的任何行为需要遵守好运plus游戏其他各项服务条款。</p>\n
            <p>10、用户对好运plus游戏服务管理人员所进行的询问应据实澄清，否则好运plus游戏有权随时终止用户使用服务。</p>\n
            <p>四、用户隐私制度</p>\n
            <p>好运plus游戏绝对不会修改用户的个人资料，或编辑或透露用户在注册资料中的密码、姓名、地址、电话、身份证号码及保存在好运plus游戏中的非公开内容，除非有法律许可要求或好运plus游戏在诚信的基础上认为透露这些信息在以下四种情况是必要的：</p>\n
            <p>1、遵守有关法律规定，遵从合法服务程序。</p>\n
            <p>2、维护好运plus游戏的商标所有权。</p>\n
            <p>3、在紧急情况下竭力维护用户个人和社会大众的隐私安全。</p>\n
            <p>4、符合其他相关的要求。</p>\n
            <p>五、游戏数据的特别规定：好运plus游戏平台是一款基于微信H5，大众娱乐，中老年人消遣的娱乐游戏平台，好运plus游戏严厉禁止用户使用该平台进行各种赌博等、违反国家相对应的法律法规行为。
            <p>1、好运plus游戏严禁以下行为：</p>\n
            好运plus游戏平台严厉禁止线上或线下各种赌博，违反国家相应的法律法规。利用系统漏洞或者其他任何非正常方式获得游戏帐号、游戏钻石或货币等游戏数据的活动。如查核实查明所涉及的帐号将被永久封停，永不启用。</p>\n
            <p>2、对于违反以上规定的用户，一经发现，好运plus游戏平台将视情节轻重对其采取没收其游戏财富、封停其游戏帐号、删除其游戏帐号、乃至屏蔽其微信的处罚。</p>\n
            <p>3、如果好运plus游戏发现用户帐号数据异常，有权采取相应措施，包括对该异常帐号的冻结、终止，该异常帐号内游戏相关数据的清除，用户不得因此要求好运plus游戏做任何补偿。</p>\n
            <p><p>4、如发现用户使用我平台游戏开展赌博（包括线上及其线下）我公司一旦核实，立即封存游戏ID并向相应的司法机关举报，用户本人应承担相应的法律后果，好运plus游戏平台不为此承担相应的责任。</p>\n
            <p>六、服务的停止和更改</p>\n
            <p>1、发生下列情形之一时，好运plus游戏有权停止或中断向用户提供的服务：</p>\n
            <p>a、用户有发布违法信息、严重违背社会公德、以及其他违反法律禁止性规定的行为 ；</p>\n
            <p>b、用户实施违反本协议的行为；</p>\n
            <p>c、对于网络设备进行必要的保养及施工；</p>\n
            <p>d、发生突发性的网络设备故障时；</p>\n
            <p>e、由于不可抗力因素致使好运plus游戏无法提供线上服务；</p>\n
            <p>f、由于相关政府机构的要求。</p>\n
            <p>2、在本协议约定的情形下，好运plus游戏就停止或更改或终止向用户所提供的服务而可能产生的不便或损害，好运plus游戏对用户本人或任何第三人均不负任何损害赔偿责任。</p>\n
            <p>3、用户应了解并同意，好运plus游戏所提供的服务可能因公司本身、其它合作厂商或相关电信业者网络系统软硬件设备的故障、失灵、或因合作方及相关电信工作人员人为操作的疏失而全部或一部分中断、暂时无法使用、迟延或因他人侵入好运plus游戏系统篡改或伪造变造资料等，造成服务的停止或中断或用户档案缺失，用户不得要求好运plus游戏提供任何的补偿或赔偿。</p>\n
            <p>4、好运plus游戏根据本协议取消或停止用户的资格或加以限制，用户不得要求补偿或赔偿。</p>\n
            <p>5、好运plus游戏有权仅根据其判断，单方决定新增、修改、删除、暂停或终止其所提供的全部或部分服务（包括且不限于增加、暂停或终止某个游戏的运营），且无需另行个别通知用户，用户不得因此要求任何补偿或赔偿。</p>\n
            <p>6、好运plus游戏对其服务不保证不出现任何程序BUG，并对由此可能产生的问题不承担任何赔偿责任。</p>\n
            <p>七、用户违规处罚办法</p>\n
            <p>用户违规行为指的是用户违反好运plus游戏用户服务条款、好运plus游戏论坛服务条款、好运plus游戏作弊处罚条款等好运plus游戏任何服务条款或管理制度的行为，对于用户违规行为的处罚办法如下：
            </p>\n<p>1、用户如有违反好运plus游戏用户服务条款的行为，好运plus游戏有权视情节轻重对其采取删除其公众号发表的文章、没收其游戏金币及其财富、封闭其游戏帐号、删除其游戏帐号、乃至屏蔽其微信号的处罚，用户不得因此要求本公司做任何补偿或退费。</p>\n
            <p>2、用户如有作弊行为，将被依据“好运plus游戏作弊处罚条例”的规定予以相应的处罚。</p>\n
            <p>3、用户如有违反好运plus游戏公众号或论坛服务条款的行为，将被依据“好运plus游戏功能公众号服务条款”的规定予以相应的处罚。</p>\n</p>\n
            <p>4、用户如有违反好运plus游戏其他服务条款和管理制度的行为，将被依据相关规定予以相应的处罚。好运plus游戏各服务条款或管理制度之间不相抵，可各自执行。</p>\n
            <p>八、服务条款的修改</p>\n
            <p>好运plus游戏保留随时修改本服务条款的权利，修改本服务条款时，好运plus游戏将于相关网站或公众号公告修改的事实，而不另对用户进行个别通知。若用户不同意修改的内容，可停止使用好运plus游戏的服务。若用户继续使用好运plus游戏的服务，即视为用户已接受好运plus游戏所修订的内容。</p>\n`;
    private str1 = `<p>武汉麻将“前痞后癞”又称“七皮四赖”</p>\n
<p>游戏规则，开口番，开口番规则参考红中发财杠。预制不同“发财”同“东那西北”一样作为风。“红中”继续为“痞子”。</p>\n
<p>"癞子"是在四个选手闲家抓完13张牌庄家抓完第14张牌后翻取的第一张牌加一就是"癞子"</p>\n
<p>随机“痞子”是在四个选手闲家抓完13张牌庄家抓完第14张牌后翻取的第一张牌和这张牌“减1”是"痞子"（比如 A、翻出五万，六万就是"癞子"，四万，五万就是“痞子”翻出九万，一万就是"癞子"，八万，九万是“痞子”B、按照"东、南、西、北、红中、发财、白板"的顺序，如果翻出"北"，跳过"红中"，"发财"是"癞子"，西风，北风是“痞子”翻出"白板"，"东风"是"癞子"发财，白板是“痞子”）。</p>\n

<p>“痞子”使用方法，几番与“红中发财杠”中“红中发财”相似！</p>\n`;
    private _playLabel:eui.Label;
    private str0=`<p>红中发财杠打牌规则</p>\n

<p>用牌</p>\n
<p>麻将牌：筒、条、万、风，共136张牌。</p>\n
<p>没有梅、兰、竹、菊、春、夏、秋、冬</p>\n
<p>可以吃、碰、杠，但不能吃碰杠红中，不能吃碰杠癞子。</p>\n
<p>红中</p>\n
<p>红中可以随时拿出来杠牌，打出来也是杠牌，称为“红中杠”（×2）。</p>\n
<p>红中不能碰、明杠、暗杠，手上持有红中时不能胡牌，因此也不能抢杠。</p>\n
<p>发财</p>\n
<p>发财也可以随时拿出来杠牌，打出来也是杠牌，称为“发财杠”（×2）。</p>\n
<p>发财不能碰、明杠、暗杠，手上持有发财时不能胡牌，因此也不能抢杠。</p>\n
<p>癞子</p>\n
<p>武汉麻将 "癞子"是在四个选手闲家抓完13张牌庄家抓完第14张牌后翻取的第一张牌加一就是"癞子"（比如 A、翻出五万，六万就是"癞子"，翻出九万，一万就是"癞子"，B、按照"东、南、西、北、红中、发财、白板"的顺序，如果翻出"北"，跳过"红中发财"，"白板"是"癞子"，翻出"白板"，"东风"是"癞子"）。</p>\n
<p>1、癞子即财神，持有者可以当作其他张牌（万能牌）来胡（属于软胡，×1），也可以用本身花数胡（硬胡，×2）。</p>\n
<p>2、癞子可以单张成杠打出去，成为"癞子杠"（×2）。</p>\n
<p>3、 持有或打出的癞子不能当普通牌来叫牌，即自己不能用来吃碰杠，打出去别人也不能用来吃碰杠胡。</p>\n
<p>4、 翻出癞子牌后，周知各人（UI上有显示）。下一张的意思是：一到九的循环，东南西北发白的循环（摸到"北"和"中"都是"发"作癞子）。</p>\n
<p>5、 当有两个"癞子"时（即财神）不能胡"小胡"（听牌时有一个"癞子"，又自摸一个"癞子"，必须打出一个），"癞子"可开杠（×2），也可打出（×2）。</p>\n
<p>杠</p>\n
<p>冲杠：手中有暗刻（3个一样），别人出第四张，则可以开杠。直杠不能被抢杠，算开口（×2）。</p>\n
<p>蓄杠：碰了一个，又摸到第四张，可以在合适的时候拿出来，可以被抢杠（×2）。</p>\n
<p>冲杠和蓄杠属于明杠，必须亮明（×2）。</p>\n
<p>暗杠：摸到4张一样时，可以拿出来暗杠，不亮明，不算开口，自然也不能被抢杠（×2）。</p>\n
<p>抢杠：一家已经碰了一次，又抓到这张牌开杠，如果另外三家已听牌，正好需要这张牌胡牌，即抢杠。如多家同时抢杠，按逆时针上家，对家，下家顺序优先一家为赢家。</p>\n
<p>坐庄：逆时针上家轮庄，庄家胡牌或者荒庄（流局）则继续做。</p>\n
<p>开口翻定义</p>\n
<p>吃、碰、明杠称为开口，必须开口（或开过口）才能胡牌，即必须有吃、碰或明杠行为。</p>\n
<p>胡牌规则编辑</p>\n
<p>胡牌要求</p>\n
<p>胡牌的基本牌型 </p>\n
<p>(1)11、123、123、123、123</p>\n
 <p>(2)11、123、123、123、111(1111，下同) </p>\n
<p>(3)11、123、123、111、111 </p>\n
<p>(4)11、123、111、111、111</p>\n
 <p>(5)11、111、111、 111、111。</p>\n
<p>注：除风一色、将一色、碰碰胡、清一色以外，一对（11）必须是二、五、八，比如二万、五条、八筒等。</p>\n
<p>2. 武汉麻将没有7对子和门前清。</p>\n
<p>3. 当有两个"癞子"时不能胡"小胡"（听牌时有一个"癞子"，又自摸一个"癞子"，必须打出一个），"癞子"可开杠（× 2），也可打出（× 2）。</p>\n
<p>4. 风一色、将一色为乱风乱将，只要手上全是风牌或将牌就能胡牌。（在听牌时，任意风或将都能当炮使用。）</p>\n
<p>5. 如果玩家漏掉了炮胡，可以继续胡其他玩家放的炮，无须等待自己摸牌后。</p>\n
<p>胡牌类型</p>\n
<p>小胡（即屁胡，基础分1），必须用2，5，8的对子做将牌。</p>\n
<p>大胡（基础分10，可累计）：</p>\n
<p>碰碰胡，除将牌外为均为刻子；任意将。</p>\n
<p>全求人，吃碰明杠过4次牌，手上留一张将牌成胡的；</p>\n
<p>一色，风一色（全是风牌包括发白）、将一色（全是2、5、8）、清一色（全是条或万或筒）；任意将。</p>\n
<p>海底捞，除去海底牌桌的5沓牌（倒数10张）后，摸最后4张牌时自摸（此时不能打出不能杠，只有自摸）；</p>\n
<p>杠上花（即杠开），杠（包括红中杠和癞子杠）了之后补牌时自摸，作大胡。</p>\n
<p>抢杠，一家已经碰了一次，又抓到这张牌开杠，如果另外三家已听牌，正好需要这张牌胡牌，即抢杠。</p>\n
<p>硬胡，是指胡牌后没有癞子、癞子被杠、用本身花数胡的情况。</p>\n
<p>软胡，如果有癞子并且充当万能牌使用的情况。</p>\n
<p>一炮单响，只能有一个胡牌者，以庄家逆时针为序。</p>\n
<p>其它，持有红中，发财时不能胡牌。[1] </p>\n
<p>记分规则编辑</p>\n
<p>原则</p>\n
<p>1）没有承包时，1家胡牌，3家输点，没放冲的玩家依然输点。</p>\n
<p>2）输分=基础分（1或10）乘以输家自己番数乘以赢家番数，赢分=3个输家的分之和。</p>\n
<p>胡牌计分原则</p>\n
<p>小胡计分</p>\n
<p>基础分为1，开口番为所有的开口都算1番，每暗杠为2番，自摸为1番，硬胡为1番，每明杠1番，放冲者为1番，硬胡为1番，庄家为1番。</p>\n
<p>大胡计分</p>\n
<p>大胡有：碰碰胡、清一色、将一色、风一色、杠上花、海底捞、抢杠</p>\n
<p>基础分为10，不考虑庄闲因素，自摸×1.5，放冲输点×1.5，开口1番，每暗杠2番，硬胡2番，每明杠1番。</p>\n
<p>注意：大胡可累计，如2个大胡基础分+1番，3个大胡基础分就是+2番。</p>\n
<p>口口翻：大胡基础分为10，自摸1番，点冲1番，其他一样，但每开一次口就为1番</p>\n
<p>承包（包胡）</p>\n
<p>承包者承担所有输点，以下情况承包：</p>\n
<p>1） A放冲给B作全求人，A承包。</p>\n
<p>2） B胡清一色，B的第三次开口对象是A，A承包。</p>\n
<p>3） B抢杠胡，被抢的A承包。</p>\n
<p>陪包与反包</p>\n
  <p> 陪包该定义只清一色:</p>\n
<p>B胡清一色，B的第三次开口对象是A，A包胡后，玩家C,D未打B胡的牌色，B胡后，未打玩家同样要给B支付A给的金额，</p>\n
<p>反包该定义只清一色，将一色：</p>\n
<p>B胡清一色或将一色，B的第三次开口对象是A，A包胡后，玩家C,D未打B胡的牌色，B胡牌后，CD玩家牌中有B胡牌牌色，由CD给与支付，支付顺序按逆时针优先选定。陪包与反包可以开房时候自由选择一种类别 </p>\n
<p>封顶</p>\n
<p>设定一个封顶的上限值，比如赖子山庄的红中发财杠封顶值为400分，如果3家都超过400分则每家提至500分（称为金顶），金顶时，如果有玩家没有开口，那么该玩家则要输600分，即为光明顶。发生承包时承包人付出数=三输家输分之和。</p>\n
<p>在口口番中金顶设为600分。（该数值在开局可以自由定制）</p>\n
<p>结算规则编辑</p>\n
<p>以C为当局庄家 A放冲予D为例来算。</p>\n
<p>番底</p>\n
<p>输方：</p>\n
<p>A ：A要输的分数等于2的（A家的所有番数加上D家的所有番数）的次方。列如A的番数为3番，D的番数为4番，则A要输给D加的分数即为2的7次方，7个2相乘为128分。</p>\n
<p>B B要输的分数等于2的（B家的所有番数加上D家的所有番数）的次方。列如B的番数为2番，D的番数为4番，则A要输给D加的分数即为2的6次方，6个2相乘为64分。</p>\n
<p>C C要输的分数等于2的（C家的所有番数加上D家的所有番数）的次方。列如C的番数为3番，D的番数为4番，则A要输给D加的分数即为2的7次方，7个2相乘为128分。</p>\n
<p>赢方：</p>\n
<p>D 闲家 赢分 = 上述三方的和128+128+64=320分。</p>\n
<p>逃跑</p>\n
<p>游戏结束，逃跑者扣400分（口口翻扣500分）。</p>\n`;
private str2 = `<p>武汉晃晃游戏规则</p>\n
<p>一、用牌：</p>\n
<p>武汉晃晃用牌120张，比起武汉传统麻将少“东”“南”“西”“北”，用牌：同、条、万、中、发、白板。</p>\n
<p>庄家：</p>\n
   <p>首局随机庄，若庄家胡牌或本局“黄局”，下把庄家继续坐庄，若其他玩家胡牌，则下把由胡牌上庄，依次轮转，无一炮两响或者一炮三响。</p>\n
<p>游戏规则：</p>\n
   <p>可以吃、碰、杠，但不能吃碰杠红中，发财。不能吃碰杠癞子。红中</p>\n
<p>红中可以随时拿出来杠牌，打出来也是杠牌，称为“红中杠”（一番）。</p>\n
<p>红中不能碰、明杠、暗杠，手上持有红中时不能胡牌，因此也不能抢杠。</p>\n
<p>发财</p>\n
<p>发财也可以随时拿出来杠牌，打出来也是杠牌，称为“发财杠”（一番）。</p>\n
<p>发财不能碰、明杠、暗杠，手上持有发财时不能胡牌，因此也不能抢杠。</p>\n
<p></p>\n
<p>武汉晃晃麻将 "癞子"是在四个选手闲家抓完13张牌庄家抓完第14张牌后翻取的第一张牌加一就是"癞子"（比如 A、翻出五万，六万就是"癞子"，翻出九万，一万就是"癞子"，B、翻出"中发白"，如“中发”都不选择开杠，则按照中发白循序为“癞子”，（翻红中，发财为癞子；翻发财，白板为癞子；翻白板，红中为癞子），如红中玩家选择开杠，择发财与白板相互交替，如玩家选择红中发财杠，翻白板，择白板为癞子（即：本局只有三个癞子）。</p>\n
<p>注：晃晃“红中”“发财”是否要求杠，由玩家开局自行选择。</p>\n
<p>开杠：手上拥有4张相同的牌（不算癞子），或者碰牌后，手上拥有该牌，自己可进行出牌时进行开杠。杠牌比吃牌优先。杠牌后从末端拿牌。</p>\n
<p>胡牌：自己摸牌形成胡牌称自摸，他人打出牌和自己牌形成胡牌称为点冲，若有多人同时胡牌，按顺序优先胡。具体参考“红中发财杠”</p>\n
<p>将：乱将，非“258”为将规定（痞子不能为将）</p>\n
<p>黄庄：所有人摸完没人胡牌，称为黄庄（牌桌面留最后5墩（十张））</p>\n
<p>癞子：癞子操作参考“红中发财杠”使用规则</p>\n
<p>牌型规定：</p>\n
<p>胡牌规定：除了“乱将”外。其它参考“红中发财杠”，另外增加：1、可以不开口胡牌，新增牌型：门前清。七对。</p>\n
<p>门前清：胡牌，切自摸未开口，</p>\n
<p>七对：胡牌是手上十四张牌，都为对子。</p>\n
<p>其它胡牌规定参考“红中发财杠”文本</p>\n
<p>胡牌计分：</p>\n
<p>A计分</p>\n
<p>B计分屁胡1清一色5小刀（开口自摸）3碰碰胡5大刀（门前清自摸）5七对5将一色5</p>\n
    
<p>已上为基础计分</p>\n
<p>硬胡 1番</p>\n
<p>放冲 单独</p>\n
<p>软杠 </p>\n
<p>硬杠 2番</p>\n
<p>红中 1番</p>\n
<p>发财 1番</p>\n
<p>癞子杠 2番</p>\n

  <p>组合计分：1、屁胡，屁胡为其它玩家放冲，计算方式：放冲3分，其它人1分；</p>\n
<p>已啊上基础计分AB类可以相互组合：如：清一色放冲：放冲人为：5+3，其他人5+1，结算基础分；清一色自摸则为：5+5所有人结算。</p>\n
<p>基础分先加，再根据番数增加。</p>\n`;
    private showPlayInfo(key) {
        var str = '';
        if(key == 3){
            str = this.str3;
        }
        if(key == 2){
            str = this.str2;
        }
        if(key == 1){
            str = this.str1;
        }

        if(key == 0){
            str = this.str0;
        }
        
        // this._playLabel.text = str;
        this._playLabel.textFlow = (new egret.HtmlTextParser).parser(str);
    }

    private switchLabel(e:egret.TouchEvent):void {
        const target = e.currentTarget;
        this._labelContainer.forEach((label, key) => {
            label.selected = label === target;
            if (this._shopScroller) {
                if (label === target){
                    this.showList(this[`buyList${key}`]);
                }
            }
            if(this._hzfcg) {
                if (label === target){
                    this.showPlayInfo(key);
                }
            }
           
        })
    }

    protected createChildren():void {
        super.createChildren();
    }
    private _dialogType:string;
    private _back:eui.Button;
    private _enterRoom:eui.Button;
    private _input:eui.TextInput;

    private _firstBuy:eui.ToggleButton;
    private _addMoney:eui.ToggleButton;
    private _addCard:eui.ToggleButton;
    private _addTool:eui.ToggleButton;

    private _hzfcg:eui.ToggleButton;
    private _qphl:eui.ToggleButton;
    private _whhh:eui.ToggleButton;
    private _sm:eui.ToggleButton;

    private _freeRoom:eui.ToggleButton;
    private _busyRoom:eui.ToggleButton;
    private _labelContainer:Array<eui.ToggleButton> = [];
    private _headerMessage:{ shopType: string };
    private _playMessage:{ playType: string };
    private _shopContents:eui.List;
    private _mailContents:eui.List;
    private _myRooms: eui.List;
    private _gameHistory: eui.List;
    private _mailScroller:eui.Scroller;
    private _shopScroller:eui.Scroller;
    private _roomScroller:eui.Scroller;
    private _playScroller:eui.Scroller;
    private _gameHistoryScroller:eui.Scroller;
}

class ShopContentIRUI extends eui.ItemRenderer {
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_main/skins/shopContentIRSkin.exml";
    }

    private uiCompHandler() {
        this._buyTool.addEventListener( egret.TouchEvent.TOUCH_TAP, this.buyToolfunc, this );
        setTimeout(() => {
            this._buyTool.$children[1].text = this._price.text;
        }, 0);
    }
    private buyToolfunc(){
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(encodeURI(`http://101.37.151.85:8008/socket/wx/preOrder?openid=${GameMode.wechatId}&buyNum=1`),egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE,(evt)=>{
            var response = <egret.HttpRequest>evt.currentTarget;
            var res = JSON.parse(response.response);
            wx.chooseWXPay({
                timestamp: res.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符  
                nonceStr: res.nonce_str, // 支付签名随机串，不长于 32 位  
                package: `prepay_id=${res.prepay_id}`, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）  
                signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'  
                paySign: res.sign, // 支付签名  
                success: function (res) {
                    // 支付成功后的回调函数  
                }  
            });  
        },this);
    }
    private _buyTool:eui.Button;
    private _price:eui.Label;
    protected createChildren():void {
        super.createChildren();
    }
}

class MailContentIRUI extends eui.ItemRenderer {
    constructor() {
        super();
        this.skinName = "resource/eui_main/skins/mailContentIRSkin.exml";
    }

    protected createChildren():void {
        super.createChildren();
    }
}

class MyRoomIRUI  extends eui.ItemRenderer {
    constructor() {
        super();
        this.skinName = "resource/eui_main/skins/myRoomIRSkin.exml";
    }

    protected createChildren():void {
        super.createChildren();
    }
}

class GameHistoryIRUI  extends eui.ItemRenderer {
    constructor() {
        super();
        this.skinName = "resource/eui_main/skins/gameHistoryIRSkin.exml";
    }

    protected createChildren():void {
        super.createChildren();
    }
}

interface MailContentType {
    mailIcon: string,
    mailInfo: string,
    opened: boolean,
    remainTime: string,
    date: string
}