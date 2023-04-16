import { settings } from '../../../../';
import { Tab } from '../../../../../src/core/ui/gui';

describe('PoncheDropdown', () => {
  beforeEach(() => {
    settings.reset();
  });

  it('should create a new dropdown', () => {
    const tab = new Tab('Test');
    const dropdown = tab.Dropdown({
      var: 'test',
      options: [],
    });

    expect(dropdown).toBeTruthy();
  });

  it('should return the default value', () => {
    const tab = new Tab('Test');
    const dropdown = tab.Dropdown({
      var: 'test',
      options: [],
    });

    expect(dropdown.Value()).toBe(undefined);
  });

  it('should return the set value', () => {
    const tab = new Tab('Test');
    const dropdown = tab.Dropdown({
      var: 'test',
      options: [
        {
          label: '',
          value: 'test1',
        },
        {
          label: '',
          value: 'test2',
        },
      ],
      default: 'test2',
    });

    expect(dropdown.Value()).toBe('test2');
  });

  it('should set the value', () => {
    const tab = new Tab('Test');
    const dropdown = tab.Dropdown({
      var: 'test',
      options: [
        {
          label: '',
          value: 'test1',
        },
        {
          label: '',
          value: 'test2',
        },
      ],
      default: 'test2',
    });

    dropdown.Set('test1');

    expect(dropdown.Value()).toBe('test1');
  });
});
