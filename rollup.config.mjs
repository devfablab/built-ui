import path from 'node:path';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const projectRootPath = process.cwd();

const inputFilePathList = [
  path.join(projectRootPath, 'src/index.ts'),
  path.join(projectRootPath, 'src/theme/index.ts'),
  path.join(projectRootPath, 'src/next/index.ts'),
];

const externalModuleNameList = ['react', 'react-dom', 'next', '@emotion/react', '@emotion/styled'];

export default {
  input: inputFilePathList,
  external: (moduleName) =>
    externalModuleNameList.includes(moduleName) ||
    externalModuleNameList.some((name) => moduleName.startsWith(`${name}/`)),
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: 'src',
    entryFileNames: '[name].js',
  },
  plugins: [
    nodeResolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
    typescript({
      tsconfig: path.join(projectRootPath, 'tsconfig.json'),
      declaration: false,
      declarationMap: false,
      emitDeclarationOnly: false,
    }),
  ],
};
