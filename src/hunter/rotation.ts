import * as coreUI from '../core/ui';

export const canCombat = (): boolean => {
  const player = awful.player;
  const target = awful.target;

  return target.exists && !target.dead && player.canAttack(target);
};

export const canStartCombat = (): boolean => {
  const player = awful.player;
  const target = awful.target;

  return player.combat || target.combat || coreUI.startCombat.enabled();
};
