import { ui, varSettings } from '../../';
import { Dropdown } from './dropdown';
import { CooldownMode } from './modes';
import { cooldownOptions } from './options';
import { ICooldownParams } from './params';

export class Cooldown extends Dropdown<CooldownMode> {
  constructor(tab: IAwfulTab, params: ICooldownParams) {
    super(tab, {
      var: params.var,
      header: params.usable
        ? `${awful.textureEscape(params.usable.id, 20)} - ${params.usable.name}`
        : params.header,
      options: cooldownOptions,
      tooltip: params.usable
        ? `${params.usable.name} usage mode.`
        : params.tooltip,
      default: params.default ?? CooldownMode.Toggle,
    });
  }

  public Usable(ignoreTTD = false): boolean {
    const value = this.Value();

    return (
      (ignoreTTD ||
        (!ui.settings.get(varSettings.minTTDVar) as boolean) ||
        awful.FightRemains() >
          (ui.settings.get(varSettings.minTTDValueVar) as number)) &&
      (value === CooldownMode.Always ||
        ((value === CooldownMode.Toggle || value == CooldownMode.MiniToggle) &&
          (ui.settings.get(varSettings.cdsToggleVar) as boolean)) ||
        (value == CooldownMode.MiniToggle &&
          (ui.settings.get(varSettings.mCdsToggleVar) as boolean)))
    );
  }
}
