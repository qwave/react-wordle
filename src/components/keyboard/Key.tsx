import { ReactNode } from 'react'
import classnames from 'classnames'
import { CharStatus } from '../../lib/statuses'
import { MAX_WORD_LENGTH, REVEAL_TIME_MS } from '../../constants/settings'
import { Col, Button } from 'react-bootstrap'

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
  const keyDelayMs = REVEAL_TIME_MS * MAX_WORD_LENGTH

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value)
    event.currentTarget.blur()
  }

  return (
    <Col xs='auto'>
      <button className='keyboard__item' data-size={large && 'large'} data-status={status} data-key={value} onClick={handleClick}>
        {children || value}
      </button>
    </Col>
  )
}
