import { hunterDebuffs } from './lists';
import { fourthyFightableLosFacingUnits, modeUnits } from './utility';

class HunterCache {
  protected cache!: {
    lowestBarbedShot?: AwfulUnit;
    minSerpentStingByTTD?: { [key: string]: AwfulUnit };
  };

  constructor() {
    awful.addUpdateCallback(() => this.reset());
  }

  public reset() {
    this.cache = {};
  }

  public lowestbarbedShot(): AwfulUnit {
    const player = awful.player;

    if (this.cache.lowestBarbedShot != undefined)
      return this.cache.lowestBarbedShot;

    const enemies = modeUnits();

    let best = awful.target;
    let bestRemains = best.debuffRemains(hunterDebuffs.barbedShot, player);

    for (const enemy of enemies) {
      const enemyRemains = enemy.debuffRemains(
        hunterDebuffs.barbedShot,
        player
      );
      if (
        enemyRemains < bestRemains ||
        (enemyRemains == bestRemains && enemy.health > best.health)
      ) {
        best = enemy;
        bestRemains = enemyRemains;
      }
    }

    this.cache.lowestBarbedShot = best;
    return best;
  }

  public minSerpentStingRemains(minTTD = 7): AwfulUnit {
    const player = awful.player;

    if (
      this.cache.minSerpentStingByTTD &&
      this.cache.minSerpentStingByTTD[minTTD] != undefined
    )
      return this.cache.minSerpentStingByTTD[minTTD];

    const enemies = fourthyFightableLosFacingUnits();

    let minRemains = 100;
    let minRemainsUnit: AwfulUnit = awful.target;

    if (
      !minRemainsUnit.debuffRemains(hunterDebuffs.serpentSting, player) &&
      minRemainsUnit.ttd > minTTD
    ) {
      return minRemainsUnit;
    }

    for (const enemy of enemies) {
      const remains = enemy.debuffRemains(hunterDebuffs.serpentSting, player);
      if (
        enemy.ttd > minTTD &&
        (remains < minRemains ||
          (remains === minRemains && enemy.hp > minRemainsUnit.hp))
      ) {
        minRemains = remains;
        minRemainsUnit = enemy;
      }
    }

    this.cache.minSerpentStingByTTD = this.cache.minSerpentStingByTTD || {};
    this.cache.minSerpentStingByTTD[minTTD] = minRemainsUnit;

    return minRemainsUnit;
  }
}

export const hunterCache = new HunterCache();
