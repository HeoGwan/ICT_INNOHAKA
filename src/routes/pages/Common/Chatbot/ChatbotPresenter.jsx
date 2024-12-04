import './ChatBot.css';
// import Top from '../../../../components/Top';
import ChatBotTop from './components/ChatBotTop';
import ChatBotBody from './components/ChatBotBody';
import { ChatbotList } from '../../../../components';
import './Chatbot.style.css';
import BackButton from '../../../../components/BackButton/BackButton';

const ChatBotPresenter = ({
    chatList,
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
                chatList={chatList}
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