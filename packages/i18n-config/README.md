# `i18n-config`

This is a base shared `i18n.ts` which all other `i18n.ts`'s can require as a plugin.

## Installation

To install, run:

```
yarn add i18next react-i18next @sundaeswap/i18n-config -D
```

And then from your root project's `i18n.ts` file, _init_ the base config like this:

```js
import { InitOptions } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { i18next, i18nDefaultOptions } from "@sundaeswap/i18n-config";

// in case you want to extend the default options
const options: InitOptions = {
  ...i18nDefaultOptions(),
  fallbackLng: "en",
};

i18next
  // setup your `i18n` to load the proper files
  .use(
    resourcesToBackend((language, namespace, callback) => {
      console.debug(
        "[i18n]: loading '%s' language; '%s' namespace",
        language,
        namespace
      );
      import(`/path/to/translations/${language}/${namespace}.json`)
        .then((resources) => {
          console.debug(
            "[i18n]: successfully loaded '%s' language; '%s' namespace",
            language,
            namespace
          );
          callback(null, resources);
        })
        // errorhandling
        .catch((error) => {
          CALL_YOUR_ERROR_HANDLING_FN(error);
        });
    })
  )
  // extend more packages if necessary
  .use(LanguageDetector)
  // init with your desired options
  .init(options);

export default i18next;
```

## Storybook

In case you're running an app that's using `i18n`, make sure to properly set up like this:

```js
// .storybook/i18next.js
import { i18next, i18nDefaultOptions } from "@sundaeswap/i18n-config";

const supportedLngs = ["en", "fr"];
const options = { ...i18nDefaultOptions, supportedLngs };

i18next.init(options);

supportedLngs.forEach((lang) => {
  i18next.addResources(
    lang,
    undefined,
    require(`/path/to/translation/${lang}/file.json`)
  );
});

export { i18next };

// .storybook/main.js
module.exports = {
  ...config,
  addons: [...plugins, "storybook-react-i18next"],
};
```
