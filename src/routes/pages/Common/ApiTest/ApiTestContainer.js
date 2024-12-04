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
    const place = {
        x: 129.1669313,
        y: 35.1608216,
        radius: 500,
    }

    useEffect(() => {
        (
            async () => {
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
        // const data = await kakaoUtil.getPlace(place, 4);
        // const data = await kakaoUtil.getCoords('부산 남구 대연동 1022');

        course.orange_line.map(line => {
            console.log(line[0], line[1]);
            console.log(line[2], line[3]); // 위도, 경도
        })

    }

    return (
        <ApiTestPresenter
            navigate={navigate}

            apiTest={apiTest}
        />
    )
}

export default ApiTestContainer;