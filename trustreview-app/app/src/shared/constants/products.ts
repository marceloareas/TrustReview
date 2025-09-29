import type { IProduct } from "../../interfaces/Product";

export const products: IProduct[] = [
  {
    id: "1",
    name: "Product 1",
    description: "Description for Product 1 lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tags: [
      { id: "1", name: "Tag 1" },
      { id: "2", name: "Tag 2" },
    ],
    overallRating: 4.5,
    imageUrl:
      "https://eu-images.contentstack.com/v3/assets/blt9ca8222b5acaa556/blt654a09ba7d41c100/6602f5b58c2083040ac176fa/imagem-produto-veja-banheiro-antibac-trigger-500ml.png?width=550&height=550&format=png&quality=80",
    reviewsCount: 2,
    reviews: [
      {
        id: "r1",
        userId: "u1",
        productId: "1",
        userName: "Alice",
        title: "Ótimo produto",
        pros: "Limpa bem",
        cons: "Cheiro forte",
        rating: 5,
        comment: "Recomendo para limpeza pesada."
      },
      {
        id: "r2",
        userId: "u2",
        productId: "1",
        userName: "Bruno",
        title: "Bom custo-benefício",
        pros: "Preço acessível",
        cons: "Embalagem frágil",
        rating: 4,
        comment: "Vale a pena pelo preço."
      }
    ],
    createdAt: new Date('2025-09-01T10:00:00Z'),
    updatedAt: new Date('2025-09-20T15:00:00Z')
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
      "https://castronaves.vteximg.com.br/arquivos/ids/388823-1000-1000/11159_01.jpg?v=638846634956800000",
    createdAt: new Date('2025-09-02T11:00:00Z'),
    updatedAt: new Date('2025-09-21T16:00:00Z')
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
      "https://castronaves.vteximg.com.br/arquivos/ids/388832-250-250/11415_01.jpg?v=638846635556930000",
    reviewsCount: 1,
    reviews: [
      {
        id: "r3",
        userId: "u3",
        productId: "3",
        userName: "Carlos",
        title: "Excelente!",
        pros: "Muito eficiente",
        cons: "Preço alto",
        rating: 5,
        comment: "Produto de alta qualidade."
      }
    ],
    createdAt: new Date('2025-09-03T12:00:00Z'),
    updatedAt: new Date('2025-09-22T17:00:00Z')
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
      "https://carrefourbrfood.vtexassets.com/arquivos/ids/178732193/bebida-lactea-nescau-pronto-1l-1.jpg?v=638669428613630000",
    createdAt: new Date('2025-09-04T13:00:00Z'),
    updatedAt: new Date('2025-09-23T18:00:00Z')
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
    reviewsCount: 3,
    reviews: [
      {
        id: "r4",
        userId: "u4",
        productId: "5",
        userName: "Diana",
        title: "Gostei muito",
        pros: "Sabor agradável",
        cons: "Pouca quantidade",
        rating: 4,
        comment: "Ótimo para o café da manhã."
      },
      {
        id: "r5",
        userId: "u5",
        productId: "5",
        userName: "Eduardo",
        title: "Bom, mas caro",
        pros: "Prático",
        cons: "Preço elevado",
        rating: 3,
        comment: "Poderia ser mais barato."
      },
      {
        id: "r6",
        userId: "u6",
        productId: "5",
        userName: "Fernanda",
        title: "Recomendo",
        pros: "Entrega rápida",
        cons: "Embalagem simples",
        rating: 5,
        comment: "Chegou antes do prazo."
      }
    ],
    createdAt: new Date('2025-09-05T14:00:00Z'),
    updatedAt: new Date('2025-09-24T19:00:00Z')
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
      "https://eu-images.contentstack.com/v3/assets/blt9ca8222b5acaa556/blt654a09ba7d41c100/6602f5b58c2083040ac176fa/imagem-produto-veja-banheiro-antibac-trigger-500ml.png?width=550&height=550&format=png&quality=80",
    createdAt: new Date('2025-09-06T15:00:00Z'),
    updatedAt: new Date('2025-09-25T20:00:00Z')
  },
  {
    id: "7",
    name: "Product 7",
    description: "Description for Product 7",
    tags: [
      { id: "2", name: "Tag 2" },
      { id: "6", name: "Tag 6" },
    ],
    overallRating: 4.8,
    imageUrl:
      "https://castronaves.vteximg.com.br/arquivos/ids/388823-1000-1000/11159_01.jpg?v=638846634956800000",
    createdAt: new Date('2025-09-07T16:00:00Z'),
    updatedAt: new Date('2025-09-26T21:00:00Z')
  },
  {
    id: "8",
    name: "Product 8",
    description: "Description for Product 8",
    tags: [
      { id: "3", name: "Tag 3" },
      { id: "7", name: "Tag 7" },
    ],
    overallRating: 3.9,
    imageUrl:
      "https://castronaves.vteximg.com.br/arquivos/ids/388832-250-250/11415_01.jpg?v=638846635556930000",
    createdAt: new Date('2025-09-08T17:00:00Z'),
    updatedAt: new Date('2025-09-27T22:00:00Z')
  },
  {
    id: "9",
    name: "Product 9",
    description: "Description for Product 9",
    tags: [
      { id: "1", name: "Tag 1" },
      { id: "8", name: "Tag 8" },
    ],
    overallRating: 4.3,
    imageUrl:
      "https://carrefourbrfood.vtexassets.com/arquivos/ids/178732193/bebida-lactea-nescau-pronto-1l-1.jpg?v=638669428613630000",
    createdAt: new Date('2025-09-09T18:00:00Z'),
    updatedAt: new Date('2025-09-28T23:00:00Z')
  },
  {
    id: "10",
    name: "Product 10",
    description: "Description for Product 10",
    tags: [
      { id: "4", name: "Tag 4" },
      { id: "9", name: "Tag 9" },
    ],
    overallRating: 4.6,
    imageUrl: "",
    createdAt: new Date('2025-09-10T19:00:00Z'),
    updatedAt: new Date('2025-09-29T23:30:00Z')
  },
];
