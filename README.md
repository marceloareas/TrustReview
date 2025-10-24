# TrustReview

## O que é ?

Sistema (aplicativo) de avaliações de produtos, que mostra similares e garanta transparência. Este software trará a possibilidade do usuário se cadastrar e escrever **uma** `review` por produto (podendo alterar sua review). Produtos podem ser cadastrados pelos usuários e/ou admins.

## O que faz ?

### Registro de Produtos

Os `product`'s podem ser registrados por `user`'s `standard` ou `admim`. Nesta primeira versão, os produtos cadastrados consistirão de eletrônicos como *smartphones*, *smartwatches*, *video games* etc. Cada um terá uma lista de `review`'s associadas feitas por vários `user`'s diferentes sobre o produto em questão.

### Registro de *Reviews*

As `review`'s podem ser registradas por `users`'s para **cada um** `product`. Nesta `review`, o `user` descreverá sua experiência com o `product`.

### Registro de *Tags*

As `Tag`'s podem ser registradas por `user`'s `admin` ou `standard` a fim de categorizar os `product`'s. Desta forma os `user`'s `standard` podem utilizá-las para quando forem registrar um `product` ou atualizá-lo.

### Cadastramamento de Usuários e *Login*

Um `user` deve ser cadastrado, caso o mesmo queira fazer uma `review`, registrar um `product` ou avaliar uma `review` de outro `user`. 

Para mais informações, veja na [Documentação do repositório](https://github.com/marceloareas/TrustReview/wiki).

## Como usar o repositório ?

É necessário o uso do Docker veja sua instalação em: [Docker](https://docs.docker.com/engine/install/).

Após isto, realiza a criação dos conteiners por meio de:
```
docker compose up
```

