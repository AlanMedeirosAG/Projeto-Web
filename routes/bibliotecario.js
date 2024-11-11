const express = require('express');
const router = express.Router();
const { createBibliotecario, getBibliotecarios, updateBibliotecario, deleteBibliotecario, getBibliotecarioLogin } = require('../controller/bibliotecario_controller');

// Rota para criar um novo bibliotecário (POST /bibliotecario)
router.post('/bibliotecario', async (req, res) => {
    try {
        const data = req.body;

        // Validação dos dados
        if (!data || !data.nome || !data.email || !data.senha || !data.tipo_usuario) {
            return res.status(400).json({ message: "Campos 'nome', 'email', 'senha' e 'tipo_usuario' são obrigatórios." });
        }

        // Chama a função de criação do bibliotecário no banco de dados
        await createBibliotecario(data);

        return res.status(201).json({ message: "Bibliotecário inserido com sucesso!" });
    } catch (error) {
        return res.status(500).json({ message: `Erro ao inserir bibliotecário: ${error.message}` });
    }
});

// Rota para obter todos os bibliotecários (GET /bibliotecario)
router.get('/bibliotecario', async (req, res) => {
    try {
        const bibliotecarios = await getBibliotecarios();
        return res.status(200).json(bibliotecarios);
    } catch (error) {
        return res.status(500).json({ message: `Erro ao obter bibliotecários: ${error.message}` });
    }
});

// Rota para login de bibliotecário (POST /login)
router.post('/loginbibliotecario', async (req, res) => {
    try {
        const { email, senha } = req.body;

        const bibliotecario = await getBibliotecarioLogin(email, senha);

        if (bibliotecario) {
            return res.status(200).json({
                message: "Login bem-sucedido!",
                bibliotecario: {
                    email: bibliotecario.email,
                    tipo: bibliotecario.tipo
                }
            });
        } else {
            return res.status(401).json({ message: "E-mail ou senha incorretos!" });
        }
    } catch (error) {
        return res.status(500).json({ message: `Erro no login: ${error.message}` });
    }
});

// Rota para atualizar um bibliotecário (PUT /bibliotecario/:id)
router.put('/bibliotecario/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        await updateBibliotecario(id, data);

        return res.status(200).json({ message: "Bibliotecário atualizado com sucesso!" });
    } catch (error) {
        return res.status(500).json({ message: `Erro ao atualizar bibliotecário: ${error.message}` });
    }
});

// Rota para deletar um bibliotecário (DELETE /bibliotecario/:id)
router.delete('/bibliotecario/:id', async (req, res) => {
    try {
        const id = req.params.id;

        await deleteBibliotecario(id);

        return res.status(200).json({ message: "Bibliotecário deletado com sucesso!" });
    } catch (error) {
        return res.status(500).json({ message: `Erro ao deletar bibliotecário: ${error.message}` });
    }
});

module.exports = router;
