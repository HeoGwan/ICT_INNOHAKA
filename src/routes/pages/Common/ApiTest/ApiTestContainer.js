import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ApiTestPresenter from "./ApiTestPresenter";
import kakaoUtil from "../../../../utils/KakaoUtil";
import courseUtil from "../../../../utils/courseUtil";

const ApiTestContainer = ({

}) => {
    // 페이지 이동을 위한 외부 함수
    const navigate = useNavigate();
    const [course, setCourse] = useState({});
    const [foods, setFoods] = useState({});
    const place = {
        x: 129.1669313,
        y: 35.1608216,
        radius: 500,
    }

    useEffect(() => {
        (
            async () => {
                // 각 코스의 정보를 가져옴
                const red_line = await courseUtil.getCourse('red_line');
                const green_line = await courseUtil.getCourse('green_line');
                const orange_line = await courseUtil.getCourse('orange_line');

                const courses = {
                    red_line,
                    green_line,
                    orange_line,
                };

                setCourse(courses)
            }
        )()
    }, [])

    const apiTest = async () => {
        // const data = await kakaoUtil.getPlace(129.039074206619, 35.1136770532736);
        // const data = await kakaoUtil.getCoords('부산 남구 대연동 1022');

        // 모든 코스의 음식점 들고오기
        const data = await getFood();

        // 음식점 정보 저장
        setFoods(data);
        console.log(data);
    }

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

        return lineResult;
    };

    // 모든 코스 주변의 모든 음식점을 가져옴
    const getFood = async () => {
        const red_line_data = await getLineData(course.red_line);
        const green_line_data = await getLineData(course.green_line);
        const orange_line_data = await getLineData(course.orange_line);

        return {
            red_line: red_line_data,
            green_line: green_line_data,
            orange_line: orange_line_data,
        };
    }

    return (
        <ApiTestPresenter
            navigate={navigate}

            apiTest={apiTest}
        />
    )
}

export default ApiTestContainer;