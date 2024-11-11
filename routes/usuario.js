const express = require('express');
const router = express.Router();
const { createUsuario, getUsuarios, updateUsuario, deleteUsuario, getUsuarioLogin } = require('../controller/usuario_controller');

// Rota para criar um novo usuário (POST /usuario)
router.post('/usuario', async (req, res) => {
    try {
        const data = req.body;

        // Validação dos dados
        if (!data || !data.nome || !data.email || !data.senha || !data.tipo_usuario) {
            return res.status(400).json({ message: "Campos 'nome', 'email', 'senha' e 'tipo_usuario' são obrigatórios." });
        }

        // Chama a função de criação do usuário no banco de dados
        await createUsuario(data);

        return res.status(201).json({ message: "Usuário inserido com sucesso!" });
    } catch (error) {
        return res.status(500).json({ message: `Erro ao inserir usuário: ${error.message}` });
    }
});

// Rota para obter todos os usuários (GET /usuario)
router.get('/usuario', async (req, res) => {
    try {
        const usuarios = await getUsuarios();
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ message: `Erro ao obter usuários: ${error.message}` });
    }
});

// Rota para login de usuário (POST /login)
router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await getUsuarioLogin(email, senha);

        if (usuario) {
            return res.status(200).json({
                message: "Login bem-sucedido!",
                usuario: {
                    email: usuario.email,
                    tipo: usuario.tipo
                }
            });
        } else {
            return res.status(401).json({ message: "E-mail ou senha incorretos!" });
        }
    } catch (error) {
        return res.status(500).json({ message: `Erro no login: ${error.message}` });
    }
});

// Rota para atualizar um usuário (PUT /usuario/:id)
router.put('/usuario/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        await updateUsuario(id, data);

        return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    } catch (error) {
        return res.status(500).json({ message: `Erro ao atualizar usuário: ${error.message}` });
    }
});

// Rota para deletar um usuário (DELETE /usuario/:id)
router.delete('/usuario/:id', async (req, res) => {
    try {
        const id = req.params.id;

        await deleteUsuario(id);

        return res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } catch (error) {
        return res.status(500).json({ message: `Erro ao deletar usuário: ${error.message}` });
    }
});

module.exports = router;
