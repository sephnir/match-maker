import IRenderable from "../interface/IRenderable";

import "popper.js";
//import $ = require("jquery");
//import "jquery-ui";

export default class ModalBox implements IRenderable {
  private jqObj: JQuery = $("<div />").addClass("modal");
  private dialog: JQuery = $("<div />").addClass("modal-dialog");
  private content: JQuery = $("<div />").addClass("modal-content");
  private header: JQuery = $("<div />").addClass("modal-header");
  private body: JQuery = $("<div />").addClass("modal-body");
  private footer: JQuery = $("<div />").addClass("modal-footer");

  private data: any;
  private options: {};

  constructor(
    data: JQuery = $([]),
    header: JQuery = $([]),
    body: JQuery = $([]),
    footer: JQuery = $([]),
    options: {} = {}
  ) {
    this.jqObj.append(this.dialog);
    this.dialog.append(this.content);

    this.content.append(this.header);
    this.content.append(this.body);
    this.content.append(this.footer);

    this.data = data;
    this.options = options;

    this.setHeader(header);
    this.setBody(body);
    this.setFooter(footer);
  }

  showModal() {
    this.jqObj.modal(this.options);
    this.jqObj.modal("show");
  }

  setHeader = (jq: JQuery) => {
    this.header.html("");
    this.header.append(jq);
  };

  setBody = (jq: JQuery) => {
    this.body.html("");
    this.body.append(jq);
  };

  setFooter = (jq: JQuery) => {
    this.footer.html("");
    this.footer.append(jq);
  };

  setOptions = (option: {}) => {
    this.jqObj.modal(option);
  };

  clear = () => {
    this.header.html("");
    this.body.html("");
    this.footer.html("");
    this.jqObj.modal();
  };

  getRender = () => {
    return this.jqObj;
  };
}
