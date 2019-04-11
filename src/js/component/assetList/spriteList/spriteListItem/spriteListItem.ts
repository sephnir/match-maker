import * as s from "./spriteListItem.css";

import * as $ from "jquery";
import IRenderable from "../../../interface/IRenderable";
import SpriteAsset from "../../../../entity/asset/spriteAsset";

export default class SpriteListItem implements IRenderable {
  private jqObj: JQuery;
  private sprite: SpriteAsset;

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

    this.jqObj = $("<ul />")
      .append(imageCtn)
      .append("&nbsp;")
      .append(label)
      .addClass("list-group-item")
      .addClass(s.spriteItem);
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
