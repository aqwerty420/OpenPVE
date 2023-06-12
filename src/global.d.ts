interface IOpenPVE {
  hunter: {
    beastMastery?: AwfulSpecialization;
    marksmanship?: AwfulSpecialization;
    survival?: AwfulSpecialization;
  };
}

interface IDynamicParameters {
  melee?: true;
  distance?: number;
  distanceLiteral?: number;
  fromUnit?: AwfulUnit;
  meleeFrom?: true;
  distanceFrom?: number;
  distanceFromLiteral?: number;
  alive?: true;
  affectingCombat?: true;
  notCc?: true;
  notBlacklisted?: true;
  los?: true;
  facing?: true;
  facingPlayer?: true;
  immune?: true;
}

declare function GetSpellDescription(spellId: number): string;

declare const openPVE: IOpenPVE;
