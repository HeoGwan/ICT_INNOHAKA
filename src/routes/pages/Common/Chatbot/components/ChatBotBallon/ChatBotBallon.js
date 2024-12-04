import './ChatBotBallon.css';
import ChatBotButton from '../ChatBotButton/ChatBotButton';

const ChatBotBallon = ({
    chatInfo,
    type,
    buttonType,
    chatIndex,
}) => {
    const { title, option, event, enabled } = chatInfo;

    return (
        <div
            className={`chat-ballon ${type === 'question' ? 'other' : 'self'}`}
        >
            {title}
            {
                type === 'question' ?
                    option?.map((opt, idx) => {
                        const { option_title, value } = opt;
                        return (
                            <div className='chat-ballon-info'>
                                <ChatBotButton
                                    title={option_title}
                                    content={value}
                                    onClick={() => event(opt, chatIndex)}
                                    buttonType={buttonType}
                                    enabled={enabled}
                                />
                            </div>
                        )
                    }) :
                    chatInfo?.value
            }
        </div>
    )
}

export default ChatBotBallon;