const express = require('express');
const app = express();
const port = 8000;
const axios = require('axios');
require('dotenv').config();
// const apiKey = process.env.GPT_API_KEY;
// const apiUrl = 'https://api.openai.com/v1/completions';
const detectStarMethod = require("./ai_stuff/optimal.js")

app.listen(port, () => { console.log(`App listening on port ${port}`) });


app.get('/suer', (req, res) => {
    res.send("HI");
});

app.get('/star', (req, res) => {
    res.send('Please provide your text as a query parameter, e.g., /star?text=YourTextHere');
  });
  
app.get('/star/generate', async (req, res) => {
try {
    const interviewQuestion = req.query.question;
    const userAnswer = req.query.answer;
    
    if (!interviewQuestion || !userAnswer) {
    return res.status(400).json({ error: 'Question and answer parameter is required.' });
    }

    const response = await detectStarMethod(interviewQuestion, userAnswer);
    res.send(interviewQuestion + "-----------------------------------" + userAnswer + "---------------------------" + response);
    
} catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
}
});
  