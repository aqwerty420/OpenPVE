import { settings } from '../../../../';
import { Tab } from '../../../../../src/core/ui/gui';

describe('PoncheCheckbox', () => {
  beforeEach(() => {
    settings.reset();
  });

  it('should create a new checkbox', () => {
    const tab = new Tab('Test');
    const checkbox = tab.Checkbox({
      var: 'test',
      text: '',
    });

    expect(checkbox).toBeTruthy();
  });

  it('should return the default value', () => {
    const tab = new Tab('Test');
    const checkbox = tab.Checkbox({
      var: 'test',
      text: '',
    });

    expect(checkbox.Enabled()).toBe(true);
  });

  it('should return the set value', () => {
    const tab = new Tab('Test');
    const checkbox = tab.Checkbox({
      var: 'test',
      text: '',
      default: false,
    });

    expect(checkbox.Enabled()).toBe(false);
  });

  it('should toggle the value', () => {
    const tab = new Tab('Test');
    const checkbox = tab.Checkbox({
      var: 'test',
      text: '',
      default: false,
    });

    checkbox.Toggle();

    expect(checkbox.Enabled()).toBe(true);
  });
});
