import {
  app,
  BrowserWindow,
  ipcMain,
  IpcMainEvent,
  WebContents,
} from 'electron';
import { IpcEvents } from '../ipc-events';
import { MediaMetadata } from '../interfaces';

import { ChildProcess, spawn } from 'child_process';

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const runningProcesses = new WeakMap<WebContents, ChildProcess>();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 800,
    width: 1200,
    minHeight: 600,
    minWidth: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle(
    IpcEvents.SEARCH_MEDIA,
    async (event: IpcMainEvent, options: string[]): Promise<MediaMetadata> => {
      return new Promise((resolve, reject) => {
        const child = spawn('yt-dlp', options);

        const outputChunks: Buffer[] = [];

        const pushOutput = (data: string | Buffer) => {
          if (data.toString().includes('WARNING:')) {
            return;
          }
          outputChunks.push(Buffer.isBuffer(data) ? data : Buffer.from(data));
        };

        child.stdout?.on('data', pushOutput);
        child.stderr?.on('data', pushOutput);

        child.on('close', (code, signal) => {
          const output = Buffer.concat(outputChunks).toString();
          if (code === 0) {
            const json = JSON.parse(output);
            const type = json?._type;
            switch (type) {
              case 'video': {
                const metadata: MediaMetadata = {
                  type,
                  id: json.id,
                  title: json.title,
                  thumbnail: json.thumbnail,
                  description: json.description,
                  originalUrl: json.original_url,
                  duration: json.duration,
                  durationString: json.duration_string,
                };
                resolve(metadata);
                break;
              }
              default:
                break;
            }

            resolve(json);
          } else {
            console.error('Error loading metadata:', output);
            reject(
              new Error(
                `Process exited with code ${code} and signal ${signal}`,
              ),
            );
          }
        });
      });
    },
  );

  ipcMain.handle(
    IpcEvents.DOWNLOAD,
    async (event: IpcMainEvent, options: string[]) => {
      const child = spawn('yt-dlp', options);

      const pushOutput = (data: string | Buffer) => {
        event.sender.send(IpcEvents.DOWNLOAD_OUTPUT, data.toString());
      };

      child.stdout?.on('data', pushOutput);
      child.stderr?.on('data', pushOutput);

      runningProcesses.set(event.sender, child);

      child.on('close', async (code, signal) => {
        console.log('Command closed:', code, signal);
        runningProcesses.delete(event.sender);
        event.sender.send(IpcEvents.DOWNLOAD_STOPPED, {
          code,
          signal,
        });
      });
    },
  );

  ipcMain.on(IpcEvents.CANCEL_DOWNLOAD, (event: IpcMainEvent) => {
    const child = runningProcesses.get(event.sender);
    child?.kill();
    if (child) {
      setTimeout(() => {
        if (!child.killed) {
          child.kill('SIGKILL');
        }
      }, 1000);
    }
  });

  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
