var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DialogTypes = (function () {
    function DialogTypes() {
    }
    DialogTypes.MY = "MY";
    DialogTypes.TOOLS = "TOOLS";
    DialogTypes.ZHANJI = "ZHANJI";
    DialogTypes.NEWS = "NEWS";
    DialogTypes.PLAY = "PLAY";
    DialogTypes.SET = "SET";
    DialogTypes.ENTERROOM = "ENTERROOM";
    return DialogTypes;
}());
__reflect(DialogTypes.prototype, "DialogTypes");
