import {
  healthStone,
  refreshingHealingPotionOne,
  refreshingHealingPotionThree,
  refreshingHealingPotionTwo,
} from './items';
import * as coreUI from './ui';
import { canCombat, useItem } from './utility';

export const selectNewTarget = (
  getEnemies: () => AwfulList<AwfulUnit>
): void => {
  if (!coreUI.autoTarget.enabled() || canCombat()) return;

  const enemies = getEnemies();

  let bestEnemy: AwfulUnit | undefined;

  enemies.loop((enemy) => {
    if (!bestEnemy || bestEnemy.health < enemy.health) {
      bestEnemy = enemy;
    }
  });

  if (bestEnemy) {
    bestEnemy.setTarget();
  }
};

export const coreDefensives = [
  () => coreUI.healthStone.usable() && useItem(healthStone),
  () =>
    coreUI.refreshingHealingPotion.usable() &&
    useItem(refreshingHealingPotionThree) &&
    useItem(refreshingHealingPotionTwo) &&
    useItem(refreshingHealingPotionOne),
];
