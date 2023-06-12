import { bm } from './hunter/beastMastery';

awful.ttd_enabled = true;
awful.DevMode = true;

openPVE.hunter = {};

openPVE.hunter.beastMastery = awful.Actor.New({
  spec: AwfulSpecs.First,
  class: AwfulClasses.Hunter,
});

openPVE.hunter.beastMastery.Init(() => bm());
