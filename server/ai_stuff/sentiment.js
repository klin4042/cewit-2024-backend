const axios = require('axios');

async function retrieveSentiment(apiUrl, text){
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

        return response.data.choices[0].text.trim();
    } catch (error) {
        return 'ERROR';
    }
}

async function retrieveRating(apiUrl, text){
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
        return response.data.choices[0].text.trim();
    } catch (error) {
        return 'ERROR';
    }
}

async function retrieveSentimentFeedback(apiUrl, text){
    let sentiment = await retrieveSentiment(apiUrl, text);
    let rating = await retrieveRating(apiUrl, text);
    return {Sentiment: sentiment, Rating: rating};
}

function presetResponse(sentiment){
    switch(sentiment){
        case 'positive': break;
        case 'negative': break;
        case '': break;
        case '': break;
        case '': break;
    }
}