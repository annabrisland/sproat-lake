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
                    arrow: this.directionInput.direction,
                    map: this.map,
                });
            });
            
            // Draw lower map
            this.map.drawLowerImage(this.ctx, camera);

            // Draw game objects in order of y position
            Object.values(this.map.gameObjects).sort((a,b) => {
                return a.y - b.y;
            }).forEach(gameObject => {
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
            window.OverworldMaps.Park
        );
        // Mount game objects for collision detection
        this.map.mountGameObjects();

        // Listen for keydown events
        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.directionInput.direction;

        // Start game loop
        this.startGameLoop();

        // Start cutscene
        this.map.startCutScene([
            {who: "hero", type: "walk", direction: "down"},
            {who: "hero", type: "walk", direction: "down"},
            {who: "npc", type: "stand", direction: "right", duration: 1000},
        ]);

    }
}