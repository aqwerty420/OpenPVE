import {
  bypassThreat,
  damageImmuneData,
  kickImmuneData,
  stunImmuneData,
} from './lists';

export const hasBuffFromList = (enemy: AwfulUnit, buffs: number[]): boolean => {
  buffs.forEach((buff) => {
    if (enemy.buff(buff) != undefined) return true;
  });
  return false;
};

export const isDamageImmune = (enemy: AwfulUnit): boolean =>
  hasBuffFromList(enemy, damageImmuneData);

export const isKickImmune = (enemy: AwfulUnit): boolean =>
  hasBuffFromList(enemy, kickImmuneData);

export const isStunImmune = (enemy: AwfulUnit): boolean =>
  hasBuffFromList(enemy, stunImmuneData);

export const isGroupTagged = (unit: AwfulUnit): boolean => {
  if (bypassThreat.has(unit.id)) return true;

  for (const ally of awful.fGroup) {
    if (UnitThreatSituation(ally.pointer, unit.pointer) != undefined)
      return true;
  }

  return false;
};
