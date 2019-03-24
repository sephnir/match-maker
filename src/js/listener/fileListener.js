import * as Filedrop from "filedrop";
import $ from "jquery";
import { fdatasync } from "fs";

export default class FileListener {
  constructor(ref) {
    if (typeof ref === "string") {
      this.fd = new Filedrop(ref);
    }
  }

  drop() {
    this.fd.event("send", files => {
      files.images().each(function(file) {
        file.readDataURI(
          uri => {
            uploadHandling();
          },
          error => {}
        );
      });
    });
  }
}
