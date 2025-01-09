// Import the express module
import express from "express";
// Import the axios module for making HTTP requests
import axios from "axios";

// index.js
const app = express();
const PORT = 3000;

// Set up EJS as templating engine
app.set('view engine', 'ejs');

// Static files
app.use(express.static('public'));

// Routes
app.get('/', async (req, res) => {
    try {
        // Fetch a random joke using JokeAPI
        const response = await axios.get('https://v2.jokeapi.dev/joke/Any');
        const jokeData = response.data;

        // Pass data to EJS template
        res.render('index', { joke: jokeData });
    } catch (error) {
        console.error('Error fetching data from JokeAPI:', error);
        res.status(500).send('Error fetching data. Please try again later.');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});