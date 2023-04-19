import { ui, varSettings } from '../../';
import { Checkbox } from './checkbox';
import { IInterruptParams } from './params';

export class Interrupt extends Checkbox {
  constructor(tab: IAwfulTab, params: IInterruptParams) {
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

  public Usable(): boolean {
    return (
      super.Enabled() && (ui.settings.get(varSettings.interruptsVar) as boolean)
    );
  }
}
