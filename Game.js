let config = {
    width: 800, 
    height: 600,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        debug: false,
        gravity: {y: 0}
    },
    scene: [StartScene, ActionScene]
};

let game = new Phaser.Game(config);