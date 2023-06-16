import { unitBlacklist } from './lists';
import { isDamageImmune, isGroupTagged } from './utility';

export interface IDynamicParameters {
  melee?: true;
  distance?: number;
  distanceLiteral?: number;
  fromUnit?: AwfulUnit;
  meleeFrom?: true;
  distanceFrom?: number;
  distanceFromLiteral?: number;
  alive?: true;
  affectingCombat?: true;
  notCc?: true;
  notBlacklisted?: true;
  los?: true;
  facing?: true;
  facingPlayer?: true;
  immune?: true;
}

class UnitCache {
  protected cache!: Record<string, AwfulList<AwfulUnit>>;

  constructor() {
    awful.addUpdateCallback(() => this.reset());
  }

  public reset() {
    this.cache = {};
  }

  public dynamicFilter(options: IDynamicParameters, unit: AwfulUnit): boolean {
    if (!awful.player.canAttack(unit)) return false;

    if (unit.health <= 2) return false;

    if (options.distance != undefined && unit.distance > options.distance)
      return false;

    if (
      options.distanceLiteral != undefined &&
      unit.distanceLiteral > options.distanceLiteral
    )
      return false;

    if (
      options.distanceFrom != undefined &&
      options.fromUnit != undefined &&
      unit.distanceTo(options.fromUnit) > options.distanceFrom
    )
      return false;

    if (
      options.distanceFromLiteral != undefined &&
      options.fromUnit != undefined &&
      unit.distanceToLiteral(options.fromUnit) > options.distanceFromLiteral
    )
      return false;

    if (
      options.meleeFrom != undefined &&
      options.fromUnit != undefined &&
      unit.meleeRangeOf(options.fromUnit)
    )
      return false;

    if (options.melee != undefined && !unit.meleeRange) return false;

    if (options.alive != undefined && unit.dead) return false;

    if (options.affectingCombat != undefined && !isGroupTagged(unit))
      return false;

    if (options.notCc != undefined && unit.cc) return false;

    if (options.notBlacklisted != undefined && unitBlacklist.has(unit.id))
      return false;

    if (options.los != undefined && !unit.los) return false;

    if (options.facing != undefined && !unit.playerFacing) return false;

    if (options.facingPlayer != undefined && !unit.facing(awful.player))
      return false;

    if (options.immune != undefined && isDamageImmune(unit)) return false;

    return true;
  }

  protected getIndex(listKey: string, options: IDynamicParameters): string {
    let index = listKey;

    if (options.melee != undefined) index += 'melee';
    if (options.distance != undefined) index += `distance${options.distance}`;
    if (options.distanceLiteral != undefined)
      index += `distanceLiteral${options.distanceLiteral}`;
    if (options.fromUnit != undefined) index += options.fromUnit.guid;
    if (options.meleeFrom != undefined) index += 'meleeFrom';
    if (options.distanceFrom != undefined)
      index += `distanceFrom${options.distanceFrom}`;
    if (options.distanceFromLiteral != undefined)
      index += `distanceFromLiteral${options.distanceFromLiteral}`;
    if (options.alive != undefined) index += 'alive';
    if (options.affectingCombat != undefined) index += 'affectingCombat';
    if (options.notCc != undefined) index += 'notCc';
    if (options.notBlacklisted != undefined) index += 'notBlacklisted';
    if (options.los != undefined) index += 'los';
    if (options.facing != undefined) index += 'facing';
    if (options.facingPlayer != undefined) index += 'facingPlayer';
    if (options.immune != undefined) index += 'immune';

    return index;
  }

  private get(
    list: AwfulList<AwfulUnit>,
    listKey: string,
    options: IDynamicParameters
  ): AwfulList<AwfulUnit> {
    const index = this.getIndex(listKey, options);
    if (this.cache[index] != null) return this.cache[index];

    const units = list.filter((unit) => this.dynamicFilter(options, unit));

    this.cache[index] = units;
    return units;
  }

  public getUnits(options: IDynamicParameters): AwfulList<AwfulUnit> {
    return this.get(awful.units, 'units', options);
  }

  public getEnemies(options: IDynamicParameters): AwfulList<AwfulUnit> {
    return this.get(awful.enemies, 'enemies', options);
  }

  public getExplosives(options: IDynamicParameters): AwfulList<AwfulUnit> {
    return this.get(awful.explosives, 'explosives', options);
  }
}

export const coreCache = new UnitCache();
