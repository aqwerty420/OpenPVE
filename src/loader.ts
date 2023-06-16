awful.ttd_enabled = true;
awful.DevMode = true;

openPVE.hunter = {};

if (awful.player.spec === AwfulClassSpecs.BeastMastery) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import { bm } from './hunter/beastMastery';

  openPVE.hunter.beastMastery = awful.Actor.New({
    spec: AwfulSpecs.First,
    class: AwfulClasses.Hunter,
  });

  openPVE.hunter.beastMastery.Init(() => bm());
}
