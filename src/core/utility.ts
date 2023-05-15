export const hasBuffFromList = (enemy: AwfulUnit, buffs: number[]): boolean => {
  buffs.forEach((buff) => {
    if (enemy.buff(buff) != undefined) return true;
  });
  return false;
};
