import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import { Alert as BAlert } from 'react-bootstrap'
import classNames from 'classnames'

type Props = {
  isOpen: boolean
  message: string
  variant?: 'success' | 'danger'
  topMost?: boolean
}

export const Alert = ({
  isOpen,
  message,
  variant = 'danger',
  topMost = false,
}: Props) => {

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="ease-out duration-300 transition"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <BAlert variant={variant}>
        {message}
      </BAlert>
    </Transition>
  )
}
