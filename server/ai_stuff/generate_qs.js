const axios = require('axios');
require('dotenv').config();

const OpenAI = require("openai") ;

const openai = new OpenAI({ apiKey: process.env.GPT_API_KEY});

const number_of_questions = 10;

function createArrayFromString(inputString) {
    try {
      // Parse the JSON string to an array
      const newArray = JSON.parse(inputString);
      
      // Ensure the result is an array
      if (Array.isArray(newArray)) {
        return newArray;
      } else {
        throw new Error('Invalid input format. Expected a JSON array.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      return null;
    }
  }

async function generate_questions(job_title) {
    const completion = await openai.chat.completions.create({
        messages: [
        {
            "role": "system",
            "content": "You are an interviewer question maker"
        },
        {
            "role": "user",
            "content": "I am looking for a " + job_title + " position. Can you provide” + number_of_questions “behavioral response questions? Organize these questions into an array using this syntax [...,...,...] without new lines"
        }],
        model: "gpt-3.5-turbo"
    });

    questions = completion.choices[0].message.content;
    questions = createArrayFromString(questions);
    return questions;
    // console.log(completion.choices[0].message.content);
}
  



// questions = generate_questions('nurse')
// .then(questions => {
// return questions;
// })
// .catch(error => {
// console.error('Error:', error.message);
// });


// console.log(createArrayFromString(questions))



module.exports = generate_questions;