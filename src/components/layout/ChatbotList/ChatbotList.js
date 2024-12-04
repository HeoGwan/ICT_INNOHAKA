import { useEffect, useState } from 'react';
import ChatbotButton from '../../form/ChatbotButton/ChatbotButton';
import ChatbotCard from '../ChatbotCard';
import './ChatbotList.style.css';
import ChatbotButtonList from '../ChatbotButtonList';

const ChatbotList = ({
    questions,

    onSendPrompt,
    onFilteredStores,

    lineName,
    courseName = 'UN기념공원',

    selectedCategories,
    onCategoryClick,
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
                <span style={{ ...styles.title }}>{lineName} - {courseName}</span>
                <span style={{ fontWeight: 100 }}>주변의 음식점을 찾아드릴게요 !</span>
                <div className='top'>
                    <button className='start-button' onClick={onSendPrompt}>시작하기</button>
                </div>
            </div>
            <div className='card-container'>
                <ChatbotCard

                />
            </div>
            {
                categories?.length === 0 ? (
                    <></>
                ) : (
                    <div className='buttons-container'>
                        <ChatbotButtonList
                            categories={categories}

                            selectedCategories={selectedCategories}
                            onClick={onCategoryClick}
                        />
                    </div>
                )
            }
        </div>
    );
};

export default ChatbotList;