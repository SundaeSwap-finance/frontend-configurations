export const hasNext =
  !!process.env[`npm_package_devDependencies_next`] ||
  !!process.env[`npm_package_dependencies_next`];
export const hasReact =
  !!process.env[`npm_package_devDependencies_react`] ||
  !!process.env[`npm_package_dependencies_react`];
export const hasJest = !!process.env[`npm_package_devDependencies_jest`];
