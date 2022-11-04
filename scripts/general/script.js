
var config = {
  width: 1260,
  height: 800,
  scene: [Loading],
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    },
  },
  render: {
  pixelArt: true,
  }
};
var game = new Phaser.Game(config);
