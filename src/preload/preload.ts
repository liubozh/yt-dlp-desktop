// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';
import { IpcEvents } from '../ipc-events';
import { RunCommandOptions } from '../interfaces';

contextBridge.exposeInMainWorld('electronAPI', {
  async runCommand(options: RunCommandOptions) {
    await ipcRenderer.invoke(IpcEvents.RUN_COMMAND, options);
  },

  killCommand() {
    ipcRenderer.send(IpcEvents.KILL_COMMAND);
  },

  onCommandOutput(callback: (output: string) => void) {
    ipcRenderer.removeAllListeners(IpcEvents.COMMAND_OUTPUT);
    ipcRenderer.on(IpcEvents.COMMAND_OUTPUT, (_, output: string) => {
      callback(output);
    });
  },

  onCommandStopped(
    callback: (data: { code: number | null; signal: string | null }) => void,
  ) {
    ipcRenderer.removeAllListeners(IpcEvents.COMMAND_STOPPED);
    ipcRenderer.on(
      IpcEvents.COMMAND_STOPPED,
      (_, data: { code: number | null; signal: string | null }) => {
        callback(data);
      },
    );
  },
});
