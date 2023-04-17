import { ui } from '../../';

export class Dropdown {
  private readonly _var: string;

  constructor(tab: IAwfulTab, params: IAwfulDropdownParams) {
    this._var = params.var;
    tab.Dropdown(params);
  }

  public Value(): string | number {
    return ui.settings.get(this._var) as string | number;
  }

  public Set(value: string | number): void {
    ui.settings.set(this._var, value);
  }
}
