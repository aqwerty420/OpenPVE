import ts from 'typescript';
import * as tstl from 'typescript-to-lua';
import * as fs from 'fs';

const fileName = 'awful-config.json';

const plugin: tstl.Plugin = {
  beforeEmit(program: ts.Program, options: tstl.CompilerOptions) {
    void program;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const outDir = options.outDir!;
    const filePath = `./${fileName}`;
    const fileOutputPath = `${outDir}/${fileName}`;

    try {
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
      }
      fs.copyFileSync(filePath, fileOutputPath);
    } catch (err) {
      console.error(`Error occurred while copying '${fileName}' !`, err);
      throw err;
    }
  },
};

export default plugin;
