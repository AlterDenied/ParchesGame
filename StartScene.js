class StartScene extends Phaser.Scene {
    titleName;
    startText;
    constructor () {
        super ('startScene');
    }

    preload () {

    }

    create () {
        this.screenWidth = this.game.config.width;
        this.screenHeight = this.game.config.height;
        console.log(this.game.config.width);
        this.titleName = this.add.text(0, this.screenHeight / 4, "Parches", {
            fontSize: 48
        });
        this.titleName.setX(this.screenWidth / 2 - this.titleName.width); 
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