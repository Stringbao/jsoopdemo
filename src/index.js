
import gameConfig from "./engine/config.js";
import Game from "./engine/game.js";

window._padding = 9;

let _game = new Game($("#div1"),gameConfig);
_game.init();

