import SpriteAsset from "./asset/spriteAsset";

export default class EntityFactory {
  static spriteAsset: SpriteAsset[] = [];

  static getSpriteAsset(): SpriteAsset[] {
    return EntityFactory.spriteAsset;
  }
}
