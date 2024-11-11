const livroModel = require('../models/livro_model');

// Lógica para criação de livro
const createLivro = async (req, res) => {
    const data = req.body;
    try {
        await livroModel.createLivro(data);
        res.status(201).json({ message: "Livro criado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: `Erro ao inserir livro: ${error.message}` });
    }
};

// Lógica para obter todos os livros
const getLivros = async (req, res) => {
    try {
        const livros = await livroModel.getLivros(); // Corrigido para obter livros
        res.status(200).json(livros);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar livros: ${error.message}` });
    }
};

// Lógica para atualizar um livro
const updateLivro = async (req, res) => {
    const idlivro = req.params.idlivro; // Obter ID do livro a ser atualizado
    const data = req.body; // Obter dados do corpo da requisição
    try {
        await livroModel.updateLivro(idlivro, data); // Passar id e dados para o model
        res.status(200).json({ message: "Livro atualizado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: `Erro ao atualizar livro: ${error.message}` });
    }
};

// Lógica para deletar um livro
const deleteLivro = async (req, res) => {
    const idlivro = req.params.idlivro; // Obter ID do livro a ser deletado
    try {
        await livroModel.deleteLivro(idlivro); // Corrigido para chamar a função delete
        res.status(200).json({ message: "Livro deletado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: `Erro ao deletar livro: ${error.message}` });
    }
};

module.exports = {
    createLivro,
    getLivros,
    updateLivro,
    deleteLivro,
};
