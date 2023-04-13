import RotationMode from '../../enums/rotationMode';
import { ui } from '../init';

export class RotationModeSwitch {
  private readonly _var = 'rotationMode';

  constructor() {
    ui.statusFrame.Toggle({
      label: 'Mode: ',
      var: this._var,
      valueText: () => this.ValueText(),
      onClick: () => this.Invert(),
    });
    if (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      !Object.values(RotationMode).includes(ui.settings.get(this._var) as any)
    ) {
      ui.settings.set(this._var, RotationMode.auto);
    }
  }

  private ValueText(): string {
    return '|cffbfff81' + (this.Value() === RotationMode.auto ? 'Auto' : 'ST');
  }

  public Invert(): void {
    if (this.Auto()) {
      ui.settings.set(this._var, RotationMode.st);
    } else {
      ui.settings.set(this._var, RotationMode.auto);
    }
  }

  public Value(): RotationMode {
    return ui.settings.get(this._var) as RotationMode;
  }

  public Auto(): boolean {
    return this.Value() === RotationMode.auto;
  }

  public ST(): boolean {
    return this.Value() === RotationMode.st;
  }
}
