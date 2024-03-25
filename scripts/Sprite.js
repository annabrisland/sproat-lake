class Sprite {
  constructor(config) {
    // Config for image
    this.image = new Image();
    this.image.src = config.src || "";
    this.image.onload = () => {
      this.isLoaded = true;
    };

    // Config for shadow
    this.shadow = new Image();
    this.useShadow = true;// config.useShadow || false;
    if (this.useShadow) {
    this.shadow.src = "assets/images/sprites/shadow.png";
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    };

    // Config for animation & initial state
    this.animations = config.animations || {
      "idle-down": [[0, 0]],
      "idle-right": [[0, 1]],
      "idle-up": [[0, 2]],
      "idle-left": [[0, 3]],
      "walk-down": [[0, 0], [1, 0], [2, 0], [3, 0]],
      "walk-right": [[0, 1], [1, 1], [2, 1], [3, 1]],
      "walk-up": [[0, 2], [1, 2], [2, 2], [3, 2]],
      "walk-left": [[0, 3], [1, 3], [2, 3], [3, 3]],
    };
    this.currentAnimation = config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 8;
    this.animationFrameProgress = this.animationFrameLimit;

    // Config for game object
    this.gameObject = config.gameObject || null;
  }

  // Get animation frame
  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  // Set animation
  setAnimation(key) {
    if(this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  // Update the sprite animation
  updateAnimationProgress() {
    // Check fram progress
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    // Reset frame progress
    this.animationFrameProgress = this.animationFrameLimit;

    // Update to increase frame
    this.currentAnimationFrame += 1;

    if(this.frame === undefined){
      this.currentAnimationFrame = 0;
    }
  }

  // Draw the sprite
  draw(ctx, camera) {
    const x = this.gameObject.x - 8 + utils.withGrid(10.5) - camera.x;
    const y = this.gameObject.y - 18 + utils.withGrid(6) - camera.y;

    this.isShadowLoaded && ctx.drawImage(
      this.shadow, x, y
    );

    const [frameX, frameY] = this.frame;

    this.isLoaded && ctx.drawImage(
      this.image,
      frameX * 32, // left crop
      frameY * 32, // top crop
      32, // width crop
      32, // height crop
      x, // left position
      y, // top position
      32, // width size
      32 // height size
    );
    
      this.updateAnimationProgress();

  }

}
