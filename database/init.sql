USE todo_list;

CREATE TABLE IF NOT EXISTS tarefas (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    texto VARCHAR(500) NOT NULL,
    concluida BOOLEAN NOT NULL DEFAULT FALSE,
    criada_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO tarefas (texto, concluida)
VALUES
    ('Configurar a API Node.js com Express', TRUE),
    ('Testar a busca de dados no componente App.jsx', FALSE),
    ('Começar a estilização dos componentes com Bootstrap', FALSE);
