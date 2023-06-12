// #region Initialization

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

export const awfulUI = {
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
  interruptsVar: 'interrupts',
  defensivesVar: 'defensives',
};

// #endregion Initialization

// #region Containers

export class Tab {
  public readonly tab: AwfulTab;

  constructor(name: string, group?: AwfulContainsTab) {
    this.tab = group ? group.Tab(name) : gui.Tab(name);
  }

  public checkbox(params: AwfulCheckboxParams): Checkbox {
    return new Checkbox(this.tab, params);
  }

  public dropdown<T extends AwfulDropdownParams['default']>(
    params: AwfulDropdownParams
  ): Dropdown<T> {
    return new Dropdown(this.tab, params);
  }

  public slider(params: AwfulSliderParams): Slider {
    return new Slider(this.tab, params);
  }

  public text(params: AwfulTextParams): void {
    this.tab.Text(params);
  }

  public cooldown(params: CooldownParams): Cooldown {
    return new Cooldown(this.tab, params);
  }

  public defensive(params: DefensivesParams, unit: () => AwfulUnit): Defensive {
    return new Defensive(this, params, unit);
  }

  public playerDefensive(params: DefensivesParams): PlayerDefensive {
    return new PlayerDefensive(this, params);
  }

  public petDefensive(params: DefensivesParams): PetDefensive {
    return new PetDefensive(this, params);
  }

  public interrupt(params: InterruptParams): Interrupt {
    return new Interrupt(this.tab, params);
  }

  public separator(): void {
    new Separator(this.tab);
  }

  public header(params: AwfulTextParams): void {
    new Header(this.tab, params);
  }

  public delay(params: DelayParams): Delay {
    return new Delay(this, params);
  }
}

export class Group {
  private readonly group: AwfulContainsTab;

  constructor(params: AwfulGroupParams) {
    this.group = gui.Group(params);
  }

  public tab(name: string): Tab {
    return new Tab(name, this.group);
  }
}

// #endregion Containers

// #region Modes

export enum CooldownMode {
  Always = 0,
  Toggle = 1,
  MiniToggle = 2,
  Never = 3,
}

export enum RotationMode {
  Auto = 0,
  SingleTarget = 1,
}

// #endregion Modes

// #region Options

export const cooldownOptions: AwfulDropdownOptions[] = [
  {
    label: 'Always',
    value: CooldownMode.Always,
    tooltip: 'Always use.',
  },
  {
    label: 'Toggle',
    value: CooldownMode.Toggle,
    tooltip: 'Use on cooldowns &/or mini cooldowns toggle.',
  },
  {
    label: 'Mini Toggle',
    value: CooldownMode.MiniToggle,
    tooltip: 'Use on mini cooldowns toggle.',
  },
  {
    label: 'Never',
    value: CooldownMode.Never,
    tooltip: 'Never use.',
  },
];

// #endregion Options

// #region Params

export interface CooldownParams {
  var: string;
  header?: string;
  tooltip?: string;
  usable?: AwfulSpell | AwfulItem;
  default?: CooldownMode;
  traits?: CooldownTraits;
}

export interface DefensivesParams {
  var: string;
  minHP: number;
  default?: boolean;
  usable?: AwfulSpell | AwfulItem;
  checkboxText?: string;
  sliderText?: string;
  checkboxTooltip?: string;
  sliderTooltip?: string;
}

export interface DelayParams {
  var: string;
  text: string;
}

export interface InterruptParams {
  var: string;
  text?: string;
  tooltip?: string;
  usable?: AwfulSpell;
  default?: boolean;
}

// #endregion Params

// #region Traits

export interface CooldownTraits {
  ignoreTTD?: boolean;
}

// #endregion Traits

// #region Widgets - GUI

export class Checkbox {
  private readonly var: string;

  constructor(tab: AwfulTab, params: AwfulCheckboxParams) {
    this.var = params.var;
    tab.Checkbox(params);
  }

  public enabled(): boolean {
    return settings.get(this.var) as boolean;
  }

  public toggle(): void {
    settings.set(this.var, !this.enabled());
  }
}

export class Dropdown<T extends AwfulDropdownParams['default']> {
  private readonly var: string;

  constructor(tab: AwfulTab, params: AwfulDropdownParams) {
    this.var = params.var;
    tab.Dropdown(params);
  }

