import { selectNewTarget } from '../core/rotation';
import { canCombat, canRun } from '../core/utility';
import {
  fourthyFightableLosFacingUnits,
  isSingleTarget,
  waitForBarbedShot,
} from './utility';
import * as hunterSpells from './spells';
import { defensivesHandler, interruptsHandler, petManager } from './rotation';
import { bigWigsTimeLine } from '../core/bigWigs';
import * as hunterUI from './ui';
import { load } from './callbacks';

load();

// https://github.com/simulationcraft/simc/blob/dragonflight/profiles/Tier30/T30_Hunter_Beast_Mastery.simc

const st = (): void => {
  // 1 - actions.st=barbed_shot,target_if=min:dot.barbed_shot.remains,if=pet.main.buff.frenzy.up&pet.main.buff.frenzy.remains<=gcd+0.25|talent.scent_of_blood&pet.main.buff.frenzy.stack<3&cooldown.bestial_wrath.ready
  hunterSpells.barbedShot('bm.barbedShot.st.1');

  // actions.st+=/kill_command,if=full_recharge_time<gcd&talent.alpha_predator
  hunterSpells.killCommand('bm.killCommand.st.1');

  // 0 - actions.st+=/call_of_the_wild
  hunterSpells.callOfTheWild();

  // 0 - actions.st+=/death_chakram
  hunterSpells.deathChakram();

  // 0 - actions.st+=/bloodshed
  hunterSpells.bloodshed();

  // 0 - actions.st+=/stampede
  hunterSpells.stampede();

  // 0 - actions.st+=/a_murder_of_crows
  hunterSpells.aMurderofCrows();

  // 0 - actions.st+=/steel_trap
  hunterSpells.steelTrap();

  // 0 - actions.st+=/explosive_shot
  hunterSpells.exhilaration();

  // 0 - actions.st+=/bestial_wrath
  hunterSpells.bestialWrath();

  // 0 - actions.st+=/kill_command
  hunterSpells.killCommand();

  // 2 - actions.st+=/barbed_shot,target_if=min:dot.barbed_shot.remains,if=talent.wild_instincts&buff.call_of_the_wild.up|talent.wild_call&charges_fractional>1.4|full_recharge_time<gcd&cooldown.bestial_wrath.remains|talent.scent_of_blood&(cooldown.bestial_wrath.remains<12+gcd|full_recharge_time+gcd<8&cooldown.bestial_wrath.remains<24+(8-gcd)+full_recharge_time)|fight_remains<9
  hunterSpells.barbedShot('bm.barbedShot.st.2');

  // 0 - actions.st+=/dire_beast
  hunterSpells.direBeast();

  // TODO - actions.st+=/serpent_sting,target_if=min:remains,if=refreshable&target.time_to_die>duration

  // 0 - actions.st+=/kill_shot
  hunterSpells.killShot();

  // 0 - actions.st+=/aspect_of_the_wild
  hunterSpells.aspectOfTheWild();

  // 0 - actions.st+=/cobra_shot
  hunterSpells.cobraShot();

  // 0 - actions.st+=/wailing_arrow,if=pet.main.buff.frenzy.remains>execute_time|target.time_to_die<5
  hunterSpells.wailingArrow();

  // TODO - actions.st+=/bag_of_tricks,if=buff.bestial_wrath.down|target.time_to_die<5

  // TODO - actions.st+=/arcane_pulse,if=buff.bestial_wrath.down|target.time_to_die<5

  // TODO - actions.st+=/arcane_torrent,if=(focus+focus.regen+15)<focus.max
};

