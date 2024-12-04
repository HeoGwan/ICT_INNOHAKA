import React from "react";

import './SelectCourse.css';

import RedCourse from '../../../../assets/red_course.jpg';
import GreenCourse from '../../../../assets/green_course.jpg';
import OrangeCourse from '../../../../assets/orange_course.jpg';

const SelectCoursePresenter = ({
    navigate,
    selectCourse,
}) => {
    return (
        <div className="course-container">
            <div className="course-title">
                원하는 코스를 선택하세요!
            </div>
            <div className="course-wrap">
                <div
                    className="course-item"
                    onClick={() => selectCourse('red_line')}
                >
                    레드라인 코스
                    <img src={RedCourse} alt="부산시티투어 레드라인 코스" />
                </div>
                <div
                    className="course-item"
                    onClick={() => selectCourse('green_line')}
                >
                    그린라인 코스
                    <img src={GreenCourse} alt="부산시티투어 그린라인 코스" />
                </div>
                <div
                    className="course-item"
                    onClick={() => selectCourse('orange_line')}
                >
                    오렌지라인 코스
                    <img src={OrangeCourse} alt="부산시티투어 오렌지라인 코스" />
                </div>
            </div>
        </div >
    )
}

export default SelectCoursePresenter;