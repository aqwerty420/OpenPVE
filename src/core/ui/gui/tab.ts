import { ui } from '../';
import {
  Checkbox,
  Dropdown,
  Slider,
  Cooldown,
  Defensive,
  Delay,
  Header,
  Separator,
  Interrupt,
} from './widgets';
import {
  ICooldownParams,
  IDefensivesParams,
  IDelayParams,
  IInterruptParams,
} from './widgets/params';

export class Tab {
  protected readonly _tab: IAwfulTab;

  constructor(name: string, group?: IAwfulContainsTab) {
    this._tab = group ? group.Tab(name) : ui.gui.Tab(name);
  }

  public Checkbox(params: IAwfulCheckboxParams): Checkbox {
    return new Checkbox(this._tab, params);
  }

  public Dropdown<T extends IAwfulDropdownParams['default']>(
    params: IAwfulDropdownParams
  ): Dropdown<T> {
    return new Dropdown(this._tab, params);
  }

  public Slider(params: IAwfulSliderParams): Slider {
    return new Slider(this._tab, params);
  }

  public Text(params: IAwfulTextParams): void {
    this._tab.Text(params);
  }

  public Cooldown(params: ICooldownParams): Cooldown {
    return new Cooldown(this._tab, params);
  }

  public Defensive(params: IDefensivesParams): Defensive {
    return new Defensive(this, params);
  }

  public Interrupt(params: IInterruptParams): Interrupt {
    return new Interrupt(this._tab, params);
  }

  public Separator(): void {
    new Separator(this._tab);
  }

  public Header(params: IAwfulTextParams): void {
    new Header(this._tab, params);
  }

  public Delay(params: IDelayParams): Delay {
    return new Delay(this, params);
  }
}
