const bcrypt = require('bcrypt');
const { createServerConnection, executeQuery, readQuery } = require("../config/connection");

// Criação de usuário
const createUsuario = async (data) => {
    const query = "INSERT INTO usuario (nome, email, senha, tipo_usuario) VALUES (?, ?, ?, ?)";
    const connection = createServerConnection();

    try {
        // Verificar se o e-mail já existe
        const existingUser = await getUsuarioByEmail(data.email);
        if (existingUser) {
            throw new Error("E-mail já cadastrado.");
        }

        const hashedPassword = await bcrypt.hash(data.senha, 10);  // Hash da senha
        await executeQuery(connection, query, [data.nome, data.email, hashedPassword, data.tipo_usuario]);
        console.log("Usuário criado com sucesso!");
    } catch (error) {
        console.error(`Erro ao inserir usuário: ${error.message}`);
        throw error;
    } finally {
        connection.end();
    }
};

// Retornar todos os usuários
const getUsuarios = async () => {
    const query = "SELECT * FROM usuario";
    const connection = createServerConnection();

    try {
        const resultado = await readQuery(connection, query);
        return resultado;
    } catch (error) {
        console.error(`Erro ao buscar usuários: ${error.message}`);
        throw error;
    } finally {
        connection.end();
    }
};

// Buscar usuário por email
const getUsuarioByEmail = async (email) => {
    const query = "SELECT * FROM usuario WHERE email = ?";
    const connection = createServerConnection();

    try {
        const resultado = await readQuery(query, [email]);
        return resultado.length > 0 ? resultado[0] : null;
    } catch (error) {
        console.error(`Erro ao buscar usuário por email: ${error.message}`);
        throw error;
    } finally {
        connection.end();
    }
};

// Buscar login de usuário
const getUsuarioLogin = async (email, senha) => {
    const query = "SELECT * FROM usuario WHERE email = ?";
    const connection = createServerConnection();

    try {
        const resultado = await readQuery(query, [email]);

        if (resultado.length > 0) {
            const usuario = resultado[0];
            const passwordMatch = await bcrypt.compare(senha, usuario.senha);
            if (passwordMatch) {
                return {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    tipo: usuario.tipo_usuario
                };
            } else {
                throw new Error("Senha incorreta");
            }
        } else {
            throw new Error("E-mail incorreto");
        }
    } catch (error) {
        console.error(`Erro ao realizar login: ${error.message}`);
        throw error;
    } finally {
        connection.end();
    }
};

// Atualizar usuário
const updateUsuario = async (id, data) => {
    const query = "UPDATE usuario SET nome = ?, email = ?" + (data.senha ? ", senha = ?" : "") + " WHERE id = ?";
    const connection = createServerConnection();

    try {
        // Verifica se o novo e-mail já existe (caso seja alterado)
        if (data.email) {
            const existingUser = await getUsuarioByEmail(data.email);
            if (existingUser && existingUser.id !== id) {
                throw new Error("E-mail já está em uso.");
            }
        }

        const params = [data.nome, data.email];
        if (data.senha) {
            const hashedPassword = await bcrypt.hash(data.senha, 10);
            params.push(hashedPassword);
        }
        params.push(id);
        await executeQuery(connection, query, params);
        console.log("Usuário atualizado com sucesso!");
    } catch (error) {
        console.error(`Erro ao atualizar usuário: ${error.message}`);
        throw error;
    } finally {
        connection.end();
    }
};

// Deletar usuário
const deleteUsuario = async (id) => {
    const query = "DELETE FROM usuario WHERE id = ?";
    const connection = createServerConnection();

    try {
        await executeQuery(connection, query, [id]);
        console.log("Usuário deletado com sucesso!");
    } catch (error) {
        console.error(`Erro ao deletar usuário: ${error.message}`);
        throw error;
    } finally {
        connection.end();
    }
};

module.exports = {
    createUsuario,
    getUsuarios,
    getUsuarioByEmail,
    getUsuarioLogin,
    updateUsuario,
    deleteUsuario
};
