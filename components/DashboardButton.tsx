import { Icon } from '@iconify/react'
import { useAddress } from '@thirdweb-dev/react'
import Link from 'next/link'
import React, { MouseEventHandler } from 'react'

interface Props {
  className?: string
  onClick?: MouseEventHandler
}

function DashboardButton({ className, onClick }: Props) {
  const address = useAddress()
  return (
    <Link href={`/dashboard/[address]`} as={'/dashboard/' + address}>
      <button
        className={
          'text-bold flex items-center justify-center space-x-2 rounded-full bg-blue-500 px-5 py-2 text-center text-white transition-all duration-100 hover:outline hover:outline-4 hover:outline-blue-900 active:bg-blue-900' +
          ' ' +
          className
        }
        onClick={onClick}
      >
        <span>Dashboard</span>
        <Icon icon="ic:baseline-dashboard" />
      </button>
    </Link>
  )
}

export default DashboardButton
