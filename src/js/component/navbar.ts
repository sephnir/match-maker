import * as $ from "jquery";
import IRenderable from "./interface/IRenderable";

declare module NavItem {
  export interface RootObject {
    name: string;
    id: string;
  }
}

export default class NavBar implements IRenderable {
  private jqObj: JQuery;
  private body: JQuery;

  private navItem: NavItem.RootObject[] = [];

  constructor() {
    this.jqObj = $("<nav />");
    this.body = $("<div />").addClass("nav nav-tabs");
    this.jqObj.append(this.body);
  }

  private update() {
    this.body.empty();
    this.navItem.forEach(item => {
      let temp = $("<li />")
        .addClass("nav nav-tabs")
        .append(
          $("<a />")
            .addClass("nav-item nav-link")
            .html(item.name)
            .attr({ "data-toggle": "tab", role: "tab", href: "#" + item.id })
        );
      this.body.append(temp);
    });
  }

  addNavItem(name: string, id: string) {
    this.navItem.push({ name: name, id: id });
    this.update();
  }

  removeNavItem(name: string) {
    let ind = -1;
    for (let i = 0; i < this.addNavItem.length; i++) {
      if (this.navItem[i].name === name) {
        ind = i;
        break;
      }
    }
    if (ind != -1) this.navItem.splice(ind, 1);
  }

  getRender() {
    return this.jqObj;
  }
}
