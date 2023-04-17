import { ui } from '../';
import { Separator } from './widgets/separator';
import {
  Checkbox,
  Dropdown,
  ItemCooldown,
  Slider,
  SpellCooldown,
} from './widgets';
import { Delay } from './widgets/delay';
import { Header } from './widgets/header';
import { CooldownMode } from './widgets/modes';
import { IDelayParams } from './widgets/params';

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

  public SpellCooldown(
    spell: IAwfulSpell,
    defaultValue?: CooldownMode
  ): SpellCooldown {
    return new SpellCooldown(this._tab, spell, defaultValue);
  }

  public ItemCooldown(
    item: IAwfulItem,
    defaultValue?: CooldownMode
  ): ItemCooldown {
    return new ItemCooldown(this._tab, item, defaultValue);
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
