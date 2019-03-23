import * as PIXI from "pixi.js";
import { RenderableInterface } from "./interface/renderableInterface";

export default class GameScreen implements RenderableInterface {
  private app: PIXI.Application;
  private width: number;
  private height: number;

  /**
   * Constuctor to create a pixi game screen.
   *
   * @param {number} width The width of the game window.
   * @param {number} height The height of the game window.
   */
  constructor(width = 800, height = 600) {
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    this.app = new PIXI.Application(width, height, {
      backgroundColor: 0xeeeeee
    });
    this.width = width;
    this.height = height;

    this.drawFrame();
  }

  /**
   * Draws the outer frame of the screen.
   */
  drawFrame() {
    let gfx_frame = new PIXI.Graphics();
    gfx_frame.beginFill(0xdddddd);
    gfx_frame.lineStyle(1, 0x000000, 1);
    gfx_frame.moveTo(1, 0);
    gfx_frame.lineTo(1, this.height - 1);
    gfx_frame.lineTo(this.width, this.height - 1);
    gfx_frame.lineTo(this.width, 0);
    gfx_frame.lineTo(1, 0);
    gfx_frame.endFill();

    this.app.stage.addChild(gfx_frame);
  }

  /**
   * Get the renderable HTMLElement object.
   *
   * @returns HTMLElement
   */
  getRender() {
    return this.app.view;
  }
}
