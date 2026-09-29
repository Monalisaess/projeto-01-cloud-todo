const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;
const INSTANCE_NAME = process.env.INSTANCE_NAME || 'api';

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    database: process.env.DB_NAME || 'todo_list',
    user: process.env.DB_USER || 'todo_user',
    password: process.env.DB_PASSWORD || 'todo_local_todo',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

app.use(cors());
app.use(express.json());

function formatarTarefa(row) {
    return {
        id: Number(row.id),
        texto: row.texto,
        concluida: Boolean(row.concluida),
    };
}

app.get('/tarefas', async (req, res) => {
    const [rows] = await pool.execute(
        'SELECT id, texto, concluida FROM tarefas ORDER BY id'
    );
    return res.json(rows.map(formatarTarefa));
});

app.post('/tarefas', async (req, res) => {
    const texto = typeof req.body.texto === 'string' ? req.body.texto.trim() : '';

    if (!texto) {
        return res.status(400).json({ erro: 'O campo texto é obrigatório.' });
    }

    const [result] = await pool.execute(
        'INSERT INTO tarefas (texto, concluida) VALUES (?, FALSE)',
        [texto]
    );

    return res.status(201).json({
        id: Number(result.insertId),
        texto,
        concluida: false,
    });
});

app.patch('/tarefas/:id', async (req, res) => {
    const id = Number(req.params.id);
    const concluida = req.body.concluida;

    if (!Number.isSafeInteger(id) || id <= 0 || typeof concluida !== 'boolean') {
        return res.status(400).json({ erro: 'ID ou campo concluida inválido.' });
    }

    const [result] = await pool.execute(
        'UPDATE tarefas SET concluida = ? WHERE id = ?',
        [concluida, id]
    );

    if (result.affectedRows === 0) {
        return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }

    const [rows] = await pool.execute(
        'SELECT id, texto, concluida FROM tarefas WHERE id = ?',
        [id]
    );
    return res.json(formatarTarefa(rows[0]));
});

app.delete('/tarefas/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({ erro: 'ID inválido.' });
    }

    const [result] = await pool.execute('DELETE FROM tarefas WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
        return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }

    return res.status(204).send();
});

app.get('/', (req, res) => {
    res.json({ mensagem: 'API de Tarefas disponível', instancia: INSTANCE_NAME });
});

app.get('/health', async (req, res) => {
    await pool.query('SELECT 1');
    return res.status(200).json({ status: 'ok', instancia: INSTANCE_NAME });
});

app.use((error, req, res, next) => {
    console.error('Erro na API:', error);
    return res.status(500).json({ erro: 'Erro interno ao acessar as tarefas.' });
});

async function aguardarBancoDeDados() {
    const maxTentativas = 30;

    for (let tentativa = 1; tentativa <= maxTentativas; tentativa += 1) {
        try {
            await pool.query('SELECT 1 FROM tarefas LIMIT 1');
            console.log('Conexão com MySQL estabelecida.');
            return;
        } catch (error) {
            if (tentativa === maxTentativas) {
                throw error;
            }

            console.log(`Aguardando MySQL (${tentativa}/${maxTentativas})...`);
            await new Promise((resolve) => setTimeout(resolve, 2000));
        }
    }
}

async function iniciar() {
    await aguardarBancoDeDados();
    app.listen(PORT, () => {
        console.log(`Instância ${INSTANCE_NAME} rodando na porta ${PORT}`);
    });
}

iniciar().catch(async (error) => {
    console.error('Não foi possível iniciar a API:', error);
    await pool.end();
    process.exit(1);
});
