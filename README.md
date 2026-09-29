# Projeto 01 — To-do List em Computação em Nuvem

Esta aplicação usa Docker Compose para executar o frontend, três réplicas da API, um balanceador Nginx e o banco MySQL.

## Arquitetura

```text
Navegador (http://localhost:8080)
   │
   ▼
Frontend (React + Nginx)
   │ /api/*
   ▼
Load balancer (Nginx, least_conn)
   ├── api-1 (Express) ─┐
   ├── api-2 (Express) ─┼── MySQL (contêiner Docker Compose)
   └── api-3 (Express) ─┘
```

Todos os serviços, inclusive o MySQL, rodam em contêineres do Docker Compose. As APIs acessam o banco pelo nome do serviço `mysql`, na rede interna `todo-network`.

## Banco de dados

O serviço MySQL usa a imagem `monalisaess/projeto-01-cloud-todo1-mysql:1.0`. Na primeira inicialização, o script da imagem cria o banco `todo_list`, o usuário `todo_user`, a tabela `tarefas` e tarefas iniciais.

Os dados ficam no volume Docker `mysql-data`, então continuam disponíveis após `docker compose down` e ao recriar os contêineres. Para remover também o banco e todos os dados, use `docker compose down -v`.

O MySQL do Compose publica a porta 3307 do computador para a porta 3306 do contêiner, evitando conflito com um MySQL Server instalado no Windows. As APIs usam exclusivamente o MySQL do contêiner. O Workbench pode se conectar ao banco do contêiner usando:

- Host: `127.0.0.1`
- Porta: `3307`
- Usuário: `todo_user`
- Senha padrão: `todo_local_todo`
- Database: `todo_list`

As senhas podem ser alteradas no arquivo `.env`. Para criá-lo a partir do exemplo no PowerShell:

```powershell
Copy-Item .env.example .env
```

## Como executar

Pré-requisito: Docker Desktop em execução.

```bash
docker compose up --build -d
```

Depois, abra [http://localhost:8080](http://localhost:8080).

Para ver o estado dos serviços:

```bash
docker compose ps
```

Para encerrar os contêineres mantendo os dados:

```bash
docker compose down
```

## Verificação

Com a aplicação ativa, consulte as tarefas pela API:

```bash
curl http://localhost:8080/api/tarefas
```

Cada API possui o endpoint interno `GET /health`, usado pelo healthcheck do Compose e que confirma também o acesso ao MySQL.
