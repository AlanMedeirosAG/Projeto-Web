const express = require('express');
const router = express.Router();
const { createLivro, getLivros, getLivroByID, deleteLivro, updateLivro } = require('../controller/livro_controller');

// Rota para criar um novo livro (POST /livro)
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        console.log("Dados recebidos no backend:", data);

        if (!data || !data.titulo || !data.autor || !data.genero || !data.isbn || !data.quantidade) {
            console.error("Validação falhou: Campos obrigatórios ausentes.");
            return res.status(400).json({ message: "Campos 'titulo', 'autor', 'genero', 'isbn' e 'quantidade' são obrigatórios." });
        }

        await createLivro(data);
        console.log("Livro criado com sucesso.");
        return res.status(201).json({ message: "Livro criado com sucesso!" });
    } catch (error) {
        console.error(`Erro no backend ao criar livro: ${error.message}`);
        return res.status(500).json({ message: `Erro ao criar livro: ${error.message}` });
    }
});

// Rota para obter todos os livros (GET /livro)
router.get('/', async (req, res) => {
    try {
        console.log("Requisição recebida para obter livros");

        const livros = await getLivros(); // Modificado para não passar `req` e `res` aqui

        console.log("Livros encontrados:", livros);

        // Só envia a resposta uma vez, após obter os livros
        return res.status(200).json(livros);
    } catch (error) {
        console.error("Erro ao obter livros:", error);
        return res.status(500).json({ message: `Erro ao obter livros: ${error.message}` });
    }
});

// Rota para obter um livro por ID (GET /livro/:idlivro)
router.get('/:idlivro', async (req, res) => {
    try {
        const idlivro = req.params.idlivro;

        const livro = await getLivroByID(idlivro);
        if (!livro) {
            return res.status(404).json({ message: "Livro não encontrado pelo id" });
        }

        return res.status(200).json(livro);
    } catch (error) {
        return res.status(500).json({ message: `Erro ao obter livro: ${error.message}` });
    }
});

// Rota para atualizar um livro (PUT /livro/:idlivro)
router.put('/:idlivro', async (req, res) => {
    try {
        const idlivro = req.params.idlivro;
        const data = req.body;

        const livroExistente = await getLivroByID(idlivro);
        if (!livroExistente) {
            return res.status(404).json({ message: "Livro não encontrado." });
        }

        if (!data || !data.titulo || !data.autor || !data.genero || !data.isbn || !data.quantidade) {
            return res.status(400).json({ message:"Validação falhou: Campos obrigatórios ausentes." });
        }

        await updateLivro(idlivro, data);

        return res.status(200).json({ message: "Livro atualizado com sucesso." });
    } catch (error) {
        return res.status(500).json({ message: "Erro em atualizar o livro" + error.message });
    }
});

// Rota para deletar um livro (DELETE /livro/:idlivro)
router.delete('/livro/:idlivro', async (req, res) => {
    let idlivro = req.params.idlivro;  // Pegando o ID do livro na URL
    console.log(idlivro);

    // Convertendo para número
    idlivro = parseInt(idlivro, 10);

    console.log(idlivro);

    if (isNaN(idlivro)) {
        return res.status(400).json({ message: "ID inválido." });
    }

    // Chama a função getLivroByID
    const result = await getLivroByID(idlivro);

    // Verifica se houve erro ao encontrar o livro
    if (!result) {
        return res.status(404).json({ message: result.message });
    }

    // Caso o livro tenha sido encontrado, deleta
    try {
        await deleteLivro(idlivro);
        return res.status(200).json({ message: "Livro deletado com sucesso." });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao deletar livro: " + error.message });
    }
});

module.exports = router;

