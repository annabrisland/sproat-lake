class GameObject {
    constructor(config) {
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "assets/images/sprites/sprite.png",
        });

        this.behaviourLoop = config.behaviourLoop || [];
        this.behaviourLoopIndex = 0;
    }

    mount(map) {
        this.isMounted = true;
        map.addWall(this.x, this.y);

        // If beviour loop is defined, start it
        setTimeout(() => {
            this.doBehaviourEvent(map);
        }, 10);
    }

    update() {

    }

    async doBehaviourEvent(map) {

        // Check for cutscene or empty behaviour loop
        if(map.isCutscenePlaying || this.behaviourLoop.length === 0 || this.isStanding) {
            return;
        }
        let eventConfig = this.behaviourLoop[this.behaviourLoopIndex];
        eventConfig.who = this.id;

        const eventHandler = new OverworldEvent({map , event: eventConfig});
        await eventHandler.init();

        this.behaviourLoopIndex++;

        if (this.behaviourLoopIndex === this.behaviourLoop.length) {
            this.behaviourLoopIndex = 0;
        }

        // Perform next event
        this.doBehaviourEvent(map);
    }
}