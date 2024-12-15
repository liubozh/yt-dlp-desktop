export interface IElectronAPI {
  setTitle: (title: string) => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
