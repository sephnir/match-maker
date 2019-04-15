import * as PIXI from "pixi.js";
//import $ = require("jquery");
import IRenderable from "../interface/IRenderable";

import * as s from "./gameScreen.css";

export default class GameScreen implements IRenderable {
  private app: PIXI.Application;
  private width: number;
  private height: number;

  /**
   * Constuctor to create a pixi game screen.
   *
   * @param {number} width The width of the game window.
   * @param {number} height The height of the game window.
   */
  constructor(width: number = 800, height: number = 600) {
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

  update() {}

  getRender() {
    return $(this.app.view).addClass(s.container);
  }
}
