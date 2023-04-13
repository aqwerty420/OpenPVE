import { ui } from '../../init';

export class Dropdown {
  private readonly _var: string;

  constructor(tab: IAwfulTab, params: IAwfulDropdownParams) {
    this._var = params.var;
    tab.Dropdown(params);
  }

  public Value(): string | number {
    return ui.settings.get(this._var) as string | number;
  }
}
