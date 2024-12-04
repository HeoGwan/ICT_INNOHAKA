import React from "react";
import './SelectCourse.css';
import { useNavigate } from "react-router-dom";
// import LandingVideo from '../../../../assets/Landing.mov';

import RedCourse from '../../../../assets/red_course.jpg';
import GreenCourse from '../../../../assets/green_course.jpg';
import OrangeCourse from '../../../../assets/orange_course.jpg';

const SelectCoursePresenter = ({ selectCourse }) => {
    const navigate = useNavigate();

    return (
        <div className="course-select-container">
            {/* <video 
                className="background-video" 
                src={LandingVideo} 
                autoPlay 
                loop 
                muted
            /> */}

            <div className="course-title">코스를 선택해주세요</div>
            <div className="course-wrap">
                <div
                    className="course-item"
                    onClick={() => {
                        selectCourse('red_line', 'red');
                        // navigate('/selectcourseinfo'); // URL에 red 전달
                    }}
                >
                    <span style={{ color: 'red' }}>레드라인</span>
                    <img src={RedCourse} alt="부산시티투어 레드라인 코스" />
                </div>
                <div
                    className="course-item"
                    onClick={() => {
                        selectCourse('green_line', 'green');
                        // navigate('/selectcourseinfo/green'); // URL에 green 전달
                    }}
                >
                    <span style={{ color: 'green' }}>그린라인</span>
                    <img src={GreenCourse} alt="부산시티투어 그린라인 코스" />
                </div>
                <div
                    className="course-item"
                    onClick={() => {
                        selectCourse('orange_line', 'orange');
                        // navigate('/selectcourseinfo/orange'); // URL에 orange 전달
                    }}
                >
                    <span style={{ color: 'orange' }}>오렌지라인</span>
                    <img src={OrangeCourse} alt="부산시티투어 오렌지라인 코스" />
                </div>
            </div>
        </div>
    );
};

export default SelectCoursePresenter;