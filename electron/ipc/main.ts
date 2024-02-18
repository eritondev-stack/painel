import { app, BrowserWindow, ipcMain, dialog } from "electron";
import fs from 'fs'
import XLSX from 'xlsx'
import { SerialPort } from 'serialport'

const serialport = new SerialPort({ path: 'COM5', baudRate: 115200 })


export interface ICandles {
  time: string
  high: number
  close: number
  open: number
  ema20: number
  ema08: number
  low: number
}

export const webContentParamer = (web: BrowserWindow) => {

  serialport.on('data', (data) => {
    web.webContents.send("serial",data)
})

  ipcMain.on("maximize-window-only", () => {
    web.maximize();
  });

  ipcMain.on("quit-app", () => {
    app.quit();
  });

  ipcMain.on("minimize-app", () => {
    if (process.platform === "darwin") {
      app.hide();
      return;
    }
    BrowserWindow.getFocusedWindow()?.minimize();
  });

  ipcMain.on("maximize-app", () => {
    BrowserWindow.getFocusedWindow()?.maximize();
  });

  ipcMain.on("relaunch-app", () => {
    app.relaunch();
    app.exit(0);
  });

  //Handle para resceber a função assisncorna
  ipcMain.handle(("open-file"), async () => {
    const file = await openAsyncDialog()
    return file
  })

  ipcMain.handle(("write-file"), () => {
    fs.writeFileSync("C:\\Users\\Eriton\\Downloads\\electron.txt", "Eriton Gomes")
  })

  ipcMain.handle(("send-write-excel"), (event, obj: any): Promise<{ status: string }> => {
    return new Promise((res, rej) => {

      try {
        //const workbookRead = XLSX.readFile("/Users/eriton/Documents/Estudo IA.xlsx")
        //C:\Users\Eriton\Desktop\dev
        const workbookRead = XLSX.readFile("C:\\Users\\Eriton\\Desktop\\dev\\Estudo IA.xlsx")
        const sheetName = 'Data'
        const worksheet = workbookRead.Sheets[sheetName];
        const sheetValues = XLSX.utils.sheet_to_json(worksheet);
        sheetValues.push(obj)
        const newValues = XLSX.utils.json_to_sheet(sheetValues);
        workbookRead.Sheets[sheetName] = newValues


        XLSX.writeFile(workbookRead, "C:\\Users\\Eriton\\Desktop\\dev\\Estudo IA.xlsx")
        res({
          status: 'Ok'
        })
      } catch {
        rej({
          status: 'Error'
        })
      }
    })

  })


  ipcMain.handle(("read-excel"), (event, obj: any): Promise<any[]> => {
    return new Promise((res, rej) => {

      try {
        //const workbookRead = XLSX.readFile("/Users/eriton/Documents/Estudo IA.xlsx")
        //C:\Users\Eriton\Desktop\dev
        const workbookRead = XLSX.readFile("C:\\Users\\Eriton\\Desktop\\dev\\Estudo IA.xlsx")
        const sheetName = 'Data'
        const worksheet = workbookRead.Sheets[sheetName];
        const sheetValues: any[] = XLSX.utils.sheet_to_json(worksheet);
    
        res(sheetValues)
      } catch {
        rej({
          status: 'Error'
        })
      }
    })

  })

  ipcMain.handle(("obs-file-metatrader"), () => {
    //C:\Users\eriton\AppData\Roaming\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\MQL5\Files
    //var path = "/Volumes/[C] Windows 11.hidden/Users/eriton/AppData/Roaming/MetaQuotes/Terminal/D0E8209F77C8CF37AD8BF550E51FF075/MQL5/Files/EXPORT_TREND.json";
    var path = "C:\\Users\\Eriton\\AppData\\Roaming\\MetaQuotes\\Terminal\\D0E8209F77C8CF37AD8BF550E51FF075\\MQL5\\Files\\EXPORT_TREND.json";
    const data = fs.readFileSync(path, { encoding: 'utf-8', flag: 'r' })
    const info = fs.statSync(path)
    const study: ICandles[] = JSON.parse(String(data))
    study.sort(function (a, b) {
      if (new Date(a.time) > new Date(b.time)) {
        return 1;
      }
      if (new Date(a.time) < new Date(b.time)) {
        return -1;
      }
      return 0;
    });
    return { data: study, info }
  })

  /*   let sum = 0
    setInterval(() => {
      sum = sum + 1
      web.webContents.send('ouvir', sum)
    }, 2000) */

  //Transformei a função em assincrona
  const openAsyncDialog = (): Promise<Electron.OpenDialogReturnValue> => {
    return new Promise((res, rej) => {
      dialog.showOpenDialog({}).then((r) => {
        res(r)
      }).catch((e) => {
        rej('Error')
      });
    })
  }
}
