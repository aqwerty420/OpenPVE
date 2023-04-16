import { settings } from '../../../';
import { Tab } from '../../../../src/core/ui/gui';

describe('Tab', () => {
  beforeEach(() => {
    settings.reset();
  });

  it('should create a new tab', () => {
    const tab = new Tab('Test');

    expect(tab).toBeTruthy();
  });
});
