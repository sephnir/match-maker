import "../../enum/EEntity";

export default interface INotifiable {
  notify: (types: EntityType) => void;
}
