require("dotenv").config();

// app.js ou index.js

const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express();

app.use(express.json());

// Configurar o middleware CORS
const cors = require('cors')

app.use(cors());

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Verifica se a conexão foi estabelecida corretamente
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados!');
});

// Resto da configuração do Express e rotas do seu aplicativo aqui...

// Inicia o servidor na porta 3000 (ou a porta que você desejar)
app.listen(process.env.PORT, () => {
  console.log('Servidor rodando na porta ' + process.env.PORT);
});


//----------Funções----------

function nomearMes(dados) {
  results.forEach(dado => { dados.push(dado.dia + "/" + dado.mes + "/" + dado.ano) });
}



app.get('/teste', (rec, res) => {
  const sqlQuery = `select * from irrigator`;

  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
    else {
      res.status(200).json(results);
    }
  });
});

function GenerateToken(length) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * caracteres.length);
    token += caracteres.charAt(randomIndex);
  }
  return token;
}


app.get('/UmidadeDoSolo', (req, res) => {

  const sqlQuery2 = `SELECT soil_moisture FROM irrigator`;

  // Executa a consulta ao banco de dados
  connection.query(sqlQuery2, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
    else {
      let dados = [];
      results.forEach(dado => { dados.push(dado.soil_moisture) });
      res.status(200).json(dados);
    }

  });
})


//Coletando a data e a umidade do solo
app.get('/Solo', (req, res) => {

  //Coletando a data e a organizando no padrao para o futuro grafico
  const sqlQuery =
    `SELECT verification_date FROM irrigator;`;

  // Executa a consulta ao banco de dados
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
    else {
      let x = [];
      results.forEach(dado => { x.push(dado.verification_date) })

      //Coletando a umidade do solo
      const sqlQuery2 = `SELECT soil_moisture FROM irrigator`;

      // Executa a consulta ao banco de dados
      connection.query(sqlQuery2, (err, results) => {
        if (err) {
          console.error('Erro ao executar a consulta:', err);
          res.status(500).json({ error: 'Erro ao executar a consulta' });
        }
        else {
          let y = [];
          results.forEach(dado => { y.push(dado.soil_moisture) });
          let data = []

          for (var i = 0; i < x.length; i++) {
            data.push({ "x": x[i], "y": y[i] });
          }

          res.status(200).json(data);
        }

      });
    }

  });
})


//Coletando a data e a umidade do ar
app.get('/Ar', (req, res) => {

  //Coletando a data e a organizando no padrao para o futuro grafico
  const sqlQuery =
    `SELECT verification_date FROM irrigator;`;

  // Executa a consulta ao banco de dados
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
    else {
      let x = [];
      results.forEach(dado => { x.push(dado.verification_date) })

      //Coletando a umidade do ar
      const sqlQuery2 = `SELECT air_humidity FROM irrigator`;

      // Executa a consulta ao banco de dados
      connection.query(sqlQuery2, (err, results) => {
        if (err) {
          console.error('Erro ao executar a consulta:', err);
          res.status(500).json({ error: 'Erro ao executar a consulta' });
        }
        else {
          let y = [];
          results.forEach(dado => { y.push(dado.air_humidity) });
          let data = []

          for (var i = 0; i < x.length; i++) {
            data.push({ "x": x[i], "y": y[i] });
          }

          res.status(200).json(data);
        }

      });
    }

  });
})



//Coletando a data e a temperatura
app.get('/Temp', (req, res) => {

  //Coletando a data e a organizando no padrao para o futuro grafico
  const sqlQuery =
    `SELECT verification_date FROM irrigator;`;

  // Executa a consulta ao banco de dados
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
    else {
      let x = [];
      results.forEach(dado => { x.push(dado.verification_date) })

      //Coletando a Temperatura
      const sqlQuery2 = `SELECT temperature FROM irrigator`;

      // Executa a consulta ao banco de dados
      connection.query(sqlQuery2, (err, results) => {
        if (err) {
          console.error('Erro ao executar a consulta:', err);
          res.status(500).json({ error: 'Erro ao executar a consulta' });
        }
        else {
          let y = [];
          results.forEach(dado => { y.push(dado.temperature) });
          let data = []

          for (var i = 0; i < x.length; i++) {
            data.push({ "x": x[i], "y": y[i] });
          }

          res.status(200).json(data);
        }

      });
    }

  });
})


//Coletando a data e o ml do fluxo
app.get('/Fluxo', (req, res) => {

  //Coletando a data e a organizando no padrao para o futuro grafico
  const sqlQuery =
    `SELECT verification_date FROM irrigator;`;

  // Executa a consulta ao banco de dados
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
    else {
      let x = [];
      results.forEach(dado => { x.push(dado.verification_date) })

      //Coletando a quantidade de água detectada pelo fluxo
      const sqlQuery2 = `SELECT amount_of_water FROM irrigator`;

      // Executa a consulta ao banco de dados
      connection.query(sqlQuery2, (err, results) => {
        if (err) {
          console.error('Erro ao executar a consulta:', err);
          res.status(500).json({ error: 'Erro ao executar a consulta' });
        }
        else {
          let y = [];
          results.forEach(dado => { y.push(dado.amount_of_water) });
          let data = []

          for (var i = 0; i < x.length; i++) {
            data.push({ "x": x[i], "y": y[i] });
          }

          res.status(200).json(data);
        }

      });
    }

  });
})


//Coletando o ultimo registro de umidade do solo
app.get('/UltimoSolo', (req, res) => {
  const sqlQuery =
    `SELECT soil_moisture FROM irrigator
    ORDER BY verification_date DESC
    LIMIT 1;`;

  // Executa a consulta ao banco de dados
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
    else {
      let dados = []
      results.forEach(dado => { dados.push(dado.soil_moisture) });
      res.status(200).json(dados);
    }

  });
})



//Coletando o ultimo registro de umidade do ar
app.get('/UltimoAr', (req, res) => {
  const sqlQuery =
    `SELECT air_humidity FROM irrigator
    ORDER BY verification_date DESC
    LIMIT 1;`;

  // Executa a consulta ao banco de dados
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
    else {
      let dados = []
      results.forEach(dado => { dados.push(dado.air_humidity) });
      res.status(200).json(dados);
    }

  });
})


//Coletando o ultimo registro da Temperatura
app.get('/UltimoTemp', (req, res) => {
  const sqlQuery =
    `SELECT temperature FROM irrigator
    ORDER BY verification_date DESC
    LIMIT 1;`;

  // Executa a consulta ao banco de dados
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
    else {
      let dados = []
      results.forEach(dado => { dados.push(dado.temperature) });
      res.status(200).json(dados);
    }

  });
})

//Coletando o ultimo registro do fluxo
app.get('/UltimoFluxo', (req, res) => {
  const sqlQuery =
    `SELECT amount_of_water FROM irrigator
    ORDER BY verification_date DESC
    LIMIT 1;`;

  // Executa a consulta ao banco de dados
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
    else {
      let dados = []
      results.forEach(dado => { dados.push(dado.amount_of_water) });
      res.status(200).json(dados);
    }

  });
})


app.get('/Irrigou', (req, res) => {
  const sqlQuery =
    `SELECT verification_date FROM irrigator
    WHERE irrigated = 1
    ORDER BY verification_date 
    DESC LIMIT 1;`;

  // Executa a consulta ao banco de dados
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
    else {
      let dados = []
      results.forEach(dado => {
        let data = new Date(dado.verification_date);
        dados.push(data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear() + " às " + data.getHours() + ":" + data.getMinutes());
      });
      res.status(200).json(dados);
    }

  });
})