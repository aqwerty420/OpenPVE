import ts from 'typescript';
import * as tstl from 'typescript-to-lua';

const plugin: tstl.Plugin = {
  beforeEmit(
    program: ts.Program,
    options: tstl.CompilerOptions,
    emitHost: tstl.EmitHost,
    result: tstl.EmitFile[]
  ) {
    void program;
    void options;
    void emitHost;

    for (const file of result) {
      file.code = `local Unlocker, awful, openPVE = ...${file.code}`;
      file.code = file.code.replace(
        'return require("loader", ...)\n',
        'require("loader", ...)\n'
      );
    }
  },
};

export default plugin;
