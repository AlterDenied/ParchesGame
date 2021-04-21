let config = {
    width: 1920,
    height: 1080,
    mode: Phaser.Scale.FIT,
    parent: 'phaser-example',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    scaleMode: Phaser.Scale.ScaleModes.FIT,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        debug: true,
        gravity: { y: 0 }
    },
    scene: [ActionScene],
    disableContextMenu: true
};

let game = new Phaser.Game(config);


