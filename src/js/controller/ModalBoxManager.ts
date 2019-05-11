import Modal from "../component/modalBox/modalBox";

export default class ModalBoxMngr {
  static modal = new Modal();

  static modalGetRender() {
    return this.modal.getRender();
  }

  static initModal(modal: Modal = new Modal()) {
    this.modal = modal;
    this.modalShow();
  }

  static modalSetContent(headerJQ: JQuery, bodyJQ: JQuery, footerJQ: JQuery) {
    this.modal.clear();
    this.modal.setHeader(headerJQ);
    this.modal.setBody(bodyJQ);
    this.modal.setFooter(footerJQ);
  }

  static modalShow() {
    this.modal.showModal();
  }

  static modalClear() {
    this.modal.clear();
  }

  static modalSetHeader(jq: JQuery) {
    this.modal.setHeader(jq);
  }

  static modalSetBody(jq: JQuery) {
    this.modal.setBody(jq);
  }

  static modalSetFooter(jq: JQuery) {
    this.modal.setFooter(jq);
  }
}
