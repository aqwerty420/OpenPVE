import { ui } from '../';
import { Tab } from './tab';

export class Group {
  private readonly _group: IAwfulContainsTab;

  constructor(params: IAwfulGroupParams) {
    this._group = ui.gui.Group(params);
  }

  public Tab(name: string): Tab {
    return new Tab(name, this._group);
  }
}
