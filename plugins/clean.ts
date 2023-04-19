import ts from 'typescript';
import * as tstl from 'typescript-to-lua';

const regex =
  /\["[^"]*"\]\s*=\s*function\(\.\.\.\)\s*local\s*____exports\s*=\s*\{\}\s*return\s*____exports\s*end,\n/g;

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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      file.code = file.code.replaceAll(regex, '');
    }
  },
};

export default plugin;
