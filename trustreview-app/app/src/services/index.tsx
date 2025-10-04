import TrApiClient from "../classes/TrApiClient";
import ProductService from "./Product";
import TagService from "./Tag";

const apiClient = new TrApiClient();

export const productService = new ProductService(apiClient);
export const tagService = new TagService(apiClient);
