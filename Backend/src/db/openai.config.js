import OpneAI from 'openai';

const openai = new OpneAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const getRecommendation = async (userInput) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: userInput,
                },
            ],
        });
        console.log(response.data.choices[0].message.content);
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching recommendation:', error.response?.data || error.message);
        throw error;
    }
};

export default getRecommendation;
