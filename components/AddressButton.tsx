import { Icon } from '@iconify/react'
import { useAddress, useDisconnect } from '@thirdweb-dev/react'
import React from 'react'
import Dropdown from './Dropdown'
import DropItem from './DropItem'

interface Props {
  className?: string
}

function AddressButton({ className }: Props) {
  const address = useAddress()
  const disconnect = useDisconnect()
  const rootEl = React.useRef<HTMLButtonElement>(null)
  const [openDropDown, setOpenDropDown] = React.useState<boolean>(false)
  // useEffects

  function handleCloseDropDown() {
    setOpenDropDown(false)
  }

  return (
    <button
      ref={rootEl}
      onClick={() => {
        return setOpenDropDown((openDropDown) => !openDropDown)
      }}
      className={
        'flex cursor-pointer items-center justify-center space-x-2 rounded-full border-2 border-slate-700 px-5 py-2 text-white' +
        ' ' +
        className
      }
    >
      <Dropdown
        handleClose={handleCloseDropDown}
        open={openDropDown}
        anchorEl={rootEl}
      >
        <DropItem
          onClick={() => {
            disconnect()
          }}
          className="m-0 flex items-center justify-center space-x-2"
        >
          <span>Disconnect wallet</span>
          <Icon icon="codicon:debug-disconnect" width="16" height="16" />
        </DropItem>
      </Dropdown>
      <span>
        <Icon icon="bx:wallet-alt" />
      </span>
      <span className="text-white">
        {address?.substring(0, 5) +
          '...' +
          address?.substring(address.length - 5)}
      </span>
      <Icon
        icon="akar-icons:chevron-down"
        className={`${openDropDown && '-rotate-180'} duration-300`}
      />
    </button>
  )
}

export default AddressButton
