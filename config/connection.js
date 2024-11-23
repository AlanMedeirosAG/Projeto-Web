const mysql = require('mysql2');

// Configuração da conexão com o banco de dados
const createServerConnection = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '16012023MA',
        database: 'bdgerencia',
        port: 3306
    });
};

// Função para executar queries de INSERT, UPDATE, DELETE
const executeQuery = async (query, params = []) => {
    const connection = await createServerConnection(); // Cria a conexão com o banco de dados
    try {
        console.log("Conexão estabelecida com o banco de dados.");
        console.log("Executando query:", query, "com parâmetros:", params);

        const [rows, fields] = await connection.execute(query, params); // Desestrutura a resposta corretamente
        console.log("Linhas retornadas:", rows);
        console.log("Tipo de 'rows':", typeof rows);

        if (!Array.isArray(rows)) { // Verifica se 'rows' é um array
            throw new Error('Resultado esperado como array, mas não foi iterável');
        }

        if (rows.length === 0) {
            console.log("Nenhum livro encontrado.");
            return []; // Retorna um array vazio se não encontrar livros
        }

        return rows; // Retorna o array de resultados
    } catch (error) {
        console.error("Erro ao executar a consulta:", error.message);
        throw error;  // Lança o erro para ser tratado pelo controlador
    } finally {
        connection.end();  // Fecha a conexão
    }
};

// Função para executar consultas (SELECT)
const readQuery = async (query, params = []) => {
    const connection = createServerConnection();
    try {
        return await new Promise((resolve, reject) => {
            connection.execute(query, params, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    } finally {
        connection.end();  // Fechar a conexão após a consulta
    }
};

// Exportar as funções
module.exports = {
    createServerConnection,
    executeQuery,
    readQuery,
};