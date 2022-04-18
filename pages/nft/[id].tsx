import React, { useEffect, useState } from 'react'
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNFTDrop,
} from '@thirdweb-dev/react'
import { GetServerSideProps } from 'next'
import { sanityClient, urlFor } from '../../sanity'
import { Collection } from '../../typings'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { BigNumber } from 'ethers'
import toast, { Toaster } from 'react-hot-toast'
// import ConfettiGenerator from 'confetti-js'
const ConfettiGenerator = require('confetti-js')
import { confettiSettings } from '../../config/confettiEffect'

interface Props {
  collection: Collection
  id: string
}

const NFTDropPage = ({ collection }: Props) => {
  // Authentication stuff...
  const connectWithMetamask = useMetamask()
  const disconnect = useDisconnect()
  const address = useAddress()
  const NFTDrop = useNFTDrop(collection.address)

  const [claimedSupply, setClaimedSupply] = useState<Number>(0)
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const [loading, setLoading] = useState<Boolean>(true)
  const [priceInETH, setpriceInETH] = useState<string>()
  const [minting, setMinting] = useState<boolean>(false)

  const [minted, setMinted] = useState<boolean>(false)

  useEffect(() => {
    if (!NFTDrop || !NFTDrop.totalSupply) {
      return
    }

    const fetchNFTDropData = async () => {
      const claimed = await NFTDrop.getAllClaimed()
      const total = await NFTDrop.totalSupply()

      setClaimedSupply(claimed.length)
      setTotalSupply(total)

      // only stop loading when NFTDrop data is fetched
      setLoading(false)
    }
    fetchNFTDropData()
  }, [NFTDrop])

  useEffect(() => {
    if (!NFTDrop) {
      return
    }
    const fetchPrice = async () => {
      const claimConditions = await NFTDrop.claimConditions.getAll()
      setpriceInETH(claimConditions[0].currencyMetadata.displayValue)
    }
    fetchPrice()
  }, [NFTDrop])

  const MintNFT = () => {
    if (!NFTDrop || !address) {
      return
    }
    const notification = toast.loading('Minting...', {
      style: {
        background: '#f5f5f5',
        color: 'green',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        padding: '1rem',
        borderRadius: '0.5rem',
      },
    })
    setMinting(true)
    const quantity = 1
    NFTDrop.claimTo(address, quantity)
      .then((tx) => {
        const claimedNFT = tx[0].data()
        const receipt = tx[0].receipt
        const claimedToken = tx[0]?.id
        toast("BOOM! You own one of Dude's variants", {
          duration: 10000,
          style: {
            background: 'green',
            color: 'white',
            fontWeight: 'bolder',
            fontSize: '1.2rem',
            padding: '1rem',
          },
        })
        setMinted(true)
        const confetti = new ConfettiGenerator(confettiSettings)
        confetti.render()
        setTimeout(() => {
          confetti.clear()
          setMinted(false)
        }, 10000)
        console.log(claimedToken)
        console.log(receipt)
        console.log(claimedNFT)
      })
      .catch((err) => {
        console.log(err)
        toast('Whoops!...something went wrong', {
          duration: 10000,
          style: {
            background: 'crimson',
            color: 'white',
            fontWeight: 'bolder',
            fontSize: '1.2rem',
            padding: '1rem',
          },
        })
      })
      .finally(() => {
        setMinting(false)
        toast.dismiss(notification)
      })
  }

  return (
    <div className="relative flex h-screen flex-col lg:grid lg:grid-cols-10">
      {minted && (
        <canvas
          className="absolute top-0 left-0 h-full w-screen"
          id="main-canvas"
        ></canvas>
      )}

      <Toaster position="bottom-left" reverseOrder={false} />
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
        <header className="flex-center flex items-center justify-between">
          <Link href="/">
            <h1 className="sm:w-88 w-52 cursor-pointer font-extralight sm:text-sm lg:text-xl">
              <span className="font-extrabold underline decoration-blue-600/50">
                {' '}
                Aman-Tech{'  '}
              </span>
              NFT Marketplace
            </h1>
          </Link>
          <button
            className="whitespace-nowrap rounded-full bg-blue-500 px-3 py-2 text-xs font-bold text-white lg:px-5 lg:py-3 lg:text-base"
            onClick={() => (address ? disconnect() : connectWithMetamask())}
          >
            {address ? 'Sign Out' : 'Sign In'}
          </button>
        </header>
        <hr className="my-2 border" />
        {address && (
          <p className="flex flex-col text-center text-sm text-green-500">
            <span>You're logged in with wallet</span>
            <span className="flex items-center justify-center space-x-3">
              <Icon icon="bx:wallet-alt" />
              <p>
                {address.substring(0, 5) +
                  '...' +
                  address.substring(address.length - 5)}
              </p>
            </span>
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
          {loading ? (
            <p className="animate-pulse pt-2  text-green-500">
              Loading NFT Supply Count...
            </p>
          ) : minting ? (
            <p className="animate-pulse pt-2  text-green-500 ">
              Minting an NFT
            </p>
          ) : (
            <p className="pt-2 text-xl  text-green-500">
              {claimedSupply + '/' + (totalSupply?.toString() || '')} NFT's
              claimed
            </p>
          )}
        </div>
        {/* mint button  */}
        <button
          disabled={
            claimedSupply === totalSupply?.toNumber() ||
            Boolean(!address) ||
            Boolean(loading) ||
            Boolean(minting)
          }
          onClick={MintNFT}
          className="mt-10 flex h-16 w-full items-center justify-center space-x-2 rounded-full bg-blue-500 font-bold text-white disabled:animate-pulse disabled:bg-gray-400"
        >
          {loading ? (
            <>Loading</>
          ) : claimedSupply === totalSupply?.toNumber() ? (
            <>Sold Out</>
          ) : !address ? (
            <>Connect a wallet to Mint</>
          ) : minting ? (
            <>Minting an NFT from the collection...</>
          ) : (
            <>
              <span>Mint NFT ({priceInETH} ETH)</span>
              <span>
                <Icon icon="ion:hammer-outline" />
              </span>
            </>
          )}
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
