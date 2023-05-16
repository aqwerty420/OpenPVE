export const fullRechargeTime = (spell: AwfulSpell): number => {
  const [currentCharges, maxCharges, cooldownStart, cooldownDuration] =
    GetSpellCharges(spell.id);

  if (!currentCharges) return 0;

  const currentChargeTime =
    ((currentCharges || 0) < (maxCharges || 0) &&
      cooldownDuration - (GetTime() - (cooldownStart || 0))) ||
    0;

  const leftChargesTotalTime =
    (maxCharges - currentCharges - 1) * cooldownDuration;

  if (currentCharges !== maxCharges) {
    return currentChargeTime + leftChargesTotalTime;
  }

  return 0;
};

export const regenRate = (): number => {
  const [, regenRate] = GetPowerRegen(awful.player.pointer);

  return regenRate;
};

export const timeToMax = (): number => {
  const player = awful.player;

  const maxPower = player.powerMax;
  const power = player.power;

  return maxPower === power ? 0 : (maxPower - power) * (1.0 / regenRate());
};

export const executeTime = (baseTime: number): number => {
  const haste = UnitSpellHaste(awful.player.pointer);

  return baseTime / (1 + haste / 100);
};

export const castRegen = (spell: AwfulSpell): number => {
  const regen = regenRate();

  //TODO: check if this is correct
  const spellDescription = GetSpellDescription(spell.id);
  const [generates] = string.gsub(spellDescription, '%D+', '');
  const tooltip = tonumber(string.sub(generates, -2)) || 0;

  let castTime = spell.castTime;
  if (castTime === 0 || castTime < awful.gcd) castTime = awful.gcd;

  return regen * castTime + tooltip;
};

const isRefreshable = (buffInfos?: LuaMultiReturn<Aura>): boolean => {
  if (!buffInfos) return true;

  const duration = buffInfos[4];
  const expirationTime = buffInfos[5];
  const remains = expirationTime - awful.time;

  return remains <= (duration - remains) * 0.3;
};

export const isRefreshableDebuff = (unit: AwfulUnit, buffId: number): boolean =>
  isRefreshable(unit.debuff(buffId));

export const isRefreshableBuff = (unit: AwfulUnit, buffId: number): boolean =>
  isRefreshable(unit.buff(buffId));
