import { BigNumber } from 'ethers'

interface Image {
  asset: {
    url: string
  }
}

export interface ConfettiJS {
  ConfettiConstructor: any
}
declare module 'confetti-js'

export interface claimedNFTs {
  metadata: {
    attributes: object
    name: string
    description: string
    id: BigNumber
    image: string
    uri: string
  }
  owner: string
}

export interface Creator {
  _id: string
  name: string
  address: string
  slug: {
    current: string
  }
  image: Image
  bio: string
}

export interface Collection {
  _id: string
  title: string
  description: string
  nftCollectionName: string
  address: string
  slug: {
    current: string
  }
  creator: Creator
  mainImage: Image
  previewImage: Image
}
