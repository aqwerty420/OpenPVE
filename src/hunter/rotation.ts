import * as hunterUI from './ui';
import { disengageForwardInfos, petStatus } from './utility';
import * as hunterSpells from './spells';
import { callSpells } from '../core/utility';

const callPet = (): void => {
  const pet = awful.pet;

  if (
    hunterUI.petSlot.disabled() ||
    !hunterUI.summonRevivePet.enabled() ||
    pet.exists ||
    petStatus.triedPetCall
  )
    return;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  hunterSpells[`callPet${hunterStatusFrame.hunterPet.value()}`]();
};

export const petManager = (): void => {
  hunterSpells.mendRevivePet('revive');

  callPet();

  hunterSpells.mendRevivePet('mend');
};

const defensives = [
  hunterSpells.exhilaration,
  hunterSpells.aspectOfTheTurtle,
  hunterSpells.feignDeath,
];

export const defensivesHandler = (): void => {
  const player = awful.player;

  if (!player.combat) return;

  callSpells(defensives);
};

const interrupts = [
  hunterSpells.muzzle,
  hunterSpells.freezingTrap,
  hunterSpells.intimidation,
];

export const interruptsHandler = (): void => callSpells(interrupts);

const disengageForwardHandler = (): void => {
  const player = awful.player;

  if (!hunterUI.disengageTrigger.enabled()) {
    if (
      disengageForwardInfos.playerRotation != undefined &&
      disengageForwardInfos.inverseTime < awful.time
    ) {
      player.face(disengageForwardInfos.playerRotation);
      disengageForwardInfos.playerRotation = undefined;
    }
    return;
  }

  if (disengageForwardInfos.playerRotation === undefined) {
    disengageForwardInfos.playerRotation = player.rotation;
    player.face(awful.inverse(disengageForwardInfos.playerRotation));
    disengageForwardInfos.inverseTime = awful.time + 0.05;
  }

  hunterSpells.disengage('forward');
};

awful.addUpdateCallback(disengageForwardHandler);
