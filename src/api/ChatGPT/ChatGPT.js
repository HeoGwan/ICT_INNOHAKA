const BASE_URL = 'https://api.openai.com/v1';

const API_KEY = process.env.REACT_APP_OPEN_AI_KEY;
console.log(API_KEY);

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getChatGPTResponse = async (prompt) => {
    try {
        await delay(1000);
        const response = await fetch(`${BASE_URL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 50,
                temperature: 0.5,
            }),
        });

        if(!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0]?.message?.content || 'No response';
    } catch (error) {
        console.error('ChatGPT API 호출 에러', error);
        return 'Error: Unable to fetch response from ChatGPT.';
    }
};