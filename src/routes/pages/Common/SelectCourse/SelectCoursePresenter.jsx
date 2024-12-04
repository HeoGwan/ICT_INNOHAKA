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
                코스를 선택해주세오
            </div>
            <div className="course-wrap">
                <div
                    className="course-item"
                    onClick={() => selectCourse('red_line')}
                >
                    <span
                        style={{color : 'red'}}
                    >레드라인 코스</span>
                    <img src={RedCourse} alt="부산시티투어 레드라인 코스" />
                </div>
                <div
                    className="course-item"
                    onClick={() => selectCourse('green_line')}
                >
                    <span>그린라인 코스</span>
                    <img src={GreenCourse} alt="부산시티투어 그린라인 코스" />
                </div>
                <div
                    className="course-item"
                    onClick={() => selectCourse('orange_line')}
                >
                    <span>오렌지라인 코스</span>
                    <img src={OrangeCourse} alt="부산시티투어 오렌지라인 코스" />
                </div>
            </div>
        </div >
    )
}

export default SelectCoursePresenter;