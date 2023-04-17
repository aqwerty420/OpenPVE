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

export const aMurderofCrows = cooldownsTab.SpellCooldown(
  spells.aMurderofCrows,
  CooldownMode.Always
);

export const aspectOfTheWild = cooldownsTab.SpellCooldown(
  spells.aspectOfTheWild,
  CooldownMode.Toggle
);

export const barrage = cooldownsTab.SpellCooldown(
  spells.barrage,
  CooldownMode.Always
);

export const deathChakram = cooldownsTab.SpellCooldown(
  spells.deathChakram,
  CooldownMode.Always
);

export const explosiveShot = cooldownsTab.SpellCooldown(
  spells.explosiveShot,
  CooldownMode.Always
);

export const stampede = cooldownsTab.SpellCooldown(
  spells.stampede,
  CooldownMode.Toggle
);

export const steelTrap = cooldownsTab.SpellCooldown(
  spells.steelTrap,
  CooldownMode.Always
);

export const wailingArrow = cooldownsTab.SpellCooldown(
  spells.wailingArrow,
  CooldownMode.Always
);
