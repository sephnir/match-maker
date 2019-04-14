import Sprite from "../entity/asset/spriteAsset";
import INotifiable from "../component/interface/INotifiable";
import EF from "../entity/entityFactory";

import * as PIXI from "pixi.js";

import "../enum/EEntity";

export default class ManageSpriteAsset {
  private static observer: INotifiable[] = [];

  /**
   * Notifies all notifiable components that are observing "sprite assets".
   */
  private static update(): void {
    this.observer.forEach(o => {
      o.notify(EntityType.SPRITE_ASSET);
    });
  }

  /**
   * Add a new observer.
   * @param obj Notifiable components.
   */
  static addObserver(obj: INotifiable) {
    this.observer.push(obj);
  }

  /**
   * Create a new sprite asset instance.
   * @param name Name of the sprite asset. (used as file name).
   * @param uri Base64 representation of buffer.
   * @param texture PIXI texture object.
   */
  static addSprite(
    name: string,
    uri: string,
    texture: PIXI.BaseTexture = undefined
  ) {
    let temp = new Sprite(name, uri, texture);
    EF.getSpriteAsset().push(temp);
    this.update();
  }

  /**
   * Depreciated.
   * @param file
   */
  static uploadHandling(file) {
    let temp = file.name
      .split(".")
      .slice(0, -1)
      .join(".");
    let dupeCheck = false;

    if (
      file.type !== "image/png" &&
      file.type !== "image/gif" &&
      file.type !== "image/jpeg"
    ) {
      alert(
        "Invalid file type. Only PNG/GIF/JPEG files are accepted. Please try again."
      );
      return;
    }
    do {
      dupeCheck = false;
      //assets.getSpriteList().forEach(function (item, index, arr)
      for (let i = 0; i < EF.getSpriteAsset().length; i++) {
        if (
          temp === undefined ||
          temp === null ||
          temp.replace(/ /g, "") === ""
        )
          return;
        if (
          EF.getSpriteAsset()
            [i].getName()
            .toUpperCase() === temp.toUpperCase()
        ) {
          temp = prompt(
            "Duplicate asset name found for '" +
              file.name +
              "'.\nPlease type in a new name:"
          );
          dupeCheck = true;
        }
      }
    } while (dupeCheck);

    if (temp === undefined || temp === null || temp.replace(/ /g, "") === "")
      return;

    this.addSprite(temp, file.uri, undefined);
  }
}
