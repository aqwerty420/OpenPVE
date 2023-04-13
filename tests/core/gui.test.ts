// POC: most of the tests are useless

class MockSettings {
  private _settings: { [key: string]: unknown } = {};

  public get(key: string): unknown {
    return this._settings[key];
  }

  public set(key: string, value: unknown): void {
    this._settings[key] = value;
  }

  public reset(): void {
    this._settings = {};
  }
}

const settings = new MockSettings();

const load = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  global.awful = {
    UI: {
      New: () => [
        {
          StatusFrame: () => null,
          Tab: () => ({
            Checkbox: (params: IAwfulCheckboxParams) => {
              settings.set(params.var, params.default ?? true);
            },
            Dropdown: (params: IAwfulDropdownParams) => {
              settings.set(params.var, params.default);
            },
            Slider: (params: IAwfulSliderParams) => {
              settings.set(params.var, params.default ?? params.min ?? 0);
            },
            //Text: () => {},
          }),
        },
        settings,
        {},
      ],
    },
    DevMode: true,
  } as IAwful;
};

load();

import { Tab } from '../../src/core/ui/gui';

describe('Tab', () => {
  beforeEach(() => {
    settings.reset();
  });

  it('should create a new tab', () => {
    const tab = new Tab('Test');

    expect(tab).toBeTruthy();
  });
});

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
});

describe('PoncheSlider', () => {
  beforeEach(() => {
    settings.reset();
  });

  it('should create a new slider', () => {
    const tab = new Tab('Test');
    const slider = tab.Slider({
      var: 'test',
      text: '',
      min: 0,
      max: 100,
    });

    expect(slider).toBeTruthy();
  });

  it('should return the default value', () => {
    const tab = new Tab('Test');
    const slider = tab.Slider({
      var: 'test',
      text: '',
      min: 0,
      max: 100,
    });

    expect(slider.Value()).toBe(0);
  });

  it('should return the set value', () => {
    const tab = new Tab('Test');
    const slider = tab.Slider({
      var: 'test',
      text: '',
      min: 0,
      max: 100,
      default: 50,
    });

    expect(slider.Value()).toBe(50);
  });
});
