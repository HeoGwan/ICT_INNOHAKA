import './ChatBotButton.css';

const ChatBotButton = ({
    option_title,
    content,
    onClick,
    buttonType,
    enabled,
}) => {

    return (
        <div className='chatbot-button-container'>
            <span className='chatbot-title'>{option_title}</span>
            <button
                className={`chatbot-button ${buttonType}`}
                onClick={onClick}
                disabled={!enabled}
            >
                {content}
            </button>
        </div>
    )
}

export default ChatBotButton;