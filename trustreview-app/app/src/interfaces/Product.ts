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

export interface IReview {
  id?: string;
  userId: string;
  productId: string;
  userName: string;
  pros: string;
  cons: string;
  rating: number;
  comment?: string;
  likeCount?: number;
  dislikeCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

//Apenas temporário
export interface IUser {
  email: string;
}
