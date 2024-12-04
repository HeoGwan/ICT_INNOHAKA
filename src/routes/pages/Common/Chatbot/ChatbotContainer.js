import { useEffect, useState } from "react";
import ChatBotPresenter from "./ChatBotPresenter";

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const ChatBotContainer = () => {
    const [decide, setDecide] = useState('');
    const [questionList, setQuestionList] = useState([
        {
            title: '어떤 서비스를 희망하시나요?',
            category: 'cleaning',
            option: [
                { option_title: '이사/입주 청소', value: '이사/입주 청소', },
                { option_title: '사업장 청소', value: '사업장 청소', },
                { option_title: '생활/거주 청소', value: '생활/거주 청소', },
                { option_title: '가전/가구 청소', value: '가전/가구 청소', },
            ],
            event: (value, index) => {
                choiceQuestion(value, index);
            },
            enabled: true,
        },
        {
            title: '시작 시간은 언제가 좋으신가요?',
            category: 'start_time',
            option: [
                { option_title: '오전 9시 ~ 정오', value: '오전 9시 ~ 정오', },
                { option_title: '오전 9시 ~ 정오', value: '오전 9시 ~ 정오', },
                { option_title: '오전 9시 ~ 정오', value: '오전 9시 ~ 정오', },
            ],
            event: (value, index) => {
                choiceQuestion(value, index);
            },
            enabled: true,
        },
        {
            title: '날짜는 언제가 좋으신가요?',
            category: 'date',
            option: [
                { option_title: '날짜 선택하기', value: '날짜 선택하기', },
            ],
            event: (value, index) => {
                choiceQuestion(value, index);
            },
            enabled: true,
        },
    ])
    const [chatList, setChatList] = useState([

    ])
    const [showQuestionCount, setShowQuestionCount] = useState(0);

    useEffect(() => {
        if (!questionList[showQuestionCount]) return;

        setChatList(prev => {
            return [
                ...prev,
                {
                    ...questionList[showQuestionCount],
                    type: 'question',
                }
            ]
        })
    }, [showQuestionCount]);

    const choiceQuestion = (answer, index) => {
        setChatList(prev => {
            return [
                ...prev,
                {
                    ...answer,
                    type: 'answer',
                }
            ]
        })

        blockPrevQuestion(index);
        setShowQuestionCount(prev => prev + 1);
    }

    const blockPrevQuestion = (index) => {
        setChatList(prev => {
            return prev.map((chat, idx) =>
                idx === index && chat.type === 'question'
                    ? { ...chat, enabled: false } : chat)
        })
    }

    return (
        <ChatBotPresenter
            chatList={chatList}
        />
    );
};

export default ChatBotContainer;