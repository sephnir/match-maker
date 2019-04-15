import * as s from "./spriteListItem.css";

//import j = require("jquery");
import IRenderable from "../../../interface/IRenderable";
import SpriteAsset from "../../../../entity/asset/spriteAsset";

//const dragLogo = require("../../../../../img/draggable.svg") as string;

export default class SpriteListItem implements IRenderable {
  private jqObj: JQuery;
  private sprite: SpriteAsset;

  private handleClass: string;

  constructor(item: SpriteAsset, handleClass: string = "") {
    this.sprite = item;
    this.handleClass = handleClass;
    this.jqObj = $("<ul />").addClass(s.container);
    this.update();
  }

  update() {
    this.jqObj.empty();

    let imageCtn = $("<div />").addClass(s.thumbnailContainer);

    let image = $("<img />")
      .addClass(s.thumbnail)
      .attr("src", this.sprite.getImage());

    imageCtn.append(image);

    let label = $("<div />")
      .append(this.sprite.getName())
      .addClass(s.label);

    let icon = $("<img />").attr({ src: "/img/draggable.svg" });
    //.addClass("dragHandle");

    let handle = $("<div />")
      .addClass(this.handleClass)
      .append(icon);

    this.jqObj
      .append(imageCtn)
      .append(label)
      .append(handle)
      .addClass("list-group-item")
      .addClass(s.spriteItem);
  }

  setDraggableHandleClass(className: string) {
    this.handleClass = className;
    this.update();
  }

  getSprite() {
    return this.sprite;
  }

  setSprite(sprite: SpriteAsset) {
    this.sprite = sprite;
    this.update();
  }

  getRender = () => {
    return this.jqObj;
  };
}
