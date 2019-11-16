import * as Phaser from 'phaser';
export class GameScene extends Phaser.Scene {
	delta: number;
	lastStarTime: number;
	starsCaught: number;
	starsFallen: number;
	fallenLimit: number;
	sand: Phaser.Physics.Arcade.StaticGroup;
	info: Phaser.GameObjects.Text;
	canvas: HTMLCanvasElement;
	constructor() {
		super({
			key: "GameScene"
		})
	}
	init(): void {
		this.delta = 1000;
		this.lastStarTime = 0;
		this.starsCaught = 0;
		this.starsFallen = 0;
		this.fallenLimit = 100;
	}

	preload(): void {
		this.load.setBaseURL(
			"https://raw.githubusercontent.com/mariyadavydova/" +
			"starfall-phaser3-typescript/master/");
		this.load.image("star", "assets/star.png");
		this.load.image("sand", "assets/sand.jpg");
	}
	hi: Phaser.Types.GameObjects.Group.GroupCreateConfig;
	create(): void {
		this.canvas = this.sys.game.canvas;
		this.sand = this.physics.add.staticGroup({
			key: 'sand',
			frameQuantity: this.canvas.width/40
		});
		
		Phaser.Actions.PlaceOnLine(this.sand.getChildren(),
			new Phaser.Geom.Line(20, this.canvas.height-20, this.canvas.width+20, this.canvas.height-20));
		this.sand.refresh();
		this.info = this.add.text(10, 10, '',
			{ font: '24px Arial Bold', fill: '#D3D3D3' });
	}
	update(time: number): void {
		var diff: number = time - this.lastStarTime;
		if (diff > this.delta) {
			this.lastStarTime = time;
			this.delta = 300;
			if (this.delta > 500) {
				this.delta -= 20;
			}
			this.emitStar();
		}
		this.info.text =
			this.starsCaught + " caught - " +
			this.starsFallen + " fallen (max "+ this.fallenLimit +")";
	}
	private onClick(star: Phaser.Physics.Arcade.Image): () => void {
		return function () {
			star.setTint(0x00ff00);
			star.setVelocity(0, 0);
			this.starsCaught += 1;
			this.time.delayedCall(100, function (star: Phaser.Physics.Arcade.Image) {
				star.destroy();
			}, [star], this);
		}
	}
	private onFall(star: Phaser.Physics.Arcade.Image): () => void {
		return function () {
			if(star.active){
			star.active = false;
			star.setTint(0xff0000);
			this.starsFallen += 1;
			this.time.delayedCall(100, function (star: Phaser.Physics.Arcade.Image) {
				star.destroy();
				if (this.starsFallen > this.fallenLimit) {
					this.scene.start("ScoreScene",
						{ starsCaught: this.starsCaught });
				}
			}, [star], this);
		}
		}
	}
	private emitStar(): void {
		var star: Phaser.Physics.Arcade.Image;
		var x = Phaser.Math.Between(25, this.canvas.width-25);
		var y = 26;
		star = this.physics.add.image(x, y, "star");
		star.setDisplaySize(50, 50);
		star.setVelocity(0, 200);
		star.setAcceleration(0, 100);
		star.setInteractive();
		star.on('pointerover', this.onClick(star), this);
		this.physics.add.collider(star, this.sand,
			this.onFall(star), undefined, this);
	}

}