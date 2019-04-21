import IRenderable from "../interface/IRenderable";
import * as s from "./contextMenu.css";

export default class ContextMenu implements IRenderable {
  private jqObj: JQuery = $("<div />");
  private menu: JQuery = $("<div />");

  constructor() {
    this.jqObj
      .addClass(s.background)
      .on("click", function(ev) {
        $(this).hide();
      })
      .hide();
    this.menu.addClass("list-group").addClass(s.menu);

    this.jqObj.append(this.menu);
  }

  addOption = (
    label: string,
    callback: (event: any, data: {}) => void,
    data?: {}
  ) => {
    let temp = $("<a />");
    temp
      .addClass(s.menuitem)
      .addClass("list-group-item list-group-item-action")
      .text(label)
      .on("click contextmenu", event => {
        callback(event, data);
      });

    this.menu.append(temp);
  };

  clearOptions = () => {
    this.menu.empty();
  };

  setPosition = (x, y) => {
    this.menu.css({ left: x, top: y });
  };

  getRender = () => {
    return this.jqObj;
  };
}
