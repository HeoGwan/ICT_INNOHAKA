import React from "react";
import { useNavigate } from "react-router-dom";
import './BackButton.css';

const BackButton = ({
    direction = 'right',
    destination = 'back',
}) => {
    const navigate = useNavigate();

    return (
        <div
            className="back-button"
            style={direction === 'left' ? { left: 0, marginLeft: '1rem' } : { right: 0, marginRight: '1rem' }}
            onClick={() => navigate(destination === 'back' ? -1 : '/main')}
        >
            <span className="arrow">{'<'}</span>
            <span className="button-text">{destination === 'back' ? '뒤로가기' : '처음으로'}</span>
        </div>

    )
}

export default BackButton;