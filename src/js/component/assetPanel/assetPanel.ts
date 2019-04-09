import * as $ from "jquery";
//import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import IRenderable from "../interface/IRenderable";

import NavBar from "../navbar/navbar";
import SpriteList from "../assetList/spriteList/spriteList";

import * as s from "./assetPanel.css";

export default class AssetPanel implements IRenderable {
  private jqObj: JQuery;
  private assetBody: JQuery;

  private spriteList = new SpriteList();

  constructor() {
    let navbar = new NavBar();
    navbar.addNavItem("Sprite", "spriteAsset", this.tabListener);
    navbar.addNavItem("Background", "bgAsset", this.tabListener);

    this.jqObj = $("<div />").addClass("card");
    this.jqObj.append(navbar.getRender());

    this.assetBody = $("<div />")
      .addClass("card-body")
      .addClass(s.cardBody);
    this.assetBody.append(this.spriteList.getRender());
    this.jqObj.append(this.assetBody);
  }

  private tabListener = (event: any) => {
    //this.assetBody.empty();
    switch (event.name) {
      case 0:
        this.assetBody.append(this.spriteList.getRender());
        break;
    }
  };

  getRender() {
    return this.jqObj;
  }
}
