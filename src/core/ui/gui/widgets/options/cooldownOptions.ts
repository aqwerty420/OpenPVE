import { CooldownMode } from '../modes/cooldownMode';

export const cooldownOptions: IAwfulDropdownOptions[] = [
  {
    label: 'Always',
    value: CooldownMode.Always,
    tooltip: 'Always use.',
  },
  {
    label: 'On Toggle',
    value: CooldownMode.Toggle,
    tooltip: 'Use on cooldowns &/or mini cooldowns toggle.',
  },
  {
    label: 'On Mini Toggle',
    value: CooldownMode.MiniToggle,
    tooltip: 'Use on mini cooldowns toggle.',
  },
  {
    label: 'Never',
    value: CooldownMode.Never,
    tooltip: 'Never use.',
  },
];
