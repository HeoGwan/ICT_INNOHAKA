import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import MainPresenter from "./MainPresenter";

/* 
    하나의 페이지를 Container와 Presenter로 분리하고 각 역할은 아래와 같다

    * Container: 백엔드에서 데이터를 불러와 state 관리, 로직을 담당하는 함수 선언
    * Presenter: 불러온 데이터를 토대로 페이지에 출력, 함수 사용
*/
const MainContainer = ({
    userInfo,
    setUserInfo,
    SignOut,
}) => {
    // 페이지 이동을 위한 외부 함수
    const navigate = useNavigate();

    const [text, setText] = useState('');
    const [isSignUp, setIsSignUp] = useState(null);
    const [isSignIn, setIsSignIn] = useState(null);

    const buttonClick = async () => {
        const result = await fetch('http://localhost:3333/test', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                Accept: 'application/json',
                mode: 'no-cors',
                'Access-Control-Allow-Origin': '*',
            }
        });

        const data = await result.json();
        setText(data.data);
    }

    const SignUp = async () => {
        const result = await fetch('http://localhost:3333/user/signup', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                Accept: 'application/json',
                mode: 'no-cors',
                'Access-Control-Allow-Origin': '*',
            }
        });

        const data = await result.json();
        console.log(data)
        setIsSignUp(data)
    }

    const SignIn = async () => {
        const result = await fetch('http://localhost:3333/user/signin', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                Accept: 'application/json',
                mode: 'no-cors',
                'Access-Control-Allow-Origin': '*',
            }
        });

        const data = await result.json();
        console.log(data)
        setIsSignIn(data)
    }

    /*
        Container는 Presenter만 반환한다

        * Container에서 선언한 함수를 Presenter에게 props로 넘겨주어 사용한다.
    */
    return (
        <MainPresenter
            text={text}

            buttonClick={buttonClick}

            SignUp={SignUp}
            isSignUp={isSignUp}

            SignIn={SignIn}
            isSignIn={isSignIn}

            userInfo={userInfo}
            setUserInfo={setUserInfo}
            SignOut={SignOut}

            navigate={navigate}
        />
    )
}

export default MainContainer;