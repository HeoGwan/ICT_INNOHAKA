import React from "react";

import './Main.css';

const MainPresenter = ({
    navigate,
}) => {
    return (
        <div className="main-container">
            <div
                className="move"
                onClick={() => navigate('apitest')}
            >
                API Test
            </div>
            <div
                className='move'
                onClick={() => navigate('chatbot')}
            >
                Chatbot
            </div>
            <div
                className="move"
                onClick={() => navigate('selectcourse')}
            >
                SELECT COURSE
            </div>
        </div>
    )
}

export default MainPresenter;