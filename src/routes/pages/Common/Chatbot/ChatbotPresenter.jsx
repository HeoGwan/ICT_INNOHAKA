import './Chatbot.style.css';
import { ChatbotList } from '../../../../components';

const ChatBotPresenter = ({
    reply,

    onSendPrompt,
    onFilteredStores,

    selectedLine,
    selectedCourse,

    selectedCategories,
    onCategoryClick,
}) => {
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

export default ChatBotPresenter;