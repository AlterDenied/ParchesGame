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
    jumpersArray = [{
        id: 'RDJ',
        number: 7,
        x: 13,
        y: 9,
        animBefore: 'samuraiWalkUp',
        animAfter: 'samuraiWalkRight'
    },
    {
        id: 'RUJ',
        number: 21,
        x: 13,
        y: 7,
        animBefore: 'samuraiWalkLeft',
        animAfter: 'samuraiWalkUp'
    },
    {
        id: 'LUJ',
        number: 35,
        x: 11,
        y: 7,
        animBefore: 'samuraiWalkDown',
        animAfter: 'samuraiWalkLeft'
    },
    {
        id: 'LDJ',
        number: 49,
        x: 11,
        y: 9,
        animBefore: 'samuraiWalkRight',
        animAfter: 'samuraiWalkDown'
    }];
    
    tilesetArray = [
        {number: 0, x: 0, y: 0, anim: 'samuraiWalk'},
        {number: 1, x: 13, y: 15, anim: 'samuraiWalkUp'},
        {number: 2, x: 13, y: 14, anim: 'samuraiWalkUp'},
        {number: 3, x: 13, y: 13, anim: 'samuraiWalkUp', toiletX: 14, toiletY: 13, toiletIn: 'samuraiWalkRight', toiletOut: 'samuraiWalkLeft'},
        {number: 4, x: 13, y: 12, anim: 'samuraiWalkUp'},
        {number: 5, x: 13, y: 11, anim: 'samuraiWalkUp'},
        {number: 6, x: 13, y: 10, anim: 'samuraiWalkUp'},
        {number: 7, x: 13, y: 9, anim: 'samuraiWalkRight'},
        {number: 8, x: 14, y: 9, anim: 'samuraiWalkRight'},
        {number: 9, x: 15, y: 9, anim: 'samuraiWalkRight'},
        {number: 10, x: 16, y: 9, anim: 'samuraiWalkRight', toiletX: 16, toiletY: 10, toiletIn: 'samuraiWalkDown', toiletOut: 'samuraiWalkUp'},
        {number: 11, x: 17, y: 9, anim: 'samuraiWalkRight'},
        {number: 12, x: 18, y: 9, anim: 'samuraiWalkRight'},
        {number: 13, x: 19, y: 9, anim: 'samuraiWalkUp'},
        {number: 14, x: 19, y: 8, anim: 'samuraiWalkUp'},
        {number: 15, x: 19, y: 7, anim: 'samuraiWalkLeft'},
        {number: 16, x: 18, y: 7, anim: 'samuraiWalkLeft'},
        {number: 17, x: 17, y: 7, anim: 'samuraiWalkLeft', toiletX: 17, toiletY: 6, toiletIn: 'samuraiWalkUp', toiletOut: 'samuraiWalkDown'},
        {number: 18, x: 16, y: 7, anim: 'samuraiWalkLeft'},
        {number: 19, x: 15, y: 7, anim: 'samuraiWalkLeft'},
        {number: 20, x: 14, y: 7, anim: 'samuraiWalkLeft'},
        {number: 21, x: 13, y: 7, anim: 'samuraiWalkUp'},
        {number: 22, x: 13, y: 6, anim: 'samuraiWalkUp'},
        {number: 23, x: 13, y: 5, anim: 'samuraiWalkUp'},
        {number: 24, x: 13, y: 4, anim: 'samuraiWalkUp', toiletX: 14, toiletY: 4, toiletIn: 'samuraiWalkRight', toiletOut: 'samuraiWalkLeft'},
        {number: 25, x: 13, y: 3, anim: 'samuraiWalkUp'},
        {number: 26, x: 13, y: 2, anim: 'samuraiWalkUp'},
        {number: 27, x: 13, y: 1, anim: 'samuraiWalkLeft'},
        {number: 28, x: 12, y: 1, anim: 'samuraiWalkLeft'},
        {number: 29, x: 11, y: 1, anim: 'samuraiWalkDown'},
        {number: 30, x: 11, y: 2, anim: 'samuraiWalkDown'},
        {number: 31, x: 11, y: 3, anim: 'samuraiWalkDown', toiletX: 10, toiletY: 3, toiletIn: 'samuraiWalkLeft', toiletOut: 'samuraiWalkRight'},
        {number: 32, x: 11, y: 4, anim: 'samuraiWalkDown'},
        {number: 33, x: 11, y: 5, anim: 'samuraiWalkDown'},
        {number: 34, x: 11, y: 6, anim: 'samuraiWalkDown'},
        {number: 35, x: 11, y: 7, anim: 'samuraiWalkLeft'},
        {number: 36, x: 10, y: 7, anim: 'samuraiWalkLeft'},  
        {number: 37, x: 9, y: 7, anim: 'samuraiWalkLeft'},
        {number: 38, x: 8, y: 7, anim: 'samuraiWalkLeft', toiletX: 8, toiletY: 6, toiletIn: 'samuraiWalkUp', toiletOut: 'samuraiWalkDown'},
        {number: 39, x: 7, y: 7, anim: 'samuraiWalkLeft'},
        {number: 40, x: 6, y: 7, anim: 'samuraiWalkLeft'},
        {number: 41, x: 5, y: 7, anim: 'samuraiWalkDown'},
        {number: 42, x: 5, y: 8, anim: 'samuraiWalkDown'},
        {number: 43, x: 5, y: 9, anim: 'samuraiWalkRight'},
        {number: 44, x: 6, y: 9, anim: 'samuraiWalkRight'},
        {number: 45, x: 7, y: 9, anim: 'samuraiWalkRight', toiletX: 7, toiletY: 10, toiletIn: 'samuraiWalkDown', toiletOut: 'samuraiWalkUp'},
        {number: 46, x: 8, y: 9, anim: 'samuraiWalkRight'},
        {number: 47, x: 9, y: 9, anim: 'samuraiWalkRight'},
        {number: 48, x: 10, y: 9, anim: 'samuraiWalkRight'},
        {number: 49, x: 11, y: 9, anim: 'samuraiWalkDown'},
        {number: 50, x: 11, y: 10, anim: 'samuraiWalkDown'},
        {number: 51, x: 11, y: 11, anim: 'samuraiWalkDown'},
        {number: 52, x: 11, y: 12, anim: 'samuraiWalkDown', toiletX: 10, toiletY: 12, toiletIn: 'samuraiWalkLeft', toiletOut: 'samuraiWalkRight'},
        {number: 53, x: 11, y: 13, anim: 'samuraiWalkDown'},
        {number: 54, x: 11, y: 14, anim: 'samuraiWalkDown'},
        {number: 55, x: 11, y: 15, anim: 'samuraiWalkRight'},
        {number: 56, x: 12, y: 15, anim: 'samuraiWalkRight'}
    ];

    //  {jumper: true, number: 101, x: 0, y: 0},
    //  {number: 17, toilet: true, x: 17, y: 6,},
    //  {number: 3, toilet: true, x: 14, y: 13},
    //  {number: 52, toilet: true, x: 10, y: 12},
    //  {number: 10, toilet: true, x: 16, y: 10},
    //  {number: 24, toilet: true, x: 14, y: 4},
    //  {number: 31, toilet: true, x: 10, y: 3},
    //  {number: 45, toilet: true, x: 7, y: 10,},
    //  {number: 38, toilet: true, x: 8, y: 6},
     
     sideAngleTilesArray = [{
         firstSideTileId: 'RST1',
         firstSideTileNumber: 13,
        firstSideTileX: 19,
        firstSideTileY: 9,
        firstSideTileAnimBefore: 'samuraiWalkRight',
        firstSideTileAnimAfter: 'samuraiWalkUp',

        secondSideTileId: 'RST2',
        secondSideTileNumber: 15,
        secondSideTileX: 19,
        secondSideTileY: 7,
        secondSideTileAnimBefore: 'samuraiWalkUp',
        secondSideTileAnimAfter: 'samuraiWalkLeft'
    },
    {
        firstSideTileId: 'UST1',
        firstSideTileNumber: 27,
        firstSideTileX: 13,
        firstSideTileY: 1,
        firstSideTileAnimBefore: 'samuraiWalkUp',
        firstSideTileAnimAfter: 'samuraiWalkLeft',

        secondSideTileId: 'UST2',
        secondSideTileNumber: 29,
        secondSideTileX: 11,
        secondSideTileY: 1,
        secondSideTileAnimBefore: 'samuraiWalkLeft',
        secondSideTileAnimAfter: 'samuraiWalkDown'
    },
    {
        firstSideTileId: 'LST1',
        firstSideTileNumber: 41,
        firstSideTileX: 5,
        firstSideTileY: 7,
        firstSideTileAnimBefore: 'samuraiWalkLeft',
        firstSideTileAnimAfter: 'samuraiWalkDown',

        secondSideTileId: 'LST2',
        secondSideTileNumber: 43,
        secondSideTileX: 5,
        secondSideTileY: 9,
        secondSideTileAnimBefore: 'samuraiWalkDown',
        secondSideTileAnimAfter: 'samuraiWalkRight'
    },
    {
        firstSideTileId: 'DST1',
        firstSideTileNumber: 55,
        firstSideTileX: 11,
        firstSideTileY: 15,
        firstSideTileAnimBefore: 'samuraiWalkDown',
        firstSideTileAnimAfter: 'samuraiWalkRight',

        secondSideTileId: 'DST2',
        secondSideTileNumber: 1,
        secondSideTileX: 13,
        secondSideTileY: 15,
        secondSideTileAnimBefore: 'samuraiWalkRight',
        secondSideTileAnimAfter: 'samuraiWalkUp'
    }];

    constructor() {
        super('actionScene');
    }

    preload() {
        this.load.image('floorNameInPhaser', './assets/floorTilesTP.png');
        this.load.image('dice', './assets/dice.png');
        this.load.tilemapTiledJSON('mapFromTiled', './assets/floorMapFromTiled.json');
        this.load.atlas('samurai', './assets/samuraiAtlas.png', './assets/samuraiAtlas.json');
    }

    create() {
        console.log(this.tilesetArray[12]);
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
        this.diceThrow.on('pointerdown', () => { this.physics.add.sprite(250, 600, 'samurai', 'samuraiStanding8.png') });
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
                    console.log(this.startTileNumber);
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

    doStraightPath(tweenTarget) {
        let tween = this.tweens.add({
            targets: tweenTarget,
            x: this.currentTile.x * 64 + 28,
            y: this.currentTile.y * 64 + 16,
            duration: 10
        });
    }

    checkJumperOrAngleInPath(target) {
        let pathTileNumbers = [];
        for (let i = this.startTileNumber; i <= this.endTileNumber; i++) {
            pathTileNumbers.push(i);
        }
        let straightArray = [];
        for (let i = this.startTileNumber + 1; i < this.endTileNumber; i++) {
            straightArray.push(i);
        }
        let jumperNumbersArray = [7, 21, 35, 49];
        let sideTilesNumbersArray = [13, 15, 27, 29, 41, 43, 55, 1];
        let checkAngles = pathTileNumbers.some(num => jumperNumbersArray.includes(num));
        let checkStraight1 = straightArray.some(num => jumperNumbersArray.includes(num));
        let checkStraight2 = straightArray.some(num => sideTilesNumbersArray.includes(num));
        if (checkAngles) {
            this.checkJumpersDoPath(target);
        }
        let array = [];
        pathTileNumbers.map((num) => {
            if (sideTilesNumbersArray.includes(num)) {
                array.push(num);
            }
        });
        this.checkSideTilesDoPath(target, array);
        
        if (!checkStraight1 && !checkStraight2) {
            this.doStraightPath(target);
        }
    }


    doStartPath(target) {
        if (target.isChosen) {
            if (this.pointer.rightButtonDown()) {
                if (this.currentTile) {
                    this.endTile = this.currentTile;
                    this.endTileNumber = this.endTile.properties.number;
                    console.log(this.endTile);
                }





                // для углов-jumper'ов 

                if (this.endTileNumber - this.startTileNumber <= this.diceResult1 && this.endTileNumber > this.startTileNumber) {


                    // this.checkJumperOrAngleInPath(target);
                    this.tweenMaker(target, this.endTile);








                    // без углов
                }
                target.isChosen = false;
            }
        }

    }

    checkJumpersDoPath(tweenTarget) {
        this.jumpersArray.map((jumper) => {
            if (this.startTileNumber < jumper.number && this.endTileNumber > jumper.number) {

                let timeline = this.tweens.createTimeline({ useFrames: true });

                timeline.add({
                    targets: tweenTarget,
                    x: jumper.x * 64 + 28,
                    y: jumper.y * 64 + 16,
                    duration: 10,
                    onStart: function () { tweenTarget.anims.play(jumper.animBefore) },
                    onComplete: function () { tweenTarget.anims.play(jumper.animAfter) }
                });
                timeline.add({
                    targets: tweenTarget,
                    x: this.currentTile.x * 64 + 28,
                    y: this.currentTile.y * 64 + 16,
                    duration: 10,
                    onComplete: function () { tweenTarget.anims.play('samuraiStanding') }
                });
                timeline.play();
            }

        })
    };

    checkSideTilesDoPath(tweenTarget, array) {
        this.sideAngleTilesArray.map((sideTiles) => {
            let timeline = this.tweens.createTimeline({ useFrames: true });
            if (array.length === 1) {
                if (this.startTileNumber < sideTiles.firstSideTileNumber && this.endTileNumber > sideTiles.firstSideTileNumber) {

                    timeline.add({
                        useFrames: true,
                        targets: tweenTarget,
                        x: sideTiles.firstSideTileX * 64 + 28,
                        y: sideTiles.firstSideTileY * 64 + 16,
                        duration: 10,
                        onStart: function () { tweenTarget.anims.play(sideTiles.firstSideTileAnimBefore) },
                        onComplete: function () { tweenTarget.anims.play(sideTiles.firstSideTileAnimAfter) }
                    });

                    timeline.add({
                        useFrames: true,
                        targets: tweenTarget,
                        x: this.currentTile.x * 64 + 28,
                        y: this.currentTile.y * 64 + 16,
                        duration: 10,
                        onComplete: function () { tweenTarget.anims.play('samuraiStanding') }
                    });
                }

                if (this.startTileNumber >= sideTiles.firstSideTileNumber && this.endTileNumber > sideTiles.secondSideTileNumber) {
                    timeline.add({
                        useFrames: true,
                        targets: tweenTarget,
                        x: sideTiles.secondSideTileX * 64 + 28,
                        y: sideTiles.secondSideTileY * 64 + 16,
                        duration: 10,
                        onStart: function () { tweenTarget.anims.play(sideTiles.secondSideTileAnimBefore) },
                        onComplete: function () { tweenTarget.anims.play(sideTiles.secondSideTileAnimAfter) }
                    });

                    timeline.add({
                        useFrames: true,
                        targets: tweenTarget,
                        x: this.currentTile.x * 64 + 28,
                        y: this.currentTile.y * 64 + 16,
                        duration: 10,
                        onComplete: function () { tweenTarget.anims.play('samuraiStanding') }
                    });
                }
            }

            if (array.length = 2) {

                if (this.endTileNumber > sideTiles.secondSideTileNumber && this.startTileNumber < sideTiles.firstSideTileNumber && sideTiles.secondSideTileNumber >= sideTiles.firstSideTileNumber) {

                    timeline.add({
                        useFrames: true,
                        targets: tweenTarget,
                        x: sideTiles.firstSideTileX * 64 + 28,
                        y: sideTiles.firstSideTileY * 64 + 16,
                        duration: 10,
                        onStart: function () { tweenTarget.anims.play(sideTiles.firstSideTileAnimBefore) },
                        onComplete: function () { tweenTarget.anims.play(sideTiles.firstSideTileAnimAfter) }
                    });

                    timeline.add({
                        useFrames: true,
                        targets: tweenTarget,
                        x: sideTiles.secondSideTileX * 64 + 28,
                        y: sideTiles.secondSideTileY * 64 + 16,
                        duration: 10,
                        onStart: function () { tweenTarget.anims.play(sideTiles.secondSideTileAnimBefore) },
                        onComplete: function () { tweenTarget.anims.play(sideTiles.secondSideTileAnimAfter) }
                    });

                    timeline.add({
                        useFrames: true,
                        targets: tweenTarget,
                        x: this.currentTile.x * 64 + 28,
                        y: this.currentTile.y * 64 + 16,
                        duration: 10,
                        onComplete: function () { tweenTarget.anims.play('samuraiStanding') }
                    });
                }
            }


            // if (this.endTileNumber === 17 && this.endTile.properties.toilet) {
            //     timeline.add({
            //         targets: target,
            //         x: 17 * 64 + 28,
            //         y: 7 * 64 + 16,
            //         duration: 10,
            //         onStart: function () { target.anims.play('samuraiWalkLeft') },
            //         onComplete: function () { target.anims.play('samuraiWalkUp') }
            //     });
            // }



            timeline.play();

        })

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
    tweenMaker (tweenTarget, endTile) {
        let timeline = this.tweens.createTimeline();
        let moveUpArray = [1, 2, 3, 4, 5, 6, 13, 14, 21, 22, 23, 24, 25, 26];
        let moveRightArray = [7, 8, 9, 10, 11, 12, 43, 44, 45, 46, 47, 48, 55, 56];
        let moveDownArray = [29, 30, 31, 32, 33, 34, 41, 42, 49, 50, 51, 52, 53, 54];
        let moveLeftArray = [15, 16, 17, 18, 19, 20, 27, 28, 35, 36, 37, 38, 39, 40];
        for (let i = this.startTileNumber + 1; i <= this.endTileNumber ; i++) {
                timeline.add({
                    targets: tweenTarget,
                    x: this.tilesetArray[i].x * 64 + 28,
                    y: this.tilesetArray[i].y * 64 + 16,
                    duration: 100,
                    onStart:  () => { tweenTarget.anims.play(this.tilesetArray[i - 1].anim) },
                    onComplete:  () => { tweenTarget.anims.play(this.tilesetArray[i].anim) }
                });
            }
            if (endTile.properties.toilet) {
                console.log('fu');
                timeline.add({
                    targets: tweenTarget,
                    x: this.tilesetArray[this.endTileNumber].toiletX * 64 + 28,
                    y: this.tilesetArray[this.endTileNumber].toiletY * 64 + 16,
                    duration: 100,
                    onStart:  () => { tweenTarget.anims.play(this.tilesetArray[this.endTileNumber].toiletIn) },
                    onComplete:  () => { tweenTarget.anims.play('samuraiStanding') }
                });
            }
            timeline.play();
            // if (moveRightArray.includes(i)) {
            //     timeline.add({
            //         useFrames: true,
            //         targets: tweenTarget,
            //         x: tweenTarget.x + 64,
            //         y: tweenTarget.y,
            //         duration: 10,
            //         onStart: function () { tweenTarget.anims.play('samuraiWalkRight') },
            //         onComplete: function () { tweenTarget.anims.play('samuraiWalkRight') }
            //     });
            //     console.log('move right');    
            // }
            // if (moveDownArray.includes(i)) {
            //     timeline.add({
            //         useFrames: true,
            //         targets: tweenTarget,
            //         x: tweenTarget.x,
            //         y: tweenTarget.y + 64,
            //         duration: 10,
            //         onStart: function () { tweenTarget.anims.play('samuraiWalkDown') },
            //         onComplete: function () { tweenTarget.anims.play('samuraiWalkDown') }
            //     });
            //     console.log('move down');    
            // }
            // if (moveLeftArray.includes(i)) {
            //     timeline.add({
            //         useFrames: true,
            //         targets: tweenTarget,
            //         x: tweenTarget.x - 64,
            //         y: tweenTarget.y,
            //         duration: 10,
            //         onStart: function () { tweenTarget.anims.play('samuraiWalkLeft') },
            //         onComplete: function () { tweenTarget.anims.play('samuraiWalkLeft') }
            //     });
            //     console.log('move left');    
            // }
        
        
    }
}

