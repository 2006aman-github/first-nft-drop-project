import { NFTMetadataOwner } from '@thirdweb-dev/sdk'
import Link from 'next/link'
import React from 'react'
import { claimedNFTs, Collection } from '../typings'
import { OpenSeaBaseURL } from '../config/NFTOpenSea'

interface Props {
  claimedNFT: NFTMetadataOwner
  priceInETH: string
  className?: string
  collectionAddress: String
}

function RevealCard({
  claimedNFT,
  priceInETH,
  className,
  collectionAddress,
}: Props) {
  const description = claimedNFT.metadata.description
  return (
    <div
      className={
        'h-50  mb-5 flex w-full flex-col space-y-3 rounded-xl bg-white p-3 pb-3 text-black' +
        ' ' +
        className
      }
    >
      {/* card image  */}
      <a target="_blank" href={(claimedNFT.metadata.image as string) || '/'}>
        <div className="h-fit w-full">
          <img
            src={claimedNFT.metadata?.image}
            className="w-full cursor-pointer rounded-xl object-cover duration-100 hover:bg-black hover:opacity-90"
            alt=""
          />
        </div>
      </a>

      {/* card details  */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="text-sm">
            {description && description.length > 15
              ? description.substring(0, 20) + '...'
              : description}
          </h3>
          <h1 className="text-xs font-bold lg:text-xl">
            {claimedNFT.metadata.name}
          </h1>
        </div>
        <div className="flex flex-col items-end justify-end">
          <h3 className="text-sm">Price</h3>
          <h1 className="text-right text-xs font-bold lg:text-xl">
            {priceInETH}
          </h1>
        </div>
      </div>
      {/* card action  */}
      <div className="flex items-center justify-center">
        <a
          target={'_blank'}
          href={
            OpenSeaBaseURL +
            `/assets/${collectionAddress}/${
              claimedNFT.metadata.name.split('#')[1] || '/'
            }`
          }
        >
          <button className="rounded-xl border-2 border-blue-500 bg-transparent px-3 py-1 text-sm duration-200 hover:bg-blue-500 hover:text-white">
            View on OpenSea
          </button>
        </a>
      </div>
    </div>
  )
}

export default RevealCard
