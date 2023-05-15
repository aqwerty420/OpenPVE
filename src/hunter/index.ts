export const load = () => {
  openPVE.hunter = {};

  openPVE.hunter.beastMastery = awful.Actor.New({
    spec: AwfulSpecs.First,
    class: AwfulClasses.Hunter,
  });

  openPVE.hunter.beastMastery.Init(() => {
    //TODO: Implement
  });
};
