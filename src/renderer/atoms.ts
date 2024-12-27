import type { MediaMetadata } from '../interfaces'
import { atom } from 'jotai'

export const isSearchingMetadataAtom = atom(false)
export const isDownloadingAtom = atom(false)
export const isSettingsShowingAtom = atom(false)

export const mediaMetadataAtom = atom<MediaMetadata | null>(null)
