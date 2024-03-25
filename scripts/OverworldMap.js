class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects || [];

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
        }
    },
}