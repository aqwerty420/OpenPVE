const green: AwfulColor = [170, 211, 114, 1];
const white: AwfulColor = [255, 255, 255, 1];
const dark: AwfulColor = [21, 21, 21, 0.45];

export const projectTitle = 'OpenPVE';
export const projectCmd = 'opve';

const [gui, settings, cmd] = awful.UI.New(projectCmd, {
  title: projectTitle,
  show: awful.DevMode,
  colors: {
    title: green,
    primary: white,
    accent: green,
    background: dark,
  },
});

const statusFrame = gui.StatusFrame({
  fontSize: 6,
  maxWidth: 450,
  colors: {
    background: dark,
  },
});

export const ui = {
  gui: gui,
  settings: settings,
  cmd: cmd,
  statusFrame: statusFrame,
};

export const varSettings = {
  minTTDVar: 'minTTD',
  minTTDValueVar: 'minTTDValue',
  cdsToggleVar: 'cdsToggle',
  cdsDisableVar: 'cdsDisable',
  cdsDisableValueVar: 'cdsDisableValue',
  mCdsToggleVar: 'mCdsToggle',
  mCdsDisableVar: 'mCdsDisable',
  mCdsDisableValueVar: 'mCdsDisableValue',
};
