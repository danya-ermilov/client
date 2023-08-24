
const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");

const HTTP_PORT = process.env.HTTP_PORT || 80;
const HTTPS_PORT = process.env.HTTPS_PORT || 443;

const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Путь к вашим SSL-сертификатам
const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/botoginvest.com/prevkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/botoginvest.com/cert.pem"),
};

// Создание HTTPS сервера
const httpsServer = https.createServer(options, app);

httpsServer.listen(HTTPS_PORT, () => {
  console.log(`HTTPS server is running on port ${HTTPS_PORT}`);
});

// HTTP сервер для перенаправления на HTTPS
const httpServer = express();
httpServer.get("*", (req, res) => {
  res.redirect(`https://${req.headers.host}${req.url}`);
});
httpServer.listen(HTTP_PORT, () => {
  console.log(`HTTP server is running on port ${HTTP_PORT}`);
});

/*
const express = require('express');
const path = require("path");

const PORT = process.env.PORT || 8083;
const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT);
*/
