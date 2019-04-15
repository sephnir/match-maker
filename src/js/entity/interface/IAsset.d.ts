export default interface Asset {
  /**
   * Get the name of the asset.
   * @returns Name of the asset.
   */
  getName: () => string;

  setName: (name: string) => void;
}
