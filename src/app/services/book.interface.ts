export interface Book {
  volumeInfo: VolumeInfo
}

export interface VolumeInfo {
  title: string
  authors: string[]
  publisher: string
  publishedDate: string
  pageCount: number
  imageLinks: ImageLinks
  previewLink: string
}

export interface ImageLinks {
  smallThumbnail: string
  thumbnail: string
}
