import "phaser";
export class WelcomeScene extends Phaser.Scene {
  title: Phaser.GameObjects.Text;
  hint: Phaser.GameObjects.Text;
constructor() {
    super({
      key: "WelcomeScene"
    });
  }
create(): void {
	var canvas = this.sys.game.canvas;
    var titleText: string = "Starfall";
    this.title = this.add.text((canvas.width/2) -250, 200, titleText,
      { font: '128px Arial Bold', fill: '#D3D3D3' });
var hintText: string = "Click to start";
    this.hint = this.add.text((canvas.width/2) - 110, 350, hintText,
      { font: '24px Arial Bold', fill: '#D3D3D3' });
this.input.on('pointerdown', function (/*pointer*/) {
      this.scene.start("GameScene");
    }, this);
  }
};