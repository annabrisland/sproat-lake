class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects || [];
        this.walls = config.walls || {};

        // Lower & upper map parts config
        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
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
        Object.values(this.gameObjects).forEach(gameObject => {
            gameObject.mount(this);
        });
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
}