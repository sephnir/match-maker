import * as $ from "jquery";
//import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import IRenderable from "./interface/IRenderable";

import NavBar from "./navbar";
import SpriteList from "./assetList/spriteList";

import * as s from "./assetPanel.css";

export default class AssetPanel implements IRenderable {
  private jqObj: JQuery;
  private body: JQuery;

  constructor() {
    let navbar = new NavBar();
    navbar.addNavItem("Sprite", "spriteAsset",this.tabListener;
    navbar.addNavItem("Background", "bgAsset",this.tabListener);

    this.jqObj = $("<div />").addClass("card");
    this.jqObj.append(navbar.getRender());

    this.body = $("<div />")
      .addClass("card-body")
      .addClass(s.cardBody);
    this.body.append(new SpriteList().getRender());
    this.jqObj.append(this.body);
  }

  tabListener=(item:any,ind:number)=>{

  }

  getRender() {
    return this.jqObj;
  }
}
