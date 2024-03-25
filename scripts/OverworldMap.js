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
    drawLowerImage(ctx) {
        ctx.drawImage(this.lowerImage, 0, 0);
    }

    drawUpperImage(ctx) {
        ctx.drawImage(this.upperImage, 0, 0);
    }
}

window.OverworldMaps = {
    DemoMap: {
        lowerSrc: "assets/images/maps/testmap.png",
        upperSrc: "assets/images/maps/testmapUpper.png",
        gameObjects: {
        hero: new GameObject({
            x: utils.withGrid(5),
            y: utils.withGrid(6),
        })
        }
    },
}