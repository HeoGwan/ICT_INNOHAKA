import { useState } from 'react';
import ChatbotPresenter from './ChatbotPresenter'
import { getChatGPTResponse } from '../../../../api/ChatGPT/ChatGPT';

const ChatbotContainer = () => {

    /* ===== STATE ===== */
    const [prompt, setPrompt] = useState('');
    const [reply, setReply] = useState(null);

    console.log(prompt);

    /* ===== API ===== */
    const handlePrompt = (e) => {
        setPrompt(e.target.value);
    };

    const handleSendPrompt = async () => {
        if (!prompt.trim()) {
            alert('프롬프트를 입력해주세요 !');
            return;
        }

        try {
            const response = await getChatGPTResponse(prompt);
            setReply(response);
        } catch (e) {
            console.error('Error fetching ChatGPT response: ', e);
            setReply('Error: Unable to fetch response from ChatGPT');
        }
    };

    console.log(reply);


    /* ===== RENDER ===== */
    return (
        <ChatbotPresenter
            prompt={prompt}
            reply={reply}
            onPromptChange={handlePrompt}
            onSendPrompt={handleSendPrompt}
        />
    );
};

export default ChatbotContainer;