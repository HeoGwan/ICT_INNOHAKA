import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import ResultPresenter from "./ResultPresenter";

const ResultContainer = ({

}) => {
    /**
     * 결과
     * {
     *  address_name: '부산 중구 ~~'
     *  category_name: '음식점 > 한식 > 육류, 고기'
     *  phone: 051-320-4035
     *  place_name: '고기먹자'
     *  x: 129.0192935576
     *  y: 35.0219245768
     * }
     */
    const { kakao } = window;
    const navigate = useNavigate();
    const location = useLocation();
    const mapRef = useRef(null);

    const [course, setCourse] = useState({
        place_name: "부산역",
        address_name: "부산 동구 초량동 1202",
        lat: 35.1136770532736,
        lng: 129.039074206619,
    })
    const [results, setResults] = useState([
        {
            address_name: "부산 중구 신창동1가 2-1",
            category_name: "음식점 > 양식 > 피자",
            phone: "051-255-9494",
            place_name: "이재모피자 본점",
            x: "129.030747190728",
            y: "35.10204215079571"
        },
        {
            address_name: "부산 중구 중앙동4가 51",
            category_name: "음식점 > 일식 > 참치회",
            phone: "051-463-3737",
            place_name: "본참치",
            x: "129.035335864078",
            y: "35.1054202737424"
        },
        {
            address_name: "부산 중구 신창동2가 12-5",
            category_name: "음식점 > 한식 > 두부전문점",
            phone: "051-246-1825",
            place_name: "돌고래순두부",
            x: "129.0296086472138",
            y: "35.101543047824954"
        },
        {
            address_name: "부산 중구 중앙동2가 27-2",
            category_name: "음식점 > 일식 > 돈까스,우동",
            phone: "051-246-8686",
            place_name: "중앙모밀",
            x: "129.035269169484",
            y: "35.1018563499332"
        },
        {
            address_name: "부산 중구 신창동2가 17-1",
            category_name: "음식점 > 한식 > 해물,생선",
            phone: "",
            place_name: "개미집 본점",
            x: "129.03011216070587",
            y: "35.10075509786033"
        },
        {
            address_name: "부산 중구 대청동2가 30-17",
            category_name: "음식점 > 패밀리레스토랑",
            phone: "051-254-7736",
            place_name: "스톤스트리트",
            x: "129.03128824435444",
            y: "35.10183933074177"
        },
        {
            address_name: "부산 중구 중앙동1가 21-3",
            category_name: "음식점 > 한식 > 한정식",
            phone: "051-246-7466",
            place_name: "뚱보집",
            x: "129.03608081474547",
            y: "35.10067389373103"
        },
        {
            address_name: "부산 중구 대청동2가 17-7",
            category_name: "음식점 > 한식 > 국수",
            phone: "051-463-3977",
            place_name: "일미밀면",
            x: "129.030731015057",
            y: "35.1031580763687"
        },
        {
            address_name: "부산 중구 광복동3가 6-3",
            category_name: "음식점 > 일식 > 돈까스,우동",
            phone: "051-246-4200",
            place_name: "이승학돈까스 본점",
            x: "129.03125232110978",
            y: "35.10039174458834"
        },
        {
            address_name: "부산 중구 남포동2가 17-1",
            category_name: "음식점 > 한식 > 냉면",
            phone: "051-246-3314",
            place_name: "할매가야밀면",
            x: "129.031223043883",
            y: "35.098946750334"
        },
        {
            address_name: "부산 중구 중앙동1가 23-5",
            category_name: "음식점 > 한식 > 육류,고기",
            phone: "051-231-9281",
            place_name: "돌쇠장작구이",
            x: "129.03556771511208",
            y: "35.100721263421384"
        },
        {
            address_name: "부산 중구 동광동5가 36-28",
            category_name: "음식점 > 중식 > 중국요리",
            phone: "010-2334-0358",
            place_name: "석기시대 본점",
            x: "129.03486261867127",
            y: "35.1061455553567"
        },
        {
            address_name: "부산 중구 동광동3가 2-6",
            category_name: "음식점 > 중식 > 중국요리",
            phone: "",
            place_name: "화국반점",
            x: "129.0341978688771",
            y: "35.10256373490232"
        },
        {
            address_name: "부산 중구 신창동2가 17-13",
            category_name: "음식점 > 한식 > 해물,생선",
            phone: "051-245-1924",
            place_name: "원조바다집",
            x: "129.0299210587007",
            y: "35.100831294083946"
        },
        {
            address_name: "부산 중구 남포동2가 15-1",
            category_name: "음식점 > 술집 > 호프,요리주점",
            phone: "051-245-9986",
            place_name: "수복센타",
            x: "129.0314310282674",
            y: "35.09888829266081"
        }
    ]);
    // const [results, setResults] = useState([]);
    const [level, setLevel] = useState(3);
    const [center, setCenter] = useState({
        lat: 35.0219245768,
        lng: 129.0192935576,
    });
    const [marker, setMarker] = useState({
        lat: 35.0219245768,
        lng: 129.0192935576,
    });


    useEffect(() => {
        (
            async () => {
                const { current_course, current_results } = location.state;
                setCourse(current_course);
                setCenter({
                    lat: current_course.lat,
                    lng: current_course.lng,
                });
                setResults(current_results);
            }
        )()
    }, []);

    const selectItem = (place) => {
        setCenter(place);
        setMarker(place);
        setLevel(3);
    }

    return (
        <ResultPresenter
            navigate={navigate}

            mapRef={mapRef}
            center={center}

            results={results}
            marker={marker}
            selectItem={selectItem}
            level={level}
        />
    )
}

export default ResultContainer;