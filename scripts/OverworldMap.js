class OverworldMap {
    constructor(config) {
        this.overworld = null
        this.gameObjects = config.gameObjects || [];
        this.walls = config.walls || {};
        this.cutSceneSpaces = config.cutSceneSpaces || {};

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

        // Start NPC behaviour loop
        Object.values(this.gameObjects).forEach(gameObject => {
            gameObject.doBehaviourEvent(this);
        });
    }

    checkCutSceneSpace() {
        const hero = this.gameObjects.hero;
        const match = this.cutSceneSpaces[`${hero.x},${hero.y}`];
        if(!this.isCutscenePlaying && match) {
            this.startCutScene(match.events);
        }
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

const mazeWalls = [[-1,21], [1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[13,1],[14,1],[15,1],[16,1],[17,1],[18,1],[19,1],[20,1],[21,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9],[0,10],[0,11],[0,12],[0,13],[0,14],[0,15],[0,16],[0,17],[0,18],[0,19],[0,20],[0,22],[22,2],[22,3],[22,4],[22,5],[22,6],[22,7],[23,8],[22,9],[22,10],[22,11],[22,12],[22,13],[22,14],[22,15],[22,16],[22,17],[22,18],[22,19],[22,20],[22,21],[22,22],[1,23],[2,23],[3,23],[4,23],[5,23],[6,23],[7,23],[8,23],[9,23],[10,23],[11,23],[12,23],[13,23],[14,23],[15,23],[16,23],[17,23],[18,23],[19,23],[20,23],[21,23],[1, 3], [2, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [10, 3], [11, 3], [12, 3], [14, 3], [15, 3], [16, 3], [4, 4], [10, 4], [14, 4], [2, 5], [3, 5], [5, 5], [6, 5], [8, 5], [9, 5], [10, 5], [12, 5], [13, 5], [14, 5], [19, 5], [20, 5], [6, 6], [8, 6], [12, 6], [14, 6], [20, 6], [2, 7], [3, 7], [4, 7], [6, 7], [8, 7], [10, 7], [11, 7], [12, 7], [14, 7], [15, 7], [16, 7], [17, 7], [18, 7], [20, 7], [21, 7], [4, 8], [6, 8], [8, 8], [18, 8], [4, 9], [6, 9], [7, 9], [8, 9], [10, 9], [11, 9], [12, 9], [14, 9], [15, 9], [16, 9], [18, 9], [19, 9], [20, 9], [4, 10], [10, 10], [16, 10], [20, 10], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [10, 11], [16, 11], [17, 11], [18, 11], [20, 11], [2, 12], [8, 12], [18, 12], [20, 12], [2, 13], [8, 13], [10, 13], [12, 13], [13, 13], [14, 13], [16, 13], [18, 13], [20, 13], [2, 14], [10, 14], [12, 14], [16, 14], [18, 14], [20, 14], [2, 15], [6, 15], [7, 15], [8, 15], [10, 15], [11, 15], [12, 15], [16, 15], [18, 15], [19, 15], [20, 15], [6, 16], [10, 16], [16, 16], [20, 16], [1, 17], [2, 17], [3, 17], [5, 17], [6, 17], [9, 17], [10, 17], [12, 17], [13, 17], [16, 17], [17, 17], [18, 17], [20, 17], [21, 17], [8, 18], [12, 18], [16, 18], [18, 18], [2, 19], [3, 19], [4, 19], [5, 19], [6, 19], [7, 19], [8, 19], [10, 19], [11, 19], [12, 19], [14, 19], [15, 19], [16, 19], [18, 19], [20, 19], [10, 20], [12, 20], [14, 20], [20, 20], [2, 21], [3, 21], [4, 21], [8, 21], [9, 21], [10, 21], [12, 21], [14, 21], [16, 21], [17, 21], [18, 21], [20, 21]
];

const walls = {};

// Iterate over the array and set values in walls object
mazeWalls.forEach(coord => {
    const [x, y] = coord;
    walls[utils.asGridCoord(x, y)] = true;
});

window.OverworldMaps = {
    Park: {
        lowerSrc: "assets/images/maps/park.png",
        upperSrc: "",
        gameObjects: {
        hero: new Person({
            isPlayerControlled: true,
            x: utils.withGrid(9),
            y: utils.withGrid(2),
        }),
        npc: new Person({
            x: utils.withGrid(5),
            y: utils.withGrid(4),
            src: "assets/images/sprites/sprite2.png",
            behaviourLoop: [
                {type: "walk", direction: "left"},
                {type: "walk", direction: "left"},
                {type: "stand", direction: "down", duration: 1500},
                {type: "walk", direction: "down"},
                {type: "stand", direction: "down", duration: 1500},
                {type: "walk", direction: "right"},
                {type: "walk", direction: "right"},
                {type: "walk", direction: "up"},
                {type: "stand", direction: "up", duration: 1300},
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
            x: utils.withGrid(12),
            y: utils.withGrid(5),
            src: "assets/images/sprites/tree.png",
        })
        },
        cutSceneSpaces: {
            [utils.asGridCoord(16,5)] : {
                events: [
                    {type: "changeMap", map: "Maze"}
                ],
            },
        },
        walls: {
            [utils.asGridCoord(3,2)] : true,
            [utils.asGridCoord(4,2)] : true,
            [utils.asGridCoord(5,2)] : true,
            [utils.asGridCoord(6,2)] : true,
            [utils.asGridCoord(15,2)] : true,
            [utils.asGridCoord(7,1)] : true,
            [utils.asGridCoord(8,1)] : true,
            [utils.asGridCoord(9,1)] : true,
            [utils.asGridCoord(10,1)] : true,
            [utils.asGridCoord(11,1)] : true,
            [utils.asGridCoord(12,1)] : true,
            [utils.asGridCoord(13,1)] : true,
            [utils.asGridCoord(14,1)] : true,
            [utils.asGridCoord(2,3)] : true,
            [utils.asGridCoord(16,3)] : true,
            [utils.asGridCoord(2,4)] : true,
            [utils.asGridCoord(16,4)] : true,
            [utils.asGridCoord(2,5)] : true,
            [utils.asGridCoord(17,5)] : true,
            [utils.asGridCoord(2,6)] : true,
            [utils.asGridCoord(16,6)] : true,
            [utils.asGridCoord(2,7)] : true,
            [utils.asGridCoord(16,7)] : true,
            [utils.asGridCoord(3,7)] : true,
            [utils.asGridCoord(4,7)] : true,
            [utils.asGridCoord(5,7)] : true,
            [utils.asGridCoord(6,7)] : true,
            [utils.asGridCoord(7,7)] : true,
            [utils.asGridCoord(8,7)] : true,
            [utils.asGridCoord(9,7)] : true,
            [utils.asGridCoord(10,7)] : true,
            [utils.asGridCoord(11,7)] : true,
            [utils.asGridCoord(12,7)] : true,
            [utils.asGridCoord(13,7)] : true,
            [utils.asGridCoord(14,7)] : true,
            [utils.asGridCoord(15,7)] : true,

        }
    },
    Maze: {
        lowerSrc: "assets/images/maps/maze.png",
        upperSrc: "",
        gameObjects: {
        hero: new Person({
            isPlayerControlled: true,
            x: utils.withGrid(0),
            y: utils.withGrid(21),
        }),
        tree1: new GameObject({
            x: utils.withGrid(12),
            y: utils.withGrid(2),
            src: "assets/images/sprites/tree.png",
        }),
        tree2: new GameObject({
            x: utils.withGrid(20),
            y: utils.withGrid(2),
            src: "assets/images/sprites/tree.png",
        }),
        tree3: new GameObject({
            x: utils.withGrid(4),
            y: utils.withGrid(5),
            src: "assets/images/sprites/tree.png",
        }),
        tree4: new GameObject({
            x: utils.withGrid(18),
            y: utils.withGrid(5),
            src: "assets/images/sprites/tree.png",
        }),
        tree5: new GameObject({
            x: utils.withGrid(9),
            y: utils.withGrid(9),
            src: "assets/images/sprites/tree.png",
        }),
        tree6: new GameObject({
            x: utils.withGrid(14),
            y: utils.withGrid(10),
            src: "assets/images/sprites/tree.png",
        }),
        tree7: new GameObject({
            x: utils.withGrid(12),
            y: utils.withGrid(12),
            src: "assets/images/sprites/tree.png",
        }),
        tree8: new GameObject({
            x: utils.withGrid(4),
            y: utils.withGrid(13),
            src: "assets/images/sprites/tree.png",
        }),
        tree9: new GameObject({
            x: utils.withGrid(4),
            y: utils.withGrid(17),
            src: "assets/images/sprites/tree.png",
        }),
        tree10: new GameObject({
            x: utils.withGrid(8),
            y: utils.withGrid(17),
            src: "assets/images/sprites/tree.png",
        }),
        tree11: new GameObject({
            x: utils.withGrid(14),
            y: utils.withGrid(17),
            src: "assets/images/sprites/tree.png",
        }),
        tree12: new GameObject({
            x: utils.withGrid(19),
            y: utils.withGrid(19),
            src: "assets/images/sprites/tree.png",
        }),
        tree13: new GameObject({
            x: utils.withGrid(6),
            y: utils.withGrid(21),
            src: "assets/images/sprites/tree.png",
        }),
        tree14: new GameObject({
            x: utils.withGrid(14),
            y: utils.withGrid(22),
            src: "assets/images/sprites/tree.png",
        })
        },
        cutSceneSpaces: {
            [utils.asGridCoord(22,8)] : {
                events: [
                    {type: "changeMap", map: "ParkEnd"}
                ],
            },
        },
        walls: walls
    },
    ParkEnd: {
        lowerSrc: "assets/images/maps/park.png",
        upperSrc: "",
        gameObjects: {
        hero: new Person({
            isPlayerControlled: true,
            x: utils.withGrid(9),
            y: utils.withGrid(2),
        }),
        npc: new Person({
            x: utils.withGrid(6),
            y: utils.withGrid(4),
            src: "assets/images/sprites/sprite2.png",
            behaviourLoop: [
                {type: "walk", direction: "left"},
                {type: "walk", direction: "left"},
                {type: "stand", direction: "down", duration: 1500},
                {type: "walk", direction: "down"},
                {type: "stand", direction: "down", duration: 1500},
                {type: "walk", direction: "right"},
                {type: "walk", direction: "right"},
                {type: "walk", direction: "up"},
                {type: "stand", direction: "up", duration: 1300},
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
            x: utils.withGrid(12),
            y: utils.withGrid(5),
            src: "assets/images/sprites/tree.png",
        })
        },
        cutSceneSpaces: {
            [utils.asGridCoord(16,5)] : {
                events: [
                    {type: "changeMap", map: "Maze"}
                ],
            },
            [utils.asGridCoord(9,3)] : {
                events: [
                    {who: "npc", type: "stand", direction: "right", duration: 500},
                    {who: "hero", type: "stand", direction: "left", duration: 500},
                    {type: "textMessage", text: "wow! you made it!"},
                ],
            },
        },
        walls: {
            [utils.asGridCoord(3,2)] : true,
            [utils.asGridCoord(4,2)] : true,
            [utils.asGridCoord(5,2)] : true,
            [utils.asGridCoord(6,2)] : true,
            [utils.asGridCoord(15,2)] : true,
            [utils.asGridCoord(7,1)] : true,
            [utils.asGridCoord(8,1)] : true,
            [utils.asGridCoord(9,1)] : true,
            [utils.asGridCoord(10,1)] : true,
            [utils.asGridCoord(11,1)] : true,
            [utils.asGridCoord(12,1)] : true,
            [utils.asGridCoord(13,1)] : true,
            [utils.asGridCoord(14,1)] : true,
            [utils.asGridCoord(2,3)] : true,
            [utils.asGridCoord(16,3)] : true,
            [utils.asGridCoord(2,4)] : true,
            [utils.asGridCoord(16,4)] : true,
            [utils.asGridCoord(2,5)] : true,
            [utils.asGridCoord(17,5)] : true,
            [utils.asGridCoord(2,6)] : true,
            [utils.asGridCoord(16,6)] : true,
            [utils.asGridCoord(2,7)] : true,
            [utils.asGridCoord(16,7)] : true,
            [utils.asGridCoord(3,7)] : true,
            [utils.asGridCoord(4,7)] : true,
            [utils.asGridCoord(5,7)] : true,
            [utils.asGridCoord(6,7)] : true,
            [utils.asGridCoord(7,7)] : true,
            [utils.asGridCoord(8,7)] : true,
            [utils.asGridCoord(9,7)] : true,
            [utils.asGridCoord(10,7)] : true,
            [utils.asGridCoord(11,7)] : true,
            [utils.asGridCoord(12,7)] : true,
            [utils.asGridCoord(13,7)] : true,
            [utils.asGridCoord(14,7)] : true,
            [utils.asGridCoord(15,7)] : true,

        }
    },
}