const express = require('express');
const bodyParser = require('body-parser');


const app = express();
// setup csv file operations
const csv = require('csvtojson');
const fs = require('fs');
// setup data file path
const csvEmployee = './src/data/employees.csv';
const csvReview = './src/data/reviewsEmployeeID2.csv';


app.use(bodyParser.json());
app.use(express.static('public'));

// Main entry
app.get('/', (req, res) => {
  res.sendFile('./index.html');
});

// Api for get all employees
app.get('/get-employees', (req, res) => {
    csv()
    .fromFile(csvEmployee)
    .then((jsonObj) => {
        res.send(jsonObj);
    });
    console.log('Send Employees');
});

// Api for add new employee
app.post('/add-employee', (req, res) => {
    const data = `${req.body.head}, ${req.body.name}, ${req.body.position}`;
    // Add one line to csv file
    fs.appendFile(csvEmployee, `\n${data}`, (err) => {
        if (err) throw err;
        console.log('Saved!');
        res.send('Added');
      });
});

// Api for update employee with provided ID
app.post('/update-employee', (req, res) => {
    const index = req.body.line;
    const newLine = `${req.body.employee.head}, ${req.body.employee.name}, ${req.body.employee.position}`;
    fs.readFile(csvEmployee, 'utf8', (err, data) => {
        // convert data from string to array
        let newData = data.split('\n');
        // edit the selected line
        newData[index + 1] = newLine;
        // convert data back to string
        newData = newData.join('\n');
        // rewrite csv file with new data
        fs.writeFile(csvEmployee, newData, (err) => {
            if (err) console.log(`error!::${err}`);
        });
        res.send('Updated');
        console.log('updated');
    });
});

// Api for remove employee with provided ID
app.post('/del-employee', (req, res) => {
    const index = req.body.line;
    fs.readFile(csvEmployee, 'utf8', (err, data) => {
        // convert string data to array
        let newData = data.split('\n');
        // remove the line with index
        newData.splice(index + 1, 1);
        // convert array back to string
        newData = newData.join('\n');
        // write new data to csv file
        fs.writeFile(csvEmployee, newData, (err) => {
            if (err) console.log(`error!::${err}`);
        });
        res.send('Removed');
        console.log('removed');
    });
});

// Api for get all reviews for one employee
app.get('/get-reviews', (req, res) => {
    csv()
    .fromFile(csvReview)
    .then((jsonObj) => {
        res.send(jsonObj);
    });
    console.log('Send Reviews');
});
app.listen(3000, () => console.log('Listening on port 3000!'));
