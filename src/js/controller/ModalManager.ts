import ContextMenu from "../component/contextMenu/contextMenu";

export default class ModalManager {
  static contextMenu = new ContextMenu();

  static contextReset() {
    this.contextMenu.clearOptions();
  }

  static contextHide() {
    this.contextMenu.getRender().hide();
  }

  static contextShow() {
    this.contextMenu.getRender().show();
  }

  static contextAddMenu(
    label: string,
    callback: (event: any, data: {}) => void
  ) {
    this.contextMenu.addOption(label, callback);
  }

  static contextSetPos(x: number, y: number) {
    this.contextMenu.setPosition(x, y);
  }

  static contextGetRender() {
    return this.contextMenu.getRender();
  }
}
