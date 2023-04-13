import { ui, varSettings } from '../../init';
import { Dropdown } from './dropdown';
import { CooldownMode } from "./modes";
import { cooldownOptions } from "./options";

export class Cooldown extends Dropdown {
  constructor(
    tab: IAwfulTab,
    eVar: string,
    name: string,
    textureId: number,
    defaultValue = CooldownMode.toggle
  ) {
    super(tab, {
      var: eVar,
      header: `${awful.textureEscape(textureId, 20)} - ${name}`,
      options: cooldownOptions,
      tooltip: `${name} usage mode.`,
      default: defaultValue,
    });
  }

  public Enabled(ignoreTTD = false): boolean {
    const value = this.Value() as CooldownMode;

    return (
      (ignoreTTD ||
        (!ui.settings.get(varSettings.minTTDVar) as boolean) ||
        awful.FightRemains() >
          (ui.settings.get(varSettings.minTTDValueVar) as number)) &&
      (value === CooldownMode.always ||
        ((value === CooldownMode.toggle || value == CooldownMode.miniToggle) &&
          (ui.settings.get(varSettings.cdsToggleVar) as boolean)) ||
        (value == CooldownMode.miniToggle &&
          (ui.settings.get(varSettings.mCdsToggleVar) as boolean)))
    );
  }
}

export class SpellCooldown extends Cooldown {
  constructor(tab: IAwfulTab, spell: IAwfulSpell, defaultValue?: CooldownMode) {
    //TODO: var name
    super(tab, `${spell.id}Mode`, spell['name'], spell.id, defaultValue);
  }
}

export class ItemCooldown extends Cooldown {
  constructor(tab: IAwfulTab, item: IAwfulItem, defaultValue?: CooldownMode) {
    //TODO: var name
    super(tab, `${item.id}Mode`, item.name, item.id, defaultValue);
  }
}
