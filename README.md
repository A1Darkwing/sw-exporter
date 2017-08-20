# Summoner's War Exporter

This tool will parse intercepted data from Summoner's War and extract information on the monsters and runes of the user. It works just like SWProxy and the focus was to write a smooth proxy, that runs fast and to fix common glitches with SWPRoxy (SW starting problems, errors on event pages etc.). You can even turn on Summoners War Exporter for normal surfing, because it doesnt really influence other pages much.

![swex](http://i.imgur.com/NQGNNaF.png)

## Downloading and Installation
1. Go to the [latest release](https://github.com/Xzandro/sw-exporter/releases/latest).
2. Download the package for your computer OS. Windows also offers a portable version which does not require installation.
3. Run it!

Further instructions are available in the Help section of Summoner's War Exporter

## Setting up for Development
Install [node.js](https://nodejs.org/).
```
$ git clone https://github.com/Xzandro/sw-exporter.git
$ npm install
$ npm run dev
$ npm start
```

And you are ready to develop. We use ESLint for linting so make sure there are no linting errors before you submit a PR please.

## Building Packages
It is important that the bundle.js is generated & update-to-date. You can accomplish that via
```
$ npm run dev
```
to start the Development script or just do
```
$ webpack
```

After that you have several possibilities.

### Windows
For Windows you can build a Portable or Setup version (default: Setup). That's changeable via the package.json.
```
"win": {
  "target": [
    "nsis"
  ]
}
```
Just change nsis to portable.

Building the packages
```
$ npm run dist:win32
$ npm run dist win:64
```

### Linux
An AppImage package file will be build which is compatible with most common linux os.
```
$ npm run dist:linux
```

### Mac
A typical DMG package file will be build.
```
$ npm run dist:mac
```