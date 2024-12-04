import './Chatbot.style.css';
import { ChatbotList } from '../../../../components';
import './Chatbot.style.css';
import BackButton from '../../../../components/BackButton/BackButton';

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
            <BackButton />
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