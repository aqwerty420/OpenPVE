import { CooldownMode } from '../core/components';
import * as globalUI from '../core/ui';
import { MisdirectionModeSelector, PetSlotSelector } from './components';
import * as spells from './spells';

export const misdirectionMode = new MisdirectionModeSelector();

export const maxSerpentSting = globalUI.generalTab.slider({
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

//#region Cooldowns - Hunter

export const aMurderofCrows = globalUI.cooldownsTab.cooldown({
  var: 'aMurderofCrows',
  usable: spells.aMurderofCrows,
  default: CooldownMode.Always,
});

export const aspectOfTheWild = globalUI.cooldownsTab.cooldown({
  var: 'aspectOfTheWild',
  usable: spells.aspectOfTheWild,
  default: CooldownMode.Toggle,
});

export const barrage = globalUI.cooldownsTab.cooldown({
  var: 'barrage',
  usable: spells.barrage,
  default: CooldownMode.Always,
});

export const deathChakram = globalUI.cooldownsTab.cooldown({
  var: 'deathChakram',
  usable: spells.deathChakram,
  default: CooldownMode.Always,
});

export const explosiveShot = globalUI.cooldownsTab.cooldown({
  var: 'explosiveShot',
  usable: spells.explosiveShot,
  default: CooldownMode.Always,
});

export const stampede = globalUI.cooldownsTab.cooldown({
  var: 'stampede',
  usable: spells.stampede,
  default: CooldownMode.Toggle,
});

export const steelTrap = globalUI.cooldownsTab.cooldown({
  var: 'steelTrap',
  usable: spells.steelTrap,
  default: CooldownMode.Always,
});

export const wailingArrow = globalUI.cooldownsTab.cooldown({
  var: 'wailingArrow',
  usable: spells.wailingArrow,
  default: CooldownMode.Always,
});

//#endregion Cooldowns - Hunter

//#region Cooldowns - Beast Mastery

export const bestialWrath = globalUI.cooldownsTab.cooldown({
  var: 'bestialWrath',
  usable: spells.bestialWrath,
  default: CooldownMode.MiniToggle,
});

export const bloodshed = globalUI.cooldownsTab.cooldown({
  var: 'bloodshed',
  usable: spells.bloodshed,
  default: CooldownMode.Always,
});

export const callOfTheWild = globalUI.cooldownsTab.cooldown({
  var: 'callOfTheWild',
  usable: spells.callOfTheWild,
  default: CooldownMode.Toggle,
});

export const direBeast = globalUI.cooldownsTab.cooldown({
  var: 'direBeast',
  usable: spells.direBeast,
  default: CooldownMode.Always,
});

//#endregion Cooldowns - Beast Mastery

//#endregion Cooldowns

//#region Interrupts

export const counterShot = globalUI.interruptsTab.interrupt({
  var: 'counterShot',
  usable: spells.counterShot,
  default: true,
});

export const freezingTrap = globalUI.interruptsTab.interrupt({
  var: 'freezingTrap',
  usable: spells.freezingTrap,
  default: true,
});

export const intimidation = globalUI.interruptsTab.interrupt({
  var: 'intimidation',
  usable: spells.intimidation,
  default: true,
});

//#endregion Interrupts
