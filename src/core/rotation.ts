import {
  kickCast,
  kickChanneled,
  kickChanneling,
  stunCast,
  stunChanneled,
  stunChanneling,
} from './lists';
import * as coreUI from './ui';
import { isKickImmune, isStunImmune } from './utility';

export const canKickCast = (enemy: AwfulUnit): boolean => {
  return (
    enemy.casting != undefined &&
    enemy.castRemains >= awful.buffer &&
    ((enemy.castPct >= coreUI.minCastPercent.value() &&
      enemy.castTimeComplete >= coreUI.interruptDelay.delay()) ||
      enemy.castRemains < awful.gcd + awful.buffer * 2) &&
    ((!coreUI.whitelist.enabled() && !enemy.casting8) ||
      kickCast.has(enemy.castID as number))
  );
};

export const canKickChannel = (enemy: AwfulUnit): boolean => {
  const [, , , , , , notInterruptible] = UnitChannelInfo(enemy.pointer);

  return (
    enemy.channeling != undefined &&
    enemy.channelRemains >= awful.buffer &&
    ((!coreUI.whitelist.enabled() && !notInterruptible) ||
      (kickChanneling.has(enemy.channelID as number) &&
        enemy.channelRemains > 1.5) ||
      kickChanneled.has(enemy.channelID as number))
  );
};

export const canKickEnemy = (enemy: AwfulUnit): boolean => {
  // TODO: prevent double kick
  return (
    (!coreUI.focus.enabled() || enemy.isUnit(awful.focus)) &&
    !isKickImmune(enemy) &&
    (canKickCast(enemy) || canKickChannel(enemy))
  );
};

export const canStunCast = (enemy: AwfulUnit, delay: number): boolean => {
  return (
    enemy.casting != undefined &&
    enemy.castRemains >= delay &&
    ((enemy.castPct >= coreUI.minCastPercent.value() &&
      enemy.castTimeComplete >= coreUI.interruptDelay.delay()) ||
      enemy.castRemains < awful.gcd + awful.buffer * 2) &&
    ((!coreUI.whitelist.enabled() && !enemy.casting8) ||
      stunCast.has(enemy.castID as number) ||
      kickCast.has(enemy.castID as number))
  );
};

export const canStunChannel = (enemy: AwfulUnit, delay: number): boolean => {
  const [, , , , , , notInterruptible] = UnitChannelInfo(enemy.pointer);

  return (
    enemy.channeling != undefined &&
    enemy.channelRemains >= delay &&
    ((!coreUI.whitelist.enabled() && !notInterruptible) ||
      ((stunChanneling.has(enemy.channelID as number) ||
        kickChanneling.has(enemy.channelID as number)) &&
        enemy.channelRemains > 1 + delay) ||
      stunChanneled.has(enemy.channelID as number) ||
      kickChanneled.has(enemy.channelID as number))
  );
};

export const canStunEnemy = (enemy: AwfulUnit, delay?: number): boolean => {
  // TODO: prevent double kick
  delay = (delay || 0) + awful.buffer;
  return (
    (!coreUI.focus.enabled() || enemy.isUnit(awful.focus)) &&
    !isStunImmune(enemy) &&
    (canStunCast(enemy, delay) || canStunChannel(enemy, delay))
  );
};
