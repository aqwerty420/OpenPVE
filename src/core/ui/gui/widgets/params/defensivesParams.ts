export interface IDefensivesParams {
  var: string;
  minHp: number;
  enabled?: boolean;
  usable?: IAwfulSpell | IAwfulItem;
  checkboxText?: string;
  sliderText?: string;
  checkboxTooltip?: string;
  sliderTooltip?: string;
}
