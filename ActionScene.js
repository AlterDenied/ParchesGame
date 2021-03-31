class ActionScene extends Phaser.Scene {
    gameText;
    floorTile;
    constructor() {
        super('actionScene');
    }

    preload() {
        this.load.image('floorNameInPhaser', './assets/floor.png');
        this.load.tilemapTiledJSON('mapFromTiled', './assets/floorMapFromTiled.json');
    }

    create() {
        this.floorMap = this.make.tilemap({ key: 'mapFromTiled'});
        this.tileset = this.floorMap.addTilesetImage('floor', 'floorNameInPhaser');

        this.floorMap.createLayer('Ground', this.tileset);
    }

    update() {

    }
}