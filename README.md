# TrustReview

## O que é ?

Sistema (aplicativo) de avaliações de produtos, que mostra similares e garanta transparência. Este software trará a possibilidade do usuário se cadastrar e escrever **uma** `review` por produto (podendo alterar sua review). Produtos podem ser cadastrados pelos usuários e/ou admins.

## O que faz ?

### Registro de Produtos

Os `product`'s podem ser registrados por `user`'s `standart` ou `admim`. Nesta primeira versão, os produtos cadastrados consistirão de eletrônicos como *smartphones*, *smartwatches*, *video games* etc. Cada um terá um `name`, `description`, `overallRating`, `tag`, `createdAt`, `updatedAt` e uma lista de `review`'s associadas feitas por um `user` sobre o produto em questão.

### Registro de *Reviews*

As `review`'s podem ser registradas por `users`'s. Cada uma terá um `title`, `description`, `pros`, `cons`, `rating`, `isUsefull`, `notUsefull`, `createdAt`, `updatedAt`.

### Registro de *Tags*

As `Tag`'s podem ser registradas por `user`'s `admin` a fim de categorizar os `product`'s. Desta forma os `user`'s `standart` podem utilizá-las para quando forem registrar um `product` ou atualizá-lo. Cada Tag terá um `name` e um `description`.

### Cadastramamento de Usuários e *Login*

Um `user` deve ser cadastrado caso o usuário queira fazer uma `review`, registrar um `product` ou avaliar uma `review` de outro `user`. Cada user terá um `name`, `email`, `password`.

Para mais informações, veja na [Documentação do repositório](https://github.com/marceloareas/TrustReview/wiki).

## Como usar o repositório ?

WIP