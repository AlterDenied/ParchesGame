class StartScene extends Phaser.Scene {
    titleName;
    startText;
    constructor () {
        super ('startScene');
    }

    preload () {

    }

    create () {
        this.titleName = this.add.text(400, 250, "Parches", {
            fontSize: 48
        });
        this.titleName.setX(400 - this.titleName.width /2);
        this.startText = this.add.text(400, 550, "Click to start the game", {
            fontSize: 25
        });
        this.startText.setInteractive();
        this.startText.on('pointerdown', this.startActionScene, this)
    }

    update () {
        
    }

    startActionScene () {
        this.scene.start('actionScene');
    }
}