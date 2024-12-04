import './Chatbot.style.css';
import { ChatbotList } from '../../../../components';
import './Chatbot.style.css';
import BackButton from '../../../../components/BackButton/BackButton';

const ChatBotPresenter = ({
    reply,

    onSendPrompt,
    onFilteredStores,

    selectedCourse,

    selectedCategories,
    onCategoryClick,

    chatMessage,
    onDistanceFilter,

    buttons,
    buttonIndex,
    groupedStores,
}) => {

    /* ===== RENDER ===== */
    return (
        <div className='chatbot-container'>
            <BackButton />
            <ChatbotList

                questions={reply}

                onSendPrompt={onSendPrompt}
                onFilteredStores={onFilteredStores}

                courseName={selectedCourse}

                selectedCategories={selectedCategories}
                onCategoryClick={onCategoryClick}

                chatMessage={chatMessage}

                onDistanceFilter={onDistanceFilter}

                buttons={buttons}
                buttonIndex={buttonIndex}
                groupedStores={groupedStores}
            />
        </div>
    );
};

export default ChatBotPresenter;