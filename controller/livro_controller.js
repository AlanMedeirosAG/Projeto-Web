const livroModel = require('../model/livro_model');

const createLivro = async (req, res) => {
    const { titulo, autor, genero, isbn, quantidade } = req.body;

    // Validação dos campos obrigatórios
    if (!titulo || !autor || !genero || !isbn || !quantidade) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios: titulo, autor, genero, isbn e quantidade." });
    }

    try {
        // Chamar a lógica do modelo
        await livroModel.createLivro(req.body);
        return res.status(201).json({ message: "Livro criado com sucesso!" });
    } catch (error) {
        console.error(`Erro no controlador: ${error.message}`); // Logar o erro
        return res.status(500).json({ message: `Erro ao inserir livro: ${error.message}` });
    }
};


// Lógica para obter todos os livros
const getLivros = async () => {
    try {
        const livros = await livroModel.getLivros();
        return livros;
    } catch (error) {
        console.error("Erro ao obter livros:", error);
        throw new Error("Erro ao obter livros");
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
const deleteLivro = async (idlivro) => {
    console.log("Parametros recebidos em controller",req.params.idlivro)
    const livros = req.params.idlivro; // Obter ID do livro a ser deletado
    try {
        await livroModel.deleteLivro(livros); // Corrigido para chamar a função delete
            res.status(200).json({ message: "Livro deletado com sucesso!" });
    } catch (error) {
            res.status(500).json({ message: `Erro ao deletar livro: ${error.message}` });
    }
};

// Lógica para obter um livro por ID
const getLivroByID = async (idlivro) => {
    console.log("Requisição recebida para obter livro pelo ID:", idlivro);
    try {
        const livro = await livroModel.getLivroByID(idlivro);

        if (!livro) {
            console.log("Livro não encontrado.");
            return { status: 404, message: "Livro não encontrado." }; // Retorna resposta adequada
        }

        return { status: 200, livro }; // Retorna o livro encontrado
    } catch (error) {
        console.error("Erro ao obter livro no controlador:", error);
        return { status: 500, message: "Erro ao buscar livro." }; // Retorna erro caso ocorra
    }
};
module.exports = {
    createLivro,
    getLivros,
    updateLivro,
    deleteLivro,
    getLivroByID
};
