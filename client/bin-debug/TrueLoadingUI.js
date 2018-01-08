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
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var TrueLoadingUI = (function (_super) {
    __extends(TrueLoadingUI, _super);
    function TrueLoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    TrueLoadingUI.prototype.createView = function () {
        this.loadingBg = new eui.Image();
        this.loadingBg.source = "loading-bg_jpg";
        this.addChild(this.loadingBg);
        this.loadingTagBg = new eui.Image();
        this.loadingTagBg.source = "loading-tag-bg_png";
        this.loadingTagBg.x = 224;
        this.loadingTagBg.y = 628;
        this.addChild(this.loadingTagBg);
        this.loadingProgressBg = new eui.Image();
        this.loadingProgressBg.source = "loading-tag-progress_png";
        this.loadingProgressBg.x = 224;
        this.loadingProgressBg.y = 628;
        this.loadingProgressBg.width = 0;
        this.addChild(this.loadingProgressBg);
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 665;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.x = 574;
    };
    TrueLoadingUI.prototype.onProgress = function (current, total) {
        this.loadingProgressBg.width = current * 884 / total;
        this.textField.text = "\u6B63\u5728\u52A0\u8F7D\u4E2D......";
    };
    TrueLoadingUI.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return TrueLoadingUI;
}(egret.Sprite));
__reflect(TrueLoadingUI.prototype, "TrueLoadingUI", ["RES.PromiseTaskReporter"]);
