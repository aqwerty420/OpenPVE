import { Tab } from '../tab';
import { Checkbox, Slider } from './';
import { IDefensivesParams } from './params';

export class Defensive {
  private readonly _checkbox: Checkbox;
  private readonly _slider: Slider;

  constructor(tab: Tab, params: IDefensivesParams) {
    this._checkbox = tab.Checkbox({
      var: `${params.var}State`,
      text: params.usable
        ? `${awful.textureEscape(params.usable.id, 20)} - ${params.usable.name}`
        : params.checkboxText ?? 'TO_REPLACE',
      tooltip: params.usable
        ? `Use ${params.usable.name} as a defensive.`
        : params.checkboxTooltip,
      default: params.enabled,
    });

    this._slider = tab.Slider({
      var: `${params.var}Value`,
      text: '',
      tooltip: params.usable
        ? `Minimum health to use ${params.usable.name} as a defensive.`
        : params.sliderTooltip,
      default: params.minHp,
      min: 0,
      max: 100,
      step: 1,
    });
  }

  public Enabled(): boolean {
    return this._checkbox.Enabled();
  }

  public Toggle(): void {
    this._checkbox.Toggle();
  }

  public Value(): number {
    return this._slider.Value();
  }

  public Set(value: number): void {
    this._slider.Set(value);
  }

  public Usable(): boolean {
    return this.Enabled() && awful.player.hp <= this.Value();
  }
}
