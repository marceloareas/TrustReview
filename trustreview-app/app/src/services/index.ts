import TrApiClient from "../classes/TrApiClient";
import ProductService from "./Product";
import ReviewService from "./Review";
import TagService from "./Tag";
import UserService from "./User";

const apiClient = new TrApiClient();

export const productService = new ProductService(apiClient);
export const tagService = new TagService(apiClient);
export const reviewService = new ReviewService(apiClient);
export const userService = new UserService(apiClient);
