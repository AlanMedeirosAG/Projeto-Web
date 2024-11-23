const {
    createBibliotecario,
    getBibliotecarios,
    getBibliotecarioByEmail,
    getBibliotecarioLogin,
    updateBibliotecario,
    deleteBibliotecario
} = require('../model/bibliotecario_model');

// Criar bibliotecário
const criarBibliotecario = async (req, res) => {
    try {
        const { nome, email, senha, tipo_usuario } = req.body;

        // Validação dos dados de entrada
        if (!nome || !email || !senha || !tipo_usuario) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
        }

        const data = { nome, email, senha, tipo_usuario };
        await createBibliotecario(data);

        return res.status(201).json({ message: "Bibliotecário criado com sucesso!" });
    } catch (error) {
        console.error(`Erro ao criar bibliotecário: ${error.message}`);
        return res.status(500).json({ message: `Erro ao criar bibliotecário: ${error.message}` });
    }
};

// Obter todos os bibliotecários
const obterBibliotecarios = async (req, res) => {
    try {
        const bibliotecarios = await getBibliotecarios();
        return res.status(200).json(bibliotecarios);
    } catch (error) {
        console.error(`Erro ao obter bibliotecários: ${error.message}`);
        return res.status(500).json({ message: `Erro ao obter bibliotecários: ${error.message}` });
    }
};

// Obter bibliotecário por e-mail
const obterBibliotecarioPorEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const bibliotecario = await getBibliotecarioByEmail(email);
        if (!bibliotecario) {
            return res.status(404).json({ message: "Bibliotecário não encontrado!" });
        }
        return res.status(200).json(bibliotecario);
    } catch (error) {
        console.error(`Erro ao buscar bibliotecário por e-mail: ${error.message}`);
        return res.status(500).json({ message: `Erro ao buscar bibliotecário por e-mail: ${error.message}` });
    }
};

// Realizar login de bibliotecário
const loginBibliotecario = async (email, senha) => {
    try {
        // Verifica se ambos os campos (email e senha) foram fornecidos
        if (!email || !senha) {
            throw new Error("E-mail e senha são obrigatórios!");
        }

        console.log("Tentando buscar o bibliotecário...");
        const bibliotecario = await getBibliotecarioLogin(email, senha);

        // Se o login falhou (senha ou e-mail incorretos)
        if (!bibliotecario) {
            throw new Error("E-mail ou senha incorretos!");
        }

        // Retorna os dados do bibliotecário se o login for bem-sucedido
        console.log("Login bem-sucedido. Dados do bibliotecário:", bibliotecario);
        return {
            id: bibliotecario.id,
            nome: bibliotecario.nome,
            email: bibliotecario.email,
            tipo: bibliotecario.tipo
        };
    } catch (error) {
        console.error(`Erro ao realizar login: ${error.message}`);
        throw error; // Lança o erro para ser tratado pela rota chamadora
    }
};


// Atualizar bibliotecário
const atualizarBibliotecario = async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    try {
        const data = { nome, email, senha };
        await updateBibliotecario(id, data);

        return res.status(200).json({ message: "Bibliotecário atualizado com sucesso!" });
    } catch (error) {
        console.error(`Erro ao atualizar bibliotecário: ${error.message}`);
        return res.status(500).json({ message: `Erro ao atualizar bibliotecário: ${error.message}` });
    }
};

// Deletar bibliotecário
const deletarBibliotecario = async (req, res) => {
    const { id } = req.params;

    try {
        await deleteBibliotecario(id);
        return res.status(200).json({ message: "Bibliotecário deletado com sucesso!" });
    } catch (error) {
        console.error(`Erro ao deletar bibliotecário: ${error.message}`);
        return res.status(500).json({ message: `Erro ao deletar bibliotecário: ${error.message}` });
    }
};

module.exports = {
    criarBibliotecario,
    obterBibliotecarios,
    obterBibliotecarioPorEmail,
    loginBibliotecario,
    atualizarBibliotecario,
    deletarBibliotecario
};
