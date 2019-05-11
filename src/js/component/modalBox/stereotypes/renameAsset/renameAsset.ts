import Modal from "../../modalBox";
import * as s from "./renameAsset.css";
import Validator from "../../../../util/validator";

export default class RenameAssetModal extends Modal {
  private renameHeader: JQuery = $("<h5 />").append("Rename");

  private renameBody: JQuery;

  private nameField: JQuery = $("<input />")
    .attr({
      type: "text",
      placeholder: "Asset name"
    })
    .addClass("form-control");
  private errMsg: JQuery = $("<span />").addClass(s.error);

  private applyBtn: JQuery = $("<button />")
    .addClass("btn btn-primary")
    .append("Apply");

  private cancelBtn: JQuery = $("<button />")
    .addClass("btn btn-secondary")
    .attr({ "data-dismiss": "modal" })
    .append("Cancel");

  constructor(
    assetId: string,
    assetName: string,
    renameCaller: (id: string, newName: string) => void
  ) {
    super();
    this.renameBody = $("<div />")
      .append("Please enter a new name for asset '" + assetName + "': ")
      .append("<br />")
      .append(this.errMsg)
      .append("<br />")
      .append(this.nameField);
    super.setHeader(this.renameHeader);
    super.setBody(this.renameBody);
    super.setFooter(
      $("<div />")
        .append(this.cancelBtn)
        .append(" ")
        .append(this.applyBtn)
    );

    this.applyBtn.on("click", () => {
      try {
        let temp = this.nameField.val().toString();
        Validator.validateAssetName(temp);
        renameCaller(assetId, temp);
        super.hideModal();
      } catch (e) {
        this.errMsg.text(e);
      }
    });
  }
}
