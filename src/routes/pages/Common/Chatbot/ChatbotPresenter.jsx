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
        <div
            className='chatbot-container'
            style={{
                position: 'relative'
            }}
        >
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
            {
                buttonIndex === 1 &&
                <button
                    className='start-button'
                    style={{
                        position: 'absolute',
                        top: '6.5rem',
                        right: '2rem',
                    }}
                    onClick={onFilteredStores}
                >
                    결과보기
                </button>
            }
        </div>
    );
};

export default ChatBotPresenter;