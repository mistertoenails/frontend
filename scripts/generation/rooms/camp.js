
class CampRoom extends Room {
  constructor(coordinates, floor) {
    super({ x: coordinates.x + 10, y: coordinates.y + 10 });
    this.x = coordinates.x + 10;
    this.y = coordinates.y + 10;
    this.floorData = floor;
  }
  preload() {
    super.preload();
    this.load.spritesheet("lantern", "assets/props/lantern.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("lantern2", "assets/props/lantern2.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.image("flame_particles", "assets/particles/flame_particles.png");

    this.floorData.load(this);
    this.load.image("wall1", "assets/walls_and_floors/camp_wall.png");
  }
  create() {
  
    this.lightedObjects = [];
    this.anims.create({
      key: "flame",
      frames: this.anims.generateFrameNumbers("lantern"),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: "flame2",
      frames: this.anims.generateFrameNumbers("lantern2"),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: "u",
      frames: this.anims.generateFrameNumbers("upWalk"),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: "d",
      frames: this.anims.generateFrameNumbers("downWalk"),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: "l",
      frames: this.anims.generateFrameNumbers("leftWalk"),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: "r",
      frames: this.anims.generateFrameNumbers("rightWalk"),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: "ul",
      frames: this.anims.generateFrameNumbers("up-leftWalk"),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: "ur",
      frames: this.anims.generateFrameNumbers("up-rightWalk"),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: "dl",
      frames: this.anims.generateFrameNumbers("down-leftWalk"),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: "dr",
      frames: this.anims.generateFrameNumbers("down-rightWalk"),
      frameRate: 7,
      repeat: -1,
    });

    super.create();
    this.player.setPipeline("Light2D");
    this.floor = this.add
      .tileSprite(0, 0, 3072, 3072, "pebble")
      .setScale(3)
      .setPipeline("Light2D");

    this.walls = {
      top: {},
      side: {},
      bottom: {},
    };
    this.walls.top.roomData = [
      [4, 2, 2, 2, 2, 2, 3, 0, 0, 1, 2, 2, 2, 2, 2, 5],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
    ];
    this.walls.top.tilemap = this.make.tilemap({
      data: this.walls.top.roomData,
      tileWidth: 64,
      tileHeight: 64,
    });
    this.walls.top.tileset = this.walls.top.tilemap.addTilesetImage("wall1");
    this.walls.top.hitbox = {
      left: {
        rect: this.physics.add
          .existing(this.add.rectangle(0, 0, 1344, 170))
          .setOrigin(0, 0),
      },
      right: {
        rect: this.physics.add
          .existing(this.add.rectangle(1755, 0, 1344, 170))
          .setOrigin(0, 0),
      },
    };

    this.walls.top.hitbox.left.rect.body.setImmovable(true);
    this.walls.top.hitbox.right.rect.body.setImmovable(true);
    this.walls.top.hitbox.right.collider = this.physics.add.collider(
      this.walls.top.hitbox.right.rect,
      this.player
    );
    this.walls.top.hitbox.left.collider = this.physics.add.collider(
      this.walls.top.hitbox.left.rect,
      this.player
    );
    this.walls.top.layer = this.walls.top.tilemap
      .createLayer("layer", this.walls.top.tileset, 0, 0)
      .setScale(3)
      .setDepth(this.depths.wall)
      .setPipeline("Light2D");

    this.walls.top.layer.setCollisionBetween(
      1,
      16,
      true,
      false,
      this.walls.top.layer
    );

    this.walls.side.roomData = [
      [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],

      [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],

      [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],

      [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],

      [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],

      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

      [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],

      [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],

      [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],

      [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],

      [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],

      [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],
    ];
    this.walls.side.tilemap = this.make.tilemap({
      data: this.walls.side.roomData,
      tileWidth: 64,
      tileHeight: 64,
    });
    this.walls.side.tileset = this.walls.side.tilemap.addTilesetImage("wall1");
    this.walls.side.hitbox = {
      left: {
        rect: this.physics.add
          .existing(this.add.rectangle(0, 0, 180, 1344))
          .setOrigin(0, 0),
      },
      bottom_left: {
        rect: this.physics.add
          .existing(this.add.rectangle(0, 1848, 180, 1224))
          .setOrigin(0, 0),
      },
      right: {
        rect: this.physics.add
          .existing(this.add.rectangle(2892, 0, 180, 1344))
          .setOrigin(0, 0),
      },
      bottom_right: {
        rect: this.physics.add
          .existing(this.add.rectangle(2892, 1848, 180, 1224))
          .setOrigin(0, 0),
      },
    };

    this.walls.side.hitbox.left.rect.body.setImmovable(true);
    this.walls.side.hitbox.left.collider = this.physics.add.collider(
      this.walls.side.hitbox.left.rect,
      this.player
    );
    this.walls.side.hitbox.bottom_left.rect.body.setImmovable(true);
    this.walls.side.hitbox.bottom_left.collider = this.physics.add.collider(
      this.walls.side.hitbox.bottom_left.rect,
      this.player
    );
    this.walls.side.hitbox.right.rect.body.setImmovable(true);
    this.walls.side.hitbox.right.collider = this.physics.add.collider(
      this.walls.side.hitbox.right.rect,
      this.player
    );
    this.walls.side.hitbox.bottom_right.rect.body.setImmovable(true);
    this.walls.side.hitbox.bottom_right.collider = this.physics.add.collider(
      this.walls.side.hitbox.bottom_right.rect,
      this.player
    );
    this.walls.side.layer = this.walls.side.tilemap
      .createLayer("layer", this.walls.side.tileset, 0, 192)
      .setScale(3)
      .setDepth(this.depths.wall_above_player)
      .setPipeline("Light2D");

    this.walls.side.layer.setCollisionBetween(
      1,
      16,
      true,
      false,
      this.walls.side.layer
    );
    this.walls.bottom.roomData = [
      [13, 12, 12, 12, 12, 12, 15, 0, 0, 16, 12, 12, 12, 12, 12, 14],
    ];
    this.walls.bottom.tilemap = this.make.tilemap({
      data: this.walls.bottom.roomData,
      tileWidth: 64,
      tileHeight: 64,
    });
    this.walls.bottom.tileset =
      this.walls.bottom.tilemap.addTilesetImage("wall1");
    this.walls.bottom.layer = this.walls.bottom.tilemap
      .createLayer("layer", this.walls.bottom.tileset, 0, 2873)
      .setScale(3)
      .setDepth(this.depths.wall_above_player)
      .setPipeline("Light2D");
    this.walls.bottom.hitbox = {
      left: {
        rect: this.physics.add
          .existing(this.add.rectangle(0, 3015, 1330, 50))
          .setOrigin(0, 0),
      },
      right: {
        rect: this.physics.add
          .existing(this.add.rectangle(1750, 3015, 1335, 50))
          .setOrigin(0, 0),
      },
    };
    this.walls.bottom.hitbox.left.rect.body.setImmovable(true);
    this.walls.bottom.hitbox.left.collider = this.physics.add.collider(
      this.player,
      this.walls.bottom.hitbox.left.rect
    );
    this.walls.bottom.hitbox.right.rect.body.setImmovable(true);
    this.walls.bottom.hitbox.right.collider = this.physics.add.collider(
      this.player,
      this.walls.bottom.hitbox.right.rect
    );
    this.walls.bottom.layer.setCollisionBetween(
      1,
      16,
      true,
      false,
      this.walls.bottom.layer
    );
    this.walls.top.lanterns = {
      left: new Lantern({x: 1248, y: 96}, this, this.depths.wall_props),
      right: new Lantern({x: 1824, y: 96}, this, this.depths.wall_props)
    }

 
 navMesh.enableDebug();
   
  }
  update() {
    super.update();
  }
}
class StartingRoomTemp extends CampRoom {
  constructor(coordinates) {
    super({ x: coordinates.x, y: coordinates.y }, pebbles.config);
  }
  preload() {
    try{
    super.preload();}
    catch(err){
      alert(err)
    }
  }
  create() {
    try{
       super.create();}
    catch(err){
      alert(err)
    }
  }
  
