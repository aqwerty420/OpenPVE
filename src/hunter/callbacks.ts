import * as hunterSpells from './spells';
import * as hunterUI from './ui';
import * as coreUI from '../core/ui';
import { petBuffs, hunterTalents, hunterBuffs } from './lists';
import { executeTime, fullRechargeTime, timeToMax } from '../core/simc';
import { hunterCache } from './cache';
import {
  canCombat,
  canKickEnemy,
  canStartCombat,
  canStunEnemy,
} from '../core/utility';
import {
  disengageForwardInfos,
  fourthyEngagedLosFacingUnits,
  fourthyEngagedLosUnits,
  fourthyFightableLosFacingUnits,
  petAlive,
} from './utility';

//#region DPS

const barbedShotLowestCallback = (spell: AwfulSpell): boolean => {
  const target = hunterCache.lowestbarbedShot();

  return spell.Cast(target);
};

hunterSpells.barbedShot.Callback((spell) => {
  const target = awful.target;

  if (!petAlive()) return;

  spell.Cast(target);
});

hunterSpells.barbedShot.Callback('lowest', (spell) => {
  if (!petAlive()) return;

  barbedShotLowestCallback(spell);
});

hunterSpells.barbedShot.Callback('refresh', (spell) => {
  const pet = awful.pet;

  if (!canCombat() || !petAlive() || !canStartCombat()) return;

  const frenzyRemain = pet.buffRemains(petBuffs.frenzy);

  if (
    pet.buff(petBuffs.frenzy) != undefined &&
    frenzyRemain <= awful.gcd + awful.buffer * 2 &&
    frenzyRemain >= awful.buffer
  )
    if (coreUI.rotationMode.singleTarget()) spell.Cast(awful.target);
    else barbedShotLowestCallback(spell);
});

hunterSpells.barbedShot.Callback('bm.barbedShot.st.1', (spell) => {
  const player = awful.player;
  const pet = awful.pet;

  if (!petAlive()) return;

  const frenzyRemain = pet.buffRemains(petBuffs.frenzy);

  if (
    (pet.buff(petBuffs.frenzy) &&
      frenzyRemain <= awful.gcd + awful.buffer * 2 &&
      frenzyRemain >= awful.buffer) ||
    (player.hasTalent(hunterTalents.scentOfBlood) &&
      pet.buffStacks(petBuffs.frenzy) < 3 &&
      hunterUI.bestialWrath.usable() &&
      hunterSpells.bestialWrath.cd <= awful.gcd)
  )
    if (coreUI.rotationMode.singleTarget()) spell.Cast(awful.target);
    else barbedShotLowestCallback(spell);
});

hunterSpells.barbedShot.Callback('bm.barbedShot.st.2', (spell) => {
  const player = awful.player;

  if (!petAlive()) return;

  if (
    (player.hasTalent(hunterTalents.wildInstincts) &&
      player.buff(hunterTalents.callOfTheWild)) ||
    (player.hasTalent(hunterTalents.wildCall) &&
      hunterSpells.barbedShot.chargesFrac > 1.4) ||
    (fullRechargeTime(hunterSpells.barbedShot) < awful.gcd + awful.buffer * 2 &&
      (!hunterUI.bestialWrath.usable() ||
        hunterSpells.bestialWrath.cd > awful.gcd)) ||
    (player.hasTalent(hunterTalents.scentOfBlood) &&
      ((hunterUI.bestialWrath.usable() &&
        hunterSpells.bestialWrath.cd < 12 + awful.gcd + awful.buffer) ||
        (fullRechargeTime(hunterSpells.barbedShot) + awful.gcd + awful.buffer <
          8 &&
          hunterUI.bestialWrath.usable() &&
          hunterSpells.bestialWrath.cd <
            24 +
              (8 - awful.gcd) +
              fullRechargeTime(hunterSpells.barbedShot) +
              awful.buffer))) ||
    awful.FightRemains() < 9
  )
    if (coreUI.rotationMode.singleTarget()) spell.Cast(awful.target);
    else barbedShotLowestCallback(spell);
});

