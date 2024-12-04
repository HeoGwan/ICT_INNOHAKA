import React from "react";
import './SelectCourse.css';
import { useNavigate } from "react-router-dom";
// import LandingVideo from '../../../../assets/Landing.mov';

import RedCourse from '../../../../assets/red_course.jpg';
import GreenCourse from '../../../../assets/green_course.jpg';
import OrangeCourse from '../../../../assets/orange_course.jpg';
import BackButton from "../../../../components/BackButton/BackButton";

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

            <BackButton />
            <div className="course-title">
                <span style={{ fontSize: '1.5rem', color: '#FFFFFF' }}><span style={{ fontSize: '2.5rem', color: '#00098E', marginRight: '4px' }}>관광 코스  </span>  를 선택해주세요</span>
            </div>
            <div className="course-wrap">
                <div
                    className="course-item"
                    onClick={() => {
                        selectCourse('red_line', 'red');
                    }}
                >
                    <span style={{ color: 'red', fontWeight : 'bold' }}>레드라인</span>
                    <img src={RedCourse} alt="부산시티투어 레드라인 코스" />
                </div>
                <div
                    className="course-item"
                    onClick={() => {
                        selectCourse('green_line', 'green');
                    }}
                >
                    <span style={{ color: 'green', fontWeight : 'bold' }}>그린라인</span>
                    <img src={GreenCourse} alt="부산시티투어 그린라인 코스" />
                </div>
                <div
                    className="course-item"
                    onClick={() => {
                        selectCourse('orange_line', 'orange');
                    }}
                >
                    <span style={{ color: 'orange', fontWeight : 'bold' }}>오렌지라인</span>
                    <img src={OrangeCourse} alt="부산시티투어 오렌지라인 코스" />
                </div>
            </div>
        </div>
    );
};

export default SelectCoursePresenter;