import * as $ from "jquery";
import GameScreen from "./component/gameScreen";
import SpriteList from "./component/spriteList";
import "./editor.css";

let gameScreen = new GameScreen(800, 600);
let spriteList = new SpriteList();

$("body").append(gameScreen.getRender());
$("body").append(spriteList.getRender());
