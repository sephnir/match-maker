import IEntity from "./interface/IEntity";

export default class Asset implements IEntity {
  private static assetSID = 0;

  private assetID: number;
  private name: string;

  constructor(name: string = "") {
    Asset.assetSID++;
    this.assetID = Asset.assetSID;
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getId() {
    return this.assetID;
  }
}
