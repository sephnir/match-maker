export default interface INotifiable {
  /**
   * Notify the current component regarding new updates on entity.
   * @param event
   * @param properties
   * @param senderId
   */
  notify(
    event: "add" | "update" | "remove",
    properties?: { items: []; oldData?: []; data?: [] },
    senderId?: string | number
  ): void;
}
