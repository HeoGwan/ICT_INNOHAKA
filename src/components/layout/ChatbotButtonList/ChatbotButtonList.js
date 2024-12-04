import './ChatbotButtonList.style.css';

const ChatbotButtonList = ({
    categories,
    selectedCategories,
    onClick
}) => {

    /* ===== RENDER ===== */
    return (
        <>
            {categories?.map((category, index) => (
                <button
                    key={index}
                    className={`chatbot-button ${selectedCategories.includes(category) ? 'selected' : ''}`}
                    onClick={() => onClick(category)}
                >
                    {category}
                </button>
            ))}
        </>
    );
};

export default ChatbotButtonList;