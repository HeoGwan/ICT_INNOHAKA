import { ChatbotList } from '../../../../components';
import './Chatbot.style.css';

const ChatbotPresenter = ({
    reply,

    onSendPrompt,
    onFilteredStores,

    selectedLine,
    selectedCourse,

    selectedCategories,
    onCategoryClick,
}) => {

    /* ===== RENDER ===== */
    return (
        <div className='chatbot-container'>
            <ChatbotList
                questions={reply}

                onSendPrompt={onSendPrompt}
                onFilteredStores={onFilteredStores}

                lineName={selectedLine}
                courseName={selectedCourse}

                selectedCategories={selectedCategories}
                onCategoryClick={onCategoryClick}
            />
        </div>
    );
};

export default ChatbotPresenter;