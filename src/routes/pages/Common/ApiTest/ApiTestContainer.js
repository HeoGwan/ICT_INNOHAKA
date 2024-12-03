import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ApiTestPresenter from "./ApiTestPresenter";
import kakaoUtil from "../../../../utils/KakaoUtil";

const ApiTestContainer = ({

}) => {
    // 페이지 이동을 위한 외부 함수
    const navigate = useNavigate();
    const place = {
        x: 129.1669313,
        y: 35.1608216,
        radius: 500,
    }

    const apiTest = async () => {
        const data = await kakaoUtil.getPlace(place, 1);

        console.log(data);
    }

    return (
        <ApiTestPresenter
            navigate={navigate}

            apiTest={apiTest}
        />
    )
}

export default ApiTestContainer;