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
      idleDown: [0, 0],
    };
    this.currentAnimation = config.currentAnimation || "idleDown";
    this.currentAnimationFrame = 0;

    // Config for game object
    this.gameObject = config.gameObject || null;
  }

  // Draw the sprite
  draw(ctx) {
    const x = this.gameObject.x * 16 - 8;
    const y = this.gameObject.y * 16 - 18;

    this.isShadowLoaded && ctx.drawImage(
      this.shadow, x, y
    );

    this.isLoaded && ctx.drawImage(
      this.image,
      0, // left crop
      0, // top crop
      32, // width crop
      32, // height crop
      x, // left position
      y, // top position
      32, // width size
      32 // height size
    );
  }
}