hunterSpells.barbedShot.Callback('bm.barbedShot.cleave.1', (spell) => {
  const player = awful.player;
  const pet = awful.pet;

  if (!petAlive()) return;

  const frenzyRemain = pet.buffRemains(petBuffs.frenzy);

  if (
    (pet.buff(petBuffs.frenzy) &&
      frenzyRemain <= awful.gcd + awful.buffer * 2 &&
      frenzyRemain >= awful.buffer) ||
    (player.hasTalent(hunterTalents.scentOfBlood) &&
      hunterUI.bestialWrath.usable() &&
      hunterSpells.bestialWrath.cd < 12 + awful.gcd) ||
    (fullRechargeTime(hunterSpells.barbedShot) < awful.gcd + awful.buffer &&
      (!hunterUI.bestialWrath.usable() ||
        hunterSpells.bestialWrath.cd > awful.gcd))
  )
    barbedShotLowestCallback(spell);
});

hunterSpells.barbedShot.Callback('bm.barbedShot.cleave.2', (spell) => {
  const player = awful.player;

  if (!petAlive()) return;

  if (
    (player.hasTalent(hunterTalents.wildInstincts) &&
      player.buff(hunterTalents.callOfTheWild)) ||
    awful.FightRemains() < 9 ||
    (player.hasTalent(hunterTalents.wildCall) && spell.chargesFrac > 1.2)
  )
    barbedShotLowestCallback(spell);
});

const killCommandDistanceCheck = (target: AwfulUnit): boolean => {
  const pet = awful.pet;

  return pet.distanceToLiteral(target) <= 50;
};

const killCommandCallback = (spell: AwfulSpell) => {
  const target = awful.target;

  if (killCommandDistanceCheck(target)) {
    spell.Cast(target);
  }
};

hunterSpells.killCommand.Callback((spell) => {
  if (!petAlive()) return;

  killCommandCallback(spell);
});

hunterSpells.killCommand.Callback('bm.killCommand.st.1', (spell) => {
  const player = awful.player;

  if (
    petAlive() &&
    player.hasTalent(hunterTalents.alphaPredator) &&
    fullRechargeTime(spell) <= awful.gcd + awful.buffer * 2
  ) {
    killCommandCallback(spell);
  }
});

hunterSpells.killCommand.Callback('bm.killCommand.cleave.1', (spell) => {
  const player = awful.player;

  if (!petAlive()) return;

  if (
    fullRechargeTime(spell) < awful.gcd + awful.buffer &&
    player.hasTalent(hunterTalents.alphaPredator) &&
    player.hasTalent(hunterTalents.killCleave)
  ) {
    killCommandCallback(spell);
  }
});

hunterSpells.callOfTheWild.Callback((spell) => {
  if (!hunterUI.callOfTheWild.usable()) return;

  spell.Cast();
});

hunterSpells.multiShot.Callback('bm.multishot.cleave.1', (spell) => {
  const player = awful.player;
  const pet = awful.pet;
  const target = awful.target;

  if (!petAlive() || !player.hasTalent(hunterTalents.beastCleave)) return;

  if (pet.buffRemains(petBuffs.beastCleave) < awful.gcd + awful.buffer * 2) {
    spell.Cast(target);
  }
});

hunterSpells.deathChakram.Callback((spell) => {
  const target = awful.target;

  if (!hunterUI.deathChakram.usable()) return;

  spell.Cast(target);
});

const bloodshedDistanceCheck = (target: AwfulUnit): boolean => {
  const pet = awful.pet;

  return pet.distanceToLiteral(target) <= 50;
};

hunterSpells.bloodshed.Callback((spell) => {
  const target = awful.target;

  if (
    petAlive() &&
    hunterUI.bloodshed.usable() &&
    bloodshedDistanceCheck(target)
  ) {
    spell.Cast(target);
  }
});

hunterSpells.stampede.Callback((spell) => {
  if (!hunterUI.stampede.usable()) return;

  spell.Cast();
});

