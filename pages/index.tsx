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
  console.log(collections[0]._id)
  return (
    <div className="m-auto flex min-h-screen max-w-7xl flex-col items-center justify-center py-2">
      <Head>
        <title>Aman Tech NFT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <h1 className="font-bold text-red-500">Welcome to the NFT Project</h1> */}
      <main className="bg-slate-100 p-10 shadow-xl shadow-rose-400/20">
        <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {collections?.map((collection) => (
            <Link href={`/nft/${collection.slug.current}`}>
              <div className="flex cursor-pointer flex-col items-center justify-center align-middle transition-all duration-200 hover:scale-105">
                <img
                  key={collection._id}
                  className="h-96 w-60 rounded-2xl object-cover
                "
                  src={urlFor(collection.mainImage).url()}
                  alt=""
                />
                <div>
                  <h1 className="text-3xl">{collection.title}</h1>
                  <p>{collection.description}</p>
                </div>
              </div>
            </Link>
          ))}
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
