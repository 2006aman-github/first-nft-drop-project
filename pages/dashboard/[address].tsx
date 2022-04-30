import { Icon } from '@iconify/react'
import { useAddress, useNFTDrop } from '@thirdweb-dev/react'
import { NFTMetadataOwner } from '@thirdweb-dev/sdk'
import next, { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import AddressButton from '../../components/AddressButton'
import ConnectWalletButton from '../../components/ConnectWalletButton'
import DashboardRow from '../../components/DashboardRow'
import Dropdown from '../../components/Dropdown'
import DropItem from '../../components/DropItem'
import RevealCard from '../../components/RevealCard'
import { sanityClient } from '../../sanity'
import { Collection } from '../../typings'
import ConnectWalletCard from '../../components/ConnectWalletCard'

interface Props {
  collections: Collection[]
}

const Dashboard = ({ collections }: Props) => {
  const address = useAddress()
  const router = useRouter()
  const params = router.query
  // DD => Drop down
  // states...
  const [priceDD, setPriceDD] = useState<boolean>(false)
  const [collectionDD, setCollectionDD] = useState<boolean>(false)
  // refs
  let PriceDDAnchor = React.useRef<HTMLElement | null>(null)
  let CollectionDDAnchor = React.useRef<HTMLElement | null>(null)
  // useEffects

  const handleClosePriceDropDown = () => {
    setPriceDD(false)
  }
  const handleCloseCollectionDropDown = () => {
    setCollectionDD(false)
  }

  const handlePriceClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setPriceDD((prevValue) => !prevValue)
  }
  const handleCollectionClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setCollectionDD((prevValue) => !prevValue)
  }

  return (
    <div className="flex min-h-screen flex-col bg-black p-2 text-white md:p-3 lg:p-7">
      {/* header  */}
      <div className="h-30 flex items-center justify-between  ">
        {/* nft marketplace logo  */}
        <Link href="/">
          <div className="w-88  cursor-pointer   font-bold sm:text-sm md:text-xl lg:space-x-2  lg:text-3xl">
            <span className="mr-1 whitespace-nowrap text-blue-500 lg:col-span-1">
              Aman-Tech{' '}
            </span>
            NFT Marketplace
          </div>
        </Link>
        {address ? (
          <span>
            <AddressButton className="text-sm" />
          </span>
        ) : (
          <ConnectWalletButton className=" w-fit  whitespace-nowrap text-sm " />
        )}
      </div>
      {/* tab  */}
      <section className="my-3 flex  items-center justify-between rounded-xl bg-slate-900 px-5 py-3 ">
        <h1 className="whitespace-nowrap text-center text-sm font-bold lg:text-2xl">
          Your NFTs
        </h1>
        {/* left side  */}
        {/* <div className="flex space-x-3">
          <div
            onClick={handlePriceClick}
            ref={PriceDDAnchor as React.LegacyRef<HTMLDivElement> | undefined}
            className=" bg-red flex cursor-pointer items-center justify-between  rounded-xl bg-slate-500  py-2 px-5 font-bold  duration-100 hover:bg-slate-600 hover:outline hover:outline-4 hover:outline-slate-400"
          >
            <span>Price</span>
            <Icon icon="akar-icons:chevron-down" />
          </div>

          <div
            onClick={handleCollectionClick}
            ref={
              CollectionDDAnchor as React.LegacyRef<HTMLDivElement> | undefined
            }
            className=" flex cursor-pointer items-center justify-between space-x-0 rounded-xl bg-slate-500  py-2 px-5 font-bold duration-100 hover:bg-slate-600 hover:outline hover:outline-4 hover:outline-slate-400 "
          >
            <span>Collection</span>
            <Icon icon="akar-icons:chevron-down" />
          </div>
        </div> */}
        {/* right side  */}
        <Link href={'/#collections'}>
          <button className="flex items-center justify-center space-x-3 rounded-xl bg-blue-500 p-2 text-center  text-sm font-bold text-white transition-all duration-100 hover:outline hover:outline-4 hover:outline-blue-900 active:bg-blue-900 lg:px-5 lg:py-2">
            <Icon icon="fluent:add-square-20-regular" />
            <span>Collect NFT</span>
          </button>
        </Link>
      </section>

      {/* main content */}

      {address ? (
        <div className="rounded-xl bg-slate-900 p-5 ">
          {collections.map((collection) => (
            <DashboardRow key={collection._id} collection={collection} />
          ))}
        </div>
      ) : (
        <ConnectWalletCard />
      )}
    </div>
  )
}

export default Dashboard

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "collection"]{
    _id,
    address,
    title
  }`
  const collections = await sanityClient.fetch(query)
  if (!collections) {
    return { props: { collections: [] } }
  } else {
    return { props: { collections } }
  }
}
