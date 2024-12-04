import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ChatBotPresenter from './ChatbotPresenter';
import { useLocation } from "react-router-dom";
import ChatBotPresenter from './ChatbotPresenter';
import { getChatGPTResponse } from '../../../../api/ChatGPT/ChatGPT';
import kakaoUtil from '../../../../utils/KakaoUtil';

const ChatBotContainer = () => {

    /* ===== STATE ===== */
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedCourse, setSelectedCourse] = useState('');

    const [stores, setStores] = useState([]);
    const [filteredStores, setFilteredStores] = useState([]);

    const [reply, setReply] = useState(null);

    const [selectedCategories, setSelectedCategories] = useState([]);

    const [groupedStores, setGroupedStores] = useState({
        '1~5분': [],
        '5~10분': [],
        '10분~': [],
    });

    const [buttons, setButtons] = useState([
        [
            {
                label: '1~5분',
                onClick: (label, store) => {
                    saveStore(label, store);
                },
            },
            {
                label: '5~10분',
                onClick: (label, store) => {
                    saveStore(label, store);
                },
            },
            {
                label: '10분~',
                onClick: (label, store) => {
                    saveStore(label, store);
                },
            },
        ],
        [
            {

            }
        ],
        [
            [

            ]
        ],
    ]);

    const [buttonIndex, setButtonIndex] = useState(0);

    const [chatMessage, setChatMessage] = useState('몇 분 거리의 음식점을 원하시나요?');

    /* ===== FUNCTION ===== */

    const saveStore = (label, store) => {
        handleSendPrompt(store[label]);
        setStores(store[label]);
        setButtonIndex((prev) => prev + 1);
        setChatMessage('안드시는 음식이 있으신가요?');
    };

    // 1. 시작 (가리별 음식점 분류)
    const groupStoresByDistance = (stores) => {
        const groups = {
            '1~5분': [],
            '5~10분': [],
            '10분~': [],
        };

        stores.forEach((store) => {
            const distance = store.distance;
            if (distance <= 100) {
                groups['1~5분'].push(store);
            } else if (distance <= 300) {
                groups['5~10분'].push(store);
            } else {
                groups['10분~'].push(store);
            }
        });

        return groups;
    };

    const filterStoresByDistance = (range) => {
        setFilteredStores(groupedStores[range]);
    };

    // 2. 음식 카테고리 추출
    const handleSendPrompt = async (stores) => {
        if (!stores || stores.length === 0) {
            alert('음식점 데이터가 준비되지 않았습니다.');
            // setButtonIndex((prev) => prev - 1);
            navigate(-1);
            return false;
        }

        try {
            const response = await getChatGPTResponse(
                `아래 데이터에서 category_name을 중복처리하고 리스트로 보여줘: ${JSON.stringify(stores)}`
            );

            const jsonMatch = response.match(/\[.*?\]/);
            if (jsonMatch) {
                const parsedReply = JSON.parse(jsonMatch[0]);
                setReply(parsedReply);

                const categoryButtons = parsedReply.map((category) => ({
                    label: category,
                    onClick: (category, groupedStores) => {
                        setSelectedCategories((prev) =>
                            prev?.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
                        );
                    },
                }));

                setButtons((prev) => {
                    const updatedButtons = [...prev];
                    updatedButtons[1] = categoryButtons;
                    return updatedButtons;
                });


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
        address_name: store.address_name,
        x: store.x,
        y: store.y,
    }));

    // 3. 사용자가 못먹는 음식 거르기


    // 4. 사용자가 선택한 음식 카테고리로 음식점 찾기
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

                navigate('/result', {
                    state: {
                        current_course: {
                            place_name: location.state[0],
                            address_name: location.state[1],
                            lat: location.state[3],
                            lng: location.state[2],
                        },
                        current_results: parsedStores,
                    }
                });

            } else {
                throw new Error('Invalid JSON response');
            }
        } catch (e) {
            console.error('Error Filtering stores', e);
        }
    };

    console.log(filteredStores)


    // 해당 코스 음식점들 추출
    // const handleSetLineStore = async (line) => {
    //     const lineStoreData = await getLineData(line);
    //     const groupedData = groupStoresByDistance(lineStoreData);
    //     setGroupedStores(groupedData);
    //     // setFilteredStores([]);

    //     return lineStoreData;
    //     // if (lineStoreData?.length) {
    //     //     // setStores(lineStoreData);

    //     //     const groupedData = groupStoresByDistance(lineStoreData);
    //     //     setGroupedStores(groupedData);
    //     //     setFilteredStores([]);

    //     //     return lineStoreData;
    //     // }
    //     // return [];
    // };

    const handleSetLineStore = async (line) => {
        const lineStoreData = await getLineData(line);
        const groupedData = groupStoresByDistance(lineStoreData);
        setGroupedStores(groupedData);
        setStores(lineStoreData); // 전체 데이터 유지
        return lineStoreData;
    };

    const getLineData = async (line) => {
        const lineResult = {};

        // 특정 코스의 주변 음식점을 들고옴 (범위: 500미터 이내)
        const radius = 500;

        let page = 1;
        let meta = { is_end: false };
        const dataCollection = [];

        while (!meta.is_end) {
            const result = await kakaoUtil.getPlace(line[3], line[2], radius, page++);
            dataCollection.push(...result.documents);
            meta = result.meta;
        }

        lineResult[line[0]] = dataCollection;

        const filteredLineResult = lineResult[line[0]]?.map((item) => ({
            address_name: item.address_name,
            category_name: item.category_name,
            place_name: item.place_name,
            phone: item.phone,
            x: item.x,
            y: item.y,
            distance: item.distance,
        }));

        return filteredLineResult;
    }

    /* ===== EFFECT ===== */
    useEffect(() => {
        if (!location.state) {
            alert('잘못된 접근입니다.');
            navigate('/');
            return;
        }

        (
            async () => {
                setSelectedCourse(location.state[0]);
            }
        )()

        const fetchData = async () => {
            const foodData = await handleSetLineStore(location.state);
            if (foodData.length) {
                console.log('음식점 데이터 로드 완료');
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log(groupedStores);
    }, [groupedStores]);

    /* ===== RENDER ===== */
    return (
        <ChatBotPresenter
            chatList={chatList}
            reply={reply}

            onSendPrompt={handleSendPrompt}
            onFilteredStores={handleFilteredStores}

            selectedCourse={selectedCourse}

            selectedCategories={selectedCategories}
            onCategoryClick={handleCategoryToggle}

            chatMessage={chatMessage}

            onDistanceFilter={filterStoresByDistance}

            buttons={buttons}
            groupedStores={groupedStores}
            buttonIndex={buttonIndex}
        />
    );
};

export default ChatBotContainer;