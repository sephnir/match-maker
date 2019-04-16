import { DataSet } from "vis";
import SpriteAsset from "./ISpriteAsset";

export default class EntityFactory {
  static spriteAsset: DataSet<SpriteAsset> = new DataSet({
    fieldId: "id"
  });
}
