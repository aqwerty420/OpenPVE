import {
  kickCast,
  kickChanneled,
  kickChanneling,
  kickImmuneData,
  stunCast,
  stunChanneled,
  stunChanneling,
  stunImmuneData,
} from './lists';
import * as globalUI from './ui';
import { hasBuffFromList } from './utility';

export const isKickImmune = (enemy: AwfulUnit): boolean =>
  hasBuffFromList(enemy, kickImmuneData);

export const canKickCast = (enemy: AwfulUnit): boolean => {
  return (
    enemy.casting != undefined &&
    enemy.castRemains >= awful.buffer &&
    ((enemy.castPct >= globalUI.minCastPercent.value() &&
      enemy.castTimeComplete >= globalUI.interruptDelay.delay()) ||
      enemy.castRemains < awful.gcd + awful.buffer * 2) &&
    ((!globalUI.whitelist.enabled() && !enemy.casting8) ||
      kickCast.has(enemy.castID as number))
  );
};

export const canKickChannel = (enemy: AwfulUnit): boolean => {
  const [, , , , , , notInterruptible] = UnitChannelInfo(enemy.pointer);

  return (
    enemy.channeling != undefined &&
    enemy.channelRemains >= awful.buffer &&
    ((!globalUI.whitelist.enabled() && !notInterruptible) ||
      (kickChanneling.has(enemy.channelID as number) &&
        enemy.channelRemains > 1.5) ||
      kickChanneled.has(enemy.channelID as number))
  );
};

export const canKickEnemy = (enemy: AwfulUnit): boolean => {
  // TODO: prevent double kick
  return (
    (!globalUI.focus.enabled() || enemy.isUnit(awful.focus)) &&
    !isKickImmune(enemy) &&
    (canKickCast(enemy) || canKickChannel(enemy))
  );
};

export const isStunImmune = (enemy: AwfulUnit): boolean =>
  hasBuffFromList(enemy, stunImmuneData);

export const canStunCast = (enemy: AwfulUnit, delay: number): boolean => {
  return (
    enemy.casting != undefined &&
    enemy.castRemains >= delay &&
    ((enemy.castPct >= globalUI.minCastPercent.value() &&
      enemy.castTimeComplete >= globalUI.interruptDelay.delay()) ||
      enemy.castRemains < awful.gcd + awful.buffer * 2) &&
    ((!globalUI.whitelist.enabled() && !enemy.casting8) ||
      stunCast.has(enemy.castID as number) ||
      kickCast.has(enemy.castID as number))
  );
};

export const canStunChannel = (enemy: AwfulUnit, delay: number): boolean => {
  const [, , , , , , notInterruptible] = UnitChannelInfo(enemy.pointer);

  return (
    enemy.channeling != undefined &&
    enemy.channelRemains >= delay &&
    ((!globalUI.whitelist.enabled() && !notInterruptible) ||
      ((stunChanneling.has(enemy.channelID as number) ||
        kickChanneling.has(enemy.channelID as number)) &&
        enemy.channelRemains > 1 + delay) ||
      stunChanneled.has(enemy.channelID as number) ||
      kickChanneled.has(enemy.channelID as number))
  );
};

export const canStunEnemy = (enemy: AwfulUnit, delay?: number): boolean => {
  delay = (delay || 0) + awful.buffer;
  return (
    (!globalUI.focus.enabled() || enemy.isUnit(awful.focus)) &&
    !isStunImmune(enemy) &&
    (canStunCast(enemy, delay) || canStunChannel(enemy, delay))
  );
};