  public value(): T {
    return settings.get(this.var) as T;
  }

  public set(value: T): void {
    settings.set(this.var, value);
  }
}

export class Slider {
  private readonly var: string;

  constructor(tab: AwfulTab, params: AwfulSliderParams) {
    this.var = params.var;
    tab.Slider(params);
  }

  public value(): number {
    return settings.get(this.var) as number;
  }

  public set(value: number): void {
    settings.set(this.var, value);
  }
}

export class Header {
  constructor(tab: AwfulTab, params: AwfulTextParams) {
    //TODO: Add header style
    tab.Text(params);
  }
}

export class Separator {
  constructor(tab: AwfulTab) {
    //TODO: Check length of text & add color
    tab.Text({ text: '----------------------------------------' });
  }
}

export class Defensive {
  protected readonly unit: () => AwfulUnit;
  public readonly checkbox: Checkbox;
  public readonly slider: Slider;

  constructor(tab: Tab, params: DefensivesParams, unit: () => AwfulUnit) {
    this.checkbox = tab.checkbox({
      var: `${params.var}State`,
      text: params.usable
        ? `${awful.textureEscape(params.usable.id, 20)} - ${params.usable.name}`
        : params.checkboxText ?? 'TO_REPLACE',
      tooltip: params.usable
        ? `Use ${params.usable.name} as a defensive.`
        : params.checkboxTooltip,
      default: params.default,
    });

    this.slider = tab.slider({
      var: `${params.var}Value`,
      text: '',
      tooltip: params.usable
        ? `Minimum health to use ${params.usable.name} as a defensive.`
        : params.sliderTooltip,
      default: params.minHP,
      min: 0,
      max: 100,
      step: 1,
    });

    this.unit = () => unit();
  }

  public usable(): boolean {
    return this.checkbox.enabled() && this.unit().hp <= this.slider.value();
  }
}

export class PlayerDefensive extends Defensive {
  constructor(tab: Tab, params: DefensivesParams) {
    super(tab, params, () => awful.player);
  }
}

export class PetDefensive extends Defensive {
  constructor(tab: Tab, params: DefensivesParams) {
    super(tab, params, () => awful.pet);
  }
}

export class Delay {
  private readonly minDelay: Slider;
  private readonly maxDelay: Slider;
  private readonly delays: { [min: number]: { [max: number]: AwfulDelay } } =
    {};

  constructor(tab: Tab, params: DelayParams) {
    this.minDelay = tab.slider({
      var: `${params.var}Min`,
      text: `${params.text} min delay`,
      tooltip: `Minimum delay to ${params.text}`,
      min: 0,
      max: 2,
      default: 0.1,
      valueType: 's',
      step: 0.1,
    });

    this.maxDelay = tab.slider({
      var: `${params.var}Max`,
      text: `${params.text} max delay`,
      tooltip: `Maximum delay to ${params.text}`,
      min: 0,
      max: 2,
      default: 0.25,
      valueType: 's',
      step: 0.1,
    });
  }

  public delay(): number {
    const min = this.minDelay.value();
    const max = this.maxDelay.value();

    if (!this.delays[min]) {
      this.delays[min] = {};
    }

    if (!this.delays[min][max]) {
      this.delays[min][max] = awful.delay(min, max);
    }

    return this.delays[min][max].now;
  }
}

export class Cooldown extends Dropdown<CooldownMode> {
  private readonly traits: CooldownTraits;

  constructor(tab: AwfulTab, params: CooldownParams) {
    super(tab, {
      var: params.var,
      header: params.usable
        ? `${awful.textureEscape(params.usable.id, 20)} - ${params.usable.name}`
        : params.header,
      options: cooldownOptions,
      tooltip: params.usable
        ? `${params.usable.name} usage mode.`
        : params.tooltip,
      default: params.default ?? CooldownMode.Toggle,
    });

    this.traits = params.traits ?? {};
  }

  public usable(traits?: CooldownTraits): boolean {
    const value = this.value();

    const ignoreTTD =
      traits?.ignoreTTD !== undefined
        ? traits.ignoreTTD
        : this.traits.ignoreTTD;

    return (
      (ignoreTTD ||
        (!settings.get(varSettings.minTTDVar) as boolean) ||
        awful.FightRemains() >
          (settings.get(varSettings.minTTDValueVar) as number)) &&
      (value === CooldownMode.Always ||
        ((value === CooldownMode.Toggle || value == CooldownMode.MiniToggle) &&
          (settings.get(varSettings.cdsToggleVar) as boolean)) ||
        (value == CooldownMode.MiniToggle &&
          (settings.get(varSettings.mCdsToggleVar) as boolean)))
    );
  }
}

