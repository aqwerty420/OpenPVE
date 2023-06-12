import { CooldownMode, Tab, Trigger, awfulUI } from '../core/components';
import * as coreUI from '../core/ui';
import { MisdirectionModeSelector, PetSlotSelector } from './components';
import * as hunterSpells from './spells';

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
  usable: hunterSpells.aMurderofCrows,
  default: CooldownMode.Always,
});

export const aspectOfTheWild = coreUI.cooldownsTab.cooldown({
  var: 'aspectOfTheWild',
  usable: hunterSpells.aspectOfTheWild,
  default: CooldownMode.Toggle,
});

export const barrage = coreUI.cooldownsTab.cooldown({
  var: 'barrage',
  usable: hunterSpells.barrage,
  default: CooldownMode.Always,
});

export const deathChakram = coreUI.cooldownsTab.cooldown({
  var: 'deathChakram',
  usable: hunterSpells.deathChakram,
  default: CooldownMode.Always,
});

export const explosiveShot = coreUI.cooldownsTab.cooldown({
  var: 'explosiveShot',
  usable: hunterSpells.explosiveShot,
  default: CooldownMode.Always,
});

export const stampede = coreUI.cooldownsTab.cooldown({
  var: 'stampede',
  usable: hunterSpells.stampede,
  default: CooldownMode.Toggle,
});

export const steelTrap = coreUI.cooldownsTab.cooldown({
  var: 'steelTrap',
  usable: hunterSpells.steelTrap,
  default: CooldownMode.Always,
});

export const wailingArrow = coreUI.cooldownsTab.cooldown({
  var: 'wailingArrow',
  usable: hunterSpells.wailingArrow,
  default: CooldownMode.Always,
});

//#endregion Cooldowns - Hunter

//#region Cooldowns - Beast Mastery

export const bestialWrath = coreUI.cooldownsTab.cooldown({
  var: 'bestialWrath',
  usable: hunterSpells.bestialWrath,
  default: CooldownMode.MiniToggle,
});

export const bloodshed = coreUI.cooldownsTab.cooldown({
  var: 'bloodshed',
  usable: hunterSpells.bloodshed,
  default: CooldownMode.Always,
});

export const callOfTheWild = coreUI.cooldownsTab.cooldown({
  var: 'callOfTheWild',
  usable: hunterSpells.callOfTheWild,
  default: CooldownMode.Toggle,
});

export const direBeast = coreUI.cooldownsTab.cooldown({
  var: 'direBeast',
  usable: hunterSpells.direBeast,
  default: CooldownMode.Always,
});

//#endregion Cooldowns - Beast Mastery

//#endregion Cooldowns

//#region Interrupts

export const counterShot = coreUI.interruptsTab.interrupt({
  var: 'counterShot',
  usable: hunterSpells.counterShot,
  default: true,
});

export const freezingTrap = coreUI.interruptsTab.interrupt({
  var: 'freezingTrap',
  usable: hunterSpells.freezingTrap,
  default: true,
});

export const intimidation = coreUI.interruptsTab.interrupt({
  var: 'intimidation',
  usable: hunterSpells.intimidation,
  default: true,
});

//#endregion Interrupts

//#region Defensive

export const exhilaration = coreUI.defensivesTab.playerDefensive({
  var: 'exhilaration',
  usable: hunterSpells.exhilaration,
  minHP: 50,
  default: true,
});

export const aspectOfTheTurtle = coreUI.defensivesTab.playerDefensive({
  var: 'aspectOfTheTurtle',
  usable: hunterSpells.aspectOfTheTurtle,
  minHP: 25,
  default: false,
});

export const feignDeath = coreUI.defensivesTab.playerDefensive({
  var: 'feignDeath',
  usable: hunterSpells.feignDeath,
  minHP: 20,
  default: false,
});

export const petTab = new Tab('Pet');

export const summonRevivePet = petTab.checkbox({
  var: 'summonRevivePet',
  text: 'Summon/Revive Pet',
  tooltip: 'Automatically summon or revive your pet.',
  default: true,
});

export const mendPet = petTab.petDefensive({
  var: 'mendPet',
  usable: hunterSpells.mendRevivePet,
  minHP: 40,
});

export const disengageTrigger = new Trigger();

awfulUI.cmd.New((msg: string) => {
  switch (msg) {
    case 'forward':
      disengageTrigger.trigger();
      break;

    default:
      break;
  }
});
