import { useAtomValue } from 'jotai'
import { Clock, Download } from 'lucide-react'
import { mediaMetadataAtom } from '../atoms'
import { Button } from './ui/button'

export default function MediaMetadata() {
  const mediaMetadata = useAtomValue(mediaMetadataAtom)
  let title = 'Available in 2 weeks'
  let originalUrl = 'https://www.youtube.com/watch?v=X_Hw9P1iZfQ'
  let thumbnail = 'https://i.ytimg.com/vi_webp/X_Hw9P1iZfQ/maxresdefault.webp'

  let durationString = '18:88'

  if (mediaMetadata !== null) {
    title = mediaMetadata.title
    originalUrl = mediaMetadata.originalUrl
    thumbnail = mediaMetadata.thumbnail
    durationString = mediaMetadata.durationString
  }
  return (
    <div className="flex flex-col p-8">
      {thumbnail && (
        <img src={thumbnail} alt={title} className="object-cover" />
      )}

      <div className="flex-1 pt-2">
        <p>{title}</p>
        <p>{originalUrl}</p>

        <div className="flex items-center">
          <Clock />
          <span>{durationString}</span>
        </div>
      </div>
      <Button>
        <Download />
      </Button>
    </div>
  )
}
