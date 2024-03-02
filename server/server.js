const express = require('express');
const app = express();
const port = 8000;
const axios = require('axios');
require('dotenv').config();
// const apiKey = process.env.GPT_API_KEY;
// const apiUrl = 'https://api.openai.com/v1/completions';
const detectStarMethod = require("./ai_stuff/optimal.js")
const detectAnswerRelevance = require("./ai_stuff/relevance.js")
const detectAnswerProfessionalism = require("./ai_stuff/professionalism.js")
const {finalFeedbackMethod, findScores} = require("./ai_stuff/final_feedback.js")
const generate_questions = require("./ai_stuff/generate_qs.js")


app.listen(port, () => { console.log(`App listening on port ${port}`) });

let mongoose = require('mongoose');
const dataURL = process.env.ATLAS_URL;

const Questions = require('./models/questions');

mongoose.connect(dataURL, {useNewUrlParser: true, useUnifiedTopology:true})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB' + error);
    });

process.on('SIGINT', async () => {
    try{
      await mongoose.connection.close(); 
      console.log('Server closed. Database instance disconnected');
      process.exit(0);
    }   
    catch(error){
      console.error('Error closing the database connection:', error);
      process.exit(1);
    }   
    
})

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

    const star = await detectStarMethod(interviewQuestion, userAnswer);
    const relevance = await detectAnswerRelevance(interviewQuestion, userAnswer);
    const professionalism = await detectAnswerProfessionalism(interviewQuestion, userAnswer);
    const feedback = star + relevance + professionalism
    const scores = await findScores(feedback)
    const final_feedback = await finalFeedbackMethod(interviewQuestion, userAnswer, feedback);

    const jsonResponse = JSON.stringify({
        "Question": interviewQuestion,
        "Answer": userAnswer,
        "STAR": star,
        "Relevance": relevance,
        "Professionalism": professionalism,
        "Total Feedback": feedback,
        "Scores": scores,
        "Result": final_feedback
      }, null, 2);

    res.send(`<pre>${jsonResponse}</pre>`);
    
} catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
}
});

app.get('/questions/generate', async (req, res) => {
    try {
        const job_title = req.query.title;
        questions = await generate_questions(job_title)
                    .then(questions => {
                    return questions;
                    })
                    .catch(error => {
                    console.error('Error:', error.message);
                    });
      
        const jsonResponse = JSON.stringify({
            "Questions": questions
        }, null, 2);
        
        for (const element of questions) {
            console.log(element);
        }

        res.send(`<pre>${jsonResponse}</pre>`);

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    });
