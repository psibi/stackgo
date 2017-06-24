# Firefox

* Remove the existing plugin from about:addons
* about:debugging  - Load zip file and test the new one

Ref: https://developer.mozilla.org/en-US/Add-ons/Add-on_Debugger

# Chrome

* Remove the existing plugin
* chrome://extensions/ - Enable developer mode, Run `yarn run chrome`,
  Load unpacked extension - Point to the chrome directory and test the
  new plugin.

## Development

To make a chrome build:

``` shellsession
yarn run chrome
```

To make a firefox build

``` shellsession
yarn run firefox
```

Note that the above builds will produce a file named `chrome.zip` and
`firefox.zip` respectively under the `dist` directory which should be
used for publishing new version of the addon.

## Deployment

Firefox: https://addons.mozilla.org/en-US/developers/addon/stackgo/versions#version-upload

Chrome: https://chrome.google.com/webstore/developer/dashboard
