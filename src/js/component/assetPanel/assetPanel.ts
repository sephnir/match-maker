//import $ = require("jquery");
//import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import IRenderable from "../interface/IRenderable";

import NavBar from "../navbar/navbar";
import SpriteList from "../assetList/spriteList/spriteList";

import * as s from "./assetPanel.css";

export default class AssetPanel implements IRenderable {
  private navbar = new NavBar();

  private jqObj: JQuery;
  private assetBody: JQuery;
  private tabList: { name: string; id: string; renderable: IRenderable }[];

  constructor() {
    this.initId();

    this.tabList.forEach(tab => {
      this.navbar.addNavItem(tab.name, tab.id);
    });

    this.update();
  }

  private initId = () => {
    this.tabList = [];
    this.tabList.push({
      name: "Sprite",
      id: "spriteAsset",
      renderable: new SpriteList()
    });
    //this.tabList.push({ name: "Background", id: "bgAsset", render: null });
  };

  update() {
    this.jqObj = $("<div />")
      .addClass("card")
      .addClass(s.container);
    this.jqObj.append(this.navbar.getRender());

    this.assetBody = $("<div />")
      .addClass("card-body tab-content")
      .addClass(s.cardBody);

    this.tabList.forEach(tab => {
      let temp = $("<div />");
      temp.attr({ id: tab.id });
      temp.append(tab.renderable.getRender());

      this.assetBody.append(temp);
    });

    this.jqObj.append(this.assetBody);
  }

  getRender() {
    return this.jqObj;
  }
}
