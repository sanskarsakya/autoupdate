### Auto update implementation
* import autoUpdater from electron
```js
const { autoUpdater } = require('electron');
```

* Add repository on package json file
* Create gh_token avatar > setting > developer setting > personal access token > generate token and paste into the electron-builder yml file.

* Add build and deploy scripts
```json
"build": "electron-builder build --win --publish never",
"deploy": "electron-builder build --win --publish always"
```
* Go to github edit and publish then finalize the release.
* Perform relesae 
```bash
$ run yarn deploy
```