import { ui } from '../';
import { Separator } from './widgets/separator';
import { Checkbox, Dropdown, Slider, Cooldown, Defensive } from './widgets';
import { Delay } from './widgets/delay';
import { Header } from './widgets/header';
import {
  ICooldownParams,
  IDefensivesParams,
  IDelayParams,
} from './widgets/params';

export class Tab {
  protected readonly _tab: IAwfulTab;

  constructor(name: string, group?: IAwfulContainsTab) {
    this._tab = group ? group.Tab(name) : ui.gui.Tab(name);
  }

  public Checkbox(params: IAwfulCheckboxParams): Checkbox {
    return new Checkbox(this._tab, params);
  }

  public Dropdown(params: IAwfulDropdownParams): Dropdown {
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
