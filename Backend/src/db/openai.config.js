import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

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
