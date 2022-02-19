<div style="text-align: center; margin-bottom: 40px">
    <img src="images/logo.png" alt="logo" width="200">
</div>


Quasar App Extension i18n-spell-checker
===

> _This is a work in process._

> _This project is independent of the [Quasar Framework](https://quasar.dev), but I love Quasar Framework._


**i18n-spell-checker** is a [Quasar App Extension](https://quasar.dev/app-extensions/introduction) to spell check the text values stored in the i18n files in a typical Quasar Application.  
The extension works with the module [Nodehun](https://www.npmjs.com/package/nodehun#checking-for-correctness) which aims to expose as much of [Hunspell](http://hunspell.github.io/)'s functionality.

To read about Hunspell: [Hunspell spell checker](http://hunspell.github.io/).

# Donate

If you appreciate the work that went into this App Extension, please consider [donating to Quasar](https://donate.quasar.dev).


# How the extesion works

The checking process is very simple:

1. The extension opens any one of these files in your Quasar Framework based application:

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

---
> ## Where to get dictionaries
> Please, read the nodehum docs in [https://www.npmjs.com/package/nodehun#where-to-get-dictionaries](https://www.npmjs.com/package/nodehun#where-to-get-dictionaries)
> 
>If you are thinking in using Open Office dictionary, please follow this link and read the note: [https://www.npmjs.com/package/nodehun#a-note-about-open-office-dictionaries](https://www.npmjs.com/package/nodehun#a-note-about-open-office-dictionaries)    


---
## Extension commands

# spellcheck

```bash
quasar run i18n-spell-checker spellcheck --language <LANGUAGE> --path <DICTIONARIES_DIRECTORY_PATH>
```
### Examples

1. Check the USA English (en-US) files using the dictionaries (.aff and .dic files) in ../dictionaries

    Print the wrong words in red without the line numbers.

```bash
quasar run i18n-spell-checker spellcheck --language en-US --path ../dictionaries
```

2. Check the USA English (en-US) files using the dictionaries (.aff and .dic files) in ../dictionaries

    Print line number in the file before the text with the wrong words in red.

```bash
quasar run i18n-spell-checker spellcheck --language en-US --path ../dictionaries -n
```

3. Check the Argentina Spain  (es-AR) files using the dictionaries (.aff and .dic files) in ../dictionaries

    Print line number in the file before the text with the wrong words in red.

```bash
quasar run i18n-spell-checker spellcheck --language es-AR --path ../dictionaries -n
```

## save-dictionary-path

The command save-dictionary-path saves in the Quasar persistent configuration the path to the directory where the dictionaries files (**.aff** and **.dic** files) are stored.

You can use this command once to avoid to write the path each time you run the command spellcheck.

```bash
quasar run i18n-spell-checker save-dictionary-path --path <DICTIONARIES_DIRECTORY>
```

### Examples

If you run:

```bash
quasar run i18n-spell-checker save-dictionary-path --path ~/my_dictionaries
```

And then:

```bash
quasar run i18n-spell-checker spellcheck --language en-US  -n
```

Because the extension knows the path to dictionaries, the previous command is equivalent to run:

```bash
quasar run i18n-spell-checker spellcheck --language en-US --path ~/my_dictionaries -n
```

# Uninstall
```bash
quasar ext remove i18n-spell-checker
```

# Other Info

You can get help using the -h or --help option in the extension commands. For example:

```bash
quasar run i18n-spell-checker spellcheck -h
```


# Donate
If you appreciate the work that went into this App Extension, please consider [donating to Quasar](https://donate.quasar.dev).