export class Interrupt extends Checkbox {
  constructor(tab: AwfulTab, params: InterruptParams) {
    super(tab, {
      var: params.var,
      text: params.usable
        ? `${awful.textureEscape(params.usable.id, 20)} - ${
            params.usable['name']
          }`
        : params.text ?? 'TO_REPLACE',
      tooltip: params.usable
        ? `Use  ${params.usable['name']} to interrupt.`
        : params.tooltip,
      default: params.default,
    });
  }

  public usable(): boolean {
    return (
      super.enabled() && (settings.get(varSettings.interruptsVar) as boolean)
    );
  }
}

export class Trigger {
  protected enable = false;
  protected timer = 0;
  protected readonly delay: number;

  constructor(disableDelay = 1.5) {
    this.delay = disableDelay;

    awful.addUpdateCallback(() => this.update());
  }

  public enabled(): boolean {
    return this.enable;
  }

  public disable(): void {
    this.enable = false;
  }

  public trigger(): void {
    this.timer = awful.time;
    this.enable = true;
  }

  private update(): void {
    if (this.timer < awful.time - this.delay) {
      this.enable = false;
    }
  }
}

// #endregion Widgets - GUI

// #region Widgets - SF

export class Toggle {
  private readonly var: string;

  constructor(eVar: string, label: string) {
    this.var = eVar;

    statusFrame.Toggle({
      label: label,
      var: this.var,
      onClick: () => this.invert(),
      valueText: () => this.valueText(),
    });
  }

  private valueText(): string {
    return this.enabled() ? '|cff00ff00ON' : '|cffff0000OFF';
  }

  public enabled(): boolean {
    return settings.get(this.var) as boolean;
  }

  public invert(): void {
    settings.set(this.var, !this.enabled());
  }
}

export class RotationModeSwitch {
  private readonly var = 'rotationMode';

  constructor() {
    statusFrame.Toggle({
      label: 'Mode: ',
      var: this.var,
      valueText: () => this.valueText(),
      onClick: () => this.invert(),
    });
    if (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      !Object.values(RotationMode).includes(settings.get(this.var) as any)
    ) {
      settings.set(this.var, RotationMode.Auto);
    }
  }

  private valueText(): string {
    return '|cffbfff81' + (this.value() === RotationMode.Auto ? 'Auto' : 'ST');
  }

  public invert(): void {
    if (this.auto()) {
      settings.set(this.var, RotationMode.SingleTarget);
    } else {
      settings.set(this.var, RotationMode.Auto);
    }
  }

  public value(): RotationMode {
    return settings.get(this.var) as RotationMode;
  }

  public auto(): boolean {
    return this.value() === RotationMode.Auto;
  }

  public singleTarget(): boolean {
    return this.value() === RotationMode.SingleTarget;
  }
}

export class CooldownsToggle extends Toggle {
  private readonly disableVar: string;
  private readonly disableValueVar: string;
  private lastCooldowns = 0;

  constructor(
    eVar: string,
    disableVar: string,
    disableValueVar: string,
    label: string
  ) {
    super(eVar, label);

    this.disableVar = disableVar;
    this.disableValueVar = disableValueVar;

    awful.addUpdateCallback(() => this.update());
  }

  public invert(): void {
    if (!this.enabled()) {
      this.lastCooldowns = awful.time;
    }
    super.invert();
  }

  private update(): void {
    if (
      this.enabled() &&
      settings.get(this.disableVar) &&
      awful.time - this.lastCooldowns >
        (settings.get(this.disableValueVar) as number)
    ) {
      super.invert();
    }
  }
}

export class RotationToggle {
  constructor() {
    statusFrame.Toggle({
      label: 'Status: ',
      var: 'rotationToggle',
      valueText: () => this.valueText(),
      onClick: () => this.invert(),
    });
  }

  private valueText(): string {
    return awful.enabled ? '|cff00ff00ON' : '|cffff0000OFF';
  }

  public invert(): void {
    awful.enabled = !awful.enabled;
  }
}

// #endregion Widgets - SF
