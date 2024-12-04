import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import MainPresenter from "./MainPresenter";

const MainContainer = ({
    
}) => {
    const navigate = useNavigate();

    return (
        <MainPresenter
            navigate={navigate}
        />
    )
}

export default MainContainer;