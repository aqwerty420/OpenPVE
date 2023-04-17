import { CooldownMode } from '../modes';

export interface ICooldownParams {
  var: string;
  header?: string;
  tooltip?: string;
  usable?: IAwfulSpell | IAwfulItem;
  default?: CooldownMode;
}
