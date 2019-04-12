/// <reference path = "../../../declare.d.ts" />
import * as s from "./spriteList.css";

import * as $ from "jquery";
import "jqueryui";
import EF from "../../../entity/entityFactory";
import ManageSprAsset from "../../../controller/ManageSpriteAsset";
import IRenderable from "../../interface/IRenderable";
import INotifiable from "../../interface/INotifiable";

import "../../../enum/EEntity";
import SpriteListItem from "./spriteListItem/spriteListItem";
import FileDropListener from "../../../listener/fileDropListener";
import formatter from "../../../util/formatter";

export default class SpriteList implements IRenderable, INotifiable {
  private jqObj: JQuery;
  private spriteItemArr: SpriteListItem[];
  private fileListener: FileDropListener;

  constructor() {
    this.jqObj = $("<div />").addClass(s.container);
    this.fileListener = new FileDropListener(this.jqObj, this.fileHandling);
  }

  fileHandling = (file: File, dataurl: string | ArrayBuffer) => {
    ManageSprAsset.addSprite(
      formatter.removeExt(file.name),
      dataurl.toString(),
      undefined
    );
    this.update();
  };

  update = () => {
    this.jqObj.empty();

    let list = $("<li />").addClass("list-group");

    EF.getSpriteAsset().map(item => {
      let temp = new SpriteListItem(item, s.dragHandle);
      list.append(temp.getRender());
    });

    list.sortable({
      placeholder: s.listHighlight,
      axis: "y",
      handle: "." + s.dragHandle,
      scroll: true
    });

    this.jqObj.append(list);
  };

  notify = (types: EntityType) => {
    switch (types) {
      case EntityType.SPRITE_ASSET:
        this.update();
    }
  };
  getRender = () => {
    return this.jqObj;
  };
}
