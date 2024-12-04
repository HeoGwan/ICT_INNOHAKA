import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ChatBotPresenter from './ChatbotPresenter';
import { getChatGPTResponse } from '../../../../api/ChatGPT/ChatGPT';
import courseUtil from '../../../../utils/courseUtil';
import kakaoUtil from '../../../../utils/KakaoUtil';

const ChatBotContainer = () => {

    // const location = useLocation();
    // console.log(location);

    /* ===== STATE ===== */
    const navigate = useNavigate();
    const location = useLocation();
    
    const [selectedLine, setSelectedLine] = useState('red_line');
    const [selectedCourse, setSelectedCourse] = useState('');

    const [stores, setStores] = useState([]);
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
    const handleSetLineStore = async (line) => {
        // const line = await courseUtil.getCourse(selectedLine);
        // const lineStoreData = await getLineDatas(line);
        const lineStoreData = await getLineData(line);

        if (lineStoreData?.length) {
            setStores(lineStoreData);
            return lineStoreData;
        }
        return [];
        // if (lineStoreData.length) {
        //     setStores(lineStoreData);
        //     return lineStoreData;
        // }
        // return [];
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

    const getLineDatas = async (lineData) => {
        const lineResult = {};

        // 특정 코스의 주변 음식점을 들고옴 (범위: 500미터 이내)
        const radius = 500;
        await Promise.all(
            lineData.map(async (line) => {
                let page = 1;
                let meta = { is_end: false };
                const dataCollection = [];

                // while (!meta.is_end) {
                const result = await kakaoUtil.getPlace(line[3], line[2], radius, page++);
                dataCollection.push(...result.documents);
                meta = result.meta;
                // }

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
            // const foodData = await handleSetLineStore();
            const foodData = await handleSetLineStore(location.state);
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
        <ChatBotPresenter
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