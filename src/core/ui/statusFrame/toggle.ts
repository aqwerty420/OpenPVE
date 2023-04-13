import { ui } from '../init';

export class Toggle {
  private readonly _var: string;

  constructor(eVar: string, label: string) {
    this._var = eVar;

    ui.statusFrame.Toggle({
      label: label,
      var: this._var,
      onClick: () => this.Invert(),
      valueText: () => this.ValueText(),
    });
  }

  private ValueText(): string {
    return this.Enabled() ? '|cff00ff00ON' : '|cffff0000OFF';
  }

  public Enabled(): boolean {
    return ui.settings.get(this._var) as boolean;
  }

  public Invert(): void {
    ui.settings.set(this._var, !this.Enabled());
  }
}
