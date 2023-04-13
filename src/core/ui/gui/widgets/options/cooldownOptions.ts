import { CooldownMode } from '../modes/cooldownMode';

export const cooldownOptions: IAwfulDropdownOptions[] = [
  {
    label: 'Always',
    value: CooldownMode.always,
    tooltip: 'Always use.',
  },
  {
    label: 'On Toggle',
    value: CooldownMode.toggle,
    tooltip: 'Use on cooldowns &/or mini cooldowns toggle.',
  },
  {
    label: 'On Mini Toggle',
    value: CooldownMode.miniToggle,
    tooltip: 'Use on mini cooldowns toggle.',
  },
  {
    label: 'Never',
    value: CooldownMode.never,
    tooltip: 'Never use.',
  },
];
