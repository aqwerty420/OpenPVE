import { ui } from '../../';

export class Dropdown<T extends IAwfulDropdownParams['default']> {
  private readonly _var: string;

  constructor(tab: IAwfulTab, params: IAwfulDropdownParams) {
    this._var = params.var;
    tab.Dropdown(params);
  }

  public Value(): T {
    return ui.settings.get(this._var) as T;
  }

  public Set(value: T): void {
    ui.settings.set(this._var, value);
  }
}
