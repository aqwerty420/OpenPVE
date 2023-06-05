import * as hunterSpells from './spells';

const st = () => {
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

  // actions.st+=/serpent_sting,target_if=min:remains,if=refreshable&target.time_to_die>duration

  // actions.st+=/kill_shot
  hunterSpells.killShot();

  // actions.st+=/aspect_of_the_wild
  hunterSpells.aspectOfTheWild();

  // actions.st+=/cobra_shot
  hunterSpells.cobraShot();

  // actions.st+=/wailing_arrow,if=pet.main.buff.frenzy.remains>execute_time|target.time_to_die<5

  // actions.st+=/bag_of_tricks,if=buff.bestial_wrath.down|target.time_to_die<5

  // actions.st+=/arcane_pulse,if=buff.bestial_wrath.down|target.time_to_die<5

  // actions.st+=/arcane_torrent,if=(focus+focus.regen+15)<focus.max
};
