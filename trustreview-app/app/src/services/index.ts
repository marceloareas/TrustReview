import TrApiClient from "../classes/TrApiClient";
import ProductService from "./Product";
import ReviewService from "./Review";
import TagService from "./Tag";

const apiClient = new TrApiClient();

export const productService = new ProductService(apiClient);
export const tagService = new TagService(apiClient);
export const reviewService = new ReviewService(apiClient);
