interface IOpenPVE {
  hunter: {
    beastMastery?: AwfulSpecialization;
    marksmanship?: AwfulSpecialization;
    survival?: AwfulSpecialization;
  };
}

declare function GetSpellDescription(spellId: number): string;

declare const openPVE: IOpenPVE;
