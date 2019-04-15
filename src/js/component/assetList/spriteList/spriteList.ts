import * as s from "./spriteList.css";

//import $ = require("jquery");
//import "jquery-ui";
import EF from "../../../entity/entityFactory";
import ManageSprAsset from "../../../controller/ManageSpriteAsset";
import IRenderable from "../../interface/IRenderable";
import INotifiable from "../../interface/INotifiable";

import "../../../enum/EEntity";
import SpriteListItem from "./spriteListItem/spriteListItem";
import FileDropListener from "../../../listener/fileDropListener";
import formatter from "../../../util/formatter";
import { EntityQuery } from "../../../util/entityQuery";

export default class SpriteList implements IRenderable, INotifiable {
  private jqObj: JQuery;
  private searchBar: JQuery;

  private spriteItemArr: SpriteListItem[];
  private fileListener: FileDropListener;

  constructor() {
    this.jqObj = $("<div />").addClass(s.container);
    this.searchBar = $("<input />").attr({
      type: "text",
      placeholder: "Search"
    });
    this.searchBar.on("keyup paste", this.update);

    this.fileListener = new FileDropListener(this.jqObj, this.fileHandling);
    this.init();
  }

  fileHandling = (file: File, dataurl: string | ArrayBuffer) => {
    let nameFormatted = EntityQuery.getDupeName(
      EF.getSpriteAsset(),
      formatter.removeExt(file.name)
    );

    ManageSprAsset.addSprite(nameFormatted, dataurl.toString(), undefined);
    this.update();
  };

  init = () => {
    let listContainer = $("<div />").addClass(s.listContainer);
    let list = $("<li />")
      .addClass("list-group")
      .addClass(s.list);

    list.sortable({
      placeholder: s.listHighlight,
      handle: "." + s.dragHandle,
      scroll: true,
      cursor: "grabbing",
      axis: "y",
      start: function(ev, ui) {
        $(this).data("previndex", ui.item.index());
      },
      update: this.relocate
    });
    listContainer.append(list);

    this.jqObj.append(this.searchBar);
    this.jqObj.append(listContainer);

    this.update();
  };

  relocate(ev, ui) {
    // gets the new and old index then removes the temporary attribute
    var newIndex = ui.item.index();
    var oldIndex = $(this).data("previndex");

    EntityQuery.relocate(EF.getSpriteAsset(), oldIndex, newIndex);

    $(this).removeAttr("data-previndex");
  }

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
    EF.getSpriteAsset().map(item => {
      if (searchRE.test(item.getName().toLowerCase())) {
        let temp = new SpriteListItem(item, s.dragHandle);
        let tempItem = temp.getRender();
        list.append(tempItem);
      }
    });

    list.sortable("refresh");
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
