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

        // Draw game objects
        const hero = new GameObject({
            x: 5,
            y: 6,
        });

        setTimeout(() => {
            hero.sprite.draw(this.ctx);
        }, 200);

    }
}