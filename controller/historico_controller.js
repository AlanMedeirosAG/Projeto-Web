const {
    createHistorico,
    getHistorico,
    getHistoricoById,
    updateHistorico,
    deleteHistorico
} = require("../model/historico_model");

// Criar um novo registro no histórico
const criarHistorico = async (req, res) => {
    const data = req.body;

    try {
        await createHistorico(data);
        res.status(201).json({ message: "Registro no histórico criado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: `Erro ao criar registro no histórico: ${error.message}` });
    }
};

// Obter todos os registros do histórico
const listarHistorico = async (req, res) => {
    try {
        const historico = await getHistorico();
        res.status(200).json(historico);
    } catch (error) {
        res.status(500).json({ message: `Erro ao listar registros do histórico: ${error.message}` });
    }
};

// Obter um registro do histórico pelo ID
const obterHistoricoPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const historico = await getHistoricoById(id);
        if (!historico) {
            return res.status(404).json({ message: "Registro do histórico não encontrado." });
        }
        res.status(200).json(historico);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar registro no histórico: ${error.message}` });
    }
};

// Atualizar um registro no histórico
const atualizarHistorico = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        await updateHistorico(id, data);
        res.status(200).json({ message: "Registro no histórico atualizado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: `Erro ao atualizar registro no histórico: ${error.message}` });
    }
};

// Deletar um registro no histórico
const deletarHistorico = async (req, res) => {
    const { id } = req.params;

    try {
        await deleteHistorico(id);
        res.status(200).json({ message: "Registro no histórico deletado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: `Erro ao deletar registro no histórico: ${error.message}` });
    }
};

module.exports = {
    criarHistorico,
    listarHistorico,
    obterHistoricoPorId,
    atualizarHistorico,
    deletarHistorico
};
