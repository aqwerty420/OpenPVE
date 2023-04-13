export const load = () => {
  openPVE.hunter = {};

  openPVE.hunter.beastMastery = awful.Actor.New({
    spec: AwfulSpecs.First,
    class: AwfulClasses.hunter,
  });

  openPVE.hunter.beastMastery.Init(() => {
    //TODO: Implement
  });
};
