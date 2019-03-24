import * as $ from "jquery";
import EF from "../entity/entityFactory";
import ManageSprAsset from "../controller/ManageSpriteAsset";
import IRenderable from "./interface/IRenderable";
import INotifiable from "./interface/INotifiable";
import "../enum/EEntity";

export default class SpriteList implements IRenderable, INotifiable {
  private jqObj: JQuery;

  constructor() {
    this.jqObj = $("<div><div>");

    ManageSprAsset.addSprite("Test", "", undefined);
    ManageSprAsset.addSprite("Test1", "", undefined);
    ManageSprAsset.addSprite("Test2", "", undefined);
    ManageSprAsset.addSprite("Test3", "", undefined);

    this.refetch();
  }

  refetch() {
    EF.getSpriteAsset().map(item => {
      this.jqObj.append(item.getName() + "<br />");
    });
  }

  notify(types: EntityType) {
    this.refetch();
  }
  getRender() {
    return this.jqObj;
  }
}
