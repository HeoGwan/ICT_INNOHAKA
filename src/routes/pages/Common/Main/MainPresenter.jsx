import React from "react";
// import LandingVideo from '../../../../assets/Landing.mov';
import { useNavigate } from "react-router-dom";
import './Main.css';

const MainPresenter = () => {
    const navigation = useNavigate();

    return (
        <div className="main-container">
            {/* 배경 동영상 */}
            {/* <video
                className="background-video"
                src={LandingVideo}
                autoPlay
                loop
                muted
            /> */}

            {/* 콘텐츠 */}
            <div className="content">
                <span
                    style={{ fontSize: '1.5rem' }}
                >당신의 취향에 맞춘 도시 탐험,  <span
                    style={{ color: '#00098E', fontSize: '2.3rem' }}
                >맞춤형 시티투어  </span>를 경험하세요!</span>
                <div
                    className="start-button-container"
                    onClick={() => { navigation('/selectcourse') }}
                >
                    <span>주변 맛집 찾아보기</span>
                </div>
            </div>
        </div>
    );
};

export default MainPresenter;