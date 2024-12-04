import React, { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import { ApiTest, Main, SelectCourse } from "./pages";

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
                <Route
                    path="/selectcourse"
                    element={<SelectCourse />}
                />
            </Routes>
        </div>
    )
}

export default Router;