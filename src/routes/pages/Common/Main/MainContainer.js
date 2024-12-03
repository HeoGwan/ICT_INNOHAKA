import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import MainPresenter from "./MainPresenter";

const MainContainer = ({
    
}) => {
    // 페이지 이동을 위한 외부 함수
    const navigate = useNavigate();

    
    return (
        <MainPresenter
            navigate={navigate}
        />
    )
}

export default MainContainer;