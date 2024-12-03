import React, { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import { ApiTest, Main } from "./pages";

import '../index.css';

const Router = () => {
    return (
        <div className="app">
            <Routes>
                <Route
                    path="/"
                    element={<Main />}
                />
                <Route
                    path="/apitest"
                    element={<ApiTest />}
                />
            </Routes>
        </div>
    )
}

/* App/App.js에서 import하기 위한 설정 */
export default Router;