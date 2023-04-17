import { ui } from '../../../core/ui';

export class PetSlotSelector {
  private readonly _var = 'petSlot';

  constructor() {
    ui.statusFrame.Toggle({
      label: 'Pet: ',
      var: this._var,
      onClick: () => this.Press(),
      valueText: () => this.ValueText(),
    });

    if (!this.Value()) ui.settings.set(this._var, 1);
  }

  private ValueText(): string {
    return `|cffbfff81${this.Value()}`;
  }

  private Press(): void {
    this.Set(this.Value() + 1);
    if (this.Value() > 5) this.Set(0);
  }

  public Set(value: number): void {
    ui.settings.set(this._var, value);
  }

  public Value(): number {
    return ui.settings.get(this._var) as number;
  }

  public Enabled(): boolean {
    return this.Value() !== 0;
  }

  public Disabled(): boolean {
    return this.Value() === 0;
  }
}
