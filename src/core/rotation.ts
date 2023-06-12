import * as coreUI from './ui';
import { canCombat } from './utility';

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
