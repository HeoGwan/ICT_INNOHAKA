import React from "react";

import './ApiTest.css';

const ApiTestPresenter = ({
    navigate,

    apiTest,
}) => {
    return (
        <div className="main-container">
            <div
                className="api-test move"
                onClick={apiTest}
            >
                API TEST
            </div>
            <div
                className="move"
                onClick={() => navigate('/')}
            >
                HOME
            </div>
        </div>
    )
}

export default ApiTestPresenter;