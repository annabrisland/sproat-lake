class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext('2d');
    }

    init() {
        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0);
        };
        image.src = "assets/images/maps/testmap.png";
        
        const shadow = new Image();
        shadow.onload = () => {
            this.ctx.drawImage(
                shadow,
                0, // left crop
                0, // top crop
                32, // width crop
                32, // height crop
                x * 16 - 8, // left position
                y * 16 - 18, // top position
                32, // width size
                32 // height size
                );
        };
        shadow.src = "assets/images/sprites/shadow.png";

        const x = 5;
        const y = 6;
        const hero = new Image();
        hero.onload = () => {
            this.ctx.drawImage(
                hero,
                0, // left crop
                0, // top crop
                32, // width crop
                32, // height crop
                x * 16 - 8, // left position
                y * 16 - 18, // top position
                32, // width size
                32 // height size
                );
        };
        hero.src = "assets/images/sprites/sprite.png";

    }
}