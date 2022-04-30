import React from 'react'
import ConnectWalletButton from './ConnectWalletButton'

function ConnectWalletCard() {
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center rounded-xl border-2 border-slate-900 bg-slate-800 p-5 lg:w-6/12">
      <img
        src={'/assets/svg/wallet.svg'}
        className="mb-10 h-40 w-40 object-cover"
        alt=""
      />
      <div className="flex flex-col items-center justify-center space-y-3 text-center">
        <h1 className="text-2xl font-bold">Connect Your Wallet</h1>
        <p>You need to connect a crypto wallet to access the dashboard</p>
        <ConnectWalletButton />
      </div>
    </div>
  )
}

export default ConnectWalletCard
