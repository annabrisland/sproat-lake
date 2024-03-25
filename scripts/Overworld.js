class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext('2d');
        this.map = null;
    }

    startGameLoop() {
        const step = () => {

            // Clear canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Draw lower map
            this.map.drawLowerImage(this.ctx);

            // Draw game objects
            Object.values(this.map.gameObjects).forEach(gameObject => {
                gameObject.sprite.draw(this.ctx);
            });
            
            // Draw upper map
            this.map.drawUpperImage(this.ctx);

            requestAnimationFrame(() => step());
        }
        step()
    }

    init() {

        this.map = new OverworldMap(
            window.OverworldMaps.DemoMap
        );

        // Start game loop
        this.startGameLoop();

    }
}