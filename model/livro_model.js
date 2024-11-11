const { createServerConnection, executeQuery, readQuery } = require("../config/connection");

// Criação de livro
const createLivro = async (data) => {
    const query = "INSERT INTO livro (titulo, autor, ano_publicacao, genero, isbn, quantidade) VALUES (?, ?, ?, ?, ?, ?)";
    const connection = createServerConnection();

    try {
        // Verificar se o livro já existe pelo título
        const existingLivro = await getLivroByTitulo(data.titulo);
        if (existingLivro) {
            throw new Error("Livro já cadastrado.");
        }

        // Execute a query com todos os parâmetros necessários
        await executeQuery(connection, query, [data.titulo, data.autor, data.ano_publicacao, data.genero, data.isbn, data.quantidade]);
        console.log("Livro criado com sucesso!");
    } catch (error) {
        console.error(`Erro ao inserir livro: ${error.message}`);
        throw error;  // Lançar erro para ser tratado no controlador
    } finally {
        connection.end();  // Fechar a conexão
    }
};

// Retornar todos os livros
const getLivros = async () => {
    const query = "SELECT * FROM livro";
    const connection = createServerConnection();

    try {
        const resultado = await readQuery(connection, query);
        return resultado;
    } catch (error) {
        console.error(`Erro ao buscar livros: ${error.message}`);
        throw error;  // Lançar erro para ser tratado no controlador
    } finally {
        connection.end();
    }
};

// Buscar livro por título
const getLivroByTitulo = async (titulo) => {
    const query = "SELECT * FROM livro WHERE titulo = ?";
    const connection = createServerConnection();

    try {
        const resultado = await readQuery(connection, query, [titulo]);
        return resultado.length > 0 ? resultado[0] : null; // Retorna o livro ou null
    } catch (error) {
        console.error(`Erro ao buscar livro por título: ${error.message}`);
        throw error;
    } finally {
        connection.end();
    }
};

// Atualizar livro
const updateLivro = async (idlivro, data) => {
    const query = "UPDATE livro SET titulo = ?, autor = ?, ano_publicacao = ?, genero = ?, quantidade = ? WHERE idlivro = ?";
    const connection = createServerConnection();

    try {
        // Corrigir a ordem dos parâmetros
        const params = [data.titulo, data.autor, data.ano_publicacao, data.genero, data.quantidade, idlivro];
        await executeQuery(connection, query, params);
        console.log("Livro atualizado com sucesso!");
    } catch (error) {
        console.error(`Erro ao atualizar livro: ${error.message}`);
        throw error;  // Lançar erro para ser tratado no controlador
    } finally {
        connection.end();
    }
};

// Deletar livro
const deleteLivro = async (idlivro) => {
    const query = "DELETE FROM livro WHERE idlivro = ?";
    const connection = createServerConnection();

    try {
        await executeQuery(connection, query, [idlivro]);
        console.log("Livro deletado com sucesso!");
    } catch (error) {
        console.error(`Erro ao deletar livro: ${error.message}`);
        throw error;  // Lançar erro para ser tratado no controlador
    } finally {
        connection.end();
    }
};

module.exports = {
    createLivro,
    getLivros,
    getLivroByTitulo,
    updateLivro,
    deleteLivro
};

