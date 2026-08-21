# 1. Arquitetura do Sistema e Princípios de Clean Code

## Visão Geral
Este documento descreve a estrutura de software da API REST do CMS de E-Commerce de Eletrónicos. A arquitetura foi concebida para garantir desacoplamento, testabilidade e facilidade de manutenção.

## Princípios de Design & Clean Code
* **Single Responsibility Principle (SRP)**: Cada módulo, função ou classe possui uma única responsabilidade clara.
* **Separation of Concerns (SoC)**:
  * **Routes**: Apenas definem as rotas HTTP e associam middlewares e controllers.
  * **Controllers**: Tratam a requisição (req), extraem parâmetros e retornam a resposta HTTP (res). Não contêm regra de negócio.
  * **Services**: Onde habita toda a lógica de negócio da aplicação (cálculos, validações avançadas, regras do e-commerce).
  * **Repositories/Models**: Acesso e persistência no MongoDB via Mongoose.
  * **Middlewares**: Interceptadores para autenticação, autorização RBAC, validação Zod e sanitização de dados.
* **Nomenclatura**:
  * Código, variáveis, funções e comentários estritamente em **Inglês**.
  * CamelCase para variáveis e funções (`registerAdmin`, `getProductById`).
  * PascalCase para classes e modelos (`ProductModel`, `AuthService`).
  * kebab-case para nomes de ficheiros (`auth.controller.js`, `product.service.js`).

## Estrutura de Diretórios (`/src`)
```text
src/
├── config/              # Variáveis de ambiente e conexões
├── constants/           # Mensagens globais, status codes e enums
├── controllers/         # Handlers de requisições HTTP
├── middlewares/         # Anti-injection, Auth, RBAC, Rate-limit, Error Handler
├── models/              # Schemas e Models do Mongoose
├── repositories/        # Abstração de queries ao MongoDB
├── routes/              # Definição e agrupamento de endpoints REST
├── services/            # Camada de Regras de Negócio
├── utils/               # Formatadores, geradores de token e hashes
├── validations/         # Schemas de validação Zod
└── server.js            # Bootstrapping da aplicação
