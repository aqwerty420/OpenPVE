import { MisdirectionMode } from '../modes';

export const misdirectionOptions: IAwfulDropdownOptions[] = [
  {
    label: 'Smart',
    value: MisdirectionMode.Smart,
    tooltip: 'Use on engage and when taking aggro',
  },
  {
    label: 'Engage',
    value: MisdirectionMode.Engage,
    tooltip: 'Use on combat start.',
  },
  {
    label: 'Aggro',
    value: MisdirectionMode.Aggro,
    tooltip: 'Use when taking aggro of a mob.',
  },
  {
    label: 'Always',
    value: MisdirectionMode.Always,
    tooltip: 'Always use on cooldown.',
  },
  {
    label: 'Never',
    value: MisdirectionMode.Never,
    tooltip: 'Never use.',
  },
];
