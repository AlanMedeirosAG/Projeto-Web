const usuarioModel = require('../model/usuario_model');

// Lógica para criação de usuário
const createUsuario = async (req, res) => {
    const data = req.body;
    try {
        await usuarioModel.createUsuario(data);
        res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: `Erro ao inserir usuário: ${error.message}` });
    }
};

// Lógica para obter todos os usuários
const getUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel.getUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar usuários: ${error.message}` });
    }
};

// Lógica para atualizar um usuário
const updateUsuario = async (req, res) => {
    const id = req.params.id; // Obter ID do usuário a ser atualizado
    const data = req.body; // Obter dados do corpo da requisição
    try {
        await usuarioModel.updateUsuario(id, data); // Passar id e dados para o model
        res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: `Erro ao atualizar usuário: ${error.message}` });
    }
};

// Lógica para deletar um usuário
const deleteUsuario = async (req, res) => {
    const id = req.params.id; // Obter ID do usuário a ser deletado
    try {
        await usuarioModel.deleteUsuario(id); // Passar id para o model
        res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: `Erro ao deletar usuário: ${error.message}` });
    }
};

// Lógica para login de usuário
const getUsuarioLogin = async (req, res) => {
    const { email, senha } = req.body; // Obter e-mail e senha do corpo da requisição
    try {
        const usuario = await usuarioModel.getUsuarioLogin(email, senha); // Passar e-mail e senha para o model
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(401).json({ message: "E-mail ou senha incorretos!" });
        }
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar usuário: ${error.message}` });
    }
};

module.exports = {
    createUsuario,
    getUsuarios,
    getUsuarioLogin,
    updateUsuario,
    deleteUsuario
};
