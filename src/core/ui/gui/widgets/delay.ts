import { Tab } from '../tab';
import { IDelayParams } from './params';
import { Slider } from './slider';

export class Delay {
  private readonly _minDelay: Slider;
  private readonly _maxDelay: Slider;
  private readonly _delays: { [min: number]: { [max: number]: IAwfulDelay } } =
    {};

  constructor(tab: Tab, params: IDelayParams) {
    this._minDelay = tab.Slider({
      var: `${params.var}Min`,
      text: `${params.text} min delay`,
      tooltip: `Minimum delay to ${params.text}`,
      min: 0,
      max: 2,
      default: 0.1,
      valueType: 's',
      step: 0.1,
    });

    this._maxDelay = tab.Slider({
      var: `${params.var}Max`,
      text: `${params.text} max delay`,
      tooltip: `Maximum delay to ${params.text}`,
      min: 0,
      max: 2,
      default: 0.25,
      valueType: 's',
      step: 0.1,
    });
  }

  public Delay(): number {
    const min = this._minDelay.Value();
    const max = this._maxDelay.Value();

    if (!this._delays[min]) {
      this._delays[min] = {};
    }

    if (!this._delays[min][max]) {
      this._delays[min][max] = awful.delay(min, max);
    }

    return this._delays[min][max].now;
  }
}
