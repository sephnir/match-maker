import * as $ from "jquery";
import * as s from "./navbar.css";
import IRenderable from "../interface/IRenderable";

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
    this.jqObj = $("<div />");
    this.body = $("<ul />").addClass("nav nav-tabs");
    this.jqObj.append(this.body);
  }

  update() {
    this.body.empty();
    this.navItem.forEach((item, ind) => {
      let temp = $("<li />")
        .addClass("nav-item")
        .append(
          $("<div />")
            .addClass("nav-link ")
            .addClass(s.navItem)
            .addClass(ind == 0 ? "active" : "")
            .html(item.name)
            .attr({
              "data-toggle": "tab",
              role: "tab",
              href: "#" + item.id
            })
        );
      this.body.append(temp);
    });
  }

  /**
   * Adds a new tab into the current navbar.
   *
   * @param name Text of the nav item.
   * @param id The id to redirect to.
   */
  addNavItem(name: string, id: string) {
    this.navItem.push({ name: name, id: id });
    this.update();
  }

  /**
   * Returns the navitem array.
   *
   * @returns navItem Array
   */
  getNavItem() {
    return this.navItem;
  }

  /**
   * Remove a tab based on provided name
   *
   * @param name
   */
  removeNavItem(name: string) {
    let ind = -1;
    for (let i = 0; i < this.addNavItem.length; i++) {
      if (this.navItem[i].name === name) {
        ind = i;
        break;
      }
    }
    if (ind != -1) this.navItem.splice(ind, 1);
    this.update();
  }

  getRender() {
    return this.jqObj;
  }
}
