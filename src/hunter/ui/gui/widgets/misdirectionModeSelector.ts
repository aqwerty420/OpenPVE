import { Dropdown } from '../../../../core/ui/gui/widgets';
import { generalTab } from '../../../../core/ui/loader';
import * as spells from '../../../spells';
import { MisdirectionMode } from './modes';
import { misdirectionOptions } from './options';

export class MisdirectionModeSelector extends Dropdown {
  constructor() {
    const name = spells.misdirection['name'];

    super(generalTab, {
      var: 'missdirectionModdes',
      options: misdirectionOptions,
      header: `${awful.textureEscape(spells.misdirection.id, 20)} - ${name}`,
      tooltip: `${name} usage mode.`,
      default: MisdirectionMode.Smart,
    });
  }

  public OnEngage(): boolean {
    return (
      this.Value() === MisdirectionMode.Smart ||
      this.Value() === MisdirectionMode.Engage
    );
  }

  public OnAggro(): boolean {
    return (
      this.Value() === MisdirectionMode.Smart ||
      this.Value() === MisdirectionMode.Aggro
    );
  }

  public Always(): boolean {
    return this.Value() === MisdirectionMode.Always;
  }
}
