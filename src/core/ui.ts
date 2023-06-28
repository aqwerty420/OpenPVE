import {
  CooldownsToggle,
  RotationModeSwitch,
  RotationToggle,
  Tab,
  Toggle,
  varSettings,
  awfulUI,
  CooldownMode,
} from './components';
import * as coreSpells from './spells';
import * as coreItems from './items';

export const rotation = new RotationToggle();

export const mode = new RotationModeSwitch();

export const cooldowns = new CooldownsToggle(
  varSettings.cdsToggleVar,
  varSettings.cdsDisableVar,
  varSettings.cdsDisableValueVar,
  'Cds: '
);

export const miniCooldowns = new CooldownsToggle(
  varSettings.mCdsToggleVar,
  varSettings.mCdsDisableVar,
  varSettings.mCdsDisableValueVar,
  'M.Cds: '
);

export const interrupts = new Toggle(varSettings.interruptsVar, 'Int: ');

export const defensives = new Toggle(varSettings.defensivesVar, 'Def: ');

export const generalTab = new Tab('General');

generalTab.header({
  text: 'Fight',
});

export const startCombat = generalTab.checkbox({
  var: 'startCombat',
  text: 'Start Combat',
  tooltip: 'Engage combat when the target is in range.',
});

generalTab.separator();

generalTab.header({
  text: 'Targeting',
});

//TODO: auto target modes
export const autoTarget = generalTab.checkbox({
  var: 'autoTarget',
  text: 'Auto Target',
  tooltip: 'Automatically swap to the best target when the current one dies.',
});

//TODO: dynamic targetting modes (most hp, closest enemy, highest threat, etc)

export const statusFrameHandler = generalTab.statusFrameHandler();

export const cooldownsTab = new Tab('Cooldowns');

cooldownsTab.header({
  text: 'TTD Checker',
});

export const checkMinTTD = cooldownsTab.checkbox({
  var: varSettings.minTTDVar,
  text: 'Check for minimum TTD',
  tooltip: 'Check for minimum TTD before using cooldowns.',
  default: false,
});

export const minTTD = cooldownsTab.slider({
  var: varSettings.minTTDValueVar,
  text: 'Minimum TTD',
  tooltip: 'Minimum TTD to use cooldowns.',
  min: 0,
  max: 20,
  default: 8,
  valueType: 'sec',
  step: 1,
});

cooldownsTab.separator();

cooldownsTab.header({
  text: 'Cooldowns Disabler',
});

export const cdsDisabler = cooldownsTab.checkbox({
  var: varSettings.cdsDisableVar,
  text: 'Disable Cooldowns',
  tooltip: 'Disable cooldowns after a certain amount of time.',
  default: false,
});

export const cdsDisablerValue = cooldownsTab.slider({
  var: varSettings.cdsDisableValueVar,
  text: 'Disable Cooldowns After',
  tooltip: 'Disable cooldowns after set amount of time.',
  min: 0,
  max: 20,
  default: 6,
  valueType: 'sec',
  step: 1,
});

export const mCdsDisabler = cooldownsTab.checkbox({
  var: varSettings.mCdsDisableVar,
  text: 'Disable Mini Cooldowns',
  tooltip: 'Disable mini cooldowns after a certain amount of time.',
  default: false,
});

export const mCdsDisablerValue = cooldownsTab.slider({
  var: varSettings.mCdsDisableValueVar,
  text: 'Disable Mini Cooldowns After',
  tooltip: 'Disable mini cooldowns after set amount of time.',
  min: 0,
  max: 20,
  default: 6,
  valueType: 'sec',
});

cooldownsTab.separator();

export const trinket1 = cooldownsTab.cooldown({
  var: 'trinket1',
  header: 'Trinket 1',
  tooltip: 'Trinket 1 usage mode.',
  default: CooldownMode.Toggle,
});

export const trinket2 = cooldownsTab.cooldown({
  var: 'trinket2',
  header: 'Trinket 2',
  tooltip: 'Trinket 2 usage mode.',
  default: CooldownMode.Toggle,
});

const racials = [
  coreSpells.bloodFury,
  coreSpells.ancestralCall,
  coreSpells.fireblood,
  coreSpells.lightsJudgment,
  coreSpells.bagOfTricks,
  coreSpells.berserking,
  coreSpells.arcaneTorrent,
];

export const getRacialSpell = (): AwfulSpell | undefined => {
  for (const racial of racials) {
    if (racial.known) return racial;
  }

  return undefined;
};

const racialSpell = getRacialSpell();

export const racial =
  racialSpell != undefined
    ? cooldownsTab.cooldown({
        var: 'racial',
        usable: racialSpell,
        default: CooldownMode.Toggle,
      })
    : undefined;

export const interruptsTab = new Tab('Interrupts');

interruptsTab.header({
  text: 'Conditions',
});

export const whitelist = interruptsTab.checkbox({
  var: 'interruptWhitelist',
  text: 'Whitelisted Only',
  tooltip: 'Only interrupt spells on the whitelist.',
  default: false,
});

export const focus = interruptsTab.checkbox({
  var: 'interruptFocus',
  text: 'Focus Only',
  tooltip: 'Only interrupt spells from the focus target.',
});

export const minCastPercent = interruptsTab.slider({
  var: 'minCastPercent',
  text: 'Min. cast %',
  tooltip: 'Interrupt spells when they are at least this % cast.',
  min: 0,
  max: 100,
  default: 0,
  valueType: '%',
  step: 5,
});

export const interruptDelay = interruptsTab.delay({
  var: 'interrupt',
  text: 'Interrupt',
});

generalTab.separator();

interruptsTab.header({
  text: 'Spells',
});

export const defensivesTab = new Tab('Defensives');

export const healthStone = defensivesTab.playerDefensive({
  var: 'healthStone',
  usable: coreItems.healthStone,
  minHP: 40,
});

export const refreshingHealingPotion = defensivesTab.playerDefensive({
  var: 'refreshingHealingPotion',
  usable: coreItems.refreshingHealingPotionThree,
  minHP: 40,
});

awfulUI.cmd.New((msg: string) => {
  switch (msg) {
    case 'sf':
      statusFrameHandler.toggle();
      break;

    case 'mode':
      mode.invert();
      break;

    case 'cooldowns':
      cooldowns.invert();
      break;

    case 'miniCooldowns':
      miniCooldowns.invert();
      break;

    case 'defensives':
      defensives.invert();
      break;

    case 'interrupts':
      interrupts.invert();
      break;

    default:
      break;
  }
});
