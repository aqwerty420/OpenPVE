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

//#region Cooldowns

//#region Hunter

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

//#endregion Hunter

//#region Beast Mastery

export const bestialWrath = cooldownsTab.Cooldown({
  var: 'bestialWrath',
  usable: spells.bestialWrath,
  default: CooldownMode.MiniToggle,
});

export const bloodshed = cooldownsTab.Cooldown({
  var: 'bloodshed',
  usable: spells.bloodshed,
  default: CooldownMode.Always,
});

export const callOfTheWild = cooldownsTab.Cooldown({
  var: 'callOfTheWild',
  usable: spells.callOfTheWild,
  default: CooldownMode.Toggle,
});

export const direBeast = cooldownsTab.Cooldown({
  var: 'direBeast',
  usable: spells.direBeast,
  default: CooldownMode.Always,
});

//#endregion Beast Mastery

//#endregion Cooldowns
