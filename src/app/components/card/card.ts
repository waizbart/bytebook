export interface Card {
  id: string;
  title: string;
  authors: string[];
  pageCount: number;
  publisher: string;
  publishedDate: string;
  previewLink: string;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  description: string;
  mainCategory: string;
  averageRating: number;
  language: string;
}
