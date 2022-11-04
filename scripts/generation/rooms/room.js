class Entity extends Phaser.GameObjects.Sprite {
  constructor(data, scene, scale, body) {
    super(scene, data.x, data.y, data.texture)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setTexture(data.texture)
    this.setPipeline("Light2D")
    this.setScale(scale)
    this.body.setSize(body.size.width, body.size.height)
    this.body.setOffset(body.offset.x, body.offset.y)
    this.atkHitbox = scene.add.rectangle(this.x, this.y, this.body.width * scale, body.atk * this.body.height * scale)
    scene.physics.add.existing(this.atkHitbox)
    this.atkHitbox.body.debugBodyColor = '#003efa';
  }
}
class Enemy extends Entity {
  constructor(data, scene, scale, body, animationKey, stats) {
    super(data, scene, scale, body)


  }

}

class Spider extends Enemy {
  constructor(coords, scene) {
    super({ texture: 'spider', x: coords.x, y: coords.y }, scene, 4, { size: { width: 8, height: 8 }, offset: { x: 12, y: 12 }, atk: 1 }, 'crawl', { hp: 10, spd: 300 })
this.detector = new Detector(500, this, scene)
  }
  update() {
   this.detector.update()
  }
}
class Room extends Phaser.Scene {
  constructor(coordinates) {
    super(`x${coordinates.x}y${coordinates.y}`);
  }
  init(data) {
    this.playerData = data;
  }
  preload() {
    this.depths = {
      floor: 1,
      floor_props: 2,
      floor_prt: 3,
      wall: 4,
      wall_prt: 5,
      wall_props: 6,
      wall_prop_prt: 7,
      player_below_prop: 8,
      player_below_prop_prt: 9,
      ground_prop: 10,
      ground_prop_prt: 11,
      player_above_prop: 12,
      player_above_prop_prt: 13,
      wall_above_player: 14,
      hud_background: 15,
      hud_element_1: 16,
      hud_element_2: 17,
      hud_prt: 18,
    };
    this.load.plugin('pathfinder', 'scripts/general/phaser-navmesh-plugin.js', true);
    this.load.spritesheet("right_atk_light_stroke1", "assets/sam/sam_side_lightweapon_1.png", {
      frameWidth: 64,
      frameHeight: 64,
      startFrame: 0,
      endFrame: 8
    })
    this.load.spritesheet("right_atk_light_stroke2", "assets/sam/sam_side_lightweapon_2.png", {
      frameWidth: 64,
      frameHeight: 64,

    })

    this.load.spritesheet("healthBar", "assets/hud/healthbar.png", {
      frameWidth: 104,
      frameHeight: 50,
    });
    this.load.spritesheet("damageBar", "assets/hud/damage_bar.png", {
      frameWidth: 104,
      frameHeight: 50,
      startFrame: 0,
      endFrame: 100,
    });
    this.load.spritesheet("downWalk", "assets/sam/sam_down.png", {
      frameWidth: 64,
      framwHeight: 64,
    });
    this.load.spritesheet("upWalk", "assets/sam/sam_up.png", {
      frameWidth: 64,
      framwHeight: 64,
    });
    this.load.spritesheet("leftWalk", "assets/sam/sam_left.png", {
      frameWidth: 64,
      framwHeight: 64,
    });
    this.load.spritesheet('spider', 'assets/enemies/spider.png', { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet("rightWalk", "assets/sam/sam_right.png", {
      frameWidth: 64,
      framwHeight: 64,
    });
    this.load.spritesheet("down-leftWalk", "assets/sam/sam_downleft.png", {
      frameWidth: 64,
      framwHeight: 64,
    });
    this.load.spritesheet("up-leftWalk", "assets/sam/sam_upleft.png", {
      frameWidth: 64,
      framwHeight: 64,
    });
    this.load.spritesheet("up-rightWalk", "assets/sam/sam_upright.png", {
      frameWidth: 64,
      framwHeight: 64,
    });
    this.load.spritesheet("down-rightWalk", "assets/sam/sam_downright.png", {
      frameWidth: 64,
      framwHeight: 64,
    });

  }

  create() {
    this.anims.create({
      key: 'crawl',
      frames: this.anims.generateFrameNumbers("spider"),
      frameRate: 12,
      repeat: -1
    })
    this.anims.create({
      key: "atk_right_1",
      frames: this.anims.generateFrameNumbers("right_atk_light_stroke1"),
      frameRate: 15,
      repeat: 0
    })
    this.anims.create({
      key: "atk_right_2",
      frames: this.anims.generateFrameNumbers("right_atk_light_stroke2"),
      frameRate: 15,
      repeat: 0
    })
    this.anims.create({
      key: "dmg",
      frames: this.anims.generateFrameNumbers("damageBar"),
      frameRate: 50,
      repeat: 0,
    });
    this.cameras.main.fadeIn(100, 0, 0, 0);
    this.lights.enable();
    this.events.on("wake", () => {
      this.lights.enable();
      this.cameras.main.fadeIn(100, 0, 0, 0);

      this.doorTop.collider.active = true;
      this.doorBottom.collider.active = true;
      this.doorLeft.collider.active = true;
      this.doorRight.collider.active = true;
    });
    this.cameras.main.setBounds(0, 0, 3072, 3072);
    

    this.player = new Entity(this.playerData, this, 4, { offset: { x: 27, y: 40 }, size: { width: 10, height: 5 }, atk: 5 }).setDepth(this.depths.player_above_prop)
    this.player.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "atk_right_2", function() {
      if (!this.player.flipX) {
        this.player.setTexture('rightWalk')
      }
      else {
        this.player.setTexture('leftWalk')
        this.player.flipX = false
      }
    }, this);



    this.cameras.main.startFollow(this.player);


    this.hud = {
      hpBar: this.add
        .sprite(14, 10, "healthBar")
        .setScale(2.5)
        .setScrollFactor(0)
        .setOrigin(0, 0)
        .setDepth(this.depths.hud_element_2)
        .setFrame(100),
      dmgBar: this.add
        .sprite(14, 10, "damageBar")
        .setScale(2.5)
        .setScrollFactor(0)
        .setOrigin(0, 0)
        .setDepth(this.depths.hud_element_1)
        .setFrame(100),
    };
    this.physics.add.existing(this.player);
    this.doorTop = this.add.rectangle(1344, 0, 395, 20).setOrigin(0, 0);
    this.doorBottom = this.add.rectangle(1344, 3052, 395, 20).setOrigin(0, 0);
    this.doorLeft = this.add.rectangle(0, 1344, 20, 395).setOrigin(0, 0);
    this.doorRight = this.add.rectangle(3052, 1344, 20, 395).setOrigin(0, 0);
    this.physics.add.existing(this.doorTop);
    this.physics.add.existing(this.doorBottom);
    this.physics.add.existing(this.doorLeft);
    this.physics.add.existing(this.doorRight);
    this.doorTop.body.immovable = true;
    this.doorBottom.body.immovable = true;
    this.doorLeft.body.immovable = true;
    this.doorRight.body.immovalbe = true;
    this.doorTop.collider = this.physics.add.collider(
      this.doorTop,
      this.player,
      () => {
        this.cameras.main.fadeOut(100, 0, 0, 0);
        this.doorTop.collider.active = false;

        this.cameras.main.once(
          Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
          (cam, effect) => {
            this.player.y = 50;
            this.player.setTexture("downWalk");
            this.scene.run(`x${this.x}y${this.y + 1}`, {
              x: this.player.x,
              y: 2776,
              texture: "upWalk",
            });
            this.scene.sleep();
          }
        );
      }
    );
    this.doorBottom.collider = this.physics.add.collider(
      this.doorBottom,
      this.player,
      () => {
        this.cameras.main.fadeOut(100, 0, 0, 0);
        this.doorBottom.collider.active = false;

        this.cameras.main.once(
          Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
          (cam, effect) => {
            this.player.y = 2766;
            this.player.setTexture("upWalk");
            this.scene.run(`x${this.x}y${this.y - 1}`, {
              x: this.player.x,
              y: 50,
              texture: "downWalk",
            });
            this.scene.sleep();
          }
        );
      }
    );
    this.doorLeft.collider = this.physics.add.collider(
      this.doorLeft,
      this.player,
      () => {
        this.cameras.main.fadeOut(100, 0, 0, 0);
        this.doorLeft.collider.active = false;

        this.cameras.main.once(
          Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
          (cam, effect) => {
            this.player.x = 70;
            this.player.setTexture("rightWalk");
            this.scene.run(`x${this.x - 1}y${this.y}`, {
              x: 2736,
              y: this.player.y,
              texture: "leftWalk",
            });
            this.scene.sleep();
          }
        );
      }
    );
    this.doorRight.collider = this.physics.add.collider(
      this.doorRight,
      this.player,
      () => {
        this.cameras.main.fadeOut(25, 0, 0, 0);
        this.doorRight.collider.active = false;

        this.cameras.main.once(
          Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
          (cam, effect) => {
            this.player.x = 2736;
            this.player.setTexture("leftWalk");
            this.scene.run(`x${this.x + 1}y${this.y}`, {
              x: 50,
              y: this.player.y,
              texture: "rightWalk",
            });
            this.scene.sleep();
          }
        );
      }
    );
    this.props = [];
    for (let index in this.lightedObjects) {
      try {
        this.lightedObjects[index].setPipeline("Light2D");
      } catch { }
    }
    this.hp = 100;
  }

  update() {
  
  if (this.player.flipX && this.player.texture.key !== "right_atk_light_stroke1" && this.player.flipX && this.player.texture.key !== "right_atk_light_stroke2" ) {
      this.player.flipX = false
    }

    for (var i of this.props) {
      if (this.player.y < i.hitbox.y) {
        i.setDepth(3);
      } else {
        i.setDepth(1);
      }
    }
    document.getElementById("roomId").innerText = `x${this.x}y${this.y}`;
    var keys = this.input.keyboard.addKeys({
      up: "W",
      down: "S",
      left: "A",
      right: "D",
      atk: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });
    if (keys.up.isDown) {
      if (keys.left.isDown && !keys.right.isDown) {
        this.player.play("ul", true);
        this.player.body.velocity.y = -380;
        this.player.body.velocity.x = -380;
      }
      if (keys.right.isDown && !keys.left.isDown) {
        this.player.play("ur", true);
        this.player.body.velocity.y = -380;
        this.player.body.velocity.x = 380;
      }
      if (!keys.right.isDown && !keys.left.isDown) {
        this.player.play("u", true);
        this.player.body.velocity.y = -380;
      }
    }
    if (keys.down.isDown) {
      if (keys.left.isDown && !keys.right.isDown) {
        this.player.play("dl", true);
        this.player.body.velocity.y = 380;
        this.player.body.velocity.x = -380;
      }
      if (keys.right.isDown && !keys.left.isDown) {
        this.player.play("dr", true);
        this.player.body.velocity.x = 380;
        this.player.body.velocity.y = 380;
      }
      if (!keys.right.isDown && !keys.left.isDown) {
        this.player.play("d", true);
        this.player.body.velocity.y = 380;
      }
    }
    if (
      keys.left.isDown &&
      !keys.right.isDown &&
      !keys.up.isDown &&
      !keys.down.isDown
    ) {
      this.player.play("l", true);
      this.player.body.velocity.x = -380;
    }
    if (
      keys.right.isDown &&
      !keys.left.isDown &&
      !keys.up.isDown &&
      !keys.down.isDown
    ) {
      this.player.play("r", true);
      this.player.body.velocity.x = 380;
    }
    if (!keys.left.isDown && !keys.right.isDown) {
      this.player.body.velocity.x = 0;
    }
    if (!keys.up.isDown && !keys.down.isDown) {
      this.player.body.velocity.y = 0;
    }
    if (
      this.player.body.velocity.x === 0 &&
      this.player.body.velocity.y === 0

      && this.player.texture.key !== 'right_atk_light_stroke1'
      && this.player.texture.key !== 'right_atk_light_stroke2'
    ) {
      this.player.anims.pause();
    }
    if (Phaser.Input.Keyboard.JustDown(keys.atk)){
      this.player.chain()
      if(this.player.texture.key !== 'right_atk_light_stroke1'){
      
      if (this.player.texture.key === 'leftWalk') {
        this.player.flipX = true
      }
      this.player.play('atk_right_1')
      var atk_1 = this.player.once('animationcomplete', ()=>{
        if(this.player.flipX){
          this.player.play('l')
        }
        else{
          this.player.play('r')
        }
      })
      
    }
     else{
        this.player.chain('atk_right_2')
      }
    }
    if (this.hp <= 0) {
      this.scene.start("menu");
    }
    if (this.player.body.velocity.x > 0) {
      this.player.atkHitbox.x = this.player.x + 11
    }
    if (this.player.body.velocity.x < 0) {
      this.player.atkHitbox.x = this.player.x - 11
    }
    if (this.player.body.velocity.x === 0) {
      this.player.atkHitbox.x = this.player.x
    }
    if (this.player.body.velocity.y > 0) {
      this.player.atkHitbox.y = this.player.y + 11
    }
    if (this.player.body.velocity.y < 0) {
      this.player.atkHitbox.y = this.player.y - 11
    }
    if (this.player.body.velocity.y === 0) {
      this.player.atkHitbox.y = this.player.y
    }

  }
}