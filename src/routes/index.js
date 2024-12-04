import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ApiTest, Main, SelectCourse, ChatBot, SelectCourseInfo, Result } from "./pages";

import '../index.css';

const Router = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (pathname === '/') {
            navigate('/main');
        }
    }, [pathname]);

    return (
        <div className="app">
            <Routes>
                <Route
                    path="/main"
                    element={<Main />}
                />
                <Route
                    path="/apitest"
                    element={<ApiTest />}
                />
                <Route
                    path='/chatbot'
                    element={<ChatBot />}
                />
                <Route
                    path="/selectcourse"
                    element={<SelectCourse />}
                />
                <Route
                    path="/result"
                    element={<Result />}
                />
                <Route
                    path="/selectcourseinfo/:color"
                    element={<SelectCourseInfo />}
                />
            </Routes>
        </div>
    )
}

export default Router;