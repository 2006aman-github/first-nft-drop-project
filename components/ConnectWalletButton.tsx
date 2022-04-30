import { Icon } from '@iconify/react'
import {
  useAddress,
  useCoinbaseWallet,
  useDisconnect,
  useMetamask,
  useWalletConnect,
} from '@thirdweb-dev/react'
import React, { useState } from 'react'
import Dropdown from './Dropdown'
import DropItem from './DropItem'

interface Props {
  className?: string
}

function ConnectWalletButton({ className }: Props) {
  // thirdweb wallets
  const connectWithMetamask = useMetamask()
  const connectWithCoinbase = useCoinbaseWallet()
  const ConnectWithWalletConnect = useWalletConnect()
  // states
  const [openDropdown, setOpenDropdown] = useState<boolean>(false)
  // refs
  const anchorEl = React.useRef<HTMLButtonElement>(null)

  const DropItemStyle = `flex items-center space-x-2`

  return (
    <button
      ref={anchorEl}
      onClick={() => setOpenDropdown((openDropdown) => !openDropdown)}
      className={
        'text-bold flex  items-center justify-center space-x-2 rounded-full bg-blue-500  px-5 py-2 text-center text-white transition-all duration-100 hover:outline hover:outline-4 hover:outline-blue-900 active:bg-blue-900' +
        ' ' +
        className
      }
    >
      <Dropdown
        handleClose={() => setOpenDropdown(false)}
        className="w-full"
        open={openDropdown}
        anchorEl={anchorEl}
      >
        <DropItem
          className={DropItemStyle}
          onClick={() => connectWithMetamask()}
        >
          <Icon icon="logos:metamask-icon" />
          <span>MetaMask</span>
        </DropItem>
        <DropItem
          className={DropItemStyle}
          onClick={() => connectWithCoinbase()}
        >
          <Icon icon="arcticons:coinbase" />
          <span>CoinBase</span>
        </DropItem>
        <DropItem
          className={DropItemStyle}
          onClick={() => ConnectWithWalletConnect()}
        >
          <img
            width="16"
            src="https://thirdweb.com/_next/static/media/walletconnect-logo.22c58d8d.svg"
            alt=""
          />
          <span>WalletConnect</span>
        </DropItem>
      </Dropdown>
      <span>Connect to a wallet</span>
      <Icon icon="clarity:connect-solid" rotate={1} />
    </button>
  )
}

export default ConnectWalletButton
