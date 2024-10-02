import React from "react";
import { SignInBox } from "./components/SignInBox";

import './SignIn.css';

const SignInPresenter = ({
    SignIn,

    id,
    setId,
    pw,
    setPw,

    navigate,
}) => {
    return (
        <div className="signin-container">
            <div className="navigate-button" onClick={() => navigate('/')}>
                메인 페이지로
            </div>

            {/* SignUpPresenter와 차이점 비교 바람(state 간결화) */}
            <SignInBox
                id={id}
                setId={setId}
                pw={pw}
                setPw={setPw}
            />

            <button className="login-button" onClick={SignIn}>
                로그인
            </button>
        </div>
    )
}

export default SignInPresenter;