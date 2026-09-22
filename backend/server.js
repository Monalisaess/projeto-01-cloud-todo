const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const INSTANCE_NAME = process.env.INSTANCE_NAME || 'api';

// Middleware CORS
// ESSENCIAL para permitir que seu front-end (rodando em http://localhost:5173) 
// se comunique com esta API (rodando em http://localhost:3000).
app.use(cors()); 

// Middleware para processar JSON nas requisições POST/PUT
app.use(express.json());

// ===============================================
// DADOS MOCKADOS
// IMPORTANTE: O front-end React espera a propriedade 'id'
// Para simular o MongoDB, estamos usando '_id' aqui para nos prepararmos 
// para o próximo passo (embora 'id' também funcionasse por enquanto).
// ===============================================
let mockTarefas = [
    { 
        id: 1361434473096, 
        texto: 'Configurar a API Node.js com Express', 
        concluida: true 
    },
    { 
        id: 1461434473096, 
        texto: 'Testar a busca de dados no componente App.jsx', 
        concluida: false 
    },
    { 
        id: 1561434473096, 
        texto: 'Começar a estilização dos componentes com Bootstrap', 
        concluida: false 
    },
];

// ===============================================
// ROTA 1: GET /tarefas (BUSCAR TODAS)
// ===============================================
app.get('/tarefas', (req, res) => {
    console.log('Requisição GET recebida em /tarefas');
    
    // Simplesmente retorna o array mockado
    return res.json(mockTarefas);
});

// ===============================================
// ROTA 2: POST /tarefas (CRIAR NOVA TAREFA) - NOVO
// ===============================================
app.post('/tarefas', (req, res) => {
    // Pega o 'texto' do corpo da requisição JSON enviado pelo Front-end
    const { texto } = req.body;

    if (!texto) {
        return res.status(400).json({ erro: 'O campo texto é obrigatório.' });
    }

    const novaTarefa = {
        // Gera um ID único simulando o comportamento do MongoDB
        id: Date.now(), 
        texto,
        concluida: false
    };

    // Adiciona a nova tarefa ao array (em memória)
    mockTarefas.push(novaTarefa);

    // Retorna a tarefa criada (o Front-end precisa do _id gerado)
    return res.status(201).json(novaTarefa);
});

// ===============================================
// ROTA 3: DELETE /tarefas/:id (EXCLUIR TAREFA) - NOVO
// ===============================================
app.delete('/tarefas/:id', (req, res) => {
    // Pega o ID da URL (ex: /tarefas/12345)
    const { id } = req.params;

    // Filtra a lista, removendo a tarefa com o ID correspondente
    const tamanhoOriginal = mockTarefas.length;
    mockTarefas = mockTarefas.filter(t => t.id.toString() !== id.toString());
    
    // Verifica se alguma tarefa foi removida
    if (mockTarefas.length === tamanhoOriginal) {
        return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }

    // Retorna um status 204 (No Content) indicando sucesso sem corpo de resposta
    return res.status(204).send();
});

// Rota simples de teste (opcional)
app.get('/', (req, res) => {
    res.json({ mensagem: 'API de Tarefas disponível', instancia: INSTANCE_NAME });
});

// Usada pelo Docker Compose para confirmar que cada réplica está pronta.
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', instancia: INSTANCE_NAME });
});


// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Instância ${INSTANCE_NAME} rodando na porta ${PORT}`);
    console.log('Pronto para atender requisições do seu Front-End React.');
});
