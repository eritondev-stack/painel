"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.electronBridge = void 0;
const electron_1 = require("electron");
exports.electronBridge = {
    obsFileMetaTrader: () => __awaiter(void 0, void 0, void 0, function* () {
        const file = yield electron_1.ipcRenderer.invoke('obs-file-metatrader');
        return file;
    }),
    sendWriteExcel: (obj) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield electron_1.ipcRenderer.invoke('send-write-excel', obj);
        return res;
    }),
    readExcel: () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield electron_1.ipcRenderer.invoke('read-excel');
        return res;
    }),
    maximizeOnlyWindown: () => {
        electron_1.ipcRenderer.send("maximize-window-only");
    },
    quit: () => {
        electron_1.ipcRenderer.send("quit-app");
    },
    minimize: () => {
        electron_1.ipcRenderer.send("minimize-app");
    },
    maximize: () => {
        electron_1.ipcRenderer.send("maximize-app");
    },
    relaunch: () => {
        electron_1.ipcRenderer.send("relaunch-app");
    },
    openFile: () => __awaiter(void 0, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const resp = yield electron_1.ipcRenderer.invoke('open-file');
        return resp;
    }),
    writeFile: () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        electron_1.ipcRenderer.invoke('write-file');
    },
    receive: (channel, func) => {
        // Deliberately strip event as it includes `sender`
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        electron_1.ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
    openUrl: (url, options) => __awaiter(void 0, void 0, void 0, function* () {
        return yield electron_1.shell.openExternal(url, options);
    }),
    openPath: (path) => __awaiter(void 0, void 0, void 0, function* () {
        return yield electron_1.shell.openPath(path);
    }),
    service: class {
        showName() {
            return "Eriton Gomes De Souza";
        }
    }
};
electron_1.contextBridge.exposeInMainWorld("electron", exports.electronBridge);
