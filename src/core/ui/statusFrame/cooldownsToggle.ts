import { ui } from '../init';
import { Toggle } from './toggle';

export class CooldownsToggle extends Toggle {
  private readonly _disableVar: string;
  private readonly _disableValueVar: string;
  private _lastCooldowns = 0;

  constructor(
    eVar: string,
    disableVar: string,
    disableValueVar: string,
    label: string
  ) {
    super(eVar, label);

    this._disableVar = disableVar;
    this._disableValueVar = disableValueVar;

    awful.addUpdateCallback(() => this.Update());
  }

  public Invert(): void {
    if (!this.Enabled()) {
      this._lastCooldowns = awful.time;
    }
    super.Invert();
  }

  private Update(): void {
    if (
      this.Enabled() &&
      ui.settings.get(this._disableVar) &&
      awful.time - this._lastCooldowns >
        (ui.settings.get(this._disableValueVar) as number)
    ) {
      super.Invert();
    }
  }
}
