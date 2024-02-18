import { app, BrowserWindow, ipcMain } from 'electron'
import electronIsDev from 'electron-is-dev'
import { webContentParamer } from './ipc/main'



app.disableHardwareAcceleration()
const createWindow = () => {
    const win = new BrowserWindow({
        width: 1150,
        height: 433,
        titleBarStyle: 'hidden',
/*         titleBarOverlay: {
            color: '#E5E7EB',
            symbolColor: 'black',
            height: 31
          }, */
        //trafficLightPosition: { x: 10, y: 10 },
        frame: false,
        resizable: false,
        webPreferences: {
            experimentalFeatures: true,
            nodeIntegration: true,
            preload: __dirname + '/preload.js'
        }
    })
    win.loadURL(electronIsDev ? 'http://localhost:3000' : `file://${__dirname}/build/index.html`)
    webContentParamer(win)

}

app.whenReady().then(() => {

    createWindow()

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })



})

