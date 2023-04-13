import { ui } from '../init';

export class RotationToggle {
  constructor() {
    ui.statusFrame.Toggle({
      label: 'Status: ',
      var: 'rotationToggle',
      valueText: () => this.ValueText(),
      onClick: () => this.Invert(),
    });
  }

  private ValueText(): string {
    return awful.enabled ? '|cff00ff00ON' : '|cffff0000OFF';
  }

  public Invert(): void {
    awful.enabled = !awful.enabled;
  }
}
