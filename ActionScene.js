class ActionScene extends Phaser.Scene {
    redCrystal;
    redCrystalLives;
    yellowCrystal;
    yellowCrystalLives;
    blueCrystal;
    blueCrystalLives;
    greenCrystal;
    greenCrystalLives;
    startTile;
    startTileNumber;
    endTileNumber;
    floorMap;
    tileset;
    redChipsOut = 5;
    yellowChipsOut = 5;
    blueChipsOut = 5;
    greenChipsOut = 5;
    players = [
        {
            name: "redPlayer",
            chipsCount: 5
        },
        {
            name: "yellowPlayer",
            chipsCount: 5
        },
        {
            name: "bluePlayer",
            chipsCount: 5
        },
        {
            name: "greenPlayer",
            chipsCount: 5
        }
    ];
    playersCount = 4;
    playersTintColors = [
        {
            name: 'p0',
            color: 0xff3344
        },
        {
            name: 'p1',
            color: 0xffaa33
        },
        {
            name: 'p2',
            color: 0x4477ff
        },
        {
            name: 'p3',
            color: 0x11aa55
        }
    ]
    redFigures = [];
    yellowFigures = [];
    blueFigures = [];
    greenFigures = [];
    enemiesPositions = [];
    alliesPositions = [];
    possibleEndPositions = [];
    victimsPositions = [];
    diceDisplayed1;
    diceDisplayed2;
    diceThrow;
    diceResult1 = 999;
    diceResult2 = 999;
    gameTurns = ["redPlayer", "yellowPlayer", "bluePlayer", "greenPlayer",];
    gamePhases = ['gameStart', 'diceThrow', 'doTurn', 'gameOver'];
    gamePhaseNow = this.gameTurns[0];
    gamePhaseNowDisplayStatus;
    punishButton;
    punishMode = false;
    startTiles = [
        {
            name: 'p0',
            tileX: 13,
            tileY: 16
        },
        {
            name: 'p1',
            tileX: 20,
            tileY: 7
        },
        {
            name: 'p2',
            tileX: 11,
            tileY: 0
        },
        {
            name: 'p3',
            tileX: 4,
            tileY: 9
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
        { number: 62, x: 13, y: 10, anim: 'samuraiWalkUp' },
        { number: 56, x: 13, y: 16, startTile: true },
        { number: 14, x: 20, y: 7, startTile: true },
        { number: 28, x: 11, y: 0, startTile: true },
        { number: 42, x: 4, y: 9, startTile: true }
    ];

    constructor() {
        super('actionScene');
    }

    preload() {
        this.load.image('floorNameInPhaser', './assets/floorTilesTP.png');
        this.load.atlas('UI', './assets/UI_TP.png', './assets/UI_TP.json');
        this.load.atlas('diceRoll', './assets/diceRollingTP.png', './assets/diceRollingTP.json');
        this.load.tilemapTiledJSON('mapFromTiled', './assets/floorMapFromTiled.json');
        this.load.atlas('samurai', './assets/samuraiAtlas.png', './assets/samuraiAtlas.json');
    }


    create() {
        this.createAnimations();
        this.createTileMap();
        this.createSamuraiAtStartGamePhase();

        this.redCrystal = this.add.image(1500, 1000, 'UI', 'redLife.png');
        this.redCrystal.setInteractive();
        this.redCrystal.on('pointerdown', function () { this.createNewSamurai(this.redFigures, this.redChipsOut, 'redPlayer') }, this);
        this.redCrystalLives = this.add.text(this.redCrystal.x + 20, this.redCrystal.y, "x" + this.redChipsOut, { fontSize: '30px' });

        this.yellowCrystal = this.add.image(1600, 1000, 'UI', 'yellowLife.png');
        this.yellowCrystal.setInteractive();
        this.yellowCrystal.on('pointerdown', function () { this.createNewSamurai(this.yellowFigures, this.yellowChipsOut, 'yellowPlayer') }, this);
        this.yellowCrystalLives = this.add.text(this.yellowCrystal.x + 20, this.yellowCrystal.y, "x" + this.yellowChipsOut, { fontSize: '30px' });

        this.blueCrystal = this.add.image(1700, 1000, 'UI', 'blueLife.png');
        this.blueCrystal.setInteractive();
        this.blueCrystal.on('pointerdown', function () { this.createNewSamurai(this.blueFigures, this.blueChipsOut, 'bluePlayer') }, this);
        this.blueCrystalLives = this.add.text(this.blueCrystal.x + 20, this.blueCrystal.y, "x" + this.blueChipsOut, { fontSize: '30px' });

        this.greenCrystal = this.add.image(1800, 1000, 'UI', 'greenLife.png');
        this.greenCrystal.setInteractive();
        this.greenCrystal.on('pointerdown', function () { this.createNewSamurai(this.greenFigures, this.greenChipsOut, 'greenPlayer') }, this);
        this.greenCrystalLives = this.add.text(this.greenCrystal.x + 20, this.greenCrystal.y, "x" + this.greenChipsOut, { fontSize: '30px' });

        this.diceThrow = this.physics.add.sprite(100, 100, 'diceRoll', 'diceRolling73.png');
        this.diceThrow.setInteractive();
        this.diceThrow.on('pointerdown', this.doRandomThrow, this);

        this.gamePhaseNowDisplayStatus = this.add.text(100, 1000, 'Red\'s Turn', { fontSize: 40 });
        this.punishButton = this.physics.add.sprite(100, 300, 'UI', 'punishButton.png');
        this.punishButton.setInteractive();
        this.punishButton.setScale(0.5);
        this.punishButton.on('pointerdown', () => {
            if (this.punishMode) {
                this.punishButton.setTexture('UI', 'punishButton.png');
                this.punishMode = false;
            } else {
                this.punishButton.setTexture('UI', 'punishButtonInvert.png');
                this.punishMode = true;
            }
        }, this);
    }

    update() {

        this.pointer = this.input.activePointer;
        this.worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
        this.pointerTileX = this.floorMap.worldToTileX(this.worldPoint.x);
        this.pointerTileY = this.floorMap.worldToTileY(this.worldPoint.y);
        this.currentTile = this.floorMap.getTileAt(this.pointerTileX, this.pointerTileY);



        this.floorMapLayer.forEachTile((tile) => { tile.setAlpha(1) });


        this.redFigures.map(this.samuraiMapCallback, this);
        this.yellowFigures.map(this.samuraiMapCallback, this);
        this.blueFigures.map(this.samuraiMapCallback, this);
        this.greenFigures.map(this.samuraiMapCallback, this);
        // this.hoverCurrentTile();
    }

    createTileMap() {
        this.floorMap = this.make.tilemap({ key: 'mapFromTiled' });
        this.tileset = this.floorMap.addTilesetImage('floorTilesTP', 'floorNameInPhaser');
        this.floorMapLayer = this.floorMap.createLayer('Ground', this.tileset);

    }

    createAnimations() {
        this.anims.create({
            key: 'samuraiWalkUp',
            frames: this.anims.generateFrameNames('samurai', { start: 1, end: 24, prefix: 'samuraiWalkUp', suffix: '.png' }),
            repeat: -1,
            frameRate: 75
        })

        this.anims.create({
            key: 'samuraiWalkRight',
            frames: this.anims.generateFrameNames('samurai', { start: 1, end: 24, prefix: 'samuraiWalkRight', suffix: '.png' }),
            repeat: -1,
            frameRate: 75
        })

        this.anims.create({
            key: 'samuraiWalkLeft',
            frames: this.anims.generateFrameNames('samurai', { start: 1, end: 24, prefix: 'samuraiWalkLeft', suffix: '.png' }),
            repeat: -1,
            frameRate: 75
        })

        this.anims.create({
            key: 'samuraiWalkDown',
            frames: this.anims.generateFrameNames('samurai', { start: 1, end: 24, prefix: 'samuraiWalkDown', suffix: '.png' }),
            repeat: -1,
            frameRate: 75
        })

        this.anims.create({
            key: 'samuraiDying',
            frames: this.anims.generateFrameNames('samurai', { start: 1, end: 48, prefix: 'samuraiDying', suffix: '.png' }),
            repeat: 0,
            frameRate: 40
        })

        this.anims.create({
            key: 'samuraiReviving',
            frames: this.anims.generateFrameNames('samurai', { start: 48, end: 1, prefix: 'samuraiDying', suffix: '.png' }),
            repeat: 0,
            frameRate: 40
        })

        this.anims.create({
            key: 'samuraiStanding',
            frames: this.anims.generateFrameNames('samurai', { start: 4, end: 12, prefix: 'samuraiStanding', suffix: '.png' }),
            repeat: -1,
            repeatDelay: 4000,
            yoyo: true,
            frameRate: 20
        })

        this.anims.create({
            key: 'diceRollThrow',
            frames: this.anims.generateFrameNames('diceRoll', { start: 1, end: 72, prefix: 'diceRolling', suffix: '.png' }),
            repeat: 0,
            frameRate: 30
        })
    }

    createSamuraiAtStartGamePhase() {
        for (let i = 0; i < this.playersCount; i++) {
            for (let k = 0; k < 5; k++) {
                let samurai = this.physics.add.sprite(this.startTiles[i].tileX * 64 + 28, this.startTiles[i].tileY * 64 + 16, 'samurai', 'samuraiStanding8.png');
                samurai.setTint(this.playersTintColors[i].color);
                samurai.colorId = this.playersTintColors[i].color;
                samurai.teamId = this.players[i].name;
                samurai.isSamurai = true;
                samurai.isChosen = false;
                samurai.isGuilty = false;
                samurai.removeFromDisplayList();
                switch (i) {
                    case 0:
                        samurai.id = "r" + k;
                        this.redFigures.push(samurai);
                        break;
                    case 1:
                        samurai.id = "y" + k;
                        this.yellowFigures.push(samurai);
                        break;
                    case 2:
                        samurai.id = "b" + k;
                        this.blueFigures.push(samurai);
                        break;
                    case 3:
                        samurai.id = "g" + k;
                        this.greenFigures.push(samurai);
                        break;
                }
            }
        }
    }

    createNewSamurai(array, chipsCounter, color) {
        if (chipsCounter === 0) {
        } else {
            this.crystalDecreaser(color);
        }
        for (let i = 0; i < array.length; i++) {
            if (array[i].displayList === null) {
                array[i].addToDisplayList();
                array[i].anims.play('samuraiStanding');
                break;
            }
        }
    }

    samuraiMapCallback(samurai) {
        samurai.setTint(samurai.colorId);
        this.pointer.leftButtonDown();
        samurai.setInteractive();
        let isPointerOverSamurai = this.pointerTileX === Phaser.Math.FloorTo(samurai.x / 64) && this.pointerTileY === Phaser.Math.FloorTo(samurai.y / 64);
        if (isPointerOverSamurai) {
            samurai.setTint(0xffffff);
            if (this.punishMode) {
                if (this.pointer.isDown) {
                    console.log(samurai);
                    if (samurai.isGuilty && !(samurai.displayList === null)) {
                        this.punishChip(samurai);
                    }
                    this.punishMode = false;
                    this.punishButton.setTexture('UI', 'punishButton.png');
                }
            }
            if (samurai.teamId === this.gamePhaseNow && !(samurai.displayList === null) && !this.punishMode) {
                if (this.pointer.isDown) {
                    samurai.isChosen = true;
                    samurai.setAlpha(0.3);
                    if (this.currentTile) {
                        this.startTile = this.currentTile;
                        this.startTileNumber = this.currentTile.properties.number;
                    }
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


    doStartPath(target) {
        if (target.isChosen) {

            if (this.pointer.rightButtonDown()) {
                if (this.currentTile) {
                    this.endTile = this.currentTile;
                    this.endTileNumber = this.endTile.properties.number;
                    this.checkMoveDistance(target);
                    target.isChosen = false;
                }
            }

        }
    }

    checkMoveDistance(target) {
        let moveDistance = this.endTileNumber - this.startTileNumber;
        let emptyResult;
        let newLapCheck = this.endTileNumber + 56;
        if (this.diceResult1 === this.diceResult2) {
            emptyResult = -1;
        } else {
            emptyResult = 0;
        }
        if (this.startTile.properties.jumper && (this.diceResult1 === 1 || this.diceResult2 === 1)) {
            this.moveFromJumperWith1(target, emptyResult, newLapCheck);
        }
        else if (this.startTile.properties.jumper && (this.diceResult1 === 2 || this.diceResult2 === 2)) {
            this.moveFromJumperWith2(target, emptyResult, newLapCheck);
        } else {
            if (moveDistance === this.diceResult1 || moveDistance === this.diceResult2) {
                this.tweenMaker(target, this.endTile, this.endTileNumber);
                if (target.isChosen) {
                    switch (moveDistance) {
                        case this.diceResult1:
                            this.diceResult1 = emptyResult;
                            if (this.diceDisplayed1) {
                                this.diceDisplayed1.setAlpha(0.5);
                            }
                            break;
                        case this.diceResult2:
                            this.diceResult2 = emptyResult;
                            if (this.diceDisplayed2) {
                                this.diceDisplayed2.setAlpha(0.5);
                            }
                            break;
                    }
                }

            }
            if (this.startTileNumber > 50 && (this.endTileNumber < 7 && this.endTileNumber !== 0)) {
                let newLapCheck = this.endTileNumber + 56;
                if (newLapCheck - this.startTileNumber === this.diceResult1 || newLapCheck - this.startTileNumber === this.diceResult2) {
                    this.tweenMaker(target, this.endTile, newLapCheck);
                    moveDistance = newLapCheck - this.startTileNumber;
                    if (target.isChosen) {
                        switch (moveDistance) {
                            case this.diceResult1:
                                this.diceResult1 = emptyResult;
                                if (this.diceDisplayed1) {
                                    this.diceDisplayed1.setAlpha(0.5);
                                }
                                break;
                            case this.diceResult2:
                                this.diceResult2 = emptyResult;
                                if (this.diceDisplayed2) {
                                    this.diceDisplayed2.setAlpha(0.5);
                                }
                                break;
                        }
                    }
                }
            }
        }
        if (this.diceResult1 === 0 && this.diceResult2 === 0) {
            this.takeTurnToNext();
        }
    }

    tweenMaker(tweenTarget, endTile, newLapCheck) {
        this.AllCaseChipCheck(endTile, newLapCheck, tweenTarget);
        if (tweenTarget.isChosen) {
            let timeline = this.tweens.createTimeline();
            let durationMultiple = newLapCheck - this.startTileNumber;
            for (let i = this.startTileNumber + 1; i <= newLapCheck; i++) {
                timeline.add({
                    targets: tweenTarget,
                    x: this.tilesetArray[i].x * 64 + 28,
                    y: this.tilesetArray[i].y * 64 + 16,
                    duration: 200,
                    totalDuration: durationMultiple,
                    onStart: () => { tweenTarget.anims.play(this.tilesetArray[i - 1].anim) },
                    onComplete: () => {
                        if (i === newLapCheck) {
                            tweenTarget.anims.play('samuraiStanding');
                        } else {
                            tweenTarget.anims.play(this.tilesetArray[i].anim);
                        }
                    }
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

    }



    jumperDiceReset(emptyResult, howMuchOnDice) {
        if (this.diceResult1 === howMuchOnDice) {
            this.diceResult1 = emptyResult;
            this.diceDisplayed1.setAlpha(0.5);
        } else {
            if (this.diceResult2 === howMuchOnDice) {
                this.diceResult2 = emptyResult;
                this.diceDisplayed2.setAlpha(0.5);
            }
        }
    }

    moveFromJumperWith1(tweenTarget, emptyResult, newLapCheck) {
        this.AllCaseChipCheck(this.endTile, newLapCheck, tweenTarget);
        switch (this.startTileNumber) {
            case 7:
                if (this.startTileNumber === 7 && this.endTileNumber === 21) {
                    this.tweens.add({
                        targets: tweenTarget,
                        x: 13 * 64 + 28,
                        y: 7 * 64 + 16,
                        duration: 400,
                        onStart: () => { tweenTarget.anims.play('samuraiWalkUp') },
                        onComplete: () => { tweenTarget.anims.play('samuraiStanding') }
                    });
                    this.jumperDiceReset(emptyResult, 1);
                }
            case 21:
                if (this.startTileNumber === 21 && this.endTileNumber === 35) {
                    this.tweens.add({
                        targets: tweenTarget,
                        x: 11 * 64 + 28,
                        y: 7 * 64 + 16,
                        duration: 400,
                        onStart: () => { tweenTarget.anims.play('samuraiWalkLeft') },
                        onComplete: () => { tweenTarget.anims.play('samuraiStanding') }
                    });
                    this.jumperDiceReset(emptyResult, 1);
                }
            case 35:
                if (this.startTileNumber === 35 && this.endTileNumber === 49) {
                    this.tweens.add({
                        targets: tweenTarget,
                        x: 11 * 64 + 28,
                        y: 9 * 64 + 16,
                        duration: 400,
                        onStart: () => { tweenTarget.anims.play('samuraiWalkDown') },
                        onComplete: () => { tweenTarget.anims.play('samuraiStanding') }
                    });
                    this.jumperDiceReset(emptyResult, 1);
                }
            case 49:
                if (this.startTileNumber === 49 && this.endTileNumber === 7) {
                    this.tweens.add({
                        targets: tweenTarget,
                        x: 13 * 64 + 28,
                        y: 9 * 64 + 16,
                        duration: 400,
                        onStart: () => { tweenTarget.anims.play('samuraiWalkRight') },
                        onComplete: () => { tweenTarget.anims.play('samuraiStanding') }
                    });
                    this.jumperDiceReset(emptyResult, 1);
                }
        }
    }

    moveFromJumperWith2(tweenTarget, emptyResult, newLapCheck) {
        this.AllCaseChipCheck(this.endTile, newLapCheck, tweenTarget);
        switch (this.startTileNumber) {
            case 7:
                if (this.startTileNumber === 7 && this.endTileNumber === 35) {
                    this.tweens.add({
                        targets: tweenTarget,
                        t1: 400,
                        duration: 800,
                        onStart: () => { tweenTarget.anims.play('samuraiDying') },
                        onComplete: () => {
                            tweenTarget.anims.play('samuraiReviving');
                            tweenTarget.x = 11 * 64 + 28;
                            tweenTarget.y = 7 * 64 + 16;
                        }
                    });
                    this.jumperDiceReset(emptyResult, 2);
                }
            case 21:
                if (this.startTileNumber === 21 && this.endTileNumber === 49) {
                    this.tweens.add({
                        targets: tweenTarget,
                        t1: 400,
                        duration: 800,
                        onStart: () => { tweenTarget.anims.play('samuraiDying') },
                        onComplete: () => {
                            tweenTarget.anims.play('samuraiReviving');
                            tweenTarget.x = 11 * 64 + 28;
                            tweenTarget.y = 9 * 64 + 16;
                        }
                    });
                    this.jumperDiceReset(emptyResult, 2);
                }
            case 35:
                if (this.startTileNumber === 35 && this.endTileNumber === 7) {
                    this.tweens.add({
                        targets: tweenTarget,
                        t1: 400,
                        duration: 800,
                        onStart: () => { tweenTarget.anims.play('samuraiDying') },
                        onComplete: () => {
                            tweenTarget.anims.play('samuraiReviving');
                            tweenTarget.x = 13 * 64 + 28;
                            tweenTarget.y = 9 * 64 + 16;
                        }
                    });
                    this.jumperDiceReset(emptyResult, 2);
                }
            case 49:
                if (this.startTileNumber === 49 && this.endTileNumber === 21) {
                    this.tweens.add({
                        targets: tweenTarget,
                        t1: 400,
                        duration: 800,
                        onStart: () => { tweenTarget.anims.play('samuraiDying') },
                        onComplete: () => {
                            tweenTarget.anims.play('samuraiReviving');
                            tweenTarget.x = 13 * 64 + 28;
                            tweenTarget.y = 7 * 64 + 16;
                        }
                    });
                    this.jumperDiceReset(emptyResult, 2);
                }
        }
    }





    AllCaseChipCheck(endTile, newLapCheck, tweenTarget) {
        switch (this.gamePhaseNow) {
            case 'redPlayer':
                this.slashChip(this.yellowFigures, endTile, 1);
                this.slashChip(this.blueFigures, endTile, 2);
                this.slashChip(this.greenFigures, endTile, 3);

                this.checkEnemyOnTheWay(this.yellowFigures, newLapCheck, tweenTarget);
                this.checkEnemyOnTheWay(this.blueFigures, newLapCheck, tweenTarget);
                this.checkEnemyOnTheWay(this.greenFigures, newLapCheck, tweenTarget);

                this.checkAllyAtTheWayEnd(this.redFigures, endTile, tweenTarget);
                break;
            case 'yellowPlayer':
                this.slashChip(this.redFigures, endTile, 0);
                this.slashChip(this.blueFigures, endTile, 2);
                this.slashChip(this.greenFigures, endTile, 3);

                this.checkEnemyOnTheWay(this.redFigures, newLapCheck, tweenTarget);
                this.checkEnemyOnTheWay(this.blueFigures, newLapCheck, tweenTarget);
                this.checkEnemyOnTheWay(this.greenFigures, newLapCheck, tweenTarget);

                this.checkAllyAtTheWayEnd(this.yellowFigures, endTile, tweenTarget);
                break;
            case 'bluePlayer':
                this.slashChip(this.redFigures, endTile, 0);
                this.slashChip(this.yellowFigures, endTile, 1);
                this.slashChip(this.greenFigures, endTile, 3);

                this.checkEnemyOnTheWay(this.redFigures, newLapCheck, tweenTarget);
                this.checkEnemyOnTheWay(this.yellowFigures, newLapCheck, tweenTarget);
                this.checkEnemyOnTheWay(this.greenFigures, newLapCheck, tweenTarget);

                this.checkAllyAtTheWayEnd(this.blueFigures, endTile, tweenTarget);
                break;
            case 'greenPlayer':
                this.slashChip(this.redFigures, endTile, 0);
                this.slashChip(this.yellowFigures, endTile, 1);
                this.slashChip(this.blueFigures, endTile, 2);

                this.checkEnemyOnTheWay(this.redFigures, newLapCheck, tweenTarget);
                this.checkEnemyOnTheWay(this.yellowFigures, newLapCheck, tweenTarget);
                this.checkEnemyOnTheWay(this.blueFigures, newLapCheck, tweenTarget);

                this.checkAllyAtTheWayEnd(this.greenFigures, endTile, tweenTarget);
                break;
        }
    }

    punishChip(samurai) {
        let tileIndex;
        switch (samurai.teamId) {
            case 'redPlayer':
                tileIndex = 0;
                break;
            case 'yellowPlayer':
                tileIndex = 1;
                break;
            case 'bluePlayer':
                tileIndex = 2;
                break;
            case 'greenPlayer':
                tileIndex = 3;
                break;
        }
        this.tweens.add({
            targets: samurai,
            duration: 1500,
            t1: 1500,
            onStart: () => {
                samurai.anims.play('samuraiDying');
            },
            onComplete: () => {
                samurai.removeFromDisplayList();
                samurai.x = this.startTiles[tileIndex].tileX * 64 + 28;
                samurai.y = this.startTiles[tileIndex].tileY * 64 + 16;
                this.crystalEncreaser(samurai.teamId);
            }
        });
    }

    slashChip(array, endTile, startTileIndex) {
        array.map(samurai => {
            if (Phaser.Math.FloorTo(samurai.x / 64) === endTile.x && Phaser.Math.FloorTo(samurai.y / 64) === endTile.y) {
                this.tweens.add({
                    targets: samurai,
                    duration: 1500,
                    t1: 1500,
                    onStart: () => {
                        samurai.anims.play('samuraiDying');
                    },
                    onComplete: () => {
                        samurai.removeFromDisplayList();
                        samurai.x = this.startTiles[startTileIndex].tileX * 64 + 28;
                        samurai.y = this.startTiles[startTileIndex].tileY * 64 + 16;
                        this.crystalEncreaser(samurai.teamId);
                    }
                });
            }
        })
    }

    checkAllyAtTheWayEnd(array, endTile, tweenTarget) {
        array.map(samurai => {
            if (Phaser.Math.FloorTo(samurai.x / 64) === endTile.x && Phaser.Math.FloorTo(samurai.y / 64) === endTile.y) {
                tweenTarget.isChosen = false;
            }
        });
    }

    checkEnemyOnTheWay(array, newLapCheck, tweenTarget) {
        array.map(samurai => {
            let isJumper = this.startTile.properties.jumper;
            if (!isJumper || (isJumper && ((this.diceResult1 !== 1 && this.diceResult1 !== 2) && (this.diceResult2 !== 1 && this.diceResult2 !== 2)))) {
                for (let i = this.startTileNumber + 1; i < newLapCheck; i++) {
                    if (Phaser.Math.FloorTo(samurai.x / 64) === this.tilesetArray[i].x && Phaser.Math.FloorTo(samurai.y / 64) === this.tilesetArray[i].y) {
                        tweenTarget.isChosen = false;
                    }
                }
            }
        })
    }

    doRandomThrow() {
        if (this.diceDisplayed2 === undefined && this.diceDisplayed1 === undefined) {
            this.diceResult1 = Phaser.Math.Between(1, 6);
            this.diceResult2 = Phaser.Math.Between(1, 6);
            this.diceThrow.anims.play('diceRollThrow');
            this.displayDiceResult();
        } else {
            this.diceDisplayed2.destroy();
            this.diceDisplayed1.destroy();
            this.diceResult1 = Phaser.Math.Between(1, 6);
            this.diceResult2 = Phaser.Math.Between(1, 6);
            this.diceThrow.anims.play('diceRollThrow');
            this.displayDiceResult();
            switch (this.gamePhaseNow) {
                case 'redPlayer':
                    this.getAllPositionsData(this.redFigures, this.yellowFigures, this.blueFigures, this.greenFigures);
                    break;
                case 'yellowPlayer':
                    this.getAllPositionsData(this.yellowFigures, this.redFigures, this.blueFigures, this.greenFigures);
                    break;
                case 'bluePlayer':
                    this.getAllPositionsData(this.blueFigures, this.redFigures, this.yellowFigures, this.greenFigures);
                    break;
                case 'greenPlayer':
                    this.getAllPositionsData(this.greenFigures, this.redFigures, this.yellowFigures, this.blueFigures);
                    break;
            }
        }
    }

    getAlliesPositions(allyArray, arrayOut) {
        allyArray.map(samurai => {
            if (samurai.displayList !== null) {
                this.tilesetArray.map(tile => {
                    if (tile.x === Phaser.Math.FloorTo(samurai.x / 64) && tile.y === Phaser.Math.FloorTo(samurai.y / 64)) {
                        let samuraiObject = {};
                        samuraiObject.id = samurai.id;
                        samuraiObject.position = tile.number;
                        arrayOut.push(samuraiObject);
                    }
                });
            }
        });
    }

    getAlliesPossibleEndPositions(object) {
        let checkObject = {};
        let d1 = this.diceResult1;
        let d2 = this.diceResult2;
        if (this.diceResult1 < 1) {
            d1 = 0;
        }
        if (this.diceResult2 < 1) {
            d2 = 0;
        }
        let diceSumPlusPosition = object.position + d1 + d2;
        if (diceSumPlusPosition > 56) {
            diceSumPlusPosition -= 56;
        }
        checkObject.id = object.id;
        checkObject.d1Check = object.position + this.diceResult1;
        checkObject.d2Check = object.position + this.diceResult2;
        checkObject.dSumCheck = diceSumPlusPosition;
        this.possibleEndPositions.push(checkObject);
    }

    getAllCurrentEnemiesPosition(enemiesArray, arrayOut) {
        enemiesArray.map(samurai => {
            if (samurai.displayList !== null) {
                this.tilesetArray.map(tile => {
                    if (tile.x === Phaser.Math.FloorTo(samurai.x / 64) && tile.y === Phaser.Math.FloorTo(samurai.y / 64) && !tile.startTile) {
                        let currentTileNumber = tile.number;
                        arrayOut.push(currentTileNumber);
                    }
                });
            }
        })
    }

    getVictims() {
        this.enemiesPositions.map(enemyPos => {
            this.possibleEndPositions.map(posObject => {
                if (enemyPos === posObject.d1Check || enemyPos === posObject.d2Check || enemyPos === posObject.dSumCheck) {
                    let victimObject = {};
                    victimObject.where = enemyPos;
                    victimObject.byWho = posObject.id;
                    this.victimsPositions.push(victimObject);
                }
            });
        })
    }

    getAllPositionsData(allyArray, enemyArray1, enemyArray2, enemyArray3) {
        this.alliesPositions = [];
        this.enemiesPositions = [];
        this.possibleEndPositions = [];
        this.victimsPositions = [];
        allyArray.map(ally => {
            ally.isGuilty = false;
        });
        this.getAlliesPositions(allyArray, this.alliesPositions);
        this.getAllCurrentEnemiesPosition(enemyArray1, this.enemiesPositions);
        this.getAllCurrentEnemiesPosition(enemyArray2, this.enemiesPositions);
        this.getAllCurrentEnemiesPosition(enemyArray3, this.enemiesPositions);
        this.alliesPositions.map(object => { this.getAlliesPossibleEndPositions(object) });
        this.getVictims();
        console.log('allies');
        console.log(this.alliesPositions);
        console.log('enemies');
        console.log(this.enemiesPositions);
        console.log('possibleEndPositions');
        console.log(this.possibleEndPositions);
        if (this.victimsPositions.length > 0) {
            console.log('VICTIMS');
            console.log(this.victimsPositions);
        }
    }

    checkSetGuilt(allyArray, enemyArray1, enemyArray2, enemyArray3) {
        let enemiesPositionsAfterTurn = [];
        this.getAllCurrentEnemiesPosition(enemyArray1, enemiesPositionsAfterTurn);
        this.getAllCurrentEnemiesPosition(enemyArray2, enemiesPositionsAfterTurn);
        this.getAllCurrentEnemiesPosition(enemyArray3, enemiesPositionsAfterTurn);
        this.victimsPositions.map(murder => {
            if (enemiesPositionsAfterTurn.includes(murder.where)) {
                allyArray.map(samurai => {
                    if (samurai.id === murder.byWho) {
                        samurai.isGuilty = true;
                        console.log(samurai.id + ' IS GUILTY!');
                    }
                })
            }
        })
        // let alliesEndPositions = [];
        // this.getAlliesPositions(allyArray, alliesEndPositions);

        // alliesEndPositions.map(ally => {
        //     this.possibleEndPositions.map(posObject => {
        //         if (posObject.id === ally.id) {
        //             if (ally.position !== (posObject.d1Check || posObject.d2Check || posObject.dSumCheck)) {
        //                 allyArray.map(samurai => {
        //                     if (samurai.id === posObject.id) {
        //                         samurai.isGuilty = true;
        //                         console.log(samurai);
        //                     }
        //                 });
        //             }
        //         }
        //     })
        // })
    }

    displayDiceResult() {

        switch (this.diceResult1) {
            case 1:
                this.diceDisplayed1 = this.add.image(1600, 100, 'UI', 'diceEquals1.png');
                break;
            case 2:
                this.diceDisplayed1 = this.add.image(1600, 100, 'UI', 'diceEquals2.png');
                break;
            case 3:
                this.diceDisplayed1 = this.add.image(1600, 100, 'UI', 'diceEquals3.png');
                break;
            case 4:
                this.diceDisplayed1 = this.add.image(1600, 100, 'UI', 'diceEquals4.png');
                break;
            case 5:
                this.diceDisplayed1 = this.add.image(1600, 100, 'UI', 'diceEquals5.png');
                break;
            case 6:
                this.diceDisplayed1 = this.add.image(1600, 100, 'UI', 'diceEquals6.png');
                break;
        }
        switch (this.diceResult2) {
            case 1:
                this.diceDisplayed2 = this.add.image(1800, 100, 'UI', 'diceEquals1.png');
                break;
            case 2:
                this.diceDisplayed2 = this.add.image(1800, 100, 'UI', 'diceEquals2.png');
                break;
            case 3:
                this.diceDisplayed2 = this.add.image(1800, 100, 'UI', 'diceEquals3.png');
                break;
            case 4:
                this.diceDisplayed2 = this.add.image(1800, 100, 'UI', 'diceEquals4.png');
                break;
            case 5:
                this.diceDisplayed2 = this.add.image(1800, 100, 'UI', 'diceEquals5.png');
                break;
            case 6:
                this.diceDisplayed2 = this.add.image(1800, 100, 'UI', 'diceEquals6.png');
                break;
        }
    }

    takeTurnToNext() {
        switch (this.gamePhaseNow) {
            case 'redPlayer':
                this.checkSetGuilt(this.redFigures, this.yellowFigures, this.blueFigures, this.greenFigures);
                this.gamePhaseNow = 'yellowPlayer';
                this.gamePhaseNowDisplayStatus.setText('Yellow\'s Turn');
                break
            case 'yellowPlayer':
                this.checkSetGuilt(this.yellowFigures, this.redFigures, this.blueFigures, this.greenFigures);
                this.gamePhaseNow = 'bluePlayer';
                this.gamePhaseNowDisplayStatus.setText('Blue\'s Turn');
                break
            case 'bluePlayer':
                this.checkSetGuilt(this.blueFigures, this.redFigures, this.yellowFigures, this.greenFigures);
                this.gamePhaseNow = 'greenPlayer';
                this.gamePhaseNowDisplayStatus.setText('Green\'s Turn');
                break
            case 'greenPlayer':
                this.checkSetGuilt(this.greenFigures, this.redFigures, this.yellowFigures, this.blueFigures);
                this.gamePhaseNow = 'redPlayer';
                this.gamePhaseNowDisplayStatus.setText('Red\'s Turn');
                break
        }
    }

    crystalDecreaser(color) {
        switch (color) {
            case 'redPlayer':
                this.redChipsOut--;
                this.redCrystalLives.setText("x" + this.redChipsOut);
                break;
            case 'yellowPlayer':
                this.yellowChipsOut--;
                this.yellowCrystalLives.setText("x" + this.yellowChipsOut);
                break;
            case 'bluePlayer':
                this.blueChipsOut--;
                this.blueCrystalLives.setText("x" + this.blueChipsOut);
                break;
            case 'greenPlayer':
                this.greenChipsOut--;
                this.greenCrystalLives.setText("x" + this.greenChipsOut);
                break;
        }
    }

    crystalEncreaser(color) {
        switch (color) {
            case 'redPlayer':
                this.redChipsOut += 1;
                this.redCrystalLives.setText("x" + this.redChipsOut);
                break;
            case 'yellowPlayer':
                this.yellowChipsOut += 1;
                this.yellowCrystalLives.setText("x" + this.yellowChipsOut);
                break;
            case 'bluePlayer':
                this.blueChipsOut += 1;
                this.blueCrystalLives.setText("x" + this.blueChipsOut);
                break;
            case 'greenPlayer':
                this.greenChipsOut += 1;
                this.greenCrystalLives.setText("x" + this.greenChipsOut);
                break;
        }
    }

    hoverCurrentTile() {
        if (this.currentTile) {
            if (this.pointerTileX === this.currentTile.x && this.pointerTileY === this.currentTile.y) {
                this.currentTile.setAlpha(0.5);
            }
        }
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