hunterSpells.aMurderofCrows.Callback((spell) => {
  const target = awful.target;

  if (!hunterUI.aMurderofCrows.usable()) return;

  spell.Cast(target);
});

hunterSpells.barrage.Callback('bm.barrage.cleave.1', (spell) => {
  const pet = awful.pet;

  if (
    hunterUI.barrage.usable() &&
    (!petAlive() ||
      !pet.buff(petBuffs.frenzy) ||
      pet.buffRemains(petBuffs.frenzy) > executeTime(2.8) + awful.buffer * 2)
  ) {
    spell.Cast();
  }
});

hunterSpells.steelTrap.Callback((spell) => {
  const target = awful.target;

  if (!hunterUI.steelTrap.usable()) return;

  spell.AoECast(target);
});

const explosiveShotCallback = (spell: AwfulSpell): boolean => {
  const target = awful.target;

  if (!hunterUI.explosiveShot.usable()) return false;

  return spell.Cast(target);
};

hunterSpells.explosiveShot.Callback(explosiveShotCallback);

hunterSpells.bestialWrath.Callback((spell) => {
  const player = awful.player;
  const target = awful.target;

  if (
    petAlive() &&
    hunterUI.bestialWrath.usable() &&
    player.distanceTo(target) <= 50
  ) {
    spell.Cast();
  }
});

hunterSpells.direBeast.Callback((spell) => {
  const target = awful.target;

  if (!hunterUI.direBeast.usable()) return;

  spell.Cast(target);
});

const killShotIgnoreHP = (): boolean => {
  const player = awful.player;

  return (
    player.buff(hunterBuffs.deathblow) != undefined ||
    (player.buff(hunterBuffs.coordinatedAssault) != undefined &&
      player.hasTalent(hunterTalents.coordinatedKill) != false)
  );
};

hunterSpells.killShot.Callback((spell) => {
  const target = awful.target;

  if (!killShotIgnoreHP() && target.hp > 20) return;

  spell.Cast(target);
});

hunterSpells.killShot.Callback('aoe', (spell) => {
  const enemies = fourthyFightableLosFacingUnits();

  if (killShotIgnoreHP()) spell.Cast(awful.target);

  for (const enemy of enemies) {
    if (enemy.hp <= 20) {
      if (spell.Cast(enemy)) return;
    }
  }
});

hunterSpells.aspectOfTheWild.Callback((spell) => {
  const target = awful.target;

  if (!hunterUI.aspectOfTheWild.usable()) return;

  spell.Cast(target);
});

hunterSpells.cobraShot.Callback((spell) => {
  const target = awful.target;

  spell.Cast(target);
});

hunterSpells.cobraShot.Callback('bm.cobraShot.cleave.1', (spell) => {
  const player = awful.player;
  const target = awful.target;

  const ttm = timeToMax();

  if (
    ttm < awful.gcd * 2 ||
    (player.buff(hunterBuffs.aspectOfTheWild) && ttm < awful.gcd * 4)
  ) {
    spell.Cast(target);
  }
});

hunterSpells.wailingArrow.Callback((spell) => {
  const pet = awful.pet;
  const target = awful.target;

  if (
    hunterUI.wailingArrow.usable() &&
    (!petAlive() ||
      !pet.buff(petBuffs.frenzy) ||
      pet.buffRemains(petBuffs.frenzy) >
        hunterSpells.wailingArrow.castTime + awful.buffer * 2 ||
      awful.FightRemains() < 5)
  ) {
    spell.Cast(target);
  }
});

//#endregion DPS

//#region Interrupts

hunterSpells.counterShot.Callback((spell) => {
  if (!hunterUI.counterShot.enabled() || !coreUI.interrupts.enabled()) return;

  const enemies = fourthyEngagedLosFacingUnits();

  for (const enemy of enemies) {
    if (canKickEnemy(enemy)) {
      if (spell.Cast(enemy)) {
        return;
      }
    }
  }
});

