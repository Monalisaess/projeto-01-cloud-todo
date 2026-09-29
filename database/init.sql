CREATE DATABASE IF NOT EXISTS todo_list
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'todo_user'@'%' IDENTIFIED BY 'todo_local_todo';
GRANT SELECT, INSERT, UPDATE, DELETE ON todo_list.* TO 'todo_user'@'%';

USE todo_list;

CREATE TABLE IF NOT EXISTS tarefas (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    texto VARCHAR(500) NOT NULL,
    concluida BOOLEAN NOT NULL DEFAULT FALSE,
    criada_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO tarefas (texto, concluida)
SELECT 'Configurar a API Node.js com Express', TRUE
WHERE NOT EXISTS (
    SELECT 1 FROM tarefas WHERE texto = 'Configurar a API Node.js com Express'
);

INSERT INTO tarefas (texto, concluida)
SELECT 'Testar a busca de dados no componente App.jsx', FALSE
WHERE NOT EXISTS (
    SELECT 1 FROM tarefas WHERE texto = 'Testar a busca de dados no componente App.jsx'
);

INSERT INTO tarefas (texto, concluida)
SELECT 'Começar a estilização dos componentes com Bootstrap', FALSE
WHERE NOT EXISTS (
    SELECT 1 FROM tarefas WHERE texto = 'Começar a estilização dos componentes com Bootstrap'
);
