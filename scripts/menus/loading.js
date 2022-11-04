var coords = [ 
  { x: 1, y: 5 },
  { x: 2, y: 5 },
  { x: 3, y: 5 },
  { x: 4, y: 5 },
  { x: 5, y: 5 },
  { x: 1, y: 4 },
  { x: 2, y: 4 },
  { x: 3, y: 4 },
  { x: 4, y: 4 },
  { x: 5, y: 4 },
  { x: 1, y: 3 },
  { x: 2, y: 3 },
  { x: 3, y: 3 },
  { x: 4, y: 3 },
  { x: 5, y: 3 },
  { x: 1, y: 2 },
  { x: 2, y: 2 },
  { x: 3, y: 2 },
  { x: 4, y: 2 },
  { x: 5, y: 2 },
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 3, y: 1 },
  { x: 4, y: 1 },
  { x: 5, y: 1 },
];
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}
class Loading extends Phaser.Scene {
  constructor() {
    super("loading");
  }
  preload() {
    this.load.spritesheet("loading", "assets/menus/loading.png", {
      frameWidth: 48,
      frameHeight: 12,
      endFrame: 24,
    });
    this.load.spritesheet("background", "assets/menus/background.png", {
      frameWidth: 126,
      frameHeight: 63,
      endFrame: 4,
    });
  }
  create() {
 

    this.anims.create({
      key: "loading",
      frames: this.anims.generateFrameNumbers("loading"),
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: "bck",
      frames: this.anims.generateFrameNumbers("background"),
      frameRate: 4,
      repeat: -1,
    });
    this.bck = this.add
      .sprite(config.width / 2, config.height / 2, "background")
      .setScale(10)
      .setPipeline("Light2D");
    this.loading = this.add
      .sprite(config.width / 2, config.height / 2, "loading")
      .setScale(7)
      .setPipeline("Light2D");
    this.loading.play("loading");
    this.bck.play("bck");
    var light2 = this.lights.addLight(
      config.width / 2 - 60,
      config.height / 2 - 60,
      400
    );
    var light3 = this.lights.addLight(
      config.width / 2 + 85,
      config.height / 2 + 170 - 65,
      400
    );
    var light4 = this.lights.addLight(
      config.width / 2 + 340,
      config.height / 2 + 25 - 65,
      400
    );
    var light3 = this.lights.addLight(
      config.width / 2 - 450,
      config.height / 2 + 170 - 65,
      400
    );

    this.lights.enable();

    //STEP 1:
    //generate these:
    //0 = start, x = to generate, . = ignore for now

    // . . . . .
    // . X X X .
    // . X 0 X .
    // . X X X .
    // . . . . .

    //STEP 2:
    //generate these

    // X X X X X
    // X . . . X
    // X . 0 . X
    // X . . . X
    // X X X X X

    //3 bosses, 2 treasures, 10 battles, 4 healing rooms, 5 filler
    class Area {
      constructor(templates, origin) {
        this.originCoords = origin;
        this.templates = templates;
        this.rooms = [];
        this.pickRooms = () => {
          
        for(var i = 0; i < 25 - this.templates.special.length; i++){
       let room =  this.templates.rooms[Math.floor(Math.random() * this.templates.rooms.length)]
      this.rooms.push(room)
       
        }
             for(var i in this.templates.special){
            this.rooms.splice(this.templates.special[i].index, 0, this.templates.special[i].room)
          }
      }
    }
    }
  var start = new Area(
      {
        special: [{ index: 12, room: StartingRoomTemp}],
        rooms: [CampBoss1, CampTreasure1, CampHealing1, CampFiller1, CampBattle1]
      },
      {
        x: 10,
        y: 10,
      }
    );
start.pickRooms()
  
    templates: var ruins = {};
    var mines = {};
    var jungle = {};
    var moss = {};
    var gem_caverns = {};
    var rooted_caverns = {};
    var stone_cavern = {};
    var lake = {};
    var innerRing = [
      ruins,
      mines,
      jungle,
      moss,
      gem_caverns,
      rooted_caverns,
      stone_cavern,
      lake,
    ];
    innerRing = shuffle(innerRing);

    var things_domain = {};
    var spider_den = {};
    var dark_caves = {};
    var lava = {};
    var cliffs = {};
    var blood_caverns = {};
    var storm_caverns = {};
    var murky_aquifer = {};
    var fallen_citadel = {};
    var flowered_caves = {};
    var beasts_lair = {};
    var bedrock_caves = {};
    var ice_caves = {};
    var void_dungeon = {};
    var laborotory = {};
    var outerRing = [
      things_domain,
      spider_den,
      dark_caves,
      lava,
      cliffs,
      blood_caverns,
      storm_caverns,
      murky_aquifer,
      fallen_citadel,
      flowered_caves,
      beasts_lair,
      bedrock_caves,
      ice_caves,
      void_dungeon,
      laborotory,
    ];

    outerRing = shuffle(outerRing);
 

    



for(var index in start.rooms){
class Room extends start.rooms[index]{
  constructor(){
    super(coords[index])
  }
}
  try{
this.scene.add(`x${coords[index].x}y${coords[index].y}`, Room)}
catch{
  
  this.scene.remove(`x${coords[index].x + 10}y${coords[index].y + 10}`)
  this.scene.add(`x${coords[index].x}y${coords[index].y}`, Room)
}
}
this.scene.start('x13y13', {x: 1408, y: 1408, texture: 'upWalk'})

 
  }

}
