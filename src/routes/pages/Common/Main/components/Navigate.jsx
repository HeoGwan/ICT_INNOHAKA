import React from "react";
import { Link } from "react-router-dom";
import './Navigate.css';

export const Navigate = ({
    navigate,
    userInfo,
    SignOut,
}) => {
    return (
        <div className="page-navigate">
            {/*
                페이지 이동 시 Link 태그와 navigate 함수를 이용하는 방법 두가지가 있습니다.
            */}

            {
                // Link태그 이용 시 to에 routes/index.js에서 설정한 path이름을 넣어준다.
            }
            {
                userInfo ? 
                <button className="navigate-button" onClick={SignOut}>
                    로그아웃
                </button> :
                <Link to={'/signin'} className="navigate-button">
                    로그인
                </Link>
            }

            {
                // navigate함수 이용 시 navigate 파라미터에 routes/index.js에서 설정한 path이름을 넣어준다.
            }
            <div className="navigate-button" onClick={() => navigate('/signup')}>
                회원가입
            </div>
        </div>
    )
}