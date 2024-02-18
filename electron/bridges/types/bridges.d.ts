import { electronBridge } from "../main";

declare global {
  interface Window {
    electron: typeof electronBridge;
  }
}
