class ParticleEmmiter{
  constructor(texture, config, scene, depth){
    console.log(scene)
    this.emitter = scene.add.particles(texture, config)
    this.emitter.setDepth(depth)
  }
}
class FlameParticle extends ParticleEmmiter{
  constructor(coords, scene, depth){
    super('flame_particles', {
   
        x: {min: coords.x - 10, max: coords.x + 10},
        y: {min: coords.y - 10, max: coords.y + 10},
        angle: { min: 240, max: 300 },
        speed: 100,
        gravityY: -150,
        quantity: 1,
        frequency: 400,
        scale: { min: 1, max: 3 }
    }, scene, depth)
  }
}
