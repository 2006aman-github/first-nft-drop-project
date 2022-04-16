import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  const connectWithMetamask = useMetamask()

  const disconnect = useDisconnect()
  const address = useAddress()
  return (
    <div className="m-auto flex min-h-screen  flex-col">
      <Head>
        <title>Aman Tech NFT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <h1 className="font-bold text-red-500">Welcome to the NFT Project</h1> */}
      <main className="min-h-screen bg-black">
        {/* view-1  */}

        <div className="flex h-screen flex-col">
          {/* header  */}
          <header className="flex-.1  flex justify-end  p-5 px-5 align-baseline">
            {address ? (
              <div className="rounded-full border-2 border-slate-400 px-5 py-2 text-white">
                {address.substring(0, 5) +
                  '...' +
                  address.substring(address.length - 5)}
              </div>
            ) : (
              <button
                onClick={() => (address ? disconnect() : connectWithMetamask())}
                className="text-bold rounded-full bg-indigo-600 px-5 py-2 text-center text-white"
              >
                Connect to a wallet
              </button>
            )}
          </header>
          {/* body  */}
          <div className="w-100 flex flex-auto flex-col items-center justify-center space-y-7  font-bold">
            <h1 className=" w-50  text-center text-4xl text-indigo-600 lg:text-7xl">
              Welcome to, Aman-Tech
            </h1>
            <h3 className="w-100 mb-5 text-2xl font-bold text-white lg:text-5xl">
              NFT Marketplace
            </h3>
            <p className="w-full px-5 text-center text-sm text-slate-300 lg:px-3 lg:text-xl">
              Explore My Collection of NFTs and start investing in one of the
              cheapest NFT collections on the internet
            </p>
            {address ? (
              <button
                onClick={() => disconnect()}
                className="text-bold mt-3 rounded-full bg-slate-200 px-5 py-2 text-center text-black transition-all duration-100 hover:outline hover:outline-4 hover:outline-indigo-500"
              >
                Disconnect wallet
              </button>
            ) : (
              <button
                onClick={() => (address ? disconnect() : connectWithMetamask())}
                className="text-bold mt-3 rounded-full bg-indigo-600 px-5 py-2 text-center text-white transition-all duration-100 hover:outline hover:outline-4 hover:outline-indigo-500"
              >
                Connect to a wallet
              </button>
            )}
          </div>
        </div>
        {/* view-2  */}
        <div className="m-auto flex h-screen flex-col items-center  space-y-5 text-center">
          <h1 className="p-5 text-center text-4xl font-bold text-white lg:text-7xl">
            There you go!
          </h1>
          {/* collection-body  */}
          <div className="flex w-fit  items-center justify-center rounded-xl  bg-slate-900/40 p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {collections.map((collection) => (
                <Link href={`/nft/${collection.slug.current}`}>
                  <div className="flex h-60 w-40 cursor-pointer flex-col rounded-xl bg-white p-1 lg:h-80 lg:w-60">
                    <img
                      className="h-30 mb-2 w-40 rounded-xl object-cover lg:h-60 lg:w-60"
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
