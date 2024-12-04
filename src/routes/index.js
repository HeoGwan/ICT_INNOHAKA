import React, { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import { ApiTest, Main, SelectCourse, ChatBot, SelectCourseInfo, Result } from "./pages";

import '../index.css';

const Router = () => {
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
                    element={<Result/>}
                />
                <Route
                    path="/selectcourseinfo/:color"
                    element={<SelectCourseInfo/>}
                />
            </Routes>
        </div>
    )
}

export default Router;