import OpenAI from 'openai';

const openai = new OpenAI({
     apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

const getRecommendation = async (userInput) => {
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: userInput,
                },
            ],
            max_tokens: 200,
            temperature: 0.7,
        });
        const content = response.data.choices[0].message.content;

        console.log(content);
        return JSON.parse(content);
    } catch (error) {
        console.error('Error fetching recommendation:', error.response?.data || error.message);
        throw error;
    }
};

export default getRecommendation;
