import { Tab } from '../tab';
import { Checkbox, Slider } from './';
import { IDefensivesParams } from './params';

export class Defensive {
  public readonly checkbox: Checkbox;
  public readonly slider: Slider;

  constructor(tab: Tab, params: IDefensivesParams) {
    this.checkbox = tab.Checkbox({
      var: `${params.var}State`,
      text: params.usable
        ? `${awful.textureEscape(params.usable.id, 20)} - ${params.usable.name}`
        : params.checkboxText ?? 'TO_REPLACE',
      tooltip: params.usable
        ? `Use ${params.usable.name} as a defensive.`
        : params.checkboxTooltip,
      default: params.enabled,
    });

    this.slider = tab.Slider({
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

  public Usable(): boolean {
    return this.checkbox.Enabled() && awful.player.hp <= this.slider.Value();
  }
}
