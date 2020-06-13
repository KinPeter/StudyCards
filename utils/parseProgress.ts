import { DeckProgress } from '~/services/deck/types/DeckProgress'

export function parseProgress(progressJsonString: string): DeckProgress {
  return JSON.parse(progressJsonString) as DeckProgress
}
