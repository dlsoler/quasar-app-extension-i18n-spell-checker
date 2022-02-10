Quasar App Extension i18n-spell-checker
===

> _This is a work in process._

> _This project is independent of the [Quasar Framework](https://quasar.dev), but we love it.


**i18n-spell-checker** is a [Quasar App Extension](https://quasar.dev/app-extensions/introduction) to spell check the text values stored in the i18n files in a typical Quasar Application.  
The extension works with the module [Nodehun](https://www.npmjs.com/package/nodehun#checking-for-correctness) which aims to expose as much of [Hunspell](http://hunspell.github.io/)'s functionality.

To read about Hunspell: [Hunspell spell checker](http://hunspell.github.io/).

# Donate
If you appreciate the work that went into this App Extension, please consider [donating to Quasar](https://donate.quasar.dev).


# How it works

The checking process is:

1. Open any one of these files in your Quasar Framework based application:

    * <APPLICACTION_ROOT_DIRECTORY>/src/i18n/<LANGUAGE_ID>/index.js
    * <APPLICACTION_ROOT_DIRECTORY>/src/i18n/<LANGUAGE_ID>/index.ts

2. Parse the file to compile it to a Javascript Object.

3. Take recursively the text values of each property in the object.

4. Split the text values in words.

5. Check the spelling of each word using Hunspell.

6. Print a colored message with the spelling errors detected.


# Install
```bash
quasar ext add i18n-spell-checker
```
Quasar CLI will retrieve it from the NPM registry and install the extension to your project.


### Where to get dictionaryies

Please, read the nodehum docs in [https://www.npmjs.com/package/nodehun#where-to-get-dictionaries](https://www.npmjs.com/package/nodehun#where-to-get-dictionaries)


If you are thinking in using Open Office dictionary, please follow this link and read the note: [https://www.npmjs.com/package/nodehun#a-note-about-open-office-dictionaries](https://www.npmjs.com/package/nodehun#a-note-about-open-office-dictionaries) 

## Prompts

# start

```bash
quasar run i18n-spell-checker start en-US
```

# Uninstall
```bash
quasar ext remove i18n-spell-checker
```

# Info
> Add longer information here that will help the user of your app extension.

# Other Info
> Add other information that's not as important to know

# Donate
If you appreciate the work that went into this App Extension, please consider [donating to Quasar](https://donate.quasar.dev).
