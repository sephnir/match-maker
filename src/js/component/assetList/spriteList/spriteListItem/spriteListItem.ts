import * as s from "./spriteListItem.css";

import IRenderable from "../../../interface/IRenderable";
import SpriteAsset from "../../../../entity/ISpriteAsset";

export default class SpriteListItem implements IRenderable {
  private jqObj: JQuery;
  private name: string;
  private image: string;
  private id: string;

  private handleClass: string;

  constructor(sprite: SpriteAsset, handleClass: string) {
    this.name = sprite.name;
    this.image = sprite.image;
    this.id = sprite.id;
    this.handleClass = handleClass;
    this.jqObj = $("<ul />")
      .addClass(s.container)
      .attr("data-id", this.id);
    this.update();
  }

  update() {
    this.jqObj.empty();

    let imageCtn = $("<div />").addClass(s.thumbnailContainer);

    let image = $("<img />")
      .addClass(s.thumbnail)
      .attr("src", this.image);

    imageCtn.append(image);

    let label = $("<div />")
      .append(this.name)
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

  getRender = () => {
    return this.jqObj;
  };
}
