const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');

const log = require('electron-log');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    mainWindow.loadFile('index.html');
    mainWindow.once('ready-to-show', () => {
        log.info("checking for updates");
        log.transports.file.level = "debug";
        autoUpdater.logger = log;

        autoUpdater.checkForUpdatesAndNotify();
    })
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

app.on('ready', () => {
    createWindow();
});

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow();
    }
});

// ---------------------------------------
//         Auto update
// ---------------------------------------
ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('update-available', () => {
    log.info("update is available");
    mainWindow.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
    log.info("update is downloaded");
    mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
    log.info("restarting application");
    autoUpdater.quitAndInstall();
});