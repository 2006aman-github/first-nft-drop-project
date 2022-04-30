import { useAddress, useNFTDrop } from '@thirdweb-dev/react'
import { NFTMetadataOwner } from '@thirdweb-dev/sdk'
import React, { useEffect, useState } from 'react'
import { claimedNFTs, Collection } from '../typings'
import RevealCard from './RevealCard'

interface Props {
  collection: Collection
}

function DashboardRow({ collection }: Props) {
  const collectionAddress = collection.address
  const NFTDrop = useNFTDrop(collectionAddress)
  const address = useAddress()
  const [claimedNFTs, setClaimedNFTs] = useState<NFTMetadataOwner[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [noData, setNoData] = useState(false)
  useEffect(() => {
    if (!NFTDrop || !address) {
      setNoData(true)
      return
    }

    const fetchNFTDropData = async () => {
      setNoData(false)
      setLoading(true)
      try {
        const claimedNFTs = await NFTDrop.getOwned(address)
        setClaimedNFTs(claimedNFTs)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchNFTDropData()
  }, [NFTDrop])
  return (
    <div>
      {/* row title  */}
      <h1 className="mb-5 text-sm font-bold lg:text-xl">{collection.title}</h1>
      {/* row data  */}
      <section className="grid grid-cols-2 gap-5  md:grid-cols-3 lg:grid-cols-4">
        {noData ? (
          <h1>No Data...</h1>
        ) : loading ? (
          <h1 className=" animate-bounce  text-xl text-green-500">
            Loading...
          </h1>
        ) : (
          <>
            {claimedNFTs.reverse().map((nft, index) => (
              <RevealCard
                priceInETH="0.000087 ETH"
                key={nft.owner + index}
                claimedNFT={nft}
                collectionAddress={collection.address}
              />
            ))}
          </>
        )}
      </section>
    </div>
  )
}

export default DashboardRow
