class Samurai extends Phaser.GameObjects.Sprite {

    constructor() {
        super('samurai')
    }
}

class ActionScene extends Phaser.Scene {
    floorMap;
    tileset;
    chipsNumber = 6;
    players = [0, 1, 2, 3];
    playerNow;
    playersCount = 4;
    playersTintColors = [
        {
            name: 'p0',
            color: 0xff3344
        },
        {
            name: 'p1',
            color: 0x11aa55
        },
        {
            name: 'p2',
            color: 0x4477ff
        },
        {
            name: 'p3',
            color: 0xffaa33
        }
    ]
    playersFigures = [];
    diceThrow;
    diceResult;
    gamePhases = ['gameStart', 'diceThrow', 'doTurn', 'gameOver'];
    gamePhaseNow;
    startTiles = [
        {
            name: 'p0',
            tileX: 14,
            tileY: 15
        },
        {
            name: 'p1',
            tileX: 5,
            tileY: 10
        },
        {
            name: 'p2',
            tileX: 10,
            tileY: 1
        },
        {
            name: 'p3',
            tileX: 19,
            tileY: 6
        }
    ]
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
        this.createTileMap();
        this.createSamuraiAtStartGamePhase();

        this.testSamurai = this.add.sprite(300, 300, 'samurai', 'samuraiStanding08.png');
        this.testSamurai.setTint(this.playersTintColors[0].color);

        this.add.text(1700, 1000, "chips: " + this.chipsNumber, {
            fontSize: 32
        });
        this.diceThrow = this.add.image(112, 112, 'dice');
        this.diceThrow.setScale(0.3);
        this.diceThrow.setInteractive();
        this.diceThrow.on('pointerdown', () => { this.physics.add.sprite(250, 600, 'samurai', 'samuraiStanding08.png') });
        console.log(this.playersFigures);
        this.playersFigures[0].x -= 64;
    }

    update() {
        this.pointer = this.input.activePointer;
        this.worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
        this.pointerTileX = this.floorMap.worldToTileX(this.worldPoint.x);
        this.pointerTileY = this.floorMap.worldToTileY(this.worldPoint.y);
        this.currentTile = this.floorMap.getTileAt(this.pointerTileX, this.pointerTileY);

        this.floorMapLayer.forEachTile((tile) => { tile.setAlpha(1) });

        this.playersFigures.map(this.samuraiMapCallback, this);
        // this.hoverCurrentTile();
    }


    createTileMap () {
        this.floorMap = this.make.tilemap({ key: 'mapFromTiled' });
        this.tileset = this.floorMap.addTilesetImage('floorTilesTP', 'floorNameInPhaser');
        this.floorMapLayer = this.floorMap.createLayer('Ground', this.tileset);
    }

    createSamuraiAtStartGamePhase () {
        for (let i = 0; i < this.playersCount; i++) {
            let samurai = this.physics.add.sprite(this.startTiles[i].tileX * 64 + 28, this.startTiles[i].tileY * 64 + 16, 'samurai', 'samuraiStanding08.png');
            samurai.setTint(this.playersTintColors[i].color);
            samurai.colorId = this.playersTintColors[i].color;
            samurai.isSamurai = true;
            samurai.isChosen = false;
            this.playersFigures.push(samurai);
            // this.classSamurai = new Phaser.GameObjects.Sprite (this, 1220, 120, 'samurai', 'samuraiStanding08.png');
            // this.classSamurai.addToDisplayList();
        }
    }

    samuraiMapCallback(samurai) {
        samurai.setTint(samurai.colorId); 
        this.pointer.leftButtonDown();   
        samurai.setInteractive();
        
        let isPointerOverSamurai = this.pointerTileX === Phaser.Math.FloorTo(samurai.x / 64) && this.pointerTileY === Phaser.Math.FloorTo(samurai.y / 64);
        if (isPointerOverSamurai) {
            samurai.setTint(0xffffff);
            if (this.pointer.isDown) {
                samurai.isChosen = true;
                samurai.setAlpha(0.3);
            } else {
                samurai.clearAlpha();
            }
        } else {
            samurai.clearAlpha();
            this.hoverCurrentTile();
        }
    }

    hoverCurrentTile() {
        if (this.currentTile) {
            if (this.pointerTileX === this.currentTile.x && this.pointerTileY === this.currentTile.y) {
                this.currentTile.setAlpha(0.5);
            }
        }
    }

    doPath (target) {
        
    }
    // this.cursors = this.input.keyboard.createCursorKeys();
    // this.controlConfig = {
    //     camera: this.cameras.main,
    //     left: this.cursors.left,
    //     right: this.cursors.right,
    //     up: this.cursors.up,
    //     down: this.cursors.down,
    //     speed: 0.5
    // };
    // this.controls = new Phaser.Cameras.Controls.FixedKeyControl(this.controlConfig);
}