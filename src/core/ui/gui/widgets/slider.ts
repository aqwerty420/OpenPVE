import { ui } from '../../init';

export class Slider {
  private readonly _var: string;

  constructor(tab: IAwfulTab, params: IAwfulSliderParams) {
    this._var = params.var;
    tab.Slider(params);
  }

  public Value(): number {
    return ui.settings.get(this._var) as number;
  }
}
