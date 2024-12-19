import { useAtom } from 'jotai';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { SidebarGroup, SidebarGroupContent } from './ui/sidebar';
import { isDownloadingAtom, mediaMetadataAtom } from '../atoms';
import { Button } from './ui/button';
import { Download, SquareX } from 'lucide-react';

export default function MetadataCard() {
  const [mediaMetadata] = useAtom(mediaMetadataAtom);
  const [isDownloading, setIsDownloading] = useAtom(isDownloadingAtom);

  if (mediaMetadata === null) {
    return null;
  }

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
    options.push(mediaMetadata.originalUrl);

    window.downloadAPI.download(options);
    window.downloadAPI.onDownloadOutput((output) => {
      console.log(output);
    });

    window.downloadAPI.onDownloadStopped((data) => {
      console.log(data);
      setIsDownloading(false);
    });
  };

  const cancelDownload = async () => {
    window.downloadAPI.cancelDownload();
    setIsDownloading(false);
  };

  return (
    <SidebarGroup className="px-4">
      <SidebarGroupContent>
        <Card>
          <CardHeader>
            <CardTitle>{mediaMetadata.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={mediaMetadata.thumbnail} alt={mediaMetadata?.title} />
          </CardContent>
          <CardFooter>
            <Button disabled={isDownloading} onClick={download}>
              <Download />
            </Button>
            <Button disabled={!isDownloading} onClick={cancelDownload}>
              <SquareX />
            </Button>
          </CardFooter>
        </Card>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
