import React from "react";

// SignInBox와 차이점 비교 바람 (state 사용법)
export const SignUpBox = ({
    userInfo,
    setUserInfo,
}) => {
    return (
        <div className="sign-box">
            <h2>회원가입</h2>
            <div className="input-box">
                <input
                    type="text"
                    placeholder="아이디를 입력하세요"
                    value={userInfo.id}
                    onChange={e => {
                        const id = e.target.value;
                        setUserInfo(prev => {
                            return { ...prev, id };
                        })
                    }}
                />
                <input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={userInfo.pw}
                    onChange={e => {
                        const pw = e.target.value;
                        setUserInfo(prev => {
                            return { ...prev, pw };
                        })
                    }}
                />
                <input
                    type="text"
                    placeholder="이름를 입력하세요"
                    value={userInfo.name}
                    onChange={e => {
                        const name = e.target.value;
                        setUserInfo(prev => {
                            return { ...prev, name };
                        })
                    }}
                />
                <input
                    type="text"
                    placeholder="전화번호를 입력하세요"
                    value={userInfo.phone}
                    onChange={e => {
                        const phone = e.target.value;
                        setUserInfo(prev => {
                            return { ...prev, phone };
                        })
                    }}
                />
            </div>
        </div>
    )
}