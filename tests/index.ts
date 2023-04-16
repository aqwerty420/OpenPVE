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

export const settings = new MockSettings();

const mockAwfulStatusFrame = (): IAwfulStatusFrame => ({
  Toggle: (params: IAwfulToggleParams) => {
    //settings.set(params.var, params.default ?? true);
  },
  String: (params: IAwfulStringParams) => {
    //settings.set(params.var, params.default);
  },
  Button: (params: IAwfulButtonParams) => {
    //settings.set(params.var, params.default);
  },
  Hide: () => null,
  Show: () => null,
});

const mockAwfulTab = (): IAwfulTab => ({
  Checkbox: (params: IAwfulCheckboxParams) => {
    settings.set(params.var, params.default ?? true);
  },
  Dropdown: (params: IAwfulDropdownParams) => {
    settings.set(params.var, params.default);
  },
  Slider: (params: IAwfulSliderParams) => {
    settings.set(params.var, params.default ?? params.min ?? 0);
  },
  Text: () => null,
});

const mockAwfulContainsTab = (): IAwfulContainsTab => ({
  Tab: () => mockAwfulTab(),
});

const mockAwfulGui = (): IAwfulGUi => {
  return {
    ...mockAwfulContainsTab(),
    Group: () => mockAwfulContainsTab(),
    StatusFrame: () => mockAwfulStatusFrame(),
  };
};

const mockAwfulCommand = (): IAwfulCommand => ({
  New: () => null,
});

const mockedAwfulUI: IAwfulUi = {
  New: () => {
    return [
      mockAwfulGui(),
      settings as unknown as AwfulSettings,
      mockAwfulCommand(),
    ] as LuaMultiReturn<[IAwfulGUi, AwfulSettings, IAwfulCommand]>;
  },
};

const mockedAwful: IAwful = {
  UI: mockedAwfulUI,
} as unknown as IAwful;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
global.awful = mockedAwful;
