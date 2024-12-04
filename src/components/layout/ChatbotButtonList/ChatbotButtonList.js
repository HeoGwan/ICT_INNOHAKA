import './ChatbotButtonList.style.css';

const ChatbotButtonList = ({
    categories,
    selectedCategories,
    onClick,

    buttons,
    buttonIndex,
    groupedStores,
}) => {

    /* ===== STATE ===== */
    

    /* ===== RENDER ===== */
    return (
        <>
            {buttons[buttonIndex]?.map((button, index) => (
                <button
                    key={index}
                    className={`chatbot-button ${selectedCategories.includes(button.label) ? 'selected' : ''}`}
                    onClick={() => button.onClick(button.label, groupedStores)}
                >
                    {button.label}
                </button>
            ))}
        </>
    );
};

export default ChatbotButtonList;