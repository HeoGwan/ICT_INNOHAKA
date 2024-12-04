import OpenAI from 'openai';

const BASE_URL = 'https://api.openai.com/v1';

const API_KEY = process.env.REACT_APP_OPEN_AI_KEY;

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
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        // content: 'You are a chatbot for a tour assistant platform. When given a list of restaurant details in JSON format, you should extract and categorize their types (e.g., "Korean BBQ", "Noodles", "Seafood") into a concise, non-redundant array of categories like ["Meat", "Noodles", "Seafood"]. Respond only with the JSON array and nothing else. 한국어로',
                        content: `You are a chatbot for a tour assistant platform. When given a list of restaurant details in JSON format, you should perform the following tasks:

1. Extract and categorize the "category_name" field from the restaurant data into a concise, non-redundant array of categories, removing duplicates. Respond only with the JSON array. Example:
   ["고기", "면", "해물", "생선"] and just one word in one index.

2. If the user provides specific categories, filter the restaurant data to include only the restaurants that match any of the provided categories. Return the filtered list in the same JSON structure as the input. Max 5. 
    'category_name' is always have only one last word.
Example:
   [
       {
           "place_name": "A Restaurant",
           "category_name": "Korean BBQ",
           "address_name": "Busan Haeundae-gu ...",
           "phone": "051-123-4567"
       },
       {
           "place_name": "B Restaurant",
           "category_name": "Seafood",
           "address_name": "Busan Suyeong-gu ...",
           "phone": "051-987-6543"
       }
   ]

Always respond strictly in valid JSON format without any additional text or explanation. Only Korean
`
                    },
                    { role: 'user', content: prompt }],
                max_tokens: 200,
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