import React, { useEffect, useState } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import SelectCourseInfoPresenter from "./SelectCourseInfoPresenter";
import RedImages from '../../../../assets/course_image/red';
import GreenImages from '../../../../assets/course_image/green';
import OrangeImages from '../../../../assets/course_image/orange';

const SelectCourseInfoContainer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { color } = useParams();

    const [images] = useState({
        'red': RedImages,
        'green': GreenImages,
        'orange': OrangeImages,
    });
    const [showImages] = useState(images[color]);
    const [courses, setCourses] = useState(null);
    const [maxLength, setMaxLength] = useState(-1);
    const size = 5;

    useEffect(() => {
        // navigate state로 넘어온 코스 값을 state에 저장
        if (!location.state) {
            alert('잘못된 접근입니다.');
            navigate('/');
            return;
        }

        const courseState = location.state;
        setMaxLength(courseState.length - 1);

        // 5개씩 나눠서 저장
        // 만약 5개가 안된다면 추가로 빈 배열을 넣음
        const result = [];
        for (let i = 0; i < courseState.length; i += size) {
            const arr = courseState.slice(i, i + 5);
            if (arr.length < size) {
                for (let j = 0; j < size - arr.length + 2; j++) {
                    arr.push([]);
                }
            }

            if (i & 1) {
                arr.reverse();
            }
            result.push(arr);
        }
        setCourses(result);
    }, []);

    // 코스 선택 시 해당 정보가 넘어감
    const selectCourse = (course) => {
        // 어딘가로 course 정보를 보낸다
        // course 정보는 아래와 같다
        // [정류장 이름, 주소, 위도, 경도] => public 폴더의 csv 폴더의 csv 파일 정보
        navigate('/', {
            state: course
        })
    }

    return (
        <SelectCourseInfoPresenter
            courses={courses}
            color={color}
            showImages={showImages}

            size={size}
            maxLength={maxLength}

            selectCourse={selectCourse}
        />
    )
};

export default SelectCourseInfoContainer;