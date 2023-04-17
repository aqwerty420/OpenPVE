import { ui } from '../../';

export class Checkbox {
  private readonly _var: string;

  constructor(tab: IAwfulTab, params: IAwfulCheckboxParams) {
    this._var = params.var;
    tab.Checkbox(params);
  }

  public Enabled(): boolean {
    return ui.settings.get(this._var) as boolean;
  }

  public Toggle(): void {
    ui.settings.set(this._var, !this.Enabled());
  }
}
