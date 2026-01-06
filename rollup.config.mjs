import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

const externalPackageNameSet = new Set([
  "react",
  "react/jsx-runtime",
  "react-dom",
  "next",
  "next/navigation",
  "@emotion/react",
  "@emotion/styled",
  "@emotion/cache",
  "@emotion/server/create-instance",
]);

function isExternalModule(moduleIdentifier) {
  if (externalPackageNameSet.has(moduleIdentifier)) return true;
  for (const externalPackageName of externalPackageNameSet) {
    if (moduleIdentifier.startsWith(`${externalPackageName}/`)) return true;
  }
  return false;
}

export default [
  {
    input: {
      index: "src/index.ts",
      client: "src/client/index.ts",
      theme: "src/theme/index.ts",
      next: "src/next/index.ts",
    },
    output: {
      dir: "dist",
      format: "esm",
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: "src",
    },
    external: isExternalModule,
    plugins: [
      nodeResolve({ extensions: [".js", ".ts", ".tsx"] }),
      commonjs(),
      typescript({ tsconfig: "tsconfig.build.json" }),
    ],
  },
];
