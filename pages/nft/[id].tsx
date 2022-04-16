import React from 'react'
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'
import { GetServerSideProps } from 'next'
import { sanityClient, urlFor } from '../../sanity'
import { Collection } from '../../typings'
import Link from 'next/link'

interface Props {
  collection: Collection
  id: string
}

const NFTDropPage = ({ collection }: Props) => {
  // Authentication stuff...
  console.log(collection)
  const connectWithMetamask = useMetamask()
  const disconnect = useDisconnect()
  const address = useAddress()

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/* left  */}
      <div className="bg-gradient-to-br from-cyan-600 to-black lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="rounded-xl bg-gradient-to-br from-yellow-200 to-purple-600 p-2">
            <img
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
              src={urlFor(collection.previewImage).url()}
              alt=""
            />
          </div>
          <div className="space-y-2 text-center">
            <h1 className="font0bold text-4xl text-white">
              {collection.nftCollectionName}
            </h1>
            <h2 className="text-xl text-gray-300">{collection.description}</h2>
          </div>
        </div>
      </div>
      {/* right  */}
      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        {/* header  */}
        <header className="flex-center flex justify-between">
          <Link href="/">
            <h1 className="sm:w-88 w-52 cursor-pointer text-xl font-extralight">
              <span className="font-extrabold underline decoration-blue-600/50">
                {' '}
                Aman-Tech{'  '}
              </span>
              NFT Marketplace
            </h1>
          </Link>
          <button
            className="rounded-full bg-blue-500 px-4 text-xs font-bold text-white lg:px-5 lg:text-base"
            onClick={() => (address ? disconnect() : connectWithMetamask())}
          >
            {address ? 'Sign Out' : 'Sign In'}
          </button>
        </header>
        <hr className="my-2 border" />
        {address && (
          <p className="text-center text-sm text-green-500">
            You're logged in with wallet{' '}
            {address.substring(0, 5) +
              '...' +
              address.substring(address.length - 5)}
          </p>
        )}
        {/* content  */}
        <div className="mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:justify-center lg:space-y-0">
          <img
            className="w-80 object-cover pb-10 lg:h-40"
            src={urlFor(collection.mainImage).url()}
            alt=""
          />
          <h1 className="text-3xl font-bold  lg:text-5xl lg:font-extrabold">
            {collection.title}
          </h1>
          <p className="pt-2 text-xl  text-green-500">13/500 NFT's claimed</p>
        </div>
        {/* mint button  */}
        <button className="mt-10 h-16 w-full rounded-full bg-blue-500 font-bold text-white">
          Mint NFT (0.000004 ETH)
        </button>
        <div></div>
      </div>
    </div>
  )
}

export default NFTDropPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "collection" && slug.current == $id][0]{
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
  const collection = await sanityClient.fetch(query, { id: params?.id })
  if (!collection) {
    return {
      notFound: true,
    }
  } else {
    return {
      props: {
        collection,
      },
    }
  }
}
