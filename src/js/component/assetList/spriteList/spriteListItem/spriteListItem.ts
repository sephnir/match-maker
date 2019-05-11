import * as s from "./spriteListItem.css";

import MouseClickListener from "../../../../listener/mouseClickListener";
import ContextMngr from "../../../../controller/ContextMenuManager";
import IRenderable from "../../../interface/IRenderable";
import SpriteAsset from "../../../../entity/ISpriteAsset";

import SprMngr from "../../../../controller/ManageSpriteAsset";
import ModalMngr from "../../../../controller/ModalBoxManager";
import RenameModal from "../../../modalBox/stereotypes/renameAsset/renameAsset";
import CfmModal from "../../../modalBox/stereotypes/confirmation/confirmation";

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

  /**
   * Initialize sprite list items
   */
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

  /**
   * Initialize context menu for right click.
   *
   * @param x X position of the context menu
   * @param y Y position of the context menu
   */
  setupContext(x: number, y: number) {
    ContextMngr.contextReset();
    ContextMngr.contextSetPos(x, y);
    ContextMngr.contextAddMenu("Rename", this.renameEvent);
    ContextMngr.contextAddMenu("Delete", this.deleteEvent);
    ContextMngr.contextShow();
  }

  renameEvent = () => {
    let modal = new RenameModal(this.id, this.name, SprMngr.renameSprite);
    ModalMngr.initModal(modal);
  };

  deleteEvent = () => {
    let modal = new CfmModal(
      "You are about to delete '" +
        this.name +
        "', are you sure you want to continue?",
      SprMngr.deleteSprite,
      this.id
    );
    ModalMngr.initModal(modal);
  };

  updateEvent = (id: string) => {
    let temp = SprMngr.getSpriteById(id);

    this.setName(temp.name);
    this.setImage(temp.image);
  };

  getId() {
    return this.id;
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
