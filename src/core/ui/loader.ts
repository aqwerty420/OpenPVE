import { varSettings } from './';
import {
  CooldownsToggle,
  RotationModeSwitch,
  RotationToggle,
} from './statusFrame';
import { Tab } from './gui';

export const rotationToggle = new RotationToggle();

export const rotationMode = new RotationModeSwitch();

export const cooldownsToggle = new CooldownsToggle(
  varSettings.cdsToggleVar,
  varSettings.cdsDisableVar,
  varSettings.cdsDisableValueVar,
  'Cds: '
);

export const mCooldownsToggle = new CooldownsToggle(
  varSettings.mCdsToggleVar,
  varSettings.mCdsDisableVar,
  varSettings.mCdsDisableValueVar,
  'M.Cds: '
);

export const generalTab = new Tab('General');

generalTab.Header({
  text: 'Fight',
});

export const startCombat = generalTab.Checkbox({
  var: 'startCombat',
  text: 'Start Combat',
  tooltip: 'Engage combat when the target is in range.',
});

generalTab.Separator();

generalTab.Header({
  text: 'Targeting',
});

//TODO: auto target modes
export const autoTarget = generalTab.Checkbox({
  var: 'autoTarget',
  text: 'Auto Target',
  tooltip: 'Automatically swap to the best target when the current one dies.',
});

//TODO: dynamic targetting modes (most hp, closest enemy, highest threat, etc)

export const cooldownsTab = new Tab('Cooldowns');

cooldownsTab.Header({
  text: 'TTD Checker',
});

export const checkMinTTD = cooldownsTab.Checkbox({
  var: varSettings.minTTDVar,
  text: 'Check for minimum TTD',
  tooltip: 'Check for minimum TTD before using cooldowns.',
  default: false,
});

export const minTTD = cooldownsTab.Slider({
  var: varSettings.minTTDValueVar,
  text: 'Minimum TTD',
  tooltip: 'Minimum TTD to use cooldowns.',
  min: 0,
  max: 20,
  default: 8,
  valueType: 'sec',
  step: 1,
});

cooldownsTab.Separator();

cooldownsTab.Header({
  text: 'Cooldowns Disabler',
});

export const cdsDisabler = cooldownsTab.Checkbox({
  var: varSettings.cdsDisableVar,
  text: 'Disable Cooldowns',
  tooltip: 'Disable cooldowns after a certain amount of time.',
  default: false,
});

export const cdsDisablerValue = cooldownsTab.Slider({
  var: varSettings.cdsDisableValueVar,
  text: 'Disable Cooldowns After',
  tooltip: 'Disable cooldowns after set amount of time.',
  min: 0,
  max: 20,
  default: 6,
  valueType: 'sec',
  step: 1,
});

export const mCdsDisabler = cooldownsTab.Checkbox({
  var: varSettings.mCdsDisableVar,
  text: 'Disable Mini Cooldowns',
  tooltip: 'Disable mini cooldowns after a certain amount of time.',
  default: false,
});

export const mCdsDisablerValue = cooldownsTab.Slider({
  var: varSettings.mCdsDisableValueVar,
  text: 'Disable Mini Cooldowns After',
  tooltip: 'Disable mini cooldowns after set amount of time.',
  min: 0,
  max: 20,
  default: 6,
  valueType: 'sec',
});

cooldownsTab.Separator();

const interruptsTab = new Tab('Interrupts');

interruptsTab.Header({
  text: 'Conditions',
});

export const whitelist = interruptsTab.Checkbox({
  var: 'interruptWhitelist',
  text: 'Whitelisted Only',
  tooltip: 'Only interrupt spells on the whitelist.',
  default: false,
});

export const focus = interruptsTab.Checkbox({
  var: 'interruptFocus',
  text: 'Focus Only',
  tooltip: 'Only interrupt spells from the focus target.',
});

export const minCastPercent = interruptsTab.Slider({
  var: 'minCastPercent',
  text: 'Min. cast %',
  tooltip: 'Interrupt spells when they are at least this % cast.',
  min: 0,
  max: 100,
  default: 0,
  valueType: '%',
  step: 5,
});

export const interruptDelay = interruptsTab.Delay({
  var: 'interrupt',
  text: 'Interrupt',
});

generalTab.Separator();

interruptsTab.Header({
  text: 'Spells',
});

export const defensivesTab = new Tab('Defensives');
