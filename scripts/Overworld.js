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

            // Set up 'camera'
            const camera = this.map.gameObjects.hero;

            // Update game objects
            Object.values(this.map.gameObjects).forEach(gameObject => {
                gameObject.update({
                    arrow: this.directionInput.direction
                });
            });
            
            // Draw lower map
            this.map.drawLowerImage(this.ctx, camera);

            // Draw game objects
            Object.values(this.map.gameObjects).forEach(gameObject => {
                gameObject.sprite.draw(this.ctx, camera);
            });

            // Draw upper map
            this.map.drawUpperImage(this.ctx, camera);

            requestAnimationFrame(() => step());
        }
        step()
    }

    init() {

        this.map = new OverworldMap(
            window.OverworldMaps.DemoMap
        );

        // Listen for keydown events
        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.directionInput.direction;

        // Start game loop
        this.startGameLoop();

    }
}