const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(bodyParser.json());

let tasks = [];
const DATA_FILE = './data.json';

// Load tasks if file exists
if (fs.existsSync(DATA_FILE)) {
    tasks = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const newTask = {
        id: Date.now(),
        title: req.body.title,
        priority: req.body.priority
    };
    tasks.push(newTask);
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks));
    res.json(newTask);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
