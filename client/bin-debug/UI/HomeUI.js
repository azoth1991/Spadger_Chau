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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var HomeUI = (function (_super) {
    __extends(HomeUI, _super);
    function HomeUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/eui_main/homeSkin.exml";
        return _this;
    }
    HomeUI.prototype.uiCompHandler = function () {
        // header
        this.imgBg.source = "bg_jpg";
        // this._mainUI = new MainUI();
        // this._uiFocused = this._mainUI;
        // this.addChild(this._uiFocused);
    };
    HomeUI.prototype.handleRouter = function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            var trueLoadingUI, _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('hanldeRouter=>', evt.data);
                        this._pageName = evt.data.type;
                        trueLoadingUI = new TrueLoadingUI();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 18, , 19]);
                        _a = this._pageName;
                        switch (_a) {
                            case GamePages.CREATE_ROOM: return [3 /*break*/, 2];
                            case GamePages.DIALOG: return [3 /*break*/, 6];
                            case GamePages.RELOAD: return [3 /*break*/, 10];
                        }
                        return [3 /*break*/, 14];
                    case 2: return [4 /*yield*/, this.addChild(trueLoadingUI)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, RES.loadGroup("game", 0, trueLoadingUI)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.removeChild(trueLoadingUI)];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 14];
                    case 6: return [4 /*yield*/, this.addChild(trueLoadingUI)];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, RES.loadGroup("dialog", 0, trueLoadingUI)];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, this.removeChild(trueLoadingUI)];
                    case 9:
                        _b.sent();
                        return [3 /*break*/, 14];
                    case 10: return [4 /*yield*/, this.addChild(trueLoadingUI)];
                    case 11:
                        _b.sent();
                        return [4 /*yield*/, RES.loadGroup("game", 0, trueLoadingUI)];
                    case 12:
                        _b.sent();
                        return [4 /*yield*/, this.removeChild(trueLoadingUI)];
                    case 13:
                        _b.sent();
                        _b.label = 14;
                    case 14: 
                    // await this.pageReadyHandler( this._pageName, evt.data );  
                    return [4 /*yield*/, MessageCenter.getInstance().sendMessage(GameEvents.pageReadyHandler, { type: this._pageName, data: evt.data })];
                    case 15:
                        // await this.pageReadyHandler( this._pageName, evt.data );  
                        _b.sent();
                        if (!(this._pageName == GamePages.RELOAD)) return [3 /*break*/, 17];
                        return [4 /*yield*/, MessageCenter.getInstance().sendMessage(MessageCenter.GAME_START, evt.data.cards)];
                    case 16:
                        _b.sent();
                        _b.label = 17;
                    case 17: return [3 /*break*/, 19];
                    case 18:
                        e_1 = _b.sent();
                        console.error(e_1);
                        return [3 /*break*/, 19];
                    case 19: return [2 /*return*/];
                }
            });
        });
    };
    HomeUI.prototype.handleDialog = function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            var trueLoadingUI, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._dialogName = evt.data.type;
                        trueLoadingUI = new TrueLoadingUI();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.addChild(trueLoadingUI)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("dialog", 0, trueLoadingUI)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.removeChild(trueLoadingUI)];
                    case 4:
                        _a.sent();
                        // await this.pageReadyHandler( GamePages.DIALOG, evt.data );   
                        MessageCenter.getInstance().sendMessage(GameEvents.pageReadyHandler, { type: GamePages.DIALOG, data: evt.data });
                        return [3 /*break*/, 6];
                    case 5:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // public pageReadyHandler( pageName:string,data:any ):void{
    //     console.log('router ===>', pageName);
    //     this.removeChild(this._uiFocused);
    //     switch ( pageName ){
    //         case GamePages.CREATE_ROOM:
    //             this._gameUI = new GameUI(data.id);
    //             this.imgBg.source = 'game_bg_jpg';
    //             this._uiFocused = this._gameUI;
    //             break;
    //         case GamePages.MY_ROOM:
    //             break;
    //         case GamePages.DIALOG:
    //             this._dialogUI = new DialogUI(data);
    //             this.imgBg.source = 'dialog-bg_jpg';
    //             this._uiFocused = this._dialogUI;
    //             break;
    //         case GamePages.BACK_HOME:
    //             this.imgBg.source = 'bg_jpg';            
    //             this._uiFocused = this._mainUI;
    //             break;
    //     }
    //     this.addChild(this._uiFocused);
    // }
    HomeUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return HomeUI;
}(eui.Component));
__reflect(HomeUI.prototype, "HomeUI");
