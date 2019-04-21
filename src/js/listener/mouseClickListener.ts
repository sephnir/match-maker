export default class MouseClickListener {
  private ref: JQuery;
  private leftEvent: (ev: any) => void;
  private rightEvent: (ev: any) => void;
  private doubleEvent: (ev: any) => void;

  private delay = 400;
  private clickCount = 0;
  private timer = null;

  constructor(ref: JQuery) {
    this.ref = ref;
    this.ref
      .bind("click", this.checkLeft)
      .bind("dblclick", function(e) {
        e.preventDefault();
      })
      .bind("contextmenu", this.checkRight);
  }

  setLeftEvent = (callback: (ev: any) => void) => {
    this.leftEvent = callback;
  };

  setRightEvent = (callback: (ev: any) => void) => {
    this.rightEvent = callback;
  };

  setDoubleEvent = (callback: (ev: any) => void) => {
    this.doubleEvent = callback;
  };

  private checkRight = ev => {
    ev.stopPropagation();
    ev.preventDefault();
    if (this.rightEvent) this.rightEvent(ev);
  };

  private checkLeft = ev => {
    ev.stopPropagation();
    ev.preventDefault();
    this.clickCount++;

    if (this.clickCount === 1) {
      if (!this.doubleEvent) {
        if (this.leftEvent) this.leftEvent(ev);
      } else {
        this.timer = setTimeout(() => {
          if (this.leftEvent) this.leftEvent(ev);

          this.clickCount = 0;
        }, this.delay);
      }
    } else {
      clearTimeout(this.timer);
      if (this.doubleEvent) this.doubleEvent(ev);
      else if (this.leftEvent) this.leftEvent(ev);

      this.clickCount = 0;
    }
  };
}
