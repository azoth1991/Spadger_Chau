class GameSound extends egret.DisplayObjectContainer {
    public static _clickSound:egret.Sound;
    public static _bgm:egret.Sound;
    public static _bgmSoundChannel: egret.SoundChannel;
    static playClickSound() {
        GameMode.soundEffectSwitch && this._clickSound.play(0, 1);
    }

    static playBGM() {
        if (GameMode.bgmSwitch) {
            this._bgmSoundChannel = this._bgm.play(5);            
        }
    }
    static stopBGM() {
        if (this._bgmSoundChannel) {
            this._bgmSoundChannel.stop();
            this._bgmSoundChannel = null;
        }
    }
}