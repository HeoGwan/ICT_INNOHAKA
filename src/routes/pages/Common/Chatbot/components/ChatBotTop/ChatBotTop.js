import './ChatBotTop.css';
import { useNavigate } from "react-router-dom";

const ChatBotTop = ({

}) => {
    const navigate = useNavigate();

    return (
        <div className="chat-room-top">
            <div
                className="back-button"
                onClick={() => navigate(-1)}
            >
                
            </div>
            <div className="chat-room-title">
                빠른 요청
            </div>
            <div className='empty-space' />
        </div>
    )
}

export default ChatBotTop;