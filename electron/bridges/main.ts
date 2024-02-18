import {
  ipcRenderer,
  contextBridge,
  shell,
  OpenExternalOptions,
} from "electron";
import  fs from 'fs'
import { ICandles } from "../ipc/main";
export interface obsMetaTrader{
  data: ICandles[],
  info: fs.Stats
}
export const electronBridge = {
  obsFileMetaTrader: async (): Promise<obsMetaTrader> => {
    const file = await ipcRenderer.invoke('obs-file-metatrader')
    return file
  },
  sendWriteExcel: async (obj: any): Promise<{status: string}> => {
    const res = await ipcRenderer.invoke('send-write-excel', obj)
    return res
  },
  readExcel: async (): Promise<any[]> => {
    const res = await ipcRenderer.invoke('read-excel')
    return res
  },
  maximizeOnlyWindown: (): void => {
    ipcRenderer.send("maximize-window-only");
  },
  quit: (): void => {
    ipcRenderer.send("quit-app");
  },

  minimize: (): void => {
    ipcRenderer.send("minimize-app");
  },

  maximize: (): void => {
    ipcRenderer.send("maximize-app");
  },

  relaunch: (): void => {
    ipcRenderer.send("relaunch-app");
  },
  openFile: async (): Promise<Electron.OpenDialogReturnValue> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const resp = await ipcRenderer.invoke('open-file') as Electron.OpenDialogReturnValue
    return resp
  },
  writeFile: (): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ipcRenderer.invoke('write-file')
  },
  receive: (channel: string, func: (...args: unknown[]) => void) => {
    // Deliberately strip event as it includes `sender`
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    ipcRenderer.on(channel, (event, ...args) => func(...args));

  },
  openUrl: async (
    url: string,
    options?: OpenExternalOptions
  ): Promise<void> => {
    return await shell.openExternal(url, options);
  },
  openPath: async (path: string): Promise<string> => {
    return await shell.openPath(path);
  },
  service: class {
    showName() {
      return "Eriton Gomes De Souza"
    }
  }
};


contextBridge.exposeInMainWorld("electron", electronBridge);

