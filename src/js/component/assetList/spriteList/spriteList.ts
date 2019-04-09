/// <reference path = "../../../declare.d.ts" />
import * as s from "./spriteList.css";

import * as $ from "jquery";
import EF from "../../../entity/entityFactory";
import ManageSprAsset from "../../../controller/ManageSpriteAsset";
import IRenderable from "../../interface/IRenderable";
import INotifiable from "../../interface/INotifiable";

import "../../../enum/EEntity";
import SpriteListItem from "./spriteListItem/spriteListItem";
import FileListener from "../../../listener/fileListener";

export default class SpriteList implements IRenderable, INotifiable {
  private jqObj: JQuery;
  private spriteItemArr: SpriteListItem[];
  private fileListener: FileListener;

  constructor() {
    this.jqObj = $("<div />").addClass(s.container);
    this.fileListener = new FileListener(this.jqObj, this.fileHandling);

    ManageSprAsset.addSprite("Test", "", undefined);
    ManageSprAsset.addSprite("Test1", "", undefined);
    ManageSprAsset.addSprite("Test2", "", undefined);
    ManageSprAsset.addSprite("Test3", "", undefined);

    this.refetch();
  }

  fileHandling(file: File, dataurl: string | ArrayBuffer) {
    console.log(file.name);
    console.log(dataurl);
  }

  refetch() {
    this.jqObj.empty();

    let list = this.jqObj
      .append($("<li></li>").addClass("list-group"))
      .find("li");

    EF.getSpriteAsset().map(item => {
      // this.spriteItemArr.push(
      //   new SpriteListItem(item)
      // );

      let temp = $("<ul></ul>")
        .append(item.getName())
        .addClass("list-group-item");
      list.append(temp);
    });
  }

  notify(types: EntityType) {
    switch (types) {
      case EntityType.SPRITE_ASSET:
        this.refetch();
    }
  }
  getRender() {
    return this.jqObj;
  }
}
