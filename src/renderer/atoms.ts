import { atom } from 'jotai';
import { MediaMetadata } from '../interfaces';

export const isSearchingMetadataAtom = atom(false);
export const isDownloadingAtom = atom(false);
export const isSettingsShowingAtom = atom(false);

export const mediaMetadataAtom = atom<MediaMetadata | null>(null);
