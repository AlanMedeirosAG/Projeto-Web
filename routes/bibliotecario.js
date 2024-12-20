const express = require('express');
const router = express.Router();
const {
    obterBibliotecarios,
    atualizarBibliotecario,
    deletarBibliotecario,
    loginBibliotecario,
    criarBibliotecario
} = require('../controller/bibliotecario_controller');

// Rota para criar um novo bibliotecário (POST /bibliotecario)
router.post('/bibliotecario', async (req, res) => {
    try {
        const data = req.body;

        // Validação dos dados
        if (!data || !data.nome || !data.email || !data.senha || !data.tipo_usuario) {
            return res.status(400).json({ message: "Campos 'nome', 'email', 'senha' e 'tipo_usuario' são obrigatórios." });
        }

        // Chama a função de criação do bibliotecário no banco de dados
        await criarBibliotecario(data);

        return res.status(201).json({ message: "Bibliotecário inserido com sucesso!" });
    } catch (error) {
        return res.status(500).json({ message: `Erro ao inserir bibliotecário: ${error.message}` });
    }
});

// Rota para login de bibliotecário (POST /loginbibliotecario)
router.post('/loginbibliotecario', async (req, res) => {
    try {
        console.log("Requisição recebida:", req.body);

        const { email, senha } = req.body;

        // Chama a função de login e aguarda os dados do bibliotecário
        const bibliotecario = await loginBibliotecario(email, senha);

        // Envia a resposta com os dados do bibliotecário
        return res.status(200).json({
            message: "Login bem-sucedido!",
            bibliotecario
        });
    } catch (error) {
        // Verifica o tipo de erro para retornar o status apropriado
        if (error.message === "E-mail e senha são obrigatórios!") {
            return res.status(400).json({ message: error.message });
        } else if (error.message === "E-mail ou senha incorretos!") {
            return res.status(401).json({ message: error.message });
        } else {
            return res.status(500).json({ message: `Erro ao realizar login: ${error.message}` });
        }
    }
});


// Rota para atualizar um bibliotecário (PUT /bibliotecario/:id)
router.put('/bibliotecario/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        await atualizarBibliotecario(id, data);

        return res.status(200).json({ message: "Bibliotecário atualizado com sucesso!" });
    } catch (error) {
        return res.status(500).json({ message: `Erro ao atualizar bibliotecário: ${error.message}` });
    }
});

// Rota para deletar um bibliotecário (DELETE /bibliotecario/:id)
router.delete('/bibliotecario/:id', async (req, res) => {
    try {
        const id = req.params.id;

        await deletarBibliotecario(id);

        return res.status(200).json({ message: "Bibliotecário deletado com sucesso!" });
    } catch (error) {
        return res.status(500).json({ message: `Erro ao deletar bibliotecário: ${error.message}` });
    }
});

module.exports = router;
