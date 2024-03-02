const express = require('express');
const app = express();
const port = 8000;
const axios = require('axios');

const apiKey = 'YOUR_OPENAI_API_KEY';
const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';


app.listen(port, () => { console.log(`App listening on port ${port}`) });


app.get('/suer', (req, res) => {
    res.send("HI");
});

app.post('/analyze-sentiment', async (req, res) => {
    const { text } = req.body;

    try {
        const response = await axios.post(apiUrl, {
            prompt: `This is a sentiment analysis task. Analyze the sentiment of the following text:\n"${text}"\nSentiment:`,
            max_tokens: 1,
            stop: '\n',
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        res.send(response.data.choices[0].text.trim());
    } catch (error) {
        console.error('Failed to analyze sentiment:', error);
        res.status(500).send('Failed to analyze sentiment');
    }
});