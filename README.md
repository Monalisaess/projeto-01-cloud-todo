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
           │
           ▼
       MySQL 8.4
```

O frontend não conhece portas ou endereços das APIs. Ele chama `/api/tarefas`; o Nginx do frontend encaminha a chamada ao serviço `load-balancer`, que seleciona a réplica menos ocupada. As três APIs compartilham o serviço MySQL, então qualquer réplica lê e altera os mesmos dados. Banco e APIs ficam acessíveis somente pela rede interna `todo-network`.

## Banco de dados

O MySQL armazena as tarefas na tabela `tarefas`. O arquivo `database/init.sql` cria a tabela e insere tarefas iniciais quando o volume do banco é criado pela primeira vez. O volume `mysql-data` mantém os dados mesmo depois de `docker compose down`.

Para desenvolvimento local, o Compose usa as credenciais padrão definidas nele. Você pode sobrescrever a senha do usuário da aplicação definindo `MYSQL_PASSWORD` no ambiente antes de iniciar os serviços. Essas credenciais padrão são apenas para desenvolvimento local.

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

Cada API possui o endpoint interno `GET /health`, utilizado pelo healthcheck do Compose. O endpoint confirma também que a API consegue acessar o MySQL.

## Observação sobre dados

As três réplicas compartilham os dados no MySQL. `docker compose down` preserva o volume. Para apagar também o banco e seus dados, use `docker compose down -v`.
