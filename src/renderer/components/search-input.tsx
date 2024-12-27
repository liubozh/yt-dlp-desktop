import { useAtom, useSetAtom } from 'jotai'
import { useState } from 'react'
import { isSearchingMetadataAtom, mediaMetadataAtom } from '../atoms'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function SearchInput() {
  const [inputValue, setInputValue] = useState('')

  const [isSearchingMetadata, setIsSearchingMetadata] = useAtom(
    isSearchingMetadataAtom,
  )
  const setMediaMetadata = useSetAtom(mediaMetadataAtom)

  const searchMedia = async () => {
    setIsSearchingMetadata(true)
    const options = ['--dump-single-json', '--cookies-from-browser', 'chrome']
    options.push(inputValue)

    window.downloadAPI
      .searchMedia(options)
      .then((metadata) => {
        setMediaMetadata(metadata)
      })
      .finally(() => {
        setIsSearchingMetadata(false)
      })
  }

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Type a URL"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            searchMedia()
          }
        }}
      />
      <Button
        disabled={isSearchingMetadata || !inputValue}
        onClick={searchMedia}
        type="button"
      >
        Search
      </Button>
    </div>
  )
}
