import * as s from "./spriteList.css";

import * as $ from "jquery";
import IRenderable from "../../../interface/IRenderable";
import SpriteAsset from "../../../../entity/asset/spriteAsset";

export default class SpriteListItem implements IRenderable {
  private jqObj: JQuery;
  private sprite: SpriteAsset;

  constructor(item: SpriteAsset) {
    this.sprite = item;

    this.jqObj = $("<ul></ul>")
      .append(this.sprite.getName())
      .addClass("list-group-item");
  }

  getRender = () => {
    return this.jqObj;
  };
}
