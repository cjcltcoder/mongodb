// Budget API

// const express = require('express');
// const cors = require('cors');
// const { start } = require('repl');
// const app = express();
// const port = 3000;
// const fs = require('fs');
// const path = require('path');

// app.use(cors());

// app.get('/budget', (req, res) => {
//     const dataFilePath = path.join(__dirname, '/budget_data.json');
  
//     fs.readFile(dataFilePath, 'utf8', (err, data) => {
//       if (err) {
//         console.error('Error reading budget data:', err);
//         return res.status(500).send('Internal Server Error');
//       }
  
//       try {
//         const budgetData = JSON.parse(data);
//         res.json(budgetData.myBudget);
//       } catch (error) {
//         console.error('Error parsing JSON data:', error);
//         res.status(500).send('Internal Server Error');
//       }
//     });
//   });
  
// app.get('/budget_data.json', (req, res) => {
//   const dataFilePath = path.join(__dirname, 'budget_data.json');

//   fs.readFile(dataFilePath, 'utf8', (err, data) => {
//       if (err) {
//           console.error('Error reading budget data:', err);
//           return res.status(500).send('Internal Server Error');
//       }

//       res.json(JSON.parse(data));
//   });
// });

// app.get('/d3code', (req, res) => {
//   const d3CodeFilePath = path.join(__dirname, 'd3code.js');

//   fs.readFile(d3CodeFilePath, 'utf8', (err, data) => {
//       if (err) {
//           console.error('Error reading D3.js code:', err);
//           return res.status(500).send('Internal Server Error');
//       }

//       res.send(data);
//   });
// });


// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// });


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');

const Budget = require('./models/budget_schema'); // Import Mongoose model for budget data

app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/budget');

app.use(express.static('public'));

// Endpoint to fetch budget data
app.get('/budget', async (req, res) => {
  try {
    const budgetData = await Budget.find();
    res.json(budgetData);
  } catch (error) {
    console.error('Error retrieving budget data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/d3code', async (req, res) => {
  try {
    const budgetData = await Budget.find();
    const d3CodePath = path.join(__dirname, 'd3code.js');
    fs.readFile(d3CodePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading D3.js code:', err);
        return res.status(500).send('Internal Server Error');
      }
      // Inject budgetData into the JavaScript file
      const modifiedD3Code = data.replace('// <BudgetData>', `const budgetData = ${JSON.stringify(budgetData)};`);
      res.type('application/javascript').send(modifiedD3Code);
    });
  } catch (error) {
    console.error('Error retrieving budget data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


















// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Define schema for budget data
// const budgetSchema = new Schema({
//     title: String,
//     budget: Number
// });

// // Create Mongoose model
// const Budget = mongoose.model('Budget', budgetSchema, 'my_budget');

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/budget', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// // Sample budget data
// const budgetData = [
//     { title: "Eat out", budget: 35 },
//     { title: "Rent", budget: 350 },
//     { title: "Groceries", budget: 90 },
//     { title: "Internet", budget: 80 },
//     { title: "Car Payment", budget: 500 },
//     { title: "Netflix", budget: 10 },
//     { title: "Fuel", budget: 400 },
//     { title: "Gym", budget: 50 }
// ];

// // Insert data into MongoDB collection
// Budget.insertMany(budgetData)
//     .then(() => {
//         console.log('Budget data inserted successfully');
//         mongoose.connection.close(); // Close the connection after insertion
//     })
//     .catch(error => {
//         console.error('Error inserting budget data:', error);
//     });