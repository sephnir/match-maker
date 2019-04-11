export default interface IRenderable {
  /**
   * Updates the render after changes to its items.
   */
  update: () => void;

  /**
   * Get the renderable JQuery object.
   *
   * @returns JQuery
   */
  getRender: () => JQuery;
}
