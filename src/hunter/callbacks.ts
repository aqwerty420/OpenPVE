/*
import * as spells from './spells';
import { petBuffs, hunterTalents, hunterBuffs } from './lists';
import { executeTime, fullRechargeTime, timeToMax } from '../core/simc';

spells.barrage.Callback('bm.barrage.cleave.1', (spell) => {
  const pet = awful.pet;

  if (
    !pet.exists ||
    !pet.buff(petBuffs.frenzy) ||
    pet.buffRemains(petBuffs.frenzy) > executeTime(2.8) + awful.buffer * 2
  ) {
    spell.Cast();
  }
});

spells.barbedShot.Callback((spell) => {
  const pet = awful.pet;
  const target = awful.target;

  if (!pet.exists || pet.dead) return;

  spell.Cast(target);
});

const barbedShotLowestCallback = (spell: IAwfulSpell): boolean => {
  const target = hunterCache.lowestbarbedShot();
  return spell.Cast(target);
};

spells.barbedShot.Callback('refresh', (spell) => {
  const player = awful.player;
  const target = awful.target;
  const pet = awful.pet;

  if (!pet.exists || pet.dead) return;

  if (!target.exists || target.dead || !player.canAttack(target)) return;

  if (!player.combat && !target.combat && !generalGui.startCombat.enabled())
    return;

  const frenzyRemain = pet.buffRemains(petBuffs.frenzy);

  if (
    pet.buff(petBuffs.frenzy) != undefined &&
    frenzyRemain <= awful.gcd + awful.buffer * 2 &&
    frenzyRemain >= awful.buffer
  )
    if (statusFrame.rotationMode.isST()) spell.Cast(awful.target);
    else barbedShotLowestCallback(spell);
});

spells.barbedShot.Callback('bm.barbedShot.st.1', (spell) => {
  const player = awful.player;
  const pet = awful.pet;

  if (!pet.exists || pet.dead) return;

  const frenzyRemain = pet.buffRemains(petBuffs.frenzy);

  if (
    (pet.buff(petBuffs.frenzy) &&
      frenzyRemain <= awful.gcd + awful.buffer * 2 &&
      frenzyRemain >= awful.buffer) ||
    (player.hasTalent(hunterTalents.scentOfBlood) &&
      pet.buffStacks(petBuffs.frenzy) < 3 &&
      hunterGui.bestialWrath.enabled() &&
      spells.bestialWrath.cd <= awful.gcd)
  )
    if (statusFrame.rotationMode.isST()) spell.Cast(awful.target);
    else barbedShotLowestCallback(spell);
});

spells.barbedShot.Callback('bm.barbedShot.st.2', (spell) => {
  const player = awful.player;
  const pet = awful.pet;

  if (!pet.exists || pet.dead) return;

  if (
    (player.hasTalent(hunterTalents.wildInstincts) &&
      player.buff(hunterTalents.callOfTheWild)) ||
    (player.hasTalent(hunterTalents.wildCall) &&
      spells.barbedShot.chargesFrac > 1.4) ||
    (fullRechargeTime(spells.barbedShot) < awful.gcd + awful.buffer * 2 &&
      (!hunterGui.bestialWrath.enabled() ||
        spells.bestialWrath.cd > awful.gcd)) ||
    (player.hasTalent(hunterTalents.scentOfBlood) &&
      ((hunterGui.bestialWrath.enabled() &&
        spells.bestialWrath.cd < 12 + awful.gcd + awful.buffer) ||
        (fullRechargeTime(spells.barbedShot) + awful.gcd + awful.buffer < 8 &&
          hunterGui.bestialWrath.enabled() &&
          spells.bestialWrath.cd <
            24 +
              (8 - awful.gcd) +
              fullRechargeTime(spells.barbedShot) +
              awful.buffer))) ||
    awful.FightRemains() < 9
  )
    if (statusFrame.rotationMode.isST()) spell.Cast(awful.target);
    else barbedShotLowestCallback(spell);
});

spells.barbedShot.Callback('bm.barbedShot.cleave.1', (spell) => {
  const player = awful.player;
  const pet = awful.pet;

  if (!pet.exists || pet.dead) return;

  if (
    (pet.buff(petBuffs.frenzy) &&
      pet.buffRemains(petBuffs.frenzy) <= awful.gcd + awful.buffer * 2) ||
    (player.hasTalent(hunterTalents.scentOfBlood) &&
      hunterGui.bestialWrath.enabled() &&
      spells.bestialWrath.cd < 12 + awful.gcd) ||
    (fullRechargeTime(spells.barbedShot) < awful.gcd + awful.buffer &&
      (!hunterGui.bestialWrath.enabled() || spells.bestialWrath.cd > awful.gcd))
  )
    barbedShotLowestCallback(spell);
});

spells.barbedShot.Callback('bm.barbedShot.cleave.2', (spell) => {
  const player = awful.player;
  const pet = awful.pet;

  if (!pet.exists || pet.dead) return;

  if (
    (player.hasTalent(hunterTalents.wildInstincts) &&
      player.buff(hunterTalents.callOfTheWild)) ||
    awful.FightRemains() < 9 ||
    (player.hasTalent(hunterTalents.wildCall) && spell.chargesFrac > 1.2)
  )
    barbedShotLowestCallback(spell);
});

const killCommandCallback = (spell: IAwfulSpell) => {
  const pet = awful.pet;
  const target = awful.target;

  if (!pet.exists || pet.dead) return;

  if (pet.distanceToLiteral(target) <= 50) {
    spell.Cast(target);
  }
};

spells.killCommand.Callback(killCommandCallback);

spells.killCommand.Callback('bm.killCommand.st.1', (spell) => {
  const player = awful.player;

  if (
    player.hasTalent(hunterTalents.alphaPredator) &&
    fullRechargeTime(spell) <= awful.gcd + awful.buffer * 2
  ) {
    killCommandCallback(spell);
  }
});

spells.killCommand.Callback('bm.killCommand.cleave.1', (spell) => {
  const player = awful.player;

  if (
    fullRechargeTime(spell) < awful.gcd + awful.buffer &&
    player.hasTalent(hunterTalents.alphaPredator) &&
    player.hasTalent(hunterTalents.killCleave)
  ) {
    killCommandCallback(spell);
  }
});

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

spells.cobraShot.Callback('mechanic', (spell, unit) => {
  const target = unit as IAwfulUnit;

  if (target.los && target.playerFacing && target.distance < 40) {
    spell.Cast(target);
  }
});

export const fixKillShotCallback = () => {
  const player = awful.player;
  const spell = spells.killShot;

  if (!spell.known && spell.cd > awful.gcd && spell.cost.focus > player.focus)
    return;

  const enemies = myCache.get(fourthyFightableLosFacing);
  const ignoreHp =
    player.buff(hunterBuffs.deathblow) != undefined ||
    (player.buff(hunterBuffs.coordinatedAssault) != undefined &&
      player.hasTalent(hunterTalents.coordinatedKill));

  if (ignoreHp) spell.Cast(awful.target);

  for (const enemy of enemies) {
    if (enemy.hp <= 20) {
      if (spell.Cast(enemy)) return;
    }
  }
};

const aoeCallbackKillShot = (spell: IAwfulSpell) => {
  const player = awful.player;
  const enemies = myCache.get(fourthyFightableLosFacing);
  const ignoreHp =
    player.buff(hunterBuffs.deathblow) != undefined ||
    (player.buff(hunterBuffs.coordinatedAssault) != undefined &&
      player.hasTalent(hunterTalents.coordinatedKill));

  if (ignoreHp) spell.Cast(awful.target);

  for (const enemy of enemies) {
    if (enemy.hp <= 20) {
      if (spell.Cast(enemy)) return;
    }
  }
};

spells.killShot.Callback(aoeCallbackKillShot);

const multiShotCallback = (spell: IAwfulSpell) => {
  const target = awful.target;

  spell.Cast(target);
};

spells.multiShot.Callback(multiShotCallback);

spells.multiShot.Callback('bm.multishot.cleave.1', (spell) => {
  const player = awful.player;
  const pet = awful.pet;

  if (!pet.exists || pet.dead || !player.hasTalent(hunterTalents.beastCleave))
    return;

  if (pet.buffRemains(petBuffs.beastCleave) < awful.gcd + awful.buffer * 2) {
    multiShotCallback(spell);
  }
});
*/
