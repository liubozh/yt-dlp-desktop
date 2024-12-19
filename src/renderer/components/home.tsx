import { Download, Search, SquareX } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useAtom } from 'jotai';
import {
  mediaUrlAtom,
  mediaMetadataAtom,
  isLoadingMetadataAtom,
  isDownloadingAtom,
} from '../atoms';
import { Separator } from './ui/separator';

export default function Home() {
  const [isLoadingMetadata, setIsLoadingMetadata] = useAtom(
    isLoadingMetadataAtom,
  );
  const [isDownloading, setIsDownloading] = useAtom(isDownloadingAtom);

  const [mediaUrl, setMediaUrl] = useAtom(mediaUrlAtom);
  const [mediaMetadata, setMediaMetadata] = useAtom(mediaMetadataAtom);

  const loadMetadata = async () => {
    setIsLoadingMetadata(true);
    const options = ['--dump-single-json', '--cookies-from-browser', 'chrome'];
    options.push(mediaUrl);

    window.downloadAPI
      .loadMediaMetadata(options)
      .then((metadata) => {
        setMediaMetadata(metadata);
      })
      .finally(() => {
        setIsLoadingMetadata(false);
      });
  };

  const download = async () => {
    setIsDownloading(true);
    const options = [
      '--cookies-from-browser',
      'chrome',
      '-f',
      'bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4] / bv*+ba/b',
      '-o',
      '~/yt-dlp-desktop/%(title)s [%(id)s].%(ext)s',
    ];
    options.push(mediaUrl);

    window.downloadAPI.download(options);
    window.downloadAPI.onDownloadOutput((output) => {
      console.log(output);
    });

    window.downloadAPI.onDownloadStopped((data) => {
      console.log(data);
      setIsDownloading(false);
    });
  };

  const cancelDownload = () => {
    window.downloadAPI.cancelDownload();
    setIsDownloading(false);
  };

  return (
    <div>
      <h1>Search and Download</h1>
      <Input
        id="text"
        name="text"
        value={mediaUrl}
        placeholder="https://www.youtube.com/watch?v=X_Hw9P1iZfQ"
        onChange={(e) => setMediaUrl(e.target.value)}
      />
      <Button
        disabled={isLoadingMetadata || mediaUrl.length <= 0}
        onClick={loadMetadata}
      >
        {isLoadingMetadata ? 'Loading...' : <Search />}
      </Button>
      <Button
        disabled={isDownloading || mediaUrl.length <= 0 || !mediaMetadata}
        onClick={download}
      >
        {isDownloading ? 'Downloading...' : <Download />}
      </Button>
      <Button disabled={!isDownloading} onClick={cancelDownload}>
        <SquareX />
      </Button>
      <Separator className="my-8" />
      {mediaMetadata !== null && JSON.stringify(mediaMetadata)}
    </div>
  );
}
