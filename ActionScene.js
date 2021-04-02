class ActionScene extends Phaser.Scene {
    floorMap;
    tileset;
    samurai;
    chipsNumber = 6;
    pointer;
    currentTile;
    previousTile;
    players = [0, 1];
    diceResult = 5;
    diceThrow;
    constructor() {
        super('actionScene');
    }

    preload() {
        this.load.image('floorNameInPhaser', './assets/floorTilesTP.png');
        this.load.image('dice', './assets/dice.png');
        this.load.tilemapTiledJSON('mapFromTiled', './assets/floorMapFromTiled2.json');
        this.load.atlas('samurai', './assets/samuraiAtlas128.png', './assets/samuraiAtlas128.json');
    }

    create() {
        this.floorMap = this.make.tilemap({ key: 'mapFromTiled' });
        this.tileset = this.floorMap.addTilesetImage('floorTilesTP', 'floorNameInPhaser');
        this.floorMapLayer = this.floorMap.createLayer('Ground', this.tileset);

        this.samurai = this.physics.add.sprite(350, 600, 'samurai', 'samuraiStanding08.png');
        this.add.text(1700, 1000, "chips: " + this.chipsNumber, {
            fontSize: 32
        });
        this.diceThrow = this.add.image(112, 112, 'dice');
        this.diceThrow.setScale(0.3);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.controlConfig = {
            camera: this.cameras.main,
            left: this.cursors.left,
            right: this.cursors.right,
            up: this.cursors.up,
            down: this.cursors.down,
            speed: 0.5
        };
        this.controls = new Phaser.Cameras.Controls.FixedKeyControl(this.controlConfig);


        this.propertiesText = this.add.text(16, 540, 'Properties: ', {
            fontSize: '18px',
            fill: '#ffffff'
        });
        this.diceThrow.setInteractive();
        this.diceThrow.on('pointerdown', () => {this.physics.add.sprite(250, 600, 'samurai', 'samuraiStanding08.png')});

    }

    update(time, delta) {

        this.controls.update(delta);


        // if (this.cursors.left.isDown) {
        //     this.samurai.setVelocityX(-400);
        // }
        // else if (this.cursors.right.isDown) {
        //     this.samurai.setVelocityX(400);
        // }
        // else {
        //     this.samurai.setVelocityX(0);
        // }

        this.floorMapLayer.forEachTile((tile) => { tile.setAlpha(1) });
        this.worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
        this.pointerTileX = this.floorMap.worldToTileX(this.worldPoint.x);
        this.pointerTileY = this.floorMap.worldToTileY(this.worldPoint.y);

        this.tile = this.floorMap.getTileAt(this.pointerTileX, this.pointerTileY);
        if (this.tile) {
            if (this.pointerTileX === this.tile.x && this.pointerTileY === this.tile.y) {
                this.tile.setAlpha(0.5);
            }
        }


    }

    alphaFunction() {
        this.diceThrow.setScale(0.1);
    }
}