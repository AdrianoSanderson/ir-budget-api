# IR Budget - Backend

API responsável pelo processamento dos dados enviados pelo formulário de orçamento de Imposto de Renda.

Ela recebe as respostas do frontend, valida os dados, aplica as regras de negócio para cálculo do orçamento e retorna o valor estimado ao usuário.

---

## Preview

![API Status](https://img.shields.io/badge/API-Online-green)

---

## Tecnologias

- Node.js
- NestJS
- TypeScript
- PostgreSQL (Supabase)
- TypeORM
- Class Validator

---

## Funcionalidades

- Recebimento dos dados do formulário
- Validação de payload com class-validator
- Regras de negócio para cálculo do orçamento
- Persistência dos dados no banco PostgreSQL
- Endpoint de health check para monitoramento
- Integração com Supabase

---

## Endpoints

```http
POST /budgets
GET /health
```

## Autor

- [@AdrianoSanderson](https://github.com/AdrianoSanderson)

## Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)

## Instalação

```bash
  git clone https://github.com/seu-usuario/seu-repo-frontend.git
  cd seu-repo-backend
  npm install
  npm run start:dev
 
