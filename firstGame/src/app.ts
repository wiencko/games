import * as Phaser from 'phaser';

import { GameScene } from "./gameScene";
import { ScoreScene } from "./scoreScene";
import { WelcomeScene } from "./welcomeScene";

const config: Phaser.Types.Core.GameConfig = {
	title: "Starfall",
	width: window.innerWidth,
	height: window.innerHeight,
	parent: "game",
	type: Phaser.AUTO,
	fps: {
		min: 5,
		target: 60
	},
	scene: [WelcomeScene, GameScene, ScoreScene],
	physics: {
		default: "arcade",
		arcade: {
			debug: false
		}
	},
	backgroundColor: "#000033"
};
export class StarfallGame extends Phaser.Game {
	constructor(config: Phaser.Types.Core.GameConfig) {
		super(config);
	}
}
window.onload = () => {
	var game = new StarfallGame(config);
};

