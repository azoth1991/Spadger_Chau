var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MainScence = (function (_super) {
    __extends(MainScence, _super);
    function MainScence() {
        var _this = _super.call(this) || this;
        _this.skinName = 'resource/eui_main/component/MainScence.exml';
        return _this;
    }
    MainScence.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    MainScence.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return MainScence;
}(eui.Component));
__reflect(MainScence.prototype, "MainScence");
