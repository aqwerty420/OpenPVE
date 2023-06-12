import { CooldownMode } from '../core/components';
import * as coreUI from '../core/ui';
import { MisdirectionModeSelector, PetSlotSelector } from './components';
import * as spells from './spells';

export const misdirectionMode = new MisdirectionModeSelector();

export const maxSerpentSting = coreUI.generalTab.slider({
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

export const aMurderofCrows = coreUI.cooldownsTab.cooldown({
  var: 'aMurderofCrows',
  usable: spells.aMurderofCrows,
  default: CooldownMode.Always,
});

export const aspectOfTheWild = coreUI.cooldownsTab.cooldown({
  var: 'aspectOfTheWild',
  usable: spells.aspectOfTheWild,
  default: CooldownMode.Toggle,
});

export const barrage = coreUI.cooldownsTab.cooldown({
  var: 'barrage',
  usable: spells.barrage,
  default: CooldownMode.Always,
});

export const deathChakram = coreUI.cooldownsTab.cooldown({
  var: 'deathChakram',
  usable: spells.deathChakram,
  default: CooldownMode.Always,
});

export const explosiveShot = coreUI.cooldownsTab.cooldown({
  var: 'explosiveShot',
  usable: spells.explosiveShot,
  default: CooldownMode.Always,
});

export const stampede = coreUI.cooldownsTab.cooldown({
  var: 'stampede',
  usable: spells.stampede,
  default: CooldownMode.Toggle,
});

export const steelTrap = coreUI.cooldownsTab.cooldown({
  var: 'steelTrap',
  usable: spells.steelTrap,
  default: CooldownMode.Always,
});

export const wailingArrow = coreUI.cooldownsTab.cooldown({
  var: 'wailingArrow',
  usable: spells.wailingArrow,
  default: CooldownMode.Always,
});

//#endregion Cooldowns - Hunter

//#region Cooldowns - Beast Mastery

export const bestialWrath = coreUI.cooldownsTab.cooldown({
  var: 'bestialWrath',
  usable: spells.bestialWrath,
  default: CooldownMode.MiniToggle,
});

export const bloodshed = coreUI.cooldownsTab.cooldown({
  var: 'bloodshed',
  usable: spells.bloodshed,
  default: CooldownMode.Always,
});

export const callOfTheWild = coreUI.cooldownsTab.cooldown({
  var: 'callOfTheWild',
  usable: spells.callOfTheWild,
  default: CooldownMode.Toggle,
});

export const direBeast = coreUI.cooldownsTab.cooldown({
  var: 'direBeast',
  usable: spells.direBeast,
  default: CooldownMode.Always,
});

//#endregion Cooldowns - Beast Mastery

//#endregion Cooldowns

//#region Interrupts

export const counterShot = coreUI.interruptsTab.interrupt({
  var: 'counterShot',
  usable: spells.counterShot,
  default: true,
});

export const freezingTrap = coreUI.interruptsTab.interrupt({
  var: 'freezingTrap',
  usable: spells.freezingTrap,
  default: true,
});

export const intimidation = coreUI.interruptsTab.interrupt({
  var: 'intimidation',
  usable: spells.intimidation,
  default: true,
});

//#endregion Interrupts
