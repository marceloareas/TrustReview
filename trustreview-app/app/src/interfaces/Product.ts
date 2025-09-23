export interface IProduct {
    productId?: string;
    name: string;
    description: string;
    tags?: ITag[];
    overallRating?: number;
    imageUrl?: string;
}

export interface ITag {
    tagId?: string;
    name: string;
    description?: string;
}
