import { ReactNode } from 'react'
import classnames from 'classnames'
import { CharStatus } from '../../lib/statuses'
import { REVEAL_TIME_MS } from '../../constants/settings'
import { solutionLength } from '../../lib/words'
import { Col } from 'react-bootstrap'

type Props = {
  children?: ReactNode
  value: string
  width?: number
  status?: CharStatus
  onClick: (value: string) => void
  isRevealing?: boolean
  large?: boolean
}

export const Key = ({
                      children,
                      status,
                      value,
                      onClick,
                      isRevealing,
                      large
                    }: Props) => {
  const keyDelayMs = REVEAL_TIME_MS * solutionLength

  const classes = classnames(
    'keyboard__item',
    {
      'transition ease-in-out': isRevealing
    }
  )

  const styles = {
    transitionDelay: isRevealing ? `${keyDelayMs}ms` : 'unset'
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value)
    event.currentTarget.blur()
  }

  return (
    <Col xs='auto'>
      <button
        style={styles}
        aria-label={`${value} ${status}`}
        className={classes}
        data-size={large && 'large'}
        data-status={status}
        data-key={value}
        onClick={handleClick}
      >
        {children || value}
      </button>
    </Col>
  )
}
