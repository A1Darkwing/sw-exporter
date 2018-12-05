# Summoner's War Exporter Plus RTA Profile Enemies

This project folked from https://github.com/Xzandro/sw-exporter plus RTA plugin
Now you can see the profile while battle with enemies in RTA. So that, you can maximize your strategy
Please enable RTA plugin and import the enemies's profile in https://tool.swop.one/
When the battle start, you can update the profile of enemies and see how rune they had and all information about HP, DEF, ATK,...

![swex](http://i.imgur.com/NQGNNaF.png)

## Downloading and Installation
1. Go to the [latest release](https://github.com/A1Darkwing/sw-exporter.git).
2. Download the package for your computer OS. Windows also offers a portable version which does not require installation.
3. Run it!

Further instructions are available in the Help section of Summoner's War Exporter

## Setting up for Development
Install [node.js](https://nodejs.org/).
```
$ git clone https://github.com/A1Darkwing/sw-exporter.git
$ npm install
$ npm run dev
$ npm start
```

And you are ready to develop. We use ESLint for linting so make sure there are no linting errors before you submit a PR please.

## Building Packages
At first you need to keep in mind that you can only build packages for your current used OS!

It is also important that the bundle.js is generated & update-to-date. You can accomplish that via
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
$ npm run dist:win64
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

## Setting up on a VPS
Basically the same like for the Development environment, but you need to set two process enrionment variables:

1. port (set this to your liking)
2. autostart (set this to true or 1, so that the proxy will start automatically)

Make sure you open the specific port in your firewall. This isnt ideal, because the UI, chromium, electron and the frontend will be loaded regardless. It's the best we can get without splitting off electron though.
