import Asset from "./asset";

export default class EntityFactory {
  private asset: Asset[];

  public getAsset(): Asset[] {
    return this.asset;
  }
}
