import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'
import { REVEAL_TIME_MS } from '../../constants/settings'

type Props = {
  value?: string
  status?: CharStatus
  isRevealing?: boolean
  isCompleted?: boolean
  position?: number
}

export const Cell = ({
                       value,
                       status,
                       isRevealing,
                       isCompleted,
                       position = 0
                     }: Props) => {
  const isFilled = value && !isCompleted
  const shouldReveal = isRevealing && isCompleted
  const animationDelay = `${position * REVEAL_TIME_MS}ms`

  const classes = classnames(
    'grid__cell',
    {
      'cell-fill-animation': isFilled,
      'cell-reveal': shouldReveal
    }
  )

  return (
    <div className={classes} data-status={status} style={{ animationDelay }}>
      <div className='letter-container' style={{ animationDelay }}>
        {value}
      </div>
    </div>
  )
}
