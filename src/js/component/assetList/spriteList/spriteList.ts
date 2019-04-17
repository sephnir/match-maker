import * as s from "./spriteList.css";

import ManageSprAsset from "../../../controller/ManageSpriteAsset";
import IRenderable from "../../interface/IRenderable";
import INotifiable from "../../interface/INotifiable";

import SpriteAsset from "../../../entity/ISpriteAsset";

import { EntityType } from "../../../enum/EAssets";
import SpriteListItem from "./spriteListItem/spriteListItem";
import FileDropListener from "../../../listener/fileDropListener";
import formatter from "../../../util/formatter";

export default class SpriteList implements IRenderable, INotifiable {
  private jqObj: JQuery;
  private searchBar: JQuery;
  private list: JQuery;

  private fileListener: FileDropListener;

  constructor() {
    this.jqObj = $("<div />").addClass(s.container);
    this.searchBar = $("<input />").attr({
      type: "text",
      placeholder: "Search"
    });
    this.searchBar.on("keyup paste", this.update);

    this.fileListener = new FileDropListener(this.jqObj, this.fileHandling);
    ManageSprAsset.addObserver(this);
    this.init();
  }

  fileHandling = (file: File, dataurl: string | ArrayBuffer) => {
    let spriteAsset: SpriteAsset = {
      name: file.name,
      image: dataurl.toString()
    };
    ManageSprAsset.uploadSprite(spriteAsset);
  };

  init = () => {
    let listContainer = $("<div />").addClass(s.listContainer);
    this.list = $("<li />")
      .addClass("list-group")
      .addClass(s.list);

    this.list.sortable({
      placeholder: s.listHighlight,
      handle: "." + s.dragHandle,
      scroll: true,
      cursor: "grabbing",
      axis: "y",
      start: function(ev, ui) {
        $(this).attr({ id: "item-" + ui.item.index() });
      },
      update: this.relocate
    });
    listContainer.append(this.list);

    this.jqObj.append(this.searchBar);
    this.jqObj.append(listContainer);

    this.update();
  };

  relocate = (ev, ui) => {
    let temp = this.list.sortable("toArray", { attribute: "data-id" });
    ManageSprAsset.relocateSprite(temp);
  };

  update = () => {
    let list = this.jqObj.find("." + s.list);
    list.empty();

    let searchRE = new RegExp(
      ".*" +
        formatter.escapeRegExp(
          this.searchBar
            .val()
            .toString()
            .toLowerCase()
        ) +
        ".*"
    );
    // Construct the list
    ManageSprAsset.getSprite({
      filter: item => {
        return searchRE.test(item.name.toLowerCase());
      },
      order: "order"
    }).map(item => {
      let temp = new SpriteListItem(item, s.dragHandle);
      let tempItem = temp.getRender();
      list.append(tempItem);
    });

    list.sortable("refresh");
  };

  notify = (types: EntityType) => {
    switch (types) {
      case EntityType.SPRITE_ASSET:
        this.update();
        break;
    }
  };
  getRender = () => {
    return this.jqObj;
  };
}
