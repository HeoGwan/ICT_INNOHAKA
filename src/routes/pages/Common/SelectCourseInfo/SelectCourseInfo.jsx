import React from "react";
import { useParams } from "react-router-dom"; // useParams 가져오기
import "./SelectCourseInfo.css";

const SelectCourseInfo = () => {
    const courses = {
        orange: [
            "부산역",
            "송도해수욕장",
            "암남공원",
            "감천문화마을",
            "다대포 해수욕장",
            "아미산전망대",
            "부네치아 장림항",
            "석당박물관",
            "국제 시장",
            "용두산 공원",
        ],
        green: [
            "부산역",
            "영도대교",
            "흰여울 문화 마을",
            "하늘전망대",
            "태종대",
            "국립해양박물관",
            "아르떼뮤지엄부산",
            "오륙도스카이워크",
            "용호만유람선터미널",
            "평화공원",
            "송도 해수욕장",
            "자갈치,BiFF 광장",
        ],
        red: [
            "부산역",
            "경유(부산대교,부산항대교)",
            "UN기념공원",
            "부산박물관",
            "용호만유람선터미널",
            "광안리 해수욕장",
            "마린시티",
            "동백섬",
            "해운대해수욕장",
            "센텀시티",
            "시립미술관,벡스코",
            "평화공원",
            "광복로",
            "부산역",
        ],
    };

    // useParams를 사용하여 URL에서 color 값 가져오기
    const { color } = useParams();

    // 올바른 color인지 확인
    if (!courses[color]) {
        return <div className="error">Invalid course selected</div>;
    }

    const renderCourse = (course, color) => {
        return (
            <div className="course-container">
                {course.map((stop, index) => (
                    <div
                        className="station-container"
                        key={index}
                        style={{ borderColor: color }}
                    >
                        <div className="station">
                            <span className="station-name">{stop}</span>
                        </div>
                        {index < course.length - 1 && (
                            <div
                                className="station-line"
                                style={{ backgroundColor: color }}
                            ></div>
                        )}
                    </div>
                ))}
            </div>
        );
    };



    return (
        <div className="course-info-container">
            <h2 className="course-title">{`${color.toUpperCase()} Course`}</h2>
            {renderCourse(courses[color], color)}
        </div>
    );
};

export default SelectCourseInfo;