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
       MySQL Server
       (instalado no computador)
```

O frontend não conhece portas ou endereços das APIs. Ele chama `/api/tarefas`; o Nginx do frontend encaminha a chamada ao serviço `load-balancer`, que seleciona a réplica menos ocupada. As três APIs compartilham o mesmo MySQL instalado no computador. O MySQL não roda em contêiner; os demais serviços continuam no Docker Compose.

## Banco de dados

Instale e inicie o **MySQL Server** no computador. O MySQL Workbench sozinho é apenas uma interface e não substitui o servidor. No Workbench, conecte-se como administrador, abra `database/init.sql` e execute o script. Ele cria o banco `todo_list`, o usuário `todo_user`, a tabela `tarefas` e algumas tarefas iniciais.

O Docker acessa o servidor local pelo endereço `host.docker.internal`, na porta 3306. Se o MySQL rejeitar a conexão, configure o servidor para aceitar conexões TCP vindas dos contêineres e confira a regra do Firewall do Windows para a porta 3306. O script cria o usuário MySQL `todo_user` com a senha local `todo_local_todo`; altere essa senha no script e no `.env` se preferir outra.

Copie `.env.example` para `.env` na raiz do projeto para configurar os parâmetros da conexão. O arquivo `.env` é ignorado pelo Git.

No PowerShell, use:

```powershell
Copy-Item .env.example .env
```

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

As três réplicas compartilham os dados no MySQL da máquina. `docker compose down` não apaga o banco nem as tarefas; eles permanecem no servidor MySQL local.
