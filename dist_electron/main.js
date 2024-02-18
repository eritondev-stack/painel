"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const main_1 = require("./ipc/main");
electron_1.app.disableHardwareAcceleration();
const createWindow = () => {
    const win = new electron_1.BrowserWindow({
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
    });
    win.loadURL(electron_is_dev_1.default ? 'http://localhost:3000' : `file://${__dirname}/build/index.html`);
    (0, main_1.webContentParamer)(win);
};
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
