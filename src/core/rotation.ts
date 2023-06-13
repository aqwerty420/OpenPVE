import { coreCache } from './cache';
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

const aroundParameters: IDynamicParameters = {
  distance: 40,
  alive: true,
};

const unitsAround = () => coreCache.getEnemies(aroundParameters);

export const playerHasAggro = (units = unitsAround): boolean => {
  const player = awful.player;
  const enemies = units();

  for (const enemy of enemies) {
    const threat = UnitThreatSituation(player.pointer, enemy.pointer);
    if (
      threat === ThreatStatus.highestTreat ||
      threat === ThreatStatus.highestAndPrimary
    )
      return true;
  }

  return false;
};

class FightTracker {
  private fightStart = 0;
  private started = false;

  constructor() {
    awful.addUpdateCallback(() => this.update());
  }

  private update(): void {
    const player = awful.player;

    if (player.combat) {
      if (!this.started) {
        this.fightStart = awful.time;
        this.started = true;
      }
    } else {
      this.fightStart = awful.time;
      this.started = false;
    }
  }

  public time(): number {
    return awful.time - this.fightStart;
  }
}

export const fightTracker = new FightTracker();
