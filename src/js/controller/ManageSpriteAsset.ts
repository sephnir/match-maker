import INotifiable from "../component/interface/INotifiable";
import SpriteAsset from "../entity/ISpriteAsset";
import EF from "../entity/entityFactory";
import formatter from "../util/formatter";
import Validator from "../util/validator";

export default class ManageSpriteAsset {
  private static observer: INotifiable[] = [];

  /**
   * Add a new observer.
   * @param obj Notifiable components.
   */
  static addObserver(obj: INotifiable) {
    EF.spriteAsset.on("*", obj.notify);
  }

  /**
   * Remove extension from name and create a new sprite asset instance.
   * @param name File name of the sprite asset.
   * @param image Base64 representation of buffer.
   */
  static uploadSprite(spriteAsset: SpriteAsset) {
    let clone = spriteAsset;
    let tempName = formatter.removeExt(clone.name);
    clone.name = tempName;

    this.addSprite(spriteAsset);
  }

  /**
   * Create a new sprite asset instance.
   * @param name Name of the sprite asset.
   * @param image Base64 representation of buffer.
   */
  static async addSprite(spriteAsset: SpriteAsset) {
    let clone = spriteAsset;
    let tempName = this.dupeName(clone.name);
    clone.name = tempName;
    if (!clone.order) clone.order = EF.spriteAsset.length + 1;

    EF.spriteAsset.add(clone);

    //this.update();
  }

  /**
   * Format name string with duplicate numbering appended.
   * @param name Name of the entity instance.
   * @returns New name after modification.
   */
  static dupeName(name: string): string {
    let dupe = false;
    let count = 0;
    let nameMod = name;

    do {
      dupe = this.checkNameDupe(nameMod);

      if (dupe) {
        count++;
        nameMod = name + "(" + count + ")";
      }
    } while (dupe);

    return nameMod;
  }

  /**
   * Check if the asset name already exists.
   * @param name Name to check.
   */
  static checkNameDupe(name: string): boolean {
    let dupe = false;
    dupe =
      EF.spriteAsset.get({
        filter: item => {
          return item.name == name;
        }
      }).length > 0;

    return dupe;
  }

  /**
   * Rename the id referenced asset's name.
   * @param id Unique id of the asset to rename.
   * @param name New name of the asset.
   */
  static renameSprite(id: string, name: string) {
    if (ManageSpriteAsset.checkNameDupe(name)) throw "Name already existed.";
    EF.spriteAsset.update({ id: id, name: name });
  }

  static deleteSprite(id: string) {
    EF.spriteAsset.remove(id);
  }

  static relocateSprite(idArray: string[]) {
    let temp: { id: string; order: number }[] = [];
    idArray.forEach((id, order) => {
      temp.push({ id: id, order: order });
    });
    EF.spriteAsset.update(temp);
  }

  static getSprite(option?: {}): SpriteAsset[] {
    if (option) return EF.spriteAsset.get(option);
    else return EF.spriteAsset.get();
  }

  static getSpriteById(id: string, option?: {}) {
    let result = EF.spriteAsset.get(id, option);
    return result;
  }
}
