class Person extends GameObject {
  constructor(config) {
    super(config);
    this.movingProgressRemaining = 0;

    this.isPlayerControlled = config.isPlayerControlled || false;

    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      left: ["x", -1],
      right: ["x", 1],
    };
  }

  update(state) {
    if (this.movingProgressRemaining > 0) {
      this.updatePosition();
    } else {
      // Check if the arrow is held & move if ready
      if (this.isPlayerControlled && state.arrow) {
        this.startBehaviour(state, {
          type: "walk",
          direction: state.arrow,
        });
      }
      this.updateSprite(state);
    }
  }

  startBehaviour(state, behaviour) {
    // Set character direction
    this.direction = behaviour.direction;

    if (behaviour.type === "walk") {
      // Check if the space is taken
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        return;
      }
      // Start walk & update wall
      this.movingProgressRemaining = 16;
      state.map.moveWall(this.x, this.y, this.direction);
    }
  }

  updatePosition() {
    const [axis, change] = this.directionUpdate[this.direction];
    this[axis] += change;
    this.movingProgressRemaining -= 1;
  }

  updateSprite() {
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction);
      return;
    }
    this.sprite.setAnimation("idle-" + this.direction);
  }
}
