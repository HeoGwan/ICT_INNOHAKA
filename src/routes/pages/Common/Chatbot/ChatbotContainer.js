import { useEffect, useState } from "react";
import ChatBotPresenter from "./ChatBotPresenter";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import ChatbotPresenter from './ChatbotPresenter'
import { getChatGPTResponse } from '../../../../api/ChatGPT/ChatGPT';
import courseUtil from '../../../../utils/courseUtil';
import kakaoUtil from '../../../../utils/KakaoUtil';

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const ChatBotContainer = () => {
    const location = useLocation();
    console.log(location.state);
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

        // 선택한 답변을 기반으로 프롬프트를 작성한 다음 ChatGPT에게 질문을 던진다


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

    /* ===== STATE ===== */
    const [selectedLine, setSelectedLine] = useState('red_line');
    const [selectedCourse, setSelectedCourse] = useState('UN기념공원');

    const [stores, setStores] = useState(null);
    const [filteredStores, setFilteredStores] = useState(null);

    const [reply, setReply] = useState(null);

    const [selectedCategories, setSelectedCategories] = useState([]);




    /* ===== FUNCTION ===== */

    // 1. 음식 카테고리 추출
    const handleSendPrompt = async () => {
        if (!stores || stores.length === 0) {
            alert('음식점 데이터가 준비되지 않았습니다.');
            return;
        }

        try {
            const response = await getChatGPTResponse(
                `아래 데이터에서 category_name을 중복처리하고 리스트로 보여줘: ${JSON.stringify(stores)}`
            );

            const jsonMatch = response.match(/\[.*?\]/);
            if (jsonMatch) {
                const parsedReply = JSON.parse(jsonMatch[0]);
                setReply(parsedReply);
            } else {
                throw new Error("Invalid JSON response");
            }
        } catch (e) {
            console.error('Error fetching ChatGPT response: ', e);
            setReply([]);
        }
    };

    const compactStoresData = stores?.map((store) => ({
        place_name: store.place_name,
        category_name: store.category_name,
        // distance: store.distance,
        // address_name: store.address_name,
        // x: store.x,
        // y: store.y,
    }));

    // 2. 사용자가 선택한 음식 카테고리로 음식점 찾기
    const handleCategoryToggle = (category) => {
        setSelectedCategories((prev) =>
            prev?.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    const handleFilteredStores = async () => {
        try {
            const response = await getChatGPTResponse(
                `아래 데이터에서 다음 카테고리 중 하나에 해당하는 음식점을 찾아줘:\n
                데이터: ${JSON.stringify(compactStoresData)}
                선택된 카테고리: ${JSON.stringify(selectedCategories)}\n`
            );

            const jsonMatch = response.match(/(\{.*\}|\[.*\])/s);
            if (jsonMatch) {
                const parsedStores = JSON.parse(jsonMatch[0]);
                setFilteredStores(parsedStores);
            } else {
                throw new Error('Invalid JSON response');
            }
        } catch (e) {
            console.error('Error Filtering stores', e);
        }
    };



    // 해당 코스 음식점들 추출
    const handleSetLineStore = async () => {
        const line = await courseUtil.getCourse(selectedLine);
        const lineStoreData = await getLineData(line);

        if (lineStoreData.length) {
            setStores(lineStoreData);
            return lineStoreData;
        }
        return [];
    };

    const getLineData = async (lineData) => {
        const lineResult = {};

        // 특정 코스의 주변 음식점을 들고옴 (범위: 500미터 이내)
        const radius = 500;
        await Promise.all(
            lineData.map(async (line) => {
                let page = 1;
                let meta = { is_end: false };
                const dataCollection = [];

                while (!meta.is_end) {
                    const result = await kakaoUtil.getPlace(line[3], line[2], radius, page++);
                    dataCollection.push(...result.documents);
                    meta = result.meta;
                }

                lineResult[line[0]] = dataCollection;
            })
        );

        const filteredLineResult = lineResult[selectedCourse].map((item) => ({
            address_name: item.address_name,
            category_name: item.category_name,
            place_name: item.place_name,
            phone: item.phone,
            x: item.x,
            y: item.y,
            distance: item.distance,
        }));

        return filteredLineResult;
    };


    /* ===== EFFECT ===== */
    useEffect(() => {
        const fetchData = async () => {
            const foodData = await handleSetLineStore();
            if (foodData.length) {
                console.log('음식점 데이터 로드 완료');
            }
        };
        fetchData();
    }, []);

    // console.log(selectedCourse);
    // console.log(selectedLine);
    console.log(stores);
    console.log(reply);
    console.log(selectedCategories);
    console.log(filteredStores);

    /* ===== RENDER ===== */
    return (
        <ChatbotPresenter
            chatList={chatList}
            reply={reply}

            onSendPrompt={handleSendPrompt}
            onFilteredStores={handleFilteredStores}

            selectedLine={selectedLine}
            selectedCourse={selectedCourse}

            selectedCategories={selectedCategories}
            onCategoryClick={handleCategoryToggle}
        />
    );
};

export default ChatBotContainer;