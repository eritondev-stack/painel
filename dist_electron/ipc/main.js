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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webContentParamer = void 0;
const electron_1 = require("electron");
const fs_1 = __importDefault(require("fs"));
const xlsx_1 = __importDefault(require("xlsx"));
const serialport_1 = require("serialport");
const serialport = new serialport_1.SerialPort({ path: 'COM5', baudRate: 115200 });
const webContentParamer = (web) => {
    serialport.on('data', (data) => {
        web.webContents.send("serial", data);
    });
    electron_1.ipcMain.on("maximize-window-only", () => {
        web.maximize();
    });
    electron_1.ipcMain.on("quit-app", () => {
        electron_1.app.quit();
    });
    electron_1.ipcMain.on("minimize-app", () => {
        var _a;
        if (process.platform === "darwin") {
            electron_1.app.hide();
            return;
        }
        (_a = electron_1.BrowserWindow.getFocusedWindow()) === null || _a === void 0 ? void 0 : _a.minimize();
    });
    electron_1.ipcMain.on("maximize-app", () => {
        var _a;
        (_a = electron_1.BrowserWindow.getFocusedWindow()) === null || _a === void 0 ? void 0 : _a.maximize();
    });
    electron_1.ipcMain.on("relaunch-app", () => {
        electron_1.app.relaunch();
        electron_1.app.exit(0);
    });
    //Handle para resceber a função assisncorna
    electron_1.ipcMain.handle(("open-file"), () => __awaiter(void 0, void 0, void 0, function* () {
        const file = yield openAsyncDialog();
        return file;
    }));
    electron_1.ipcMain.handle(("write-file"), () => {
        fs_1.default.writeFileSync("C:\\Users\\Eriton\\Downloads\\electron.txt", "Eriton Gomes");
    });
    electron_1.ipcMain.handle(("send-write-excel"), (event, obj) => {
        return new Promise((res, rej) => {
            try {
                //const workbookRead = XLSX.readFile("/Users/eriton/Documents/Estudo IA.xlsx")
                //C:\Users\Eriton\Desktop\dev
                const workbookRead = xlsx_1.default.readFile("C:\\Users\\Eriton\\Desktop\\dev\\Estudo IA.xlsx");
                const sheetName = 'Data';
                const worksheet = workbookRead.Sheets[sheetName];
                const sheetValues = xlsx_1.default.utils.sheet_to_json(worksheet);
                sheetValues.push(obj);
                const newValues = xlsx_1.default.utils.json_to_sheet(sheetValues);
                workbookRead.Sheets[sheetName] = newValues;
                xlsx_1.default.writeFile(workbookRead, "C:\\Users\\Eriton\\Desktop\\dev\\Estudo IA.xlsx");
                res({
                    status: 'Ok'
                });
            }
            catch (_a) {
                rej({
                    status: 'Error'
                });
            }
        });
    });
    electron_1.ipcMain.handle(("read-excel"), (event, obj) => {
        return new Promise((res, rej) => {
            try {
                //const workbookRead = XLSX.readFile("/Users/eriton/Documents/Estudo IA.xlsx")
                //C:\Users\Eriton\Desktop\dev
                const workbookRead = xlsx_1.default.readFile("C:\\Users\\Eriton\\Desktop\\dev\\Estudo IA.xlsx");
                const sheetName = 'Data';
                const worksheet = workbookRead.Sheets[sheetName];
                const sheetValues = xlsx_1.default.utils.sheet_to_json(worksheet);
                res(sheetValues);
            }
            catch (_a) {
                rej({
                    status: 'Error'
                });
            }
        });
    });
    electron_1.ipcMain.handle(("obs-file-metatrader"), () => {
        //C:\Users\eriton\AppData\Roaming\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\MQL5\Files
        //var path = "/Volumes/[C] Windows 11.hidden/Users/eriton/AppData/Roaming/MetaQuotes/Terminal/D0E8209F77C8CF37AD8BF550E51FF075/MQL5/Files/EXPORT_TREND.json";
        var path = "C:\\Users\\Eriton\\AppData\\Roaming\\MetaQuotes\\Terminal\\D0E8209F77C8CF37AD8BF550E51FF075\\MQL5\\Files\\EXPORT_TREND.json";
        const data = fs_1.default.readFileSync(path, { encoding: 'utf-8', flag: 'r' });
        const info = fs_1.default.statSync(path);
        const study = JSON.parse(String(data));
        study.sort(function (a, b) {
            if (new Date(a.time) > new Date(b.time)) {
                return 1;
            }
            if (new Date(a.time) < new Date(b.time)) {
                return -1;
            }
            return 0;
        });
        return { data: study, info };
    });
    /*   let sum = 0
      setInterval(() => {
        sum = sum + 1
        web.webContents.send('ouvir', sum)
      }, 2000) */
    //Transformei a função em assincrona
    const openAsyncDialog = () => {
        return new Promise((res, rej) => {
            electron_1.dialog.showOpenDialog({}).then((r) => {
                res(r);
            }).catch((e) => {
                rej('Error');
            });
        });
    };
};
exports.webContentParamer = webContentParamer;
