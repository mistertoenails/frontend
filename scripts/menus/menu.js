
class Menu extends Phaser.Scene {
  constructor() {
    super("menu");
  }
  preload() {
    this.load.audio("theme", "assets/sound/title_theme.mp3");
    this.load.spritesheet("title", "assets/menus/title.png", {
      frameWidth: 126,
      frameHeight: 63,
    });
    this.load.spritesheet("play", "assets/menus/play.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    this.cameras.main.fadeIn(100, 0, 0, 0);
    this.music = this.sound.add("theme", { loop: true });
  
    this.music.play();
    this.anims.create({
      key: "title",
      frames: this.anims.generateFrameNumbers("title"),
      frameRate: 4,
      repeat: -1,
    });
    this.anims.create({
      key: "play",
      frames: this.anims.generateFrameNumbers("play"),
      frameRate: 20,
      repeat: -1,
    });
    this.title = this.add
      .sprite(config.width / 2, config.height / 2, "title")
      .setScale(10)
      .setPipeline("Light2D");
    this.title.play("title");
    this.play = this.add
      .sprite(config.width / 2, config.height / 2 + 190, "play")
      .setScale(5)
      .play("play")
      .setPipeline("Light2D");
    var light = this.lights.addLight(this.play.x, this.play.y, 20000);
    var light2 = this.lights.addLight(
      config.width / 2 - 60,
      config.height / 2 - 80,
      800
    );
    var light3 = this.lights.addLight(this.play.x + 85, this.play.y - 65, 400);


    this.lights.enable();
    this.play.setInteractive();

        this.play.on("pointerdown", () => {
      this.play.removeInteractive();
   

      this.tweens.add({ targets: this.music, volume: 0, duration: 3000 });
      this.cameras.main.fadeOut(3000, 0, 0, 0);
      this.cameras.main.once(
        Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
        (cam, effect) => {
          
         this.scene.start("loading")
        
        }
      );
    });
  }
}
