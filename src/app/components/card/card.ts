export interface Card{
  title: string;
  authors: string[];
  pageCount: number;
  publisher: string;
  publishedDate: string;
  previewLink: string;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  }
}
