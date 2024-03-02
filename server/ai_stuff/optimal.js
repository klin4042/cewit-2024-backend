const axios = require('axios');
const apiUrl = 'https://api.openai.com/v1/chat/completions';
require('dotenv').config();

async function detectStarMethod(text) {
    try {
      const response = await axios.post(apiUrl, {
        model: "gpt-3.5-turbo",
        prompt: "You are an interview coach. Provide me professional feedback for how I respond to the following question using the STAR (Situation, Task, Action, Result) method as a guideline: \n\n" + text,
        max_tokens: 50,
        n: 1,
        stop: null,
        temperature: 0.5,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GPT_API_KEY}`,
        },
      });
      const completion = response.data.choices[0].text;
      return completion
    } catch (error) {
      console.error('Error making API request:', error.message);
      const completion = response;
      return completion;
    }
  }
  

  // Example usage:
const inputText = "During my undergraduate studies, I encountered a challenging task that significantly contributed to my personal and professional growth. I was part of a medical outreach program in a rural community where access to healthcare was limited. Our task was to organize a health camp to provide essential medical services to the local population. One of the major challenges we faced was coordinating with various stakeholders, including healthcare professionals, local authorities, and community leaders. Additionally, we had to overcome logistical issues, such as transportation of medical supplies and setting up temporary medical facilities in a resource-constrained environment. To address these challenges, I took the initiative to establish effective communication channels among team members and stakeholders. I organized regular meetings to ensure everyone was on the same page regarding their roles and responsibilities. By collaborating with local leaders, we gained valuable insights into the community's needs and expectations. Logistical challenges were addressed through meticulous planning. I worked closely with a logistics team to create a detailed inventory of medical supplies, arrange transportation, and set up a functional medical camp. This involved adapting to unexpected changes and making quick decisions to ensure the smooth execution of the outreach program. The most rewarding part of this experience was witnessing the positive impact on the community. We provided medical services, health education, and preventive care, significantly improving the well-being of the residents. The challenges I encountered during this task taught me the importance of adaptability, effective communication, and leadership in the field of healthcare. Reflecting on this experience, I have gained a deeper appreciation for the complexities of delivering healthcare in diverse settings. It reinforced my commitment to pursuing a career in medicine, where I can continue to contribute to the well-being of underserved communities and address healthcare disparities.";

detectStarMethod(inputText)
.then((result) => {
    console.log(result)
})
.catch((error) => {
    console.error('Error:', error.message);
});
