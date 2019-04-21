import * as s from "./spriteListItem.css";

import MouseClickListener from "../../../../listener/mouseClickListener";
import ModalMngr from "../../../../controller/ModalManager";
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
  private mcl = new MouseClickListener(this.jqObj);

  private handleClass: string;

  constructor(sprite: SpriteAsset, handleClass: string) {
    this.name = sprite.name;
    this.image = sprite.image;
    this.id = sprite.id;
    this.handleClass = handleClass;

    this.mcl.setRightEvent(ev => {
      let cursor = ev.originalEvent;
      this.setupContext(cursor.clientX, cursor.clientY);
    });
    this.mcl.setDoubleEvent(() => {
      alert("Double");
    });

    this.init();
  }

  init() {
    this.jqImage.addClass(s.thumbnail).attr("src", this.image);
    this.jqName.text(this.name).addClass(s.label);

    let imageCtn = $("<div />").addClass(s.thumbnailContainer);

    imageCtn.append(this.jqImage);

    let asset = $("<div />")
      .append(imageCtn)
      .append(this.jqName)
      .addClass(s.draghandle);

    let icon = $("<img />").attr({ src: "/img/draggable.svg" });

    let handle = $("<div />")
      .addClass(this.handleClass)
      .append(icon);

    new MouseClickListener(handle);

    this.jqObj
      .append(asset)
      .append(handle)
      .addClass("list-group-item")
      .addClass(s.spriteItem)
      .addClass(s.container)
      .attr({ "data-spriteAssetId": this.id, id: "spritelist_" + this.id })
      .draggable({
        handle: "." + s.draghandle,
        helper: "clone"
      });
  }

  setupContext(x: number, y: number) {
    ModalMngr.contextReset();
    ModalMngr.contextSetPos(x, y);
    ModalMngr.contextAddMenu("Add", () => {});
    ModalMngr.contextAddMenu("Delete", () => {});
    ModalMngr.contextShow();
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
