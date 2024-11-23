const { createServerConnection, executeQuery, readQuery } = require("../config/connection");

// Criação de bibliotecário
const createBibliotecario = async (data) => {
    const query = "INSERT INTO usuario (nome, email, senha, tipo_usuario) VALUES (?, ?, ?, ?)";
    const connection = createServerConnection();

    try {
        // Verificar se o e-mail já existe
        const existingBibliotecario = await getBibliotecarioByEmail(data.email);
        if (existingBibliotecario) {
            throw new Error("E-mail já cadastrado.");
        }

        // Cria usuario
        await executeQuery(connection, query, [data.nome, data.email, data.senha, data.tipo_usuario]);
        console.log("Bibliotecário criado com sucesso!");
    } catch (error) {
        console.error(`Erro ao inserir bibliotecário: ${error.message}`);
        throw error;
    } finally {
        connection.end();
    }
};

// Retornar todos os bibliotecários
const getBibliotecarios = async () => {
    const query = "SELECT * FROM usuario";
    const connection = createServerConnection();

    try {
        const resultado = await readQuery(connection, query);
        return resultado;
    } catch (error) {
        console.error(`Erro ao buscar bibliotecários: ${error.message}`);
        throw error;
    } finally {
        connection.end();
    }
};

// Buscar bibliotecário por email
const getBibliotecarioByEmail = async (email) => {
    const query = "SELECT * FROM usuario WHERE email = ?";
    const connection = createServerConnection();

    try {
        const resultado = await readQuery(query, [email]);
        return resultado.length > 0 ? resultado[0] : null;
    } catch (error) {
        console.error(`Erro ao buscar bibliotecário por email: ${error.message}`);
        throw error;
    } finally {
        connection.end();
    }
};

// Buscar login de bibliotecário
const getBibliotecarioLogin = async (email, senha) => {
    const query = "SELECT * FROM usuario WHERE email = ? AND tipo_usuario = 'bibliotecario'";
    const connection = createServerConnection();

    try {
        console.log("Conectando ao banco e executando a query...");
        const resultado = await readQuery(query, [email]);

        if (resultado.length > 0) {
            const bibliotecario = resultado[0];

            // Verifica se a senha corresponde diretamente
            if (senha === bibliotecario.senha) {
                console.log("Login bem-sucedido");
                return {
                    email: bibliotecario.email,
                    tipo: bibliotecario.tipo_usuario,
                    id: bibliotecario.id,
                    nome: bibliotecario.nome
                };
            } else {
                console.log("Senha incorreta");
                return null; // Retorna null se a senha estiver incorreta
            }
        } else {
            console.log("Bibliotecário não encontrado");
            return null; // Retorna null se não encontrar o bibliotecário
        }
    } catch (error) {
        console.error(`Erro ao realizar login: ${error.message}`);
        throw error;
    } finally {
        connection.end(); // Fecha a conexão com o banco de dados
    }
};


// Atualizar bibliotecário
const updateBibliotecario = async (id, data) => {
    const query = "UPDATE usuario SET nome = ?, email = ?" + (data.senha ? ", senha = ?" : "") + " WHERE id = ?";
    const connection = createServerConnection();

    try {
        // Verifica se o novo e-mail já existe (caso seja alterado)
        if (data.email) {
            const existingBibliotecario = await getBibliotecarioByEmail(data.email);
            if (existingBibliotecario && existingBibliotecario.id !== id) {
                throw new Error("E-mail já está em uso.");
            }
        }

        const params = [data.nome, data.email];
        if (data.senha) {
            params.push(data.senha);
        }
        params.push(id);
        await executeQuery(connection, query, params);
        console.log("Bibliotecário atualizado com sucesso!");
    } catch (error) {
        console.error(`Erro ao atualizar bibliotecário: ${error.message}`);
        throw error;
    } finally {
        connection.end();
    }
};

// Deletar bibliotecário
const deleteBibliotecario = async (id) => {
    const query = "DELETE FROM usuario WHERE id = ?";
    const connection = createServerConnection();

    try {
        await executeQuery(connection, query, [id]);
        console.log("Bibliotecário deletado com sucesso!");
    } catch (error) {
        console.error(`Erro ao deletar bibliotecário: ${error.message}`);
        throw error;
    } finally {
        connection.end();
    }
};

module.exports = {
    createBibliotecario,
    getBibliotecarios,
    getBibliotecarioByEmail,
    getBibliotecarioLogin,
    updateBibliotecario,
    deleteBibliotecario
};
