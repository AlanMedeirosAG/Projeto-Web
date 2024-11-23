const express = require('express');
const router = express.Router();
const {
    criarHistorico,
    listarHistorico,
    obterHistoricoPorId,
    atualizarHistorico,
    deletarHistorico
} = require('../controller/historico_controller');

// Rota para criar um novo registro no histórico (POST /historico)
router.post('/historico', async (req, res) => {
    try {
        const data = req.body;

        // Validação dos dados obrigatórios
        if (!data || !data.livro || !data.usuario || !data.data_emprestimo || !data.data_devolucao) {
            return res.status(400).json({ message: "Campos 'livro', 'usuario', 'data_emprestimo' e 'data_devolucao' são obrigatórios." });
        }

        // Chama a função para criar um novo registro no histórico
        await criarHistorico(data);

        return res.status(201).json({ message: "Histórico criado com sucesso!" });
    } catch (error) {
        return res.status(500).json({ message: `Erro ao criar histórico: ${error.message}` });
    }
});

// Rota para listar todos os registros do histórico (GET /historico)
router.get('/', async (req, res) => {
    try {
        const historico = await listarHistorico();
        return res.status(200).json(historico);
    } catch (error) {
        return res.status(500).json({ message: `Erro ao listar históricos: ${error.message}` });
    }
});

// Rota para obter um registro específico pelo ID (GET /historico/:id)
router.get('/historico/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const historico = await obterHistoricoPorId(id);

        if (!historico) {
            return res.status(404).json({ message: "Histórico não encontrado." });
        }

        return res.status(200).json(historico);
    } catch (error) {
        return res.status(500).json({ message: `Erro ao obter histórico: ${error.message}` });
    }
});

// Rota para atualizar um registro no histórico pelo ID (PUT /historico/:id)
router.put('/historico/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        await atualizarHistorico(id, data);

        return res.status(200).json({ message: "Histórico atualizado com sucesso!" });
    } catch (error) {
        return res.status(500).json({ message: `Erro ao atualizar histórico: ${error.message}` });
    }
});

// Rota para deletar um registro do histórico pelo ID (DELETE /historico/:id)
router.delete('/historico/:id', async (req, res) => {
    try {
        const id = req.params.id;

        await deletarHistorico(id);

        return res.status(200).json({ message: "Histórico deletado com sucesso!" });
    } catch (error) {
        return res.status(500).json({ message: `Erro ao deletar histórico: ${error.message}` });
    }
});

module.exports = router;
