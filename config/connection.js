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
const executeQuery = async (query, params) => {
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
        connection.end();  // Fechar a conexão após a execução da query
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
