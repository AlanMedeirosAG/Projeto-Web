const { createServerConnection, executeQuery, readQuery } = require("../config/connection");

// Criar registro no histórico
const createHistorico = async (data) => {
    const query = "INSERT INTO historico (livro, idusuario, data_emprestimo, data_devolucao, multa) VALUES (?, ?, ?, ?, ?)";
    const connection = createServerConnection();

    try {
        // Execute a query com todos os parâmetros necessários
        await executeQuery(query, [data.livro, data.idusuario, data.data_emprestimo, data.data_devolucao, data.multa || 0]);
        console.log("Registro no histórico criado com sucesso!");
    } catch (error) {
        console.error(`Erro ao criar registro no histórico: ${error.message}`);
        throw error;
    } finally {
        connection.end();
    }
};

// Retornar todos os registros do histórico
const getHistorico = async () => {
    const query = "SELECT * FROM historico";
    const connection = createServerConnection();

    try {
        const resultado = await readQuery(query);
        return resultado;
    } catch (error) {
        console.error(`Erro ao buscar registros do histórico: ${error.message}`);
        throw error;
    } finally {
        connection.end();
    }
};

// Buscar registro do histórico por ID
const getHistoricoById = async (historico_id) => {
    const query = "SELECT * FROM historico WHERE id = ?";
    const connection = createServerConnection();

    try {
        const resultado = await readQuery(query, [historico_id]);
        return resultado.length > 0 ? resultado[0] : null; // Retorna o registro ou null
    } catch (error) {
        console.error(`Erro ao buscar registro do histórico por ID: ${error.message}`);
        throw error;
    } finally {
        connection.end();
    }
};

// Atualizar registro no histórico
const updateHistorico = async (historico_id, data) => {
    const query = "UPDATE historico SET livro = ?, idusuario = ?, data_emprestimo = ?, data_devolucao = ?, multa = ? WHERE id = ?";
    const connection = createServerConnection();

    try {
        const params = [data.titulo_livro, data.idusuario, data.data_emprestimo, data.data_devolucao, data.multa || 0, historico_id];
        await executeQuery(connection, query, params);
        console.log("Registro no histórico atualizado com sucesso!");
    } catch (error) {
        console.error(`Erro ao atualizar registro no histórico: ${error.message}`);
        throw error;
    } finally {
        connection.end();
    }
};

// Deletar registro no histórico
const deleteHistorico = async (historico_id) => {
    const query = "DELETE FROM historico WHERE id = ?";
    const connection = createServerConnection();

    try {
        await executeQuery(connection, query, [historico_id]);
        console.log("Registro no histórico deletado com sucesso!");
    } catch (error) {
        console.error(`Erro ao deletar registro no histórico: ${error.message}`);
        throw error;
    } finally {
        connection.end();
    }
};

module.exports = {
    createHistorico,
    getHistorico,
    getHistoricoById,
    updateHistorico,
    deleteHistorico
};
