const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 3000;

function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const iface of Object.values(interfaces)) {
        for (const config of iface) {
            if (config.family === 'IPv4' && !config.internal) {
                return config.address;
            }
        }
    }
    return 'localhost';
}

// Configurar EJS como a view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos (CSS, JS do lado do cliente)
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal que carrega e exibe as fichas
app.get('/', (req, res) => {
    fs.readFile('dados.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Erro ao ler o arquivo de dados:", err);
            return res.status(500).send("Erro interno do servidor");
        }
        const fichas = JSON.parse(data);
        res.render('index', { fichas: fichas });
    });
});


const localIP = getLocalIP();

app.listen(PORT, () => {
    console.log(`Servidor rodando em:`);
    console.log(`→ Local:     http://localhost:${PORT}`);
    console.log(`→ Na rede:  http://${localIP}:${PORT}`);
});
