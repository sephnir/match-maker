import $ from "jquery";
import GameScreen from "./component/gameScreen";

let gameScreen = new GameScreen(800, 600);

$("body").append(gameScreen.getRender());
