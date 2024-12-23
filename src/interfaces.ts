export interface MediaMetadata {
  type: 'video';
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  originalUrl: string;
  duration: number;
  durationString: string;
}

export interface IDownloadAPI {
  searchMedia(options: string[]): Promise<MediaMetadata>;
  download(options: string[]): Promise<void>;
  cancelDownload(): void;
  onDownloadOutput(callback: (output: string) => void): void;
  onDownloadStopped(
    callback: (data: { code: number | null; signal: string | null }) => void,
  ): void;
  // onDownloadProgress(callback: (progress: number) => void): void;
  // onDownloadStopped(callback: () => void): void;
}
