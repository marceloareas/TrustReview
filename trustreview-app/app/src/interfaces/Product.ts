export interface IProduct {
  id?: string;
  name: string;
  description: string;
  tags?: ITag[];
  overallRating?: number;
  imageUrl?: string;
  reviewsCount?: number;
  reviews?: IReview[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ITag {
  id?: string;
  name: string;
  description?: string;
}

export interface ReviewDTO {
  title: string;
  userId: string;
  productId: string;
  userName?: string;
  description?: string;
  likes?: number;
  dislikes?: number;
  pros?: string[];
  con?: string[];
  rating: number;
}

export interface IReview {
  id?: string;
  title?: string;
  userId: string;
  productId: string;
  userName: string;
  pros: string;
  con: string;
  rating: number;
  description?: string;
  likeCount?: number;
  dislikeCount?: number;
  createdAt?: string;
  updatedAt?: string;
}
