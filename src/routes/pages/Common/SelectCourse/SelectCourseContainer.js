import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SelectCoursePresenter from "./SelectCoursePresenter";
import courseUtil from "../../../../utils/courseUtil";

const SelectCourseContainer = ({

}) => {
    const navigate = useNavigate();

    const selectCourse = async (course, color) => {
        const selectedCourse = await courseUtil.getCourse(course);
        
        navigate(`/selectcourseinfo/${color}`, {
            state: selectedCourse
        })
    }

    return (
        <SelectCoursePresenter
            navigate={navigate}

            selectCourse={selectCourse}
        />
    )
}

export default SelectCourseContainer;