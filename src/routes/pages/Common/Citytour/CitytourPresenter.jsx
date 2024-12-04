import React from "react";
import './Citytour.css';
import { useNavigate } from "react-router-dom";

const Citytour = () => {
    const navigate = useNavigate();

    const CitytourList = ['레드 투어', '그린 투어', '오렌지 투어'];

    return (
        <div className="citytour-container">
            {/* 투어 리스트 */}
            {CitytourList.map((tour, index) => (
                <div 
                    key={index} 
                    className="tour-item"
                    onClick={() => { navigate(`/chatbot:${tour}`); }} // 투어명을 URL 쿼리로 전달
                >
                    {tour}
                </div>
            ))}
        </div>
    );
};

export default Citytour;