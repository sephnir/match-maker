import * as s from "./spriteListItem.css";

import * as $ from "jquery";
import "jqueryui";
import IRenderable from "../../../interface/IRenderable";
import SpriteAsset from "../../../../entity/asset/spriteAsset";

//const dragLogo = require("../../../../../img/draggable.svg") as string;

export default class SpriteListItem implements IRenderable {
  private jqObj: JQuery;
  private sprite: SpriteAsset;

  private handleClass: string = "";

  constructor(item: SpriteAsset) {
    this.sprite = item;

    this.update();
  }

  update() {
    let imageCtn = $("<div />").addClass(s.thumbnailContainer);

    let image = $("<img />")
      .addClass(s.thumbnail)
      .attr("src", this.sprite.getImage());

    imageCtn.append(image);

    let label = $("<div />")
      .append(this.sprite.getName())
      .addClass(s.label);

    let handle = $("<img />")
      //.attr({ src: dragLogo })
      .addClass(this.handleClass);

    this.jqObj = $("<ul />")
      .append(imageCtn)
      .append("&nbsp;")
      .append(label)
      .addClass("list-group-item")
      .addClass(s.spriteItem);
  }

  setDraggableHandleClass(className: string) {}

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
