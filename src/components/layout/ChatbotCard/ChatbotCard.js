import './ChatbotCard.style.css';

const ChatbotCard = ({
    content,
}) => {

    /* ===== RENDER ===== */
    return (
        <div className='chatbot-card-container'>
            <div className='card'>
                <span>{content}</span>
            </div>
        </div>
    );
};

export default ChatbotCard;