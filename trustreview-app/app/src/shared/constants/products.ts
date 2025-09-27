import type { IProduct } from "../../interfaces/Product";

export const products: IProduct[] = [
  {
    id: "1",
    name: "Product 1",
    description: "Description for Product 1",
    tags: [
      { id: "1", name: "Tag 1" },
      { id: "2", name: "Tag 2" },
    ],
    overallRating: 4.5,
    imageUrl:
      "https://www.supermercadosaomarcos.com.br/arquivos/LoginID_288/Produto/nescau-204.jpg",
  },
  {
    id: "2",
    name: "Product 2",
    description: "Description for Product 2",
    tags: [
      { id: "1", name: "Tag 1" },
      { id: "3", name: "Tag 3" },
    ],
    overallRating: 4.0,
    imageUrl:
      "https://www.supermercadosaomarcos.com.br/arquivos/LoginID_288/Produto/nescau-204.jpg",
  },
  {
    id: "3",
    name: "Product 3",
    description: "Description for Product 3",
    tags: [
      { id: "2", name: "Tag 2" },
      { id: "3", name: "Tag 3" },
    ],
    overallRating: 5.0,
    imageUrl:
      "https://www.supermercadosaomarcos.com.br/arquivos/LoginID_288/Produto/nescau-204.jpg",
  },
  {
    id: "4",
    name: "Product 4",
    description: "Description for Product 4",
    tags: [
      { id: "1", name: "Tag 1" },
      { id: "4", name: "Tag 4" },
    ],
    overallRating: 3.8,
    imageUrl:
      "https://www.supermercadosaomarcos.com.br/arquivos/LoginID_288/Produto/nescau-204.jpg",
  },
  {
    id: "5",
    name: "Product 5",
    description: "Description for Product 5",
    tags: [
      { id: "2", name: "Tag 2" },
      { id: "5", name: "Tag 5" },
    ],
    overallRating: 4.2,
    imageUrl:
      "https://www.supermercadosaomarcos.com.br/arquivos/LoginID_288/Produto/nescau-204.jpg",
  },
  {
    id: "6",
    name: "Product 6",
    description: "Description for Product 6",
    tags: [
      { id: "3", name: "Tag 3" },
      { id: "4", name: "Tag 4" },
    ],
    overallRating: 4.7,
    imageUrl:
      "https://www.supermercadosaomarcos.com.br/arquivos/LoginID_288/Produto/nescau-204.jpg",
  },
];
