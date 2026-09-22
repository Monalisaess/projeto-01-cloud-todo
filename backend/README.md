# 🚀 To-Do List API (Node.js/Express)

Esta é a API de back-end desenvolvida em Node.js com Express para suportar o projeto de Lista de Tarefas (To-Do List) em React.

A API simula as operações de um banco de dados, utilizando um **array em memória** para armazenar as tarefas.

**⚠️ Aviso:** Como os dados estão em memória (armazenados em uma variável `let`), todas as tarefas adicionadas ou excluídas serão **perdidas** ao reiniciar o servidor.

## 🛠️ Tecnologias Utilizadas

* **Node.js:** Ambiente de execução JavaScript.
* **Express:** Framework web minimalista e flexível para Node.js.
* **CORS:** Middleware para habilitar a comunicação entre o front-end (Vite/React) e o back-end.

## ⚙️ Como Configurar e Rodar a API

Siga estes passos para configurar e iniciar o servidor da API.

### 1. Pré-requisitos

Certifique-se de ter o **Node.js** e o **npm** instalados.

### 2. Configuração do Projeto

1.  Navegue até o diretório `to-do-list-api` no seu terminal.
2.  Instale as dependências necessárias:

    ```bash
    npm install express cors
    ```

### 3. Executar o Servidor

Inicie a API usando o Node:

```bash
 npm start
```

O servidor estará rodando em: http://localhost:3000

📋 Endpoints da APIA API expõe quatro endpoints principais para gerenciar as tarefas. 

|Método HTTP | Endpoint |Descrição |Corpo da Requisição (Body) |Resposta de Sucesso |
|--- |--- |--- |--- |--- |
|GET |/tarefas |Retorna todas as tarefas (mockadas e adicionadas). |N/A |200 OK + Array de Tarefas|
|POST |/tarefas |Cria e adiciona uma nova tarefa à lista. |{ "texto": "Nova tarefa a fazer" } |201 Created + Objeto da Nova Tarefa|
|DELETE |/tarefas/:id |Remove uma tarefa específica pelo seu ID (_id). |N/A |204 No Content|

Exemplo de Resposta (GET /tarefas)
```JSon
[
    { 
        "_id": "660e57c6b9d3b10b42c4f8d1", 
        "texto": "Tarefa mockada 1", 
        "concluida": true 
    },
    { 
        "_id": "660e57c6b9d3b10b42c4f8d2", 
        "texto": "Tarefa mockada 2", 
        "concluida": false 
    }
]
```