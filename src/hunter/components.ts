import { Dropdown, awfulUI } from '../core/components';
import * as globalUI from '../core/ui';
import * as spells from './spells';

export enum MisdirectionMode {
  Smart = 0,
  Engage = 1,
  Aggro = 2,
  Always = 3,
  Never = 4,
}

export const misdirectionOptions: AwfulDropdownOptions[] = [
  {
    label: 'Smart',
    value: MisdirectionMode.Smart,
    tooltip: 'Use on engage and when taking aggro',
  },
  {
    label: 'Engage',
    value: MisdirectionMode.Engage,
    tooltip: 'Use on combat start.',
  },
  {
    label: 'Aggro',
    value: MisdirectionMode.Aggro,
    tooltip: 'Use when taking aggro of a mob.',
  },
  {
    label: 'Always',
    value: MisdirectionMode.Always,
    tooltip: 'Always use on cooldown.',
  },
  {
    label: 'Never',
    value: MisdirectionMode.Never,
    tooltip: 'Never use.',
  },
];

export class MisdirectionModeSelector extends Dropdown<MisdirectionMode> {
  constructor() {
    const name = spells.misdirection['name'];

    super(globalUI.generalTab.tab, {
      var: 'missdirectionModdes',
      options: misdirectionOptions,
      header: `${awful.textureEscape(spells.misdirection.id, 20)} - ${name}`,
      tooltip: `${name} usage mode.`,
      default: MisdirectionMode.Smart,
    });
  }

  public engage(): boolean {
    return (
      this.value() === MisdirectionMode.Smart ||
      this.value() === MisdirectionMode.Engage
    );
  }

  public aggro(): boolean {
    return (
      this.value() === MisdirectionMode.Smart ||
      this.value() === MisdirectionMode.Aggro
    );
  }

  public always(): boolean {
    return this.value() === MisdirectionMode.Always;
  }
}

export class PetSlotSelector {
  private readonly var = 'petSlot';

  constructor() {
    awfulUI.statusFrame.Toggle({
      label: 'Pet: ',
      var: this.var,
      onClick: () => this.press(),
      valueText: () => this.valueText(),
    });

    if (!this.value()) awfulUI.settings.set(this.var, 1);
  }

  private valueText(): string {
    return `|cffbfff81${this.value()}`;
  }

  private press(): void {
    this.set(this.value() + 1);
    if (this.value() > 5) this.set(0);
  }

  public set(value: number): void {
    awfulUI.settings.set(this.var, value);
  }

  public value(): number {
    return awfulUI.settings.get(this.var) as number;
  }

  public enabled(): boolean {
    return this.value() !== 0;
  }

  public disabled(): boolean {
    return this.value() === 0;
  }
}
