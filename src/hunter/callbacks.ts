import * as spells from './spells';
import * as hunterUI from './ui';
import * as generalUI from '../core/ui';
import { petBuffs, hunterTalents, hunterBuffs } from './lists';
import { fullRechargeTime, timeToMax } from '../core/simc';
import { canCombat, canStartCombat } from './rotation';

const petAlive = (): boolean => {
  const pet = awful.pet;

  return pet.exists && !pet.dead;
};

//#region Barbed Shot

const barbedShotLowestCallback = (spell: AwfulSpell): boolean => {
  // TODO: hunterCache.lowestbarbedShot();
  const target = awful.target;

  return spell.Cast(target);
};

spells.barbedShot.Callback((spell) => {
  const target = awful.target;

  if (!petAlive()) return;

  spell.Cast(target);
});

spells.barbedShot.Callback('lowest', (spell) => {
  if (!petAlive()) return;

  barbedShotLowestCallback(spell);
});

spells.barbedShot.Callback('refresh', (spell) => {
  const pet = awful.pet;

  if (!canCombat() || !petAlive() || !canStartCombat()) return;

  const frenzyRemain = pet.buffRemains(petBuffs.frenzy);

  if (
    pet.buff(petBuffs.frenzy) != undefined &&
    frenzyRemain <= awful.gcd + awful.buffer * 2 &&
    frenzyRemain >= awful.buffer
  )
    if (generalUI.rotationMode.singleTarget()) spell.Cast(awful.target);
    else barbedShotLowestCallback(spell);
});

spells.barbedShot.Callback('bm.barbedShot.st.1', (spell) => {
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
      spells.bestialWrath.cd <= awful.gcd)
  )
    if (generalUI.rotationMode.singleTarget()) spell.Cast(awful.target);
    else barbedShotLowestCallback(spell);
});

spells.barbedShot.Callback('bm.barbedShot.st.2', (spell) => {
  const player = awful.player;

  if (!petAlive()) return;

  if (
    (player.hasTalent(hunterTalents.wildInstincts) &&
      player.buff(hunterTalents.callOfTheWild)) ||
    (player.hasTalent(hunterTalents.wildCall) &&
      spells.barbedShot.chargesFrac > 1.4) ||
    (fullRechargeTime(spells.barbedShot) < awful.gcd + awful.buffer * 2 &&
      (!hunterUI.bestialWrath.usable() ||
        spells.bestialWrath.cd > awful.gcd)) ||
    (player.hasTalent(hunterTalents.scentOfBlood) &&
      ((hunterUI.bestialWrath.usable() &&
        spells.bestialWrath.cd < 12 + awful.gcd + awful.buffer) ||
        (fullRechargeTime(spells.barbedShot) + awful.gcd + awful.buffer < 8 &&
          hunterUI.bestialWrath.usable() &&
          spells.bestialWrath.cd <
            24 +
              (8 - awful.gcd) +
              fullRechargeTime(spells.barbedShot) +
              awful.buffer))) ||
    awful.FightRemains() < 9
  )
    if (generalUI.rotationMode.singleTarget()) spell.Cast(awful.target);
    else barbedShotLowestCallback(spell);
});

//#endregion Barbed Shot

//#region Kill Command

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

spells.killCommand.Callback((spell) => {
  if (!petAlive()) return;

  killCommandCallback(spell);
});

spells.killCommand.Callback('bm.killCommand.st.1', (spell) => {
  const player = awful.player;

  if (
    petAlive() &&
    player.hasTalent(hunterTalents.alphaPredator) &&
    fullRechargeTime(spell) <= awful.gcd + awful.buffer * 2
  ) {
    killCommandCallback(spell);
  }
});

//#endregion Kill Command

//#region Call of the Wild

spells.callOfTheWild.Callback((spell) => {
  if (!hunterUI.callOfTheWild.usable()) return;

  spell.Cast();
});

//#endregion Call of the Wild

//#region Death Chakram

spells.deathChakram.Callback((spell) => {
  const target = awful.target;

  if (!hunterUI.deathChakram.usable()) return;

  spell.Cast(target);
});

//#endregion Death Chakram

//#region Bloodshed

const bloodshedDistanceCheck = (target: AwfulUnit): boolean => {
  const pet = awful.pet;

  return pet.distanceToLiteral(target) <= 50;
};

spells.bloodshed.Callback((spell) => {
  const target = awful.target;

  if (
    petAlive() &&
    hunterUI.bloodshed.usable() &&
    bloodshedDistanceCheck(target)
  ) {
    spell.Cast(target);
  }
});

//#endregion Bloodshed

//#region Stampede

spells.stampede.Callback((spell) => {
  if (!hunterUI.stampede.usable()) return;

  spell.Cast();
});

//#endregion Stampede

//#region A Murder of Crows

spells.aMurderofCrows.Callback((spell) => {
  const target = awful.target;

  if (!hunterUI.aMurderofCrows.usable()) return;

  spell.Cast(target);
});

//#endregion A Murder of Crows

//#region Steel Trap

spells.steelTrap.Callback((spell) => {
  const target = awful.target;

  if (!hunterUI.steelTrap.usable()) return;

  spell.AoECast(target);
});

//#endregion Steel Trap

//#region Explosive Shot

const explosiveShotCallback = (spell: AwfulSpell): boolean => {
  const target = awful.target;

  if (!hunterUI.explosiveShot.usable()) return false;

  return spell.Cast(target);
};

spells.explosiveShot.Callback(explosiveShotCallback);

//#endregion Explosive Shot

//#region Bestial Wrath

spells.bestialWrath.Callback((spell) => {
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

//#endregion Bestial Wrath

//#region Dire Beast

spells.direBeast.Callback((spell) => {
  const target = awful.target;

  if (!hunterUI.direBeast.usable()) return;

  spell.Cast(target);
});

//#endregion Dire Beast

//#region Kill Shot

const killShotIgnoreHP = (): boolean => {
  const player = awful.player;

  return (
    player.buff(hunterBuffs.deathblow) != undefined ||
    (player.buff(hunterBuffs.coordinatedAssault) != undefined &&
      player.hasTalent(hunterTalents.coordinatedKill) != false)
  );
};

spells.killShot.Callback((spell) => {
  const target = awful.target;

  if (!killShotIgnoreHP() && target.hp > 20) return;

  spell.Cast(target);
});

spells.killShot.Callback('aoe', (spell) => {
  // TODO: myCache.get(fourthyFightableLosFacing);
  const enemies = [awful.target];

  if (killShotIgnoreHP()) spell.Cast(awful.target);

  for (const enemy of enemies) {
    if (enemy.hp <= 20) {
      if (spell.Cast(enemy)) return;
    }
  }
});

//#endregion Kill Shot

//#region Aspect of the Wild

spells.aspectOfTheWild.Callback((spell) => {
  const target = awful.target;

  if (!hunterUI.aspectOfTheWild.usable()) return;

  spell.Cast(target);
});

//#endregion Aspect of the Wild

//#region Cobra Shot

spells.cobraShot.Callback((spell) => {
  const target = awful.target;

  spell.Cast(target);
});

spells.cobraShot.Callback('bm.cobraShot.cleave.1', (spell) => {
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

//#region Mechanic

spells.cobraShot.Callback('mechanic', (spell, target: AwfulUnit) => {
  if (target.los && target.playerFacing && target.distance < 40) {
    spell.Cast(target);
  }
});

//#endregion Mechanic
