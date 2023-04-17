import { CooldownMode } from '../../core/ui/gui/widgets/modes';
import { cooldownsTab, generalTab } from '../../core/ui/loader';
import * as spells from '../spells';
import { MisdirectionModeSelector } from './gui/widgets';
import { PetSlotSelector } from './statusFrame';

export const misdirectionMode = new MisdirectionModeSelector();

export const maxSerpentSting = generalTab.Slider({
  var: 'maxSerpentSting',
  text: 'Max Serpent Sting',
  tooltip: 'Maximum number of Serpent Sting active.',
  default: 2,
  min: 1,
  max: 5,
  step: 1,
});

export const petSlot = new PetSlotSelector();

export const aMurderofCrows = cooldownsTab.Cooldown({
  var: 'aMurderofCrows',
  usable: spells.aMurderofCrows,
  default: CooldownMode.Always,
});

export const aspectOfTheWild = cooldownsTab.Cooldown({
  var: 'aspectOfTheWild',
  usable: spells.aspectOfTheWild,
  default: CooldownMode.Toggle,
});

export const barrage = cooldownsTab.Cooldown({
  var: 'barrage',
  usable: spells.barrage,
  default: CooldownMode.Always,
});

export const deathChakram = cooldownsTab.Cooldown({
  var: 'deathChakram',
  usable: spells.deathChakram,
  default: CooldownMode.Always,
});

export const explosiveShot = cooldownsTab.Cooldown({
  var: 'explosiveShot',
  usable: spells.explosiveShot,
  default: CooldownMode.Always,
});

export const stampede = cooldownsTab.Cooldown({
  var: 'stampede',
  usable: spells.stampede,
  default: CooldownMode.Toggle,
});

export const steelTrap = cooldownsTab.Cooldown({
  var: 'steelTrap',
  usable: spells.steelTrap,
  default: CooldownMode.Always,
});

export const wailingArrow = cooldownsTab.Cooldown({
  var: 'wailingArrow',
  usable: spells.wailingArrow,
  default: CooldownMode.Always,
});