hunterSpells.intimidation.Callback((spell) => {
  const pet = awful.pet;
  if (
    !petAlive() ||
    !hunterUI.intimidation.enabled() ||
    !coreUI.interrupts.enabled()
  )
    return;

  const enemies = fourthyEngagedLosUnits();

  for (const enemy of enemies) {
    if (enemy.distanceTo(pet) <= 50 && canStunEnemy(enemy, 0.5)) {
      if (spell.Cast(enemy)) {
        return;
      }
    }
  }
});

hunterSpells.freezingTrap.Callback((spell) => {
  if (!hunterUI.freezingTrap.enabled() || !coreUI.interrupts.enabled()) return;

  const enemies = fourthyEngagedLosUnits();

  for (const enemy of enemies) {
    if (canStunEnemy(enemy, 1)) {
      if (spell.AoECast(enemy)) {
        return;
      }
    }
  }
});

//#endregion Interrupts

//#region Defensive

hunterSpells.exhilaration.Callback((spell) => {
  if (hunterUI.exhilaration.usable()) {
    spell.Cast();
  }
});

hunterSpells.aspectOfTheTurtle.Callback((spell) => {
  if (
    hunterUI.aspectOfTheTurtle.usable() &&
    !awful.player.buff(hunterBuffs.aspectOfTheTurtle)
  ) {
    spell.Cast();
  }
});

hunterSpells.feignDeath.Callback((spell) => {
  if (
    hunterUI.feignDeath.usable() &&
    !awful.player.buff(hunterBuffs.feignDeath)
  ) {
    spell.Cast();
  }
});

//#region Mechanic

hunterSpells.cobraShot.Callback('mechanic', (spell, unit: AwfulUnit) => {
  if (unit.los && unit.playerFacing && unit.distance < 40) {
    spell.Cast(unit);
  }
});

hunterSpells.counterShot.Callback('mechanic', (spell, unit: AwfulUnit) => {
  if (unit.los && unit.playerFacing && unit.distance < 40) {
    spell.Cast(unit);
  }
});

hunterSpells.tranquilizingShot.Callback(
  'mechanic',
  (spell, unit: AwfulUnit) => {
    if (unit.los && unit.playerFacing && unit.distance < 40) {
      spell.Cast(unit);
    }
  }
);

hunterSpells.freezingTrap.Callback('mechanic', (spell, unit: AwfulUnit) => {
  if (unit.los && unit.distance < 40) {
    spell.AoECast(unit);
  }
});

hunterSpells.tarTrap.Callback('mechanic', (spell, unit: AwfulUnit) => {
  if (unit.los && unit.distance <= 40) {
    spell.AoECast(unit);
  }
});

hunterSpells.bindingShot.Callback('mechanic', (spell, unit: AwfulUnit) => {
  if (unit.los && unit.distance <= 30) {
    spell.AoECast(unit);
  }
});

hunterSpells.serpentSting.Callback('mechanic', (spell, unit: AwfulUnit) => {
  if (unit.los && unit.playerFacing && unit.distance <= 40) {
    spell.Cast(unit);
  }
});

hunterSpells.intimidation.Callback('mechanic', (spell, unit: AwfulUnit) => {
  const pet = awful.pet;
  const target = unit as AwfulUnit;

  if (!petAlive()) return;

  if (target.los && target.distance < 100 && target.distanceTo(pet) < 50) {
    spell.Cast(target);
  }
});

hunterSpells.feignDeath.Callback('mechanic', (spell) => {
  spell.Cast();
});

//#endregion Mechanic

hunterSpells.disengage.Callback('forward', (spell) => {
  if (disengageForwardInfos.inverseTime > awful.time) return;

  if (spell.Cast()) {
    hunterUI.disengageTrigger.disable();
    disengageForwardInfos.inverseTime = awful.time + 0.05;
  }
});

hunterSpells.misdirection.Callback((spell) => {
  const allies = awful.group;

  const pet = awful.pet;

  if (!hunterUI.misdirection.usable()) return;

  for (const ally of allies) {
    if (ally.los && !ally.dead && ally.distance < 100 && ally.isTank) {
      if (spell.Cast(ally)) return;
    }
  }

  if (petAlive() && pet.distance < 100 && pet.los) {
    spell.Cast(pet);
  }
});
