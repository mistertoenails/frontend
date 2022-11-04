class Floor{
  constructor(filepath, name, scale){
    this.config  = {
      load: (scene)=>{scene.load.image(name, filepath)},
      scale: scale,
      name: name
    }
  }
}
var pebbles = new Floor('assets/walls_and_floors/pebbletile.png', 'pebble', 3)
var bricks = new Floor('assets/walls_and_floors/bricks.png', 'bricks', 3)