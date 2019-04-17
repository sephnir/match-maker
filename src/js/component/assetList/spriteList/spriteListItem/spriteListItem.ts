import * as s from "./spriteListItem.css";

import IRenderable from "../../../interface/IRenderable";
import SpriteAsset from "../../../../entity/ISpriteAsset";

export default class SpriteListItem implements IRenderable {
  private jqObj: JQuery = $("<ul />");
  private jqImage: JQuery = $("<img />");
  private jqName: JQuery = $("<div />");

  private name: string;
  private image: string;
  private id: string;

  private display: boolean = true;

  private handleClass: string;

  constructor(sprite: SpriteAsset, handleClass: string) {
    this.name = sprite.name;
    this.image = sprite.image;
    this.id = sprite.id;
    this.handleClass = handleClass;

    this.init();
  }

  init() {
    this.jqObj
      .addClass(s.container)
      .attr({ "data-spriteAssetId": this.id, id: "spritelist_" + this.id });
    this.jqImage.addClass(s.thumbnail).attr("src", this.image);
    this.jqName.text(this.name).addClass(s.label);

    let imageCtn = $("<div />").addClass(s.thumbnailContainer);

    imageCtn.append(this.jqImage);

    let icon = $("<img />").attr({ src: "/img/draggable.svg" });
    //.addClass("dragHandle");

    let handle = $("<div />")
      .addClass(this.handleClass)
      .append(icon);

    this.jqObj
      .append(imageCtn)
      .append(this.jqName)
      .append(handle)
      .addClass("list-group-item")
      .addClass(s.spriteItem);
  }

  setName(name: string) {
    this.name = name;
    this.jqName.text(name);
  }

  getName() {
    return this.name;
  }

  setImage(image: string) {
    this.image = image;
    this.jqImage.attr("src", image);
  }

  getImage() {
    return this.image;
  }

  getRender = () => {
    return this.jqObj;
  };
}
