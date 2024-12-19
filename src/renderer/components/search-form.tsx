import { Search } from 'lucide-react';
import { Label } from './ui/label';
import { SidebarGroup, SidebarGroupContent, SidebarInput } from './ui/sidebar';
import {
  isSearchingMetadataAtom,
  mediaMetadataAtom,
  mediaUrlAtom,
} from '../atoms';
import { useAtom, useSetAtom } from 'jotai';
import { Button } from './ui/button';

export default function SearchForm() {
  const [mediaUrl, setMediaUrl] = useAtom(mediaUrlAtom);
  const [isSearchingMetadata, setIsSearchingMetadata] = useAtom(
    isSearchingMetadataAtom,
  );
  const setMediaMetadata = useSetAtom(mediaMetadataAtom);

  const searchMedia = async () => {
    setIsSearchingMetadata(true);
    const options = ['--dump-single-json', '--cookies-from-browser', 'chrome'];
    options.push(mediaUrl);

    window.downloadAPI
      .searchMedia(options)
      .then((metadata) => {
        setMediaMetadata(metadata);
      })
      .finally(() => {
        setIsSearchingMetadata(false);
      });
  };

  return (
    <SidebarGroup className="py-0">
      <SidebarGroupContent className="relative">
        <div className="flex items-center gap-2">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            value={mediaUrl}
            placeholder="Search the media URL"
            onChange={(e) => setMediaUrl(e.target.value)}
          />
          <Button disabled={isSearchingMetadata} onClick={searchMedia}>
            <Search />
          </Button>
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
