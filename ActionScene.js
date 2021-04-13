class Samurai extends Phaser.GameObjects.Sprite {

    constructor() {
        super('samurai')
    }
}

class ActionScene extends Phaser.Scene {
    startTileNumber;
    endTileNumber;
    floorMap;
    tileset;
    chipsNumber = 4;
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
    diceResult1 = 6;
    diceResult2 = 3;
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
    ];

    tilesetArray = [
        { number: 0, x: 0, y: 0, anim: 'samuraiWalk' },
        { number: 1, x: 13, y: 15, anim: 'samuraiWalkUp' },
        { number: 2, x: 13, y: 14, anim: 'samuraiWalkUp' },
        { number: 3, x: 13, y: 13, anim: 'samuraiWalkUp', toiletX: 14, toiletY: 13, toiletIn: 'samuraiWalkRight', toiletOut: 'samuraiWalkLeft' },
        { number: 4, x: 13, y: 12, anim: 'samuraiWalkUp' },
        { number: 5, x: 13, y: 11, anim: 'samuraiWalkUp' },
        { number: 6, x: 13, y: 10, anim: 'samuraiWalkUp' },
        { number: 7, x: 13, y: 9, anim: 'samuraiWalkRight' },
        { number: 8, x: 14, y: 9, anim: 'samuraiWalkRight' },
        { number: 9, x: 15, y: 9, anim: 'samuraiWalkRight' },
        { number: 10, x: 16, y: 9, anim: 'samuraiWalkRight', toiletX: 16, toiletY: 10, toiletIn: 'samuraiWalkDown', toiletOut: 'samuraiWalkUp' },
        { number: 11, x: 17, y: 9, anim: 'samuraiWalkRight' },
        { number: 12, x: 18, y: 9, anim: 'samuraiWalkRight' },
        { number: 13, x: 19, y: 9, anim: 'samuraiWalkUp' },
        { number: 14, x: 19, y: 8, anim: 'samuraiWalkUp' },
        { number: 15, x: 19, y: 7, anim: 'samuraiWalkLeft' },
        { number: 16, x: 18, y: 7, anim: 'samuraiWalkLeft' },
        { number: 17, x: 17, y: 7, anim: 'samuraiWalkLeft', toiletX: 17, toiletY: 6, toiletIn: 'samuraiWalkUp', toiletOut: 'samuraiWalkDown' },
        { number: 18, x: 16, y: 7, anim: 'samuraiWalkLeft' },
        { number: 19, x: 15, y: 7, anim: 'samuraiWalkLeft' },
        { number: 20, x: 14, y: 7, anim: 'samuraiWalkLeft' },
        { number: 21, x: 13, y: 7, anim: 'samuraiWalkUp' },
        { number: 22, x: 13, y: 6, anim: 'samuraiWalkUp' },
        { number: 23, x: 13, y: 5, anim: 'samuraiWalkUp' },
        { number: 24, x: 13, y: 4, anim: 'samuraiWalkUp', toiletX: 14, toiletY: 4, toiletIn: 'samuraiWalkRight', toiletOut: 'samuraiWalkLeft' },
        { number: 25, x: 13, y: 3, anim: 'samuraiWalkUp' },
        { number: 26, x: 13, y: 2, anim: 'samuraiWalkUp' },
        { number: 27, x: 13, y: 1, anim: 'samuraiWalkLeft' },
        { number: 28, x: 12, y: 1, anim: 'samuraiWalkLeft' },
        { number: 29, x: 11, y: 1, anim: 'samuraiWalkDown' },
        { number: 30, x: 11, y: 2, anim: 'samuraiWalkDown' },
        { number: 31, x: 11, y: 3, anim: 'samuraiWalkDown', toiletX: 10, toiletY: 3, toiletIn: 'samuraiWalkLeft', toiletOut: 'samuraiWalkRight' },
        { number: 32, x: 11, y: 4, anim: 'samuraiWalkDown' },
        { number: 33, x: 11, y: 5, anim: 'samuraiWalkDown' },
        { number: 34, x: 11, y: 6, anim: 'samuraiWalkDown' },
        { number: 35, x: 11, y: 7, anim: 'samuraiWalkLeft' },
        { number: 36, x: 10, y: 7, anim: 'samuraiWalkLeft' },
        { number: 37, x: 9, y: 7, anim: 'samuraiWalkLeft' },
        { number: 38, x: 8, y: 7, anim: 'samuraiWalkLeft', toiletX: 8, toiletY: 6, toiletIn: 'samuraiWalkUp', toiletOut: 'samuraiWalkDown' },
        { number: 39, x: 7, y: 7, anim: 'samuraiWalkLeft' },
        { number: 40, x: 6, y: 7, anim: 'samuraiWalkLeft' },
        { number: 41, x: 5, y: 7, anim: 'samuraiWalkDown' },
        { number: 42, x: 5, y: 8, anim: 'samuraiWalkDown' },
        { number: 43, x: 5, y: 9, anim: 'samuraiWalkRight' },
        { number: 44, x: 6, y: 9, anim: 'samuraiWalkRight' },
        { number: 45, x: 7, y: 9, anim: 'samuraiWalkRight', toiletX: 7, toiletY: 10, toiletIn: 'samuraiWalkDown', toiletOut: 'samuraiWalkUp' },
        { number: 46, x: 8, y: 9, anim: 'samuraiWalkRight' },
        { number: 47, x: 9, y: 9, anim: 'samuraiWalkRight' },
        { number: 48, x: 10, y: 9, anim: 'samuraiWalkRight' },
        { number: 49, x: 11, y: 9, anim: 'samuraiWalkDown' },
        { number: 50, x: 11, y: 10, anim: 'samuraiWalkDown' },
        { number: 51, x: 11, y: 11, anim: 'samuraiWalkDown' },
        { number: 52, x: 11, y: 12, anim: 'samuraiWalkDown', toiletX: 10, toiletY: 12, toiletIn: 'samuraiWalkLeft', toiletOut: 'samuraiWalkRight' },
        { number: 53, x: 11, y: 13, anim: 'samuraiWalkDown' },
        { number: 54, x: 11, y: 14, anim: 'samuraiWalkDown' },
        { number: 55, x: 11, y: 15, anim: 'samuraiWalkRight' },
        { number: 56, x: 12, y: 15, anim: 'samuraiWalkRight' },
        { number: 57, x: 13, y: 15, anim: 'samuraiWalkUp' },
        { number: 58, x: 13, y: 14, anim: 'samuraiWalkUp' },
        { number: 59, x: 13, y: 13, anim: 'samuraiWalkUp', toiletX: 14, toiletY: 13, toiletIn: 'samuraiWalkRight', toiletOut: 'samuraiWalkLeft' },
        { number: 60, x: 13, y: 12, anim: 'samuraiWalkUp' },
        { number: 61, x: 13, y: 11, anim: 'samuraiWalkUp' },
        { number: 62, x: 13, y: 10, anim: 'samuraiWalkUp' }
    ];

    constructor() {
        super('actionScene');
    }

    preload() {
        this.load.image('floorNameInPhaser', './assets/floorTilesTP.png');
        this.load.image('floorNameAddedInPhaser', './assets/floorTilesAdded.png');
        this.load.image('dice', './assets/dice.png');
        this.load.tilemapTiledJSON('mapFromTiled', './assets/floorMapFromTiled.json');
        this.load.atlas('samurai', './assets/samuraiAtlas.png', './assets/samuraiAtlas.json');
    }

    create() {
        this.createAnimations();
        this.createTileMap();
        this.createSamuraiAtStartGamePhase();

        this.testSamurai = this.add.sprite(300, 300, 'samurai', 'samuraiStanding8.png');
        this.testSamurai.setTint(this.playersTintColors[0].color);

        this.add.text(1700, 1000, "chips: " + this.chipsNumber, {
            fontSize: 32
        });
        this.diceThrow = this.add.image(112, 112, 'dice');
        this.diceThrow.setScale(0.3);
        this.diceThrow.setInteractive();
        this.diceThrow.on('pointerdown', this.doRandomThrow );
        this.playersFigures[0].x -= 128;
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


    createTileMap() {
        this.floorMap = this.make.tilemap({ key: 'mapFromTiled' });
        this.tileset = this.floorMap.addTilesetImage('floorTilesTP', 'floorNameInPhaser');
        this.floorMapLayer = this.floorMap.createLayer('Ground', this.tileset);

    }

    createSamuraiAtStartGamePhase() {
        for (let i = 0; i < this.playersCount; i++) {
            let samurai = this.physics.add.sprite(this.startTiles[i].tileX * 64 + 28, this.startTiles[i].tileY * 64 + 16, 'samurai', 'samuraiStanding8.png');
            samurai.setTint(this.playersTintColors[i].color);
            samurai.colorId = this.playersTintColors[i].color;
            samurai.isSamurai = true;
            samurai.isChosen = false;
            this.playersFigures.push(samurai);
            // this.classSamurai = new Phaser.GameObjects.Sprite (this, 1220, 120, 'samurai', 'samuraiStanding08.png');
            // this.classSamurai.addToDisplayList();
        }
    }

    createAnimations() {
        this.anims.create({
            key: 'samuraiWalkUp',
            frames: this.anims.generateFrameNames('samurai', { start: 1, end: 24, prefix: 'samuraiWalkUp', suffix: '.png' }),
            repeat: -1,
            frameRate: 120
        })

        this.anims.create({
            key: 'samuraiWalkRight',
            frames: this.anims.generateFrameNames('samurai', { start: 1, end: 24, prefix: 'samuraiWalkRight', suffix: '.png' }),
            repeat: -1,
            frameRate: 120
        })

        this.anims.create({
            key: 'samuraiWalkLeft',
            frames: this.anims.generateFrameNames('samurai', { start: 1, end: 24, prefix: 'samuraiWalkLeft', suffix: '.png' }),
            repeat: -1,
            frameRate: 120
        })

        this.anims.create({
            key: 'samuraiWalkDown',
            frames: this.anims.generateFrameNames('samurai', { start: 1, end: 24, prefix: 'samuraiWalkDown', suffix: '.png' }),
            repeat: -1,
            frameRate: 120
        })

        this.anims.create({
            key: 'samuraiStanding',
            frames: this.anims.generateFrameNames('samurai', { start: 4, end: 12, prefix: 'samuraiStanding', suffix: '.png' }),
            repeat: -1,
            repeatDelay: 300,
            yoyo: true
        })
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
                if (this.currentTile) {
                    this.startTileNumber = this.currentTile.properties.number;
                }
            } else {
                samurai.clearAlpha();
            }
        } else {
            samurai.clearAlpha();
            this.hoverCurrentTile();
        }
        if (samurai.isChosen) {
            this.doStartPath(samurai);
        }
    }

    hoverCurrentTile() {
        if (this.currentTile) {
            if (this.pointerTileX === this.currentTile.x && this.pointerTileY === this.currentTile.y) {
                this.currentTile.setAlpha(0.5);
            }
        }
    }

    doStartPath(target) {
        if (target.isChosen) {
            if (this.pointer.rightButtonDown()) {
                if (this.currentTile) {
                    this.endTile = this.currentTile;
                    this.endTileNumber = this.endTile.properties.number;
                    if (this.endTileNumber - this.startTileNumber <= this.diceResult1 && this.endTileNumber > this.startTileNumber) {
                        this.tweenMaker(target, this.endTile, this.endTileNumber);
                    }
                    if (this.startTileNumber > 50 && (this.endTileNumber < 7 && this.endTileNumber !== 0)) {
                        let newLapCheck = this.endTileNumber + 56;
                        if (newLapCheck - this.startTileNumber <= this.diceResult1) {
                            this.tweenMaker(target, this.endTile, newLapCheck);
                        }
                    }
                    target.isChosen = false;
                }
            }
        }
    }

    tweenMaker(tweenTarget, endTile, newLapCheck) {
        let timeline = this.tweens.createTimeline();
        for (let i = this.startTileNumber + 1; i <= newLapCheck; i++) {
            timeline.add({
                targets: tweenTarget,
                x: this.tilesetArray[i].x * 64 + 28,
                y: this.tilesetArray[i].y * 64 + 16,
                duration: 100,
                onStart: () => { tweenTarget.anims.play(this.tilesetArray[i - 1].anim) },
                onComplete: () => { tweenTarget.anims.play(this.tilesetArray[i].anim) }
            });
        }
        if (endTile.properties.toilet) {
            timeline.add({
                targets: tweenTarget,
                x: this.tilesetArray[this.endTileNumber].toiletX * 64 + 28,
                y: this.tilesetArray[this.endTileNumber].toiletY * 64 + 16,
                duration: 100,
                onStart: () => { tweenTarget.anims.play(this.tilesetArray[this.endTileNumber].toiletIn) },
                onComplete: () => { tweenTarget.anims.play('samuraiStanding') }
            });
        }
        timeline.play();
    }

    doRandomThrow () {
        this.diceResult1 = Phaser.Math.Between(1, 6);
        this.diceResult2 = Phaser.Math.Between(1, 6);
    }
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