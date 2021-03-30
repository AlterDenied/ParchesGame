class ActionScene extends Phaser.Scene {
    gameText;
    constructor () {
        super ('actionScene');
    }
    
    preload () {

    }

    create () {
        this.gameText = this.add.text(50, 50, "Here is the game", {
            fontSize: 25
        });
    }
}