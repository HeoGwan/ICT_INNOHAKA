import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SignInPresenter from "./SignInPresenter";

/* 
    하나의 페이지를 Container와 Presenter로 분리하고 각 역할은 아래와 같다

    * Container: 백엔드에서 데이터를 불러와 state 관리, 로직을 담당하는 함수 선언
    * Presenter: 불러온 데이터를 토대로 페이지에 출력, 함수 사용
*/
const SignInContainer = ({
    setUserInfo,
}) => {
    const navigate = useNavigate();

    // 로그인에 필요한 정보를 state로 관리한다
    /*
     Tip!
        입력받을 정보가 많을 경우 또는 추가될 경우를 대비하여
        여러개의 state로 관리하는 것이 아닌 아래와 같이 하는 것이 좋다
        const [userInfo, setUserInfo] = useState({
            email: '',
            pw: '',
        })

        단, 위와 같이 하나의 state(객체)로 관리할 시 onChange 부분에서 아래와 같이
        prevState를 이용해야 한다.
        (실제 사용 방법은 SignUp 확인 바람)

        ex) 이메일을 입력받는다고 가정
        onChange={e => {
            const email = e.target.value;
            setUserInfo(prev => {
                return {...prev, email};
            })
        }}
     */
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const SignIn = async () => {
        // 이메일과 비밀번호를 입력하지 않을 시 알림창 띄우기 (에러 처리)
        if (!id.length) {
            alert('이메일을 입력해주세요!');
            return;
        }

        if (!pw.length) {
            alert('비밀번호를 입력해주세요!');
            return;
        }

        // API 연결
        // 의미 상 로그인은 데이터를 가져오는 것이지만 데이터 전송을 용이하게 하기 위하여 post를 사용한다.
        // post를 사용하는 이유?
        //  req.body에 로그인 정보를 쉽게 전달할 수 있어서 데이터 전송이 편하다
        const result = await fetch('http://localhost:3333/user/signin', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                Accept: 'application/json',
                mode: 'no-cors',
                'Access-Control-Allow-Origin': '*',
            },
            // JSON.stringify를 이용하여 보내고 싶은 데이터를 JSON형식으로 보낸다.
            // (SignUp과 차이점을 비교하기 바람)
            body: JSON.stringify({
                id,
                pw,
            }),
        });

        // 결과 받은 후 문제 없으면 메인 페이지로 이동
        const data = await result.json();

        if (data.status === 4091) {
            // 4091은 문제가 없다는 것을 뜻하므로 메인 페이지로 이동
            setUserInfo(data.data);
            navigate('/');
            return;
        }

        // 문제가 있을 경우 에러 메시지를 사용자에게 알려준다.
        alert(data.message);
    }

    return (
        <SignInPresenter
            SignIn={SignIn}

            id={id}
            setId={setId}
            pw={pw}
            setPw={setPw}

            navigate={navigate}
        />
    )
}

export default SignInContainer;