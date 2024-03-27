class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects || [];
        this.walls = config.walls || {};

        // Lower & upper map parts config
        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;

        this.isCutscenePlaying = false;
    }

    // Draw the map
    drawLowerImage(ctx, camera) {
        ctx.drawImage(
            this.lowerImage,
            utils.withGrid(10.5) - camera.x,
            utils.withGrid(6) - camera.y
            );
    }

    drawUpperImage(ctx, camera) {
        ctx.drawImage(
            this.upperImage,
            utils.withGrid(10.5) - camera.x,
            utils.withGrid(6) - camera.y
            );
    }

    isSpaceTaken(currentX, currentY, direction) {
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountGameObjects() {
        Object.keys(this.gameObjects).forEach(key => {
            let gameObject = this.gameObjects[key];
            gameObject.id = key;
            gameObject.mount(this);
        });
    }

    async startCutScene(events) {
        this.isCutscenePlaying = true;

        // Await each event in loop
        for (let i = 0; i < events.length; i++) {
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this,
            });
            await eventHandler.init();
        }

        this.isCutscenePlaying = false;
    }

    addWall(x, y) {
        this.walls[`${x},${y}`] = true;
    }

    removeWall(x, y) {
        delete this.walls[`${x},${y}`];
    }

    moveWall(pastX, pastY, direction) {
        this.removeWall(pastX, pastY);
        const {x,y} = utils.nextPosition(pastX, pastY, direction);
        this.addWall(x, y);
    }
}

window.OverworldMaps = {
    DemoMap: {
        lowerSrc: "assets/images/maps/testmap.png",
        upperSrc: "assets/images/maps/testmapUpper.png",
        gameObjects: {
        hero: new Person({
            isPlayerControlled: true,
            x: utils.withGrid(5),
            y: utils.withGrid(6),
        }),
        npc: new Person({
            x: utils.withGrid(4),
            y: utils.withGrid(8),
            src: "assets/images/sprites/sprite2.png",
        })
        },
        walls: {
            [utils.asGridCoord(7,8)] : true,
            [utils.asGridCoord(8,8)] : true,
        }
    },
    Park: {
        lowerSrc: "assets/images/maps/park.png",
        upperSrc: "",
        gameObjects: {
        hero: new Person({
            isPlayerControlled: true,
            x: utils.withGrid(9),
            y: utils.withGrid(3),
        }),
        npc: new Person({
            x: utils.withGrid(4),
            y: utils.withGrid(5),
            src: "assets/images/sprites/sprite2.png",
            behaviourLoop: [
                {type: "walk", direction: "right"},
                {type: "walk", direction: "down"},
                {type: "stand", direction: "down", duration: 1000},
                {type: "walk", direction: "left"},
                {type: "walk", direction: "up"},
                {type: "stand", direction: "up", duration: 800},
            ]
        }),
        tree1: new GameObject({
            x: utils.withGrid(4),
            y: utils.withGrid(3),
            src: "assets/images/sprites/tree.png",
        }),
        tree2: new GameObject({
            x: utils.withGrid(14),
            y: utils.withGrid(2),
            src: "assets/images/sprites/tree.png",
        }),
        tree3: new GameObject({
            x: utils.withGrid(7),
            y: utils.withGrid(5),
            src: "assets/images/sprites/tree.png",
        })
        },
        // walls: {
        //     [utils.asGridCoord(7,8)] : true,
        //     [utils.asGridCoord(8,8)] : true,
        // }
    },
    Maze: {
        lowerSrc: "assets/images/maps/maze.png",
        upperSrc: "",
        gameObjects: {
        hero: new Person({
            isPlayerControlled: true,
            x: utils.withGrid(11),
            y: utils.withGrid(22),
        }),
        },
        // walls: {
        //     [utils.asGridCoord(7,8)] : true,
        //     [utils.asGridCoord(8,8)] : true,
        // }
    },
}