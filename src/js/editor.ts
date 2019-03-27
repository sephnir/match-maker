import * as $ from "jquery";
import GameScreen from "./component/gameScreen";
import AssetPanel from "./component/assetPanel";
import * as s from "./editor.css";

let gameScreen = new GameScreen(800, 600);
let assetPanel = new AssetPanel();

$("#loader").empty();

var body = $("body").addClass(
  "d-flex justify-content-center jumbotron vertical-center"
);

var container = $("<div />")
  //.addClass("container")
  .addClass(s.flexbox);

var row = $("<div />").addClass("row");

var col: JQuery[] = [];
col.push(
  $("<div />")
    //.addClass("col")
    .addClass(s.flexdivItem)
    .append(gameScreen.getRender())
);
col.push(
  $("<div />")
    //.addClass("col")
    .addClass(s.flexdivItem)
    .append(assetPanel.getRender())
);

col.forEach(item => {
  row.append(item);
});

row.append(col);

container.append(row);
body.append(container);
