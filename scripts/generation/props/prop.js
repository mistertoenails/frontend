
class Prop extends Phaser.GameObjects.Sprite {
  constructor(coords, scene, spriteConfig) {
    super(scene, coords.x, coords.y, spriteConfig.texture);
    scene.add.existing(this);
    this.setTexture(spriteConfig.texture)
    this.setDepth(spriteConfig.depth)
    this.setScale(spriteConfig.scale)
    this.setPipeline('Light2D')
  }
}
class AnimatedProp extends Prop{
  constructor(coords, scene, spriteConfig, animationConfig){
    super(coords, scene, spriteConfig)
    scene.anims.create(animationConfig)
    this.play(animationConfig.key)
  }
}

class Lantern extends AnimatedProp{
  constructor(coords, scene, depth){
    super(coords, scene, {texture: 'lantern', depth: depth, scale: 5}, {
      key: "flame",
      frames: scene.anims.generateFrameNumbers("lantern"),
      frameRate: 12,
      repeat: -1,
    })
    this.light = scene.lights.addLight(coords.x, coords.y, 100, 5100).setRadius(500).color._rgb = [2, 1.3, 0]
    this.particleEmitter = new FlameParticle(coords, scene, depth + 1)
    
  }
}