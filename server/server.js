const express = require('express');
const app = express();
const port = 8000;
const axios = require('axios');

const apiKey = process.env.GPT_API_KEY;
const apiUrl = 'https://api.openai.com/v1/completions';


app.listen(port, () => { console.log(`App listening on port ${port}`) });


app.get('/suer', (req, res) => {
    res.send("HI");
});
