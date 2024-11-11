const express = require("express");
const app = express();
const cors = require("cors");
const usuarioRouter = require("./routes/usuario");  // Caminho relativo para o diretório de rotas
const livroRouter = require("./routes/livro");
const { createServerConnection } = require("./config/connection");  // Certifique-se que está exportando a função corretamente

// Middleware para parsing de JSON
app.use(express.json());
// Habilita CORS para todas as origens
app.use(cors());

// Definir as rotas
app.use('/usuario', usuarioRouter);
app.use('/livro',livroRouter)
// Tentar conectar ao banco de dados antes de iniciar o servidor
const startServer = () => {
    const connection = createServerConnection();  // Conectar ao banco de dados

    connection.connect((err) => {
        if (err) {
            console.error("Erro ao conectar ao banco de dados:", err);
            return;
        }
        console.log("Banco de dados conectado com sucesso!");

        // Iniciar o servidor
        app.listen(3000, (error) => {
            if (error) {
                console.error("Erro ao iniciar o servidor:", error);
                return;
            }
            console.log("Servidor rodando na porta 3000");
        });
    });
};

// Inicializa o servidor
startServer();
