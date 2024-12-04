import './Chatbot.style.css';

const ChatbotPresenter = ({
    prompt,
    reply,
    onPromptChange,
    onSendPrompt
}) => {

    /* ===== RENDER ===== */
    return (
        <div className='main-container'>
            <input
                value={prompt}
                onChange={onPromptChange}
            />
            <button
                onClick={onSendPrompt}
            >
                전송
            </button>
            <span>
                {reply}
            </span>
        </div>
    );
};

export default ChatbotPresenter;