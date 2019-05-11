export default class Validator {
  /**
   * Validate format of asset name.
   * @param name Asset name.
   * @returns Error message. Undefined if validation passes.
   */
  static validateAssetName(name: string) {
    if (name === undefined || name === null || name.replace(/ /g, "") === "")
      throw "Name cannot be empty.";
    if (
      /^(?!\.)(?!com[0-9]$)(?!con$)(?!lpt[0-9]$)(?!nul$)(?!prn$)[^\|*\?\\:<>/$"]*[^\.\|*\?\\:<>/$"]+$/.test(
        name
      ) === false
    ) {
      throw "Please ensure that asset name is within Windows' file naming convention.";
    }
  }
}
