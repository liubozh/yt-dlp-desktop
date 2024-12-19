// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';
import { IpcEvents } from '../ipc-events';

contextBridge.exposeInMainWorld('downloadAPI', {
  async loadMediaMetadata(options: string[]) {
    return ipcRenderer.invoke(IpcEvents.LOAD_MEDIA_METADATA, options);
  },

  async download(options: string[]) {
    await ipcRenderer.invoke(IpcEvents.DOWNLOAD, options);
  },

  cancelDownload() {
    ipcRenderer.send(IpcEvents.CANCEL_DOWNLOAD);
  },

  onDownloadOutput(callback: (output: string) => void) {
    ipcRenderer.removeAllListeners(IpcEvents.DOWNLOAD_OUTPUT);
    ipcRenderer.on(IpcEvents.DOWNLOAD_OUTPUT, (_, output: string) => {
      callback(output);
    });
  },

  onDownloadStopped(
    callback: (data: { code: number | null; signal: string | null }) => void,
  ) {
    ipcRenderer.removeAllListeners(IpcEvents.DOWNLOAD_STOPPED);
    ipcRenderer.on(
      IpcEvents.DOWNLOAD_STOPPED,
      (_, data: { code: number | null; signal: string | null }) => {
        callback(data);
      },
    );
  },
  // async download(url: string) {
  //   await ipcRenderer.invoke(IpcEvents.DOWNLOAD, url);
  // },

  // onDownloadProgress(callback: (progress: number) => void) {
  //   ipcRenderer.removeAllListeners(IpcEvents.DOWNLOAD_PROGRESS);
  //   ipcRenderer.on(IpcEvents.DOWNLOAD_PROGRESS, (_, progress: number) => {
  //     callback(progress);
  //   });
  // },

  // onDownloadStopped(callback: () => void) {
  //   ipcRenderer.removeAllListeners(IpcEvents.DOWNLOAD_STOPPED);
  //   ipcRenderer.on(IpcEvents.DOWNLOAD_STOPPED, callback);
  // },
});
