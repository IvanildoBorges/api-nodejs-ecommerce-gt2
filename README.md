# Projeto Backend Node.js + Express + PostgreSQL

Este é um projeto backend desenvolvido em **Node.js** com **Express.js** e **PostgreSQL**, utilizando **Sequelize** como ORM. O objetivo é criar uma API RESTful segura, testada e modular, com autenticação via **JWT** e suporte completo a operações CRUD.

---

## Tecnologias Utilizadas

- **Node.js** – ambiente de execução JavaScript no servidor
- **Express.js** – framework para criação de rotas e middlewares
- **Dotenv** – gerenciamento seguro de variáveis de ambiente
- **Nodemon** – reinício automático do servidor durante o desenvolvimento
- **PostgreSQL** – banco de dados relacional
- **Sequelize** – ORM para abstração e manipulação do banco
- **JWT** – autenticação segura por token
- **JEST** – framework de testes unitários

---

## Como rodar localmente

1. Clone o projeto
```bash
git clone https://github.com/IvanildoBorges/api-nodejs-ecommerce-gt2.git
cd api-nodejs-ecommerce-gt2
```

2. Instale as dependências
```bash
npm install
```

3. Crie e configure o arquivo .env
```env
DB_HOST=localhost
PORT=5433
USERNAME=postgres
PASSWORD=postgres
DATABASE='ecommerce-gt2'
JWT_SECRET=Jf8#e2V!s7B$kLmT9z@CwXq&bR4hPnY3gKdVv$e6tZp!Uy#rA
JWT_EXPIRATION=1d
SALT_ROUNDS=10
NODE_ENV=dev
```

4. Inicie o servidor
```bash
npm run dev
```

---

## Estrutura de Diretórios
```bash
api-nodejs-ecommerce-gt2/
  ├── src/
  │ ├── config/           # Configurações da aplicação e banco
  │ ├── controllers/      # Lógica das rotas
  │ ├── middleware/       # Middlewares (autenticação e etc)
  │ ├── models/           # Definição dos modelos Sequelize
  │ ├── routes/           # Rotas da API
  │ ├── services/         # Lógica de negócio
  │ ├── app.js            # App Express
  │ └── server.js         # Inicialização do servidor
  ├── tests/              # Testes unitários
  ├── .env                # Variáveis de ambiente
  ├── .gitignore
  └── package.json
```

---

## Códigos de Status da API

| Código | Significado |
|--------|-------------|
| 200 OK | Requisição bem-sucedida com corpo de resposta |
| 201 CREATED | Novo recurso criado com sucesso |
| 204 NO CONTENT | Requisição processada com sucesso, sem corpo de resposta |
| 400 BAD REQUEST | Requisição malformada ou inválida |
| 401 UNAUTHORIZED | Falta de autenticação ou token inválido |
| 404 NOT FOUND | Recurso não encontrado |
| 500 INTERNAL SERVER ERROR | Algo deu errado no servidor |

---

## Funcionalidades por Seção

### Seção 01 – Banco de Dados

- [x] Tabela de usuários
- [x] Tabela de categorias
- [x] Tabela de produtos
- [x] Tabela de imagens dos produtos
- [x] Tabela de opções dos produtos
- [x] Tabela relacional produto-categoria

---

### Seção 02 – CRUD de Usuários

- [x] GET `/users/:id` – Obter usuário por ID  
- [x] POST `/users` – Cadastrar usuário  
- [x] PUT `/users/:id` – Atualizar usuário  
- [x] DELETE `/users/:id` – Remover usuário  

---

### Seção 03 – CRUD de Categorias

- [x] GET `/categories` – Listar categorias  
- [x] GET `/categories/:id` – Obter categoria por ID  
- [x] POST `/categories` – Criar nova categoria  
- [x] PUT `/categories/:id` – Atualizar categoria  
- [x] DELETE `/categories/:id` – Remover categoria  

---

### Seção 04 – CRUD de Produtos

- [x] GET `/products` – Listar produtos  
- [x] GET `/products/:id` – Obter produto por ID  
- [x] POST `/products` – Criar produto  
- [x] PUT `/products/:id` – Atualizar produto  

---

### Seção 05 – Autenticação JWT

- [x] POST `/auth/login` – Gerar token JWT  
- [x] Middleware de verificação do token em rotas **POST**, **PUT**, **DELETE**

---

## Testes

- Testes escritos com **Jest**
- Para executar os testes:
```bash
npm test
```

---

## Autor

Desenvolvido por [Ivanildo Borges](https://www.linkedin.com/in/IvanildoBorges)
