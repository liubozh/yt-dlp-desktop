import { IDownloadAPI } from './interfaces';

declare global {
  interface Window {
    downloadAPI: IDownloadAPI;
  }
}
