const newSpell = awful.NewSpell;

//#region Offensive

export const autoShot = newSpell(75, {
  targeted: true,
  ranged: true,
  damage: AwfulSpellType.physical,
});

export const barbedShot = newSpell(217200, {
  targeted: true,
  ranged: true,
  damage: AwfulSpellType.physical,
});

export const barrage = newSpell(120360, {
  targeted: false,
  damage: AwfulSpellType.physical,
});

export const killCommand = newSpell(34026, {
  targeted: true,
  ranged: true,
  damage: AwfulSpellType.physical,
});

export const cobraShot = newSpell(193455, {
  targeted: true,
  ranged: true,
  damage: AwfulSpellType.physical,
});

export const killShot = newSpell(53351, {
  targeted: true,
  ranged: true,
  damage: AwfulSpellType.physical,
});

export const multiShot = newSpell(2643, {
  targeted: true,
  ranged: true,
  damage: AwfulSpellType.physical,
});

export const serpentSting = newSpell(271788, {
  targeted: true,
  ranged: true,
  damage: AwfulSpellType.magic,
});

//#endregion Offensives

//#region Cooldowns

export const aMurderofCrows = newSpell(131894, {
  targeted: true,
  ranged: true,
  damage: AwfulSpellType.physical,
});

export const bestialWrath = newSpell(19574, {
  targeted: false,
});

export const bloodshed = newSpell(321530, {
  targeted: true,
  bleed: true,
  ranged: true,
  damage: AwfulSpellType.physical,
});

export const aspectOfTheWild = newSpell(193530, {
  targeted: true,
  ranged: true,
  damage: AwfulSpellType.physical,
});

export const callOfTheWild = newSpell(359844, {
  targeted: false,
});

export const explosiveShot = newSpell(212431, {
  targeted: true,
  ranged: true,
  damage: AwfulSpellType.magic,
});

export const steelTrap = newSpell(162488, {
  targeted: false,
  ranged: true,
  radius: 3,
  damage: AwfulSpellType.physical,
});

export const wailingArrow = newSpell(392060, {
  targeted: true,
  ranged: true,
  damage: AwfulSpellType.magic,
});

export const deathChakram = newSpell(375891, {
  targeted: true,
  ranged: true,
  damage: AwfulSpellType.physical,
});

export const direBeast = newSpell(120679, {
  targeted: true,
  ranged: true,
  damage: AwfulSpellType.magic,
});

export const stampede = newSpell(201430, {
  targeted: false,
  ranged: true,
  damage: AwfulSpellType.physical,
});

//#endregion Cooldowns

//#region Utilities

export const muzzle = newSpell(187707, {
  targeted: true,
});

export const freezingTrap = newSpell(187650, {
  ranged: true,
  cc: CCType.stun,
  radius: 3,
  targeted: false,
});

export const tarTrap = newSpell(187698, {
  ranged: true,
  radius: 3,
  targeted: false,
});

export const flare = newSpell(1543, {
  ranged: true,
  radius: 10,
  targeted: false,
});

export const bindingShot = newSpell(109248, {
  ranged: true,
  radius: 5,
  targeted: false,
});

export const huntersMark = newSpell(257284, {
  targeted: true,
  ranged: true,
});

export const tranquilizingShot = newSpell(19801, {
  targeted: true,
  ranged: true,
});

export const intimidation = newSpell(19577, {
  targeted: true,
  ranged: true,
  ignoreFacing: true,
});

export const feignDeath = newSpell(5384, {
  targeted: false,
});

export const misdirection = newSpell(34477, {
  targeted: true,
  ranged: true,
  ignoreFacing: true,
});

export const disengage = newSpell(781, {
  targeted: false,
});

export const counterShot = newSpell(147362, {
  targeted: true,
  ranged: true,
});

//#endregion Utilities

//#region Defensives

export const exhilaration = newSpell(109304, {
  targeted: false,
});

export const aspectOfTheTurtle = newSpell(186265, {
  targeted: false,
});

export const survivalOfTheFittest = newSpell(264735, {
  targeted: false,
});

export const fortitudeOfTheBear = newSpell(388035, {
  targeted: false,
});

//#endregion Defensives

//#region Pet

export const mendRevivePet = newSpell(982, { targeted: false });

export const callPet1 = newSpell(883, { targeted: false });

export const callPet2 = newSpell(83242, { targeted: false });

export const callPet3 = newSpell(83243, { targeted: false });

export const callPet4 = newSpell(83244, { targeted: false });

export const callPet5 = newSpell(83245, { targeted: false });

//#endregion Pet

//#region Racials

export const bloodFury = awful.NewSpell(20572, { targeted: false });

export const ancestralCall = awful.NewSpell(274738, { targeted: false });

export const fireblood = awful.NewSpell(265221, { targeted: false });

export const lightsJudgment = awful.NewSpell(255647, {
  targeted: false,
  ranged: true,
  radius: 5,
  damage: AwfulSpellType.magic,
});

export const bagOfTricks = awful.NewSpell(312411, {
  targeted: true,
  ranged: true,
  damage: AwfulSpellType.physical,
});

export const berserking = awful.NewSpell(26297, { targeted: false });

export const arcaneTorrent = awful.NewSpell(25046, { targeted: false });

//#endregion Racials
