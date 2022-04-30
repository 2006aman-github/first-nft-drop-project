import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'
import { Icon } from '@iconify/react'
import ConnectWalletButton from '../components/ConnectWalletButton'
import AddressButton from '../components/AddressButton'
import DashboardButton from '../components/DashboardButton'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  const connectWithMetamask = useMetamask()

  const disconnect = useDisconnect()

  const address = useAddress()

  // function to show random bubbles

  return (
    <div className="m-auto flex min-h-screen  flex-col">
      <Head>
        <title>Aman Tech NFT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <h1 className="font-bold text-red-500">Welcome to the NFT Project</h1> */}
      <main className="z-0 min-h-screen  bg-black/90">
        {/* view-1  */}
        <div className="flex h-screen flex-col">
          <header className="flex-.1  flex justify-end  p-5 px-5 align-baseline">
            {address ? <AddressButton /> : <ConnectWalletButton />}
          </header>
          {/* body  */}
          <div className="w-100 flex flex-auto flex-col items-center justify-center space-y-7  font-bold">
            <h1 className=" w-50 text-blue-00 text-center text-3xl text-blue-500 sm:text-5xl md:text-6xl lg:text-7xl">
              Welcome to, Aman-Tech
            </h1>
            <h3 className="w-100 mb-5 text-2xl font-bold text-white md:text-3xl lg:text-5xl">
              NFT Marketplace
            </h3>
            <p className="w-full px-5 text-center text-xs text-slate-300 sm:text-sm lg:px-3 lg:text-xl">
              Explore My Collection of NFTs and start investing in one of the
              cheapest NFT collections on the internet
            </p>
            {address ? (
              // <button
              //   onClick={() => disconnect()}
              //   className="text-bold mt-3 flex items-center justify-center space-x-2 rounded-full bg-slate-200 px-5 py-2 text-center text-black transition-all duration-100  hover:outline hover:outline-4 hover:outline-blue-500 active:bg-slate-400"
              // >

              // </button>
              <DashboardButton className="mt-3" />
            ) : (
              <ConnectWalletButton />
            )}
          </div>
        </div>
        {/* view-2  */}
        <div
          id="collections"
          className="m-auto flex h-screen flex-col items-center  space-y-5 text-center"
        >
          <h1 className="p-5 text-center text-4xl font-bold text-white lg:text-7xl">
            There you go!
          </h1>
          {/* collection-body  */}
          <div className="flex w-fit  items-center justify-center rounded-xl  bg-slate-900/90 p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {collections.map((collection) => (
                <Link href={`/nft/${collection.slug.current}`}>
                  <div className="group relative flex h-80 w-60 cursor-pointer flex-col rounded-xl bg-white p-1">
                    <img
                      src={'/assets/svg/arrow.svg'}
                      className="absolute top-3
                     right-3 bg-transparent duration-300 group-hover:right-2 group-hover:top-2"
                      width="30"
                    />
                    <img
                      className="h-30 mb-2 w-60 rounded-xl object-cover "
                      src={urlFor(collection.previewImage).url()}
                      alt=""
                    />
                    <h3 className="mb-5 text-sm font-bold text-black lg:text-sm">
                      {collection.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* footer  */}
        <footer className=" mb-1">
          {/* my social media  */}
          <div className="flex justify-center">
            <div className="mb-2 flex space-x-5 text-white">
              <Link href={'https://www.facebook.com/aman.chaubey.3597789/'}>
                <Icon
                  fontSize={'1rem'}
                  icon="bi:meta"
                  className="cursor-pointer duration-100 hover:-translate-y-1"
                  width="40"
                  height="40"
                />
              </Link>
              <Link href={'https://www.instagram.com/aaaman_cha/'}>
                <Icon
                  icon="akar-icons:instagram-fill"
                  className="cursor-pointer duration-100 hover:-translate-y-1"
                  width="40"
                  height="40"
                />
              </Link>
              <Link href={'https://www.linkedin.com/in/aman-james-7aa6a0201/'}>
                <Icon
                  icon="akar-icons:linkedin-box-fill"
                  className="cursor-pointer duration-100 hover:-translate-y-1"
                  width="40"
                  height="40"
                />
              </Link>
              <Link href={'https://twitter.com/AmanCha09928971'}>
                <Icon
                  icon="akar-icons:twitter-fill"
                  className="cursor-pointer duration-100 hover:-translate-y-1"
                  width="40"
                  height="40"
                />
              </Link>
              <Link href={'https://github.com/2006aman-github'}>
                <Icon
                  icon="akar-icons:github-fill"
                  className="cursor-pointer duration-100 hover:-translate-y-1"
                  width="40"
                  height="40"
                />
              </Link>
            </div>
            <div></div>
          </div>
          {/* copyright  */}
          <p className="text-center text-xs text-white">
            Copyright © Aman Chaubey 2022. All Rights Reserved
          </p>
        </footer>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == 'collection']{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage {
      asset
    },
    previewImage {
      asset
    },
    slug {
      current
    },
    creator -> {
      _id,
      name,
      address,
      slug {
        current
      }
    }
  }`

  let collections = await sanityClient.fetch(query)

  return {
    props: {
      collections,
    },
  }
}
