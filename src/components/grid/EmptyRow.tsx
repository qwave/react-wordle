import { MAX_WORD_LENGTH } from '../../constants/settings'
import { Cell } from './Cell'

export const EmptyRow = () => {
  const emptyCells = Array.from(Array(MAX_WORD_LENGTH))

  return (
    <div className="grid__row">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
