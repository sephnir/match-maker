import Asset from "../asset";
import IEntity from "../interface/IEntity";
import IAsset from "../interface/IAsset";
import * as PIXI from "pixi.js";

export default class SpriteAsset extends Asset implements IEntity, IAsset {
  private static spriteAssetSID = 0;

  private spriteAssetId: number;
  private image: string;
  private texture: PIXI.BaseTexture;

  constructor(
    imageName: string = "",
    imageData: string = "",
    pixiTexture: PIXI.BaseTexture = undefined
  ) {
    super(imageName);

    SpriteAsset.spriteAssetSID++;
    this.spriteAssetId = SpriteAsset.spriteAssetSID;

    this.image = imageData;
    this.texture = pixiTexture;
  }

  public getImage(): string {
    return this.image;
  }

  public setImage(image: string): void {
    this.image = image;
  }

  public getTexture(): PIXI.BaseTexture {
    return this.texture;
  }

  public setTexture(texture: PIXI.BaseTexture): void {
    this.texture = texture;
  }

  public getId() {
    return this.spriteAssetId;
  }
}
