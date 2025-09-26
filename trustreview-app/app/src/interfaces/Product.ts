export interface IProduct {
    id?: string;
    name: string;
    description: string;
    tags?: ITag[];
    overallRating?: number;
    imageUrl?: string;
}

export interface ITag {
    id?: string;
    name: string;
    description?: string;
}
