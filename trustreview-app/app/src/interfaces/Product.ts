export interface IProduct {
  id?: string;
  name: string;
  description: string;
  tags?: ITag[];
  overallRating?: number;
  imageUrl?: string;
  reviewsCount?: number;
  reviews?: IReview[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITag {
  id?: string;
  name: string;
  description?: string;
}

export interface IReview {
  id?: string;
  userId: string;
  productId: string;
  userName: string;
  title: string;
  pros: string;
  cons: string;
  rating: number;
  comment?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
