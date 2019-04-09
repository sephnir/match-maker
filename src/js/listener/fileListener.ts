export default class FileListener {
  private dropEvent: (file: File, dataurl: string | ArrayBuffer) => void;

  constructor(
    ref: JQuery,
    dropEvent: (file: File, dataurl: string | ArrayBuffer) => void
  ) {
    ref.bind("drop", this.drop);
    this.dropEvent = dropEvent;
  }

  private drop = ev => {
    ev.preventDefault();
    ev.stopPropagation();

    let files = ev.originalEvent.dataTransfer.files || ev.originalEvent.files;
    let reader: FileReader[] = [];
    for (let i = 0; i < files.length; i++) {
      reader[i] = new FileReader();
      reader[i].onload = e => {
        this.dropEvent(files[i], reader[i].result);
      };
      reader[i].readAsDataURL(files[i]);
    }
  };
}
