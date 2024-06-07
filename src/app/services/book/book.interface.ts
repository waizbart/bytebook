export interface Book {
  title: string;
  authors: string[];
  pageCount: number;
  publisher: string;
  publishedDate: string;
  previewLink: string;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
    extraLarge: string;
  };
  description: string;
  mainCategory: string;
  averageRating: number;
  language: string;
}
