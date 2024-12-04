import { useEffect, useState } from 'react';
import ChatbotButton from '../../form/ChatbotButton/ChatbotButton';
import ChatbotCard from '../ChatbotCard';
import './ChatbotList.style.css';
import ChatbotButtonList from '../ChatbotButtonList';

const ChatbotList = ({
    questions,

    onFilteredStores,

    courseName,

    selectedCategories,
    onCategoryClick,

    chatMessage,
    onDistanceFilter,

    buttons,
    buttonIndex,
    groupedStores,
}) => {
    /* ===== STATE ===== */
    const [categories, setCategories] = useState([]);

    /* ===== EFFECT ===== */
    useEffect(() => {
        if (questions?.length) {
            setCategories(questions);
        }
    }, [questions]);

    /* ===== STYLES ===== */
    const styles = {
        title: {
            fontSize: '1.5rem',
            fontWeight: 600,
            marginRight: '1rem'
        },
    };

    /* ===== RENDER ===== */
    return (
        <div className='chatbot-list-container'>
            <div className='title'>
                <span style={{ ...styles.title }}>{courseName}</span>
                <span style={{ fontWeight: 100 }}>주변의 음식점을 찾아드릴게요 !</span>
                <div className='top'>
                </div>
            </div>
            <div className='card-container'>
                <ChatbotCard
                    content={chatMessage}
                />
            </div>
            <div className='buttons-container'>
                <ChatbotButtonList
                    categories={categories}

                    selectedCategories={selectedCategories}
                    onClick={onCategoryClick}

                    buttons={buttons}
                    buttonIndex={buttonIndex}
                    groupedStores={groupedStores}
                />
            </div>
        </div>
    );
};

export default ChatbotList;