  update() {
    super.update();
  }
}
class CampBoss1 extends CampRoom {
  constructor(coordinates) {
    super({ x: coordinates.x, y: coordinates.y }, pebbles.config);
  }
  preload() {
    super.preload();
  }
  create() {
    super.create();
  }
  update() {
    super.update();
  }
}
class CampTreasure1 extends CampRoom {
  constructor(coordinates) {
    super({ x: coordinates.x, y: coordinates.y }, pebbles.config);
  }
  preload() {
    super.preload();
  }
  create() {
    super.create();
  }
  update() {
    super.update();
  }
}
class CampBattle1 extends CampRoom {
  constructor(coordinates) {
    super({ x: coordinates.x, y: coordinates.y }, pebbles.config);
  }
  preload() {
    super.preload();
  }
  create() {
    super.create();
  }
  update() {
    super.update();
  }
}
class CampFiller1 extends CampRoom {
  constructor(coordinates) {
    super({ x: coordinates.x, y: coordinates.y }, pebbles.config);
  }
  preload() {
    super.preload();
  }

  create() {
    super.create();
  }
  update() {
    super.update();
  }
}
class CampHealing1 extends CampRoom {
  constructor(coordinates) {
    super({ x: coordinates.x, y: coordinates.y }, pebbles.config);
  }
  preload() {
    super.preload();
  }

  create() {
    super.create();
  }
  update() {
    super.update();
  }
}
