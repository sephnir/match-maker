export default class className {
  /**
   * Takes in a name of the file and remove the extension.
   * @param filename Name of the file that includes an extension.
   */
  static removeExt(filename: string) {
    let temp = filename;
    return temp.replace(/\.[^/.]+$/, "");
  }

  /**
   * Takes in a string and return the string with escaped characters. For use with regex.
   * @param text Text for processing.
   */
  static escapeRegExp(text: string) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
}
