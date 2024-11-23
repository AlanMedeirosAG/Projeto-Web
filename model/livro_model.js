const { createServerConnection, executeQuery, readQuery } = require("../config/connection");
const mysql = require('mysql2');

// Criação de livro
const createLivro = async (data) => {
    const query = "INSERT INTO livro (titulo, autor, genero, isbn, quantidade) VALUES (?, ?, ?, ?, ?)";
    const connection = createServerConnection();

    try {
        const existingLivro = await getLivroByTitulo(data.titulo, connection);
        if (existingLivro) {
            throw new Error("Livro já cadastrado.");
        }

        await executeQuery(query, [data.titulo, data.autor, data.genero, data.isbn, data.quantidade]);
        console.log("Livro criado com sucesso!");
    } catch (error) {
        console.error(`Erro ao inserir livro: ${error.message}`);
        throw error;
    } finally {
        connection.end();
    }
};


// Retornar todos os livros
const getLivros = async () => {
    const query = "SELECT * FROM livro";
    const connection = createServerConnection();

    try {
        const resultado = await readQuery(query);
        return resultado;
    } catch (error) {
        console.error(`Erro ao buscar livros: ${error.message}`);
        throw error;  // Lançar erro para ser tratado no controlador
    } finally {
        connection.end();
    }
};

// Buscar livro por título
const getLivroByTitulo = async (titulo,connection) => {
    const query = "SELECT * FROM livro WHERE titulo = ?";
    const [rows] = await connection.execute(query, [titulo]);
    return rows.length > 0 ? rows[0] : null;

    try {
        const resultado = await readQuery(query, [titulo]);
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
        await executeQuery(query, params);
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
        await executeQuery(query, [idlivro]);
        console.log("Livro deletado com sucesso!");
    } catch (error) {
        console.error(`Erro ao deletar livro: ${error.message}`);
        throw error;  // Lançar erro para ser tratado no controlador
    } finally {
        connection.end();
    }
};

// Função para obter um livro pelo ID
const getLivroByID = async (idlivro) => {
    console.log("ID recebido:", idlivro);

    try {
        const query = 'SELECT * FROM livro WHERE idlivro = ?';
        const result = await executeQuery(query, [idlivro]); // A resposta de executeQuery é um array

        if (!Array.isArray(result) || result.length === 0) {
            throw new Error('Livro não encontrado');
        }

        return result[0]; // Retorna o primeiro item do array, que é o livro
    } catch (error) {
        console.error("Erro ao buscar livro:", error.message);
        throw new Error(`Erro ao buscar livro: ${error.message}`);
    }
};

module.exports = {
    createLivro,
    getLivros,
    getLivroByTitulo,
    updateLivro,
    deleteLivro,
    getLivroByID
};

