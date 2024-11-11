const express = require('express');
const router = express.Router();
const { createLivro, getLivros, getLivroByID, deleteLivro, updateLivro } = require('../model/livro_model');

// Rota para criar um novo livro (POST /livro)
router.post('/livro', async (req, res) => {
    try {
        const data = req.body;

        // Validação dos dados do livro
        if (!data || !data.titulo || !data.autor || !data.ano_publicacao || !data.genero || !data.isbn || !data.quantidade) {
            return res.status(400).json({ message: "Campos 'titulo', 'autor', 'ano_publicacao', 'genero', 'isbn' e 'quantidade' são obrigatórios." });
        }

        // Chama a função de criação do livro no banco de dados
        await createLivro(data);

        return res.status(201).json({ message: "Livro criado com sucesso!" });
    } catch (error) {
        return res.status(500).json({ message: `Erro ao criar livro: ${error.message}` });
    }
});

// Rota para obter todos os livros (GET /livro)
router.get('/livro', async (req, res) => {
    try {
        const livros = await getLivros();
        return res.status(200).json(livros);
    } catch (error) {
        return res.status(500).json({ message: `Erro ao obter livros: ${error.message}` });
    }
});

// Rota para obter um livro por ID (GET /livro/:idlivro)
router.get('/livro/:idlivro', async (req, res) => {
    try {
        const idlivro = req.params.idlivro;

        const livro = await getLivroByID(idlivro);
        if (!livro) {
            return res.status(404).json({ message: "Livro não encontrado." });
        }

        return res.status(200).json(livro);
    } catch (error) {
        return res.status(500).json({ message: `Erro ao obter livro: ${error.message}` });
    }
});

// Rota para atualizar um livro (PUT /livro/:idlivro)
router.put('/livro/:idlivro', async (req, res) => {
    try {
        const idlivro = req.params.idlivro;
        const data = req.body;

        // Validação dos dados do livro
        if (!data || !data.titulo || !data.autor || !data.ano_publicacao || !data.genero || !data.isbn || !data.quantidade) {
            return res.status(400).json({ message: "Campos 'titulo', 'autor', 'ano_publicacao', 'genero', 'isbn' e 'quantidade' são obrigatórios." });
        }

        await updateLivro(idlivro, data);

        return res.status(200).json({ message: "Livro atualizado com sucesso!" });
    } catch (error) {
        return res.status(500).json({ message: `Erro ao atualizar livro: ${error.message}` });
    }
});

// Rota para deletar um livro (DELETE /livro/:idlivro)
router.delete('/livro/:idlivro', async (req, res) => {
    try {
        const idlivro = req.params.idlivro;

        await deleteLivro(idlivro);

        return res.status(200).json({ message: "Livro deletado com sucesso!" });
    } catch (error) {
        return res.status(500).json({ message: `Erro ao deletar livro: ${error.message}` });
    }
});

module.exports = router;

