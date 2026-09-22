# Projeto 01 — To-do List em Computação em Nuvem

Esta entrega usa Docker Compose para executar a aplicação de tarefas com três réplicas da API e um balanceador Nginx.

## Arquitetura

```text
Navegador
   │ http://localhost:8080
   ▼
Frontend (React + Nginx)
   │ /api/*
   ▼
Load balancer (Nginx, least_conn)
   ├── api-1 (Express)
   ├── api-2 (Express)
   └── api-3 (Express)
```

O frontend não conhece portas ou endereços das APIs. Ele chama `/api/tarefas`; o Nginx do frontend encaminha a chamada ao serviço `load-balancer`, que seleciona a réplica menos ocupada. As APIs não expõem portas ao host, ficando acessíveis somente pela rede interna `todo-network`.

## Como executar

Pré-requisito: Docker Desktop em execução.

```bash
docker compose up --build
```

Depois, abra [http://localhost:8080](http://localhost:8080).

Para encerrar os contêineres:

```bash
docker compose down
```

## Verificação

Com a aplicação ativa, uma consulta à API pelo frontend deve retornar as tarefas:

```bash
curl http://localhost:8080/api/tarefas
```

Cada API possui o endpoint interno `GET /health`, utilizado pelo healthcheck do Compose.

## Observação sobre dados

Os dados da API de referência são mantidos em memória. Portanto, as três réplicas têm dados independentes e as alterações somem ao recriar os contêineres. Em uma evolução para produção, as réplicas devem compartilhar um banco de dados ou outro armazenamento persistente.
