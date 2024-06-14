export const hasReact =
  !!process.env[`npm_package_devDependencies_react`] ||
  !!process.env[`npm_package_dependencies_react`];
export const hasJest = !!process.env[`npm_package_devDependencies_jest`];
