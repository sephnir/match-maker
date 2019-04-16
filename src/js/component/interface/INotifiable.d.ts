import "../../enum/EEntity";

export default interface INotifiable {
  /**
   * Notify the current component regarding new updates on entity.
   */
  notify: (types: EntityType) => void;
}
