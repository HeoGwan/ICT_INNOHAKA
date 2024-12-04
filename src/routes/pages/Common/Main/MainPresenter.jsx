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
                <span>관광지 안내 서비스</span>
                <div 
                    className="start-button-container"
                    onClick={() => { navigation('/selectcourse') }}
                >
                    시작하기
                </div>
            </div>
        </div>
    );
};

export default MainPresenter;