const express = require("express");
const app = express();
const cors = require("cors");
const usuarioRouter = require("./routes/usuario");  // Caminho relativo para o diretório de rotas
const livroRouter = require("./routes/livro");
const bibliotecarioRouter = require("./routes/bibliotecario");
const historicoRouter = require("./routes/historico");
const { createServerConnection } = require("./config/connection");  // Certifique-se que está exportando a função corretamente

// Configuração do CORS
const allowedOrigins = ['http://localhost:63342', 'http://localhost:3000'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Origin not allowed by CORS'));
        }
    }
}));

// Middleware para parsing de JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Definir as rotas
app.use('/usuario', usuarioRouter);
app.use('/livro',livroRouter)
app.use('/bibliotecario',bibliotecarioRouter)
app.use('/historico',historicoRouter)


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
        app.listen(3000,'0.0.0.0', (error) => {
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