const cleave = (): void => {
  // 1 - actions.cleave=barbed_shot,target_if=max:debuff.latent_poison.stack,if=debuff.latent_poison.stack>9&(pet.main.buff.frenzy.up&pet.main.buff.frenzy.remains<=gcd+0.25|talent.scent_of_blood&cooldown.bestial_wrath.remains<12+gcd|full_recharge_time<gcd&cooldown.bestial_wrath.remains)
  // 1 - actions.cleave+=/barbed_shot,target_if=min:dot.barbed_shot.remains,if=pet.main.buff.frenzy.up&pet.main.buff.frenzy.remains<=gcd+0.25|talent.scent_of_blood&cooldown.bestial_wrath.remains<12+gcd|full_recharge_time<gcd&cooldown.bestial_wrath.remains
  hunterSpells.barbedShot('bm.barbedShot.cleave.1');

  // 1 - actions.cleave+=/multishot,if=gcd-pet.main.buff.beast_cleave.remains>0.25
  hunterSpells.multiShot('bm.multishot.cleave.1');

  // 0 - actions.cleave+=/bestial_wrath
  hunterSpells.bestialWrath();

  // 1 - actions.cleave+=/kill_command,if=full_recharge_time<gcd&talent.alpha_predator&talent.kill_cleave
  hunterSpells.killCommand('bm.killCommand.cleave.1');

  // 0 - actions.cleave+=/call_of_the_wild
  hunterSpells.callOfTheWild();

  // 0 - actions.cleave+=/explosive_shot
  hunterSpells.explosiveShot();

  // 0 - actions.cleave+=/stampede,if=buff.bestial_wrath.up|target.time_to_die<15
  hunterSpells.stampede();

  // 0 - actions.cleave+=/bloodshed
  hunterSpells.bloodshed();

  // 0 - actions.cleave+=/death_chakram
  hunterSpells.deathChakram();

  // 0 - actions.cleave+=/steel_trap
  hunterSpells.steelTrap();

  // 0 - actions.cleave+=/a_murder_of_crows
  hunterSpells.aMurderofCrows();

  // 2 - actions.cleave+=/barbed_shot,target_if=max:debuff.latent_poison.stack,if=debuff.latent_poison.stack>9&(talent.wild_instincts&buff.call_of_the_wild.up|fight_remains<9|talent.wild_call&charges_fractional>1.2)
  // 2 - actions.cleave+=/barbed_shot,target_if=min:dot.barbed_shot.remains,if=talent.wild_instincts&buff.call_of_the_wild.up|fight_remains<9|talent.wild_call&charges_fractional>1.2
  hunterSpells.barbedShot('bm.barbedShot.cleave.2');

  // 0 - actions.cleave+=/kill_command
  hunterSpells.killCommand();

  // 0 - actions.cleave+=/dire_beast
  hunterSpells.direBeast();

  // actions.cleave+=/serpent_sting,target_if=min:remains,if=refreshable&target.time_to_die>duration

  // 1 - actions.cleave+=/barrage,if=pet.main.buff.frenzy.remains>execute_time
  hunterSpells.barrage('bm.barrage.cleave.1');

  // X - actions.cleave+=/multishot,if=pet.main.buff.beast_cleave.remains<gcd*2

  // 0 - actions.cleave+=/aspect_of_the_wild
  hunterSpells.aspectOfTheWild();

  // 1 - actions.cleave+=/cobra_shot,if=focus.time_to_max<gcd*2|buff.aspect_of_the_wild.up&focus.time_to_max<gcd*4
  hunterSpells.cobraShot('bm.cobraShot.cleave.1');

  // 0 - actions.cleave+=/wailing_arrow,if=pet.main.buff.frenzy.remains>execute_time|fight_remains<5
  hunterSpells.wailingArrow();

  // TODO - actions.cleave+=/bag_of_tricks,if=buff.bestial_wrath.down|target.time_to_die<5

  // TODO - actions.cleave+=/arcane_torrent,if=(focus+focus.regen+30)<focus.max

  // 0 - actions.cleave+=/kill_shot
  hunterSpells.killShot();
};

const cds = (): void => {
  // actions.cds=invoke_external_buff,name=power_infusion,if=buff.bestial_wrath.up|cooldown.bestial_wrath.remains<30
  // actions.cds+=/berserking,if=buff.call_of_the_wild.up|!talent.call_of_the_wild&buff.bestial_wrath.up|fight_remains<13
  // actions.cds+=/blood_fury,if=buff.call_of_the_wild.up|!talent.call_of_the_wild&buff.bestial_wrath.up|fight_remains<16
  // actions.cds+=/ancestral_call,if=buff.call_of_the_wild.up|!talent.call_of_the_wild&buff.bestial_wrath.up|fight_remains<16
  // actions.cds+=/fireblood,if=buff.call_of_the_wild.up|!talent.call_of_the_wild&buff.bestial_wrath.up|fight_remains<9
  // actions.cds+=/potion,if=buff.call_of_the_wild.up|!talent.call_of_the_wild&(buff.bestial_wrath.up&(buff.bloodlust.up|target.health.pct<20))|fight_remains<31
};

const opener = (): void => {
  const pulltimer = bigWigsTimeLine.pullTimer();

  if (pulltimer === 0 || pulltimer < 0.5) return;

  if (pulltimer <= 1.5) hunterSpells.steelTrap();

  if (
    pulltimer <= hunterSpells.wailingArrow.castTime + awful.buffer &&
    (!hunterSpells.steelTrap.usable || !hunterUI.wailingArrow.usable())
  )
    hunterSpells.wailingArrow();
};

export const bm = (): void => {
  if (!canRun()) return;

  selectNewTarget(fourthyFightableLosFacingUnits);

  hunterSpells.barbedShot('refresh');

  if (waitForBarbedShot()) return;

  defensivesHandler();

  petManager();

  // TODO: Mechanics

  hunterSpells.misdirection();

  // TODO: Tranquilizing Shot

  interruptsHandler();

  opener();

  if (!canCombat()) return;

  StartAttack();

  // TODO: Trinkets

  cds();

  if (isSingleTarget()) st();
  else cleave();
};
