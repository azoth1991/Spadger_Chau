//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        GameMode.wechatId = this.getUrlParam('wechatId');
        // 获取用户信息
        this.getUser();
        // wx
        this.getWx();
        // 获取账户信息
        this.getAccount();
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);
    }
    private getUser() {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(encodeURI(`http://101.37.151.85:8008/socket/getWXInfo?openid=${GameMode.wechatId}`),egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE,(evt)=>{
            var response = <egret.HttpRequest>evt.currentTarget;
            var res = JSON.parse(response.response);
            if (res.code == 1) {
                console.log('userinfo',res.result);
                GameMode.userInfo = res.result;
            } else {
                alert('请在微信中打开')
            }
        },this);
    }
    private getWx(){
        var request2 = new egret.HttpRequest();
        request2.responseType = egret.HttpResponseType.TEXT;
        request2.open(encodeURI(`http://101.37.151.85:8008/socket/getWXSign?url=${encodeURIComponent(window.location.href)}`),egret.HttpMethod.GET);
        request2.send();
        request2.addEventListener(egret.Event.COMPLETE,(evt)=>{
            var response = <egret.HttpRequest>evt.currentTarget;
            var res = JSON.parse(response.response);
            if (res.code == 1) {
                console.log('wxconfig',res.result);
                // res = {
                //     "code": 1,
                //     "more": null,
                //     "result": {
                //         "id": 0,
                //         "appId": "wx49be95151bbf5a65",
                //         "timeStamp": 1522772821,
                //         "nonceStr": "bmmn30q50lnb3ai0hlxlsco4zwytgrao",
                //         "signature": "243ed492bf20f61066d6d6c2cf6e151e5414fc33"
                //     }
                // };
                wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.result.appId, // 必填，公众号的唯一标识
                    timestamp: res.result.timeStamp, // 必填，生成签名的时间戳
                    nonceStr: res.result.nonceStr, // 必填，生成签名的随机串
                    signature: res.result.signature,// 必填，签名
                    jsApiList: ['chooseWXPay','startRecord','stopRecord','playVoice','uploadVoice'] // 必填，需要使用的JS接口列表
                });
                
            } else {
                alert('请在微信中打开')
            }
        },this);
    }

    private getAccount(){
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(encodeURI(`http://101.37.151.85:8008/socket/queryAccount?wechatId=${GameMode.wechatId}`),egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE,(evt)=>{
            var response = <egret.HttpRequest>evt.currentTarget;
            var res = JSON.parse(response.response);
            if (res.code == 1) {
                console.log('accountinfo',res.result);
                GameMode.accountInfo = res.result;
            } else {
                alert('请在微信中打开')
            }
        },this);
    }
    private getUrlParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        // if (r!=null) return unescape(r[2]);
        if (r!=null) return r[2];
        return null;
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            const trueLoadingUI = new TrueLoadingUI();
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("loading", 0, loadingView);            
            await this.stage.removeChild(loadingView);
            await this.stage.addChild(trueLoadingUI);
            await RES.loadGroup("preload", 0, trueLoadingUI);
            this.stage.removeChild(trueLoadingUI);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);
        })
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    private homeUI:HomeUI;
    private _mainLogic:MainLogic;
    protected createGameScene(): void {
        this._mainLogic = new MainLogic();
        this._mainLogic.start(this);
    }

}
