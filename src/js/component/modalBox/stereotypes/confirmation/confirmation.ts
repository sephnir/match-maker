import Modal from "../../modalBox";

export default class Confirmation extends Modal {
  private cfmHeader: JQuery = $("<h5 />").append("Delete");

  private cfmBody: JQuery;

  private cfmBtn: JQuery = $("<button />")
    .addClass("btn btn-primary")
    .append("Confirm");

  private cancelBtn: JQuery = $("<button />")
    .addClass("btn btn-secondary")
    .attr({ "data-dismiss": "modal" })
    .append("Cancel");

  constructor(message: string, callback: (any) => void, callbackParams: any) {
    super();

    this.cfmBody = $("<div />").append(message);
    super.setHeader(this.cfmHeader);
    super.setBody(this.cfmBody);
    super.setFooter(
      $("<div />")
        .append(this.cancelBtn)
        .append(" ")
        .append(this.cfmBtn)
    );

    this.cfmBtn.on("click", () => {
      callback(callbackParams);
      super.hideModal();
    });
  }

  customizeCfmBtn(text: string, className: string) {
    this.cfmBtn.text(text).attr({ class: "btn " + className });
  }
}
