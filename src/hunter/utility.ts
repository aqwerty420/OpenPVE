import { coreCache } from '../core/cache';
import { hunterTalents, petBuffs } from './lists';
import * as hunterSpells from './spells';
import * as coreUI from '../core/ui';

export const modeParams: IDynamicParameters = {
  distanceFrom: 8,
  alive: true,
  notCc: true,
  notBlacklisted: true,
  immune: true,
};

const isValidUnitForModeParams = (unit: AwfulUnit): boolean => {
  return unit.exists && !unit.dead;
};

awful.addUpdateCallback(() => {
  const target = awful.target;

  if (isValidUnitForModeParams(target)) {
    modeParams.fromUnit = awful.target;
  } else {
    modeParams.fromUnit = awful.player;
  }
});

export const modeUnits = (): AwfulList<AwfulUnit> =>
  coreCache.getUnits(modeParams);

export const fourthyFightableLosFacingParams: IDynamicParameters = {
  distance: 40,
  alive: true,
  affectingCombat: true,
  notCc: true,
  notBlacklisted: true,
  los: true,
  facing: true,
  immune: true,
};

export const fourthyFightableLosFacingUnits = (): AwfulList<AwfulUnit> =>
  coreCache.getUnits(fourthyFightableLosFacingParams);

export const petAlive = (): boolean => {
  const pet = awful.pet;

  return pet.exists && !pet.dead;
};

export const fourthyEngagedLosFacingParams: IDynamicParameters = {
  distance: 40,
  alive: true,
  affectingCombat: true,
  notCc: true,
  los: true,
  facing: true,
};

export const fourthyEngagedLosFacingUnits = (): AwfulList<AwfulUnit> =>
  coreCache.getUnits(fourthyEngagedLosFacingParams);

export const fourthyEngagedLosParams: IDynamicParameters = {
  distance: 40,
  alive: true,
  affectingCombat: true,
  notCc: true,
  los: true,
};

export const fourthyEngagedLosUnits = (): AwfulList<AwfulUnit> =>
  coreCache.getUnits(fourthyEngagedLosParams);

export const waitForBarbedShot = (): boolean => {
  const pet = awful.pet;

  return (
    petAlive() &&
    pet.buff(petBuffs.frenzy) != null &&
    pet.buffRemains(petBuffs.frenzy) <= awful.gcd + awful.buffer * 2 &&
    pet.buffRemains(petBuffs.frenzy) >=
      hunterSpells.barbedShot.cd + awful.buffer
  );
};

export const isSingleTarget = (): boolean => {
  const player = awful.player;
  const enemiesAround = modeUnits().length;
  return (
    coreUI.rotationMode.singleTarget() ||
    enemiesAround < 2 ||
    (!player.hasTalent(hunterTalents.beastCleave) && enemiesAround < 3)
  );
};

export const petStatus = {
  triedPetCall: false,
};

export const disengageForwardInfos = {
  inverseTime: 0,
  playerRotation: undefined as number | undefined,
};
