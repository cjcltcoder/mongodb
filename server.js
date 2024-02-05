const express = require('express');
const { start } = require('repl');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

app.use('/', express.static('public'));


app.get('/hello', (req, res) => {
    res.send('Hello World');
});

app.get('/budget', (req, res) => {
    const dataFilePath = path.join(__dirname, '/budget_data.json');
  
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading budget data:', err);
        return res.status(500).send('Internal Server Error');
      }
  
      try {
        const budgetData = JSON.parse(data);
        res.json(budgetData.myBudget);
      } catch (error) {
        console.error('Error parsing JSON data:', error);
        res.status(500).send('Internal Server Error');
      }
    });
  });
  
app.get('/budget_data.json', (req, res) => {
  const dataFilePath = path.join(__dirname, 'budget_data.json');

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading budget data:', err);
          return res.status(500).send('Internal Server Error');
      }

      res.json(JSON.parse(data));
  });
});

app.get('/d3code', (req, res) => {
  const d3CodeFilePath = path.join(__dirname, 'd3code.js');

  fs.readFile(d3CodeFilePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading D3.js code:', err);
          return res.status(500).send('Internal Server Error');
      }

      res.send(data);
  });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});