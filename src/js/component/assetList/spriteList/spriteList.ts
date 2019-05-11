import * as s from "./spriteList.css";

import ManageSprAsset from "../../../controller/ManageSpriteAsset";
import IRenderable from "../../interface/IRenderable";
import INotifiable from "../../interface/INotifiable";

import SpriteAsset from "../../../entity/ISpriteAsset";
import SpriteListItem from "./spriteListItem/spriteListItem";
import FileDropListener from "../../../listener/fileDropListener";
import formatter from "../../../util/formatter";

export default class SpriteList implements IRenderable, INotifiable {
  private jqObj: JQuery = $("<div />");
  private searchBar: JQuery = $("<input />");
  private list: JQuery = $("<li />");
  private listCtn: JQuery = $("<div />");

  private itemList: SpriteListItem[] = [];
  private fileListener: FileDropListener;

  constructor() {
    this.jqObj.addClass(s.container);
    this.searchBar.attr({
      type: "text",
      placeholder: "Search"
    });
    this.searchBar.on("keyup paste", this.filter);

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
    this.listCtn.addClass(s.listContainer);

    this.list.addClass("list-group").addClass(s.list);

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
    this.listCtn.append(this.list);

    this.jqObj.append(this.searchBar);
    this.jqObj.append(this.listCtn);

    this.filter();
  };

  relocate = (ev, ui) => {
    let temp = this.list.sortable("toArray", {
      attribute: "data-spriteAssetId"
    });
    ManageSprAsset.relocateSprite(temp);
  };

  filter = () => {
    //let list = this.list;
    //list.empty();

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
    // ManageSprAsset.getSprite({
    //   filter: item => {
    //     return searchRE.test(item.name.toLowerCase());
    //   },
    //   order: "order"
    // }).map(item => {
    //   let temp = new SpriteListItem(item, s.dragHandle);
    //   let tempItem = temp.getRender();
    //   list.append(tempItem);
    // });

    this.itemList.forEach(item => {
      if (searchRE.test(item.getName().toLowerCase())) item.getRender().show();
      else item.getRender().hide();
    });

    //list.sortable("refresh");
  };

  addToList = (item: SpriteAsset) => {
    let temp = new SpriteListItem(item, s.dragHandle);
    this.itemList.push(temp);
    let tempItem = temp.getRender();
    this.list.append(tempItem);
  };

  notify = (event: any, properties: any, senderId: any) => {
    if (event === "add") {
      properties.items.forEach(item => {
        this.notifyAdd(item);
      });
    } else if (event === "update") {
      properties.items.forEach(item => {
        this.notifyUpdate(item);
      });
    }
  };

  notifyAdd(id: string) {
    let temp = ManageSprAsset.getSpriteById(id);
    this.addToList(temp);
  }

  notifyUpdate(id: string) {
    for (let i = 0; i < this.itemList.length; i++) {
      if (this.itemList[i].getId() === id) {
        this.itemList[i].updateEvent(id);
        return;
      }
    }
  }

  getRender = () => {
    return this.jqObj;
  };
}
