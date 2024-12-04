import React, { useState } from "react";
import './SelectCourseInfo.css';

const SelectCourseInfoPresenter = ({
    courses,
    color,
    showImages,

    size,
    maxLength,

    selectCourse,
}) => {
    const [title] = useState({
        'red': '레드라인 코스',
        'green': '그린라인 코스',
        'orange': '오렌지라인 코스',
    })

    return (
        <div className="select-course-info-container">
            <div className="select-course-info-header">
                <span>{title[color]}</span>
            </div>
            {
                courses?.map((course, idx) => {
                    let dir = (idx & 1) ? 'left' : 'right';

                    return (
                        <ul className={`select-course-list ${dir === 'left' ? 'reverse' : ''}`}>
                            {
                                course?.map((c, i) => {
                                    const place_name = c[0];
                                    const coords = { lat: c[3], lng: [2] };
                                    const current_index = (idx * size) + i;
                                    let next;
                                    // 만약 i가 size - 1보다 작으면 다음 요소를 가지고올 수 있음
                                    if (i < size - 1) {
                                        next = course[i + 1];
                                    }

                                    // 만약 각 줄의 마지막이면 빨간줄을 밑으로 내림
                                    if ((i + 1) % size === 0) {
                                        dir = 'bottom';
                                    }

                                    return (
                                        <li
                                            className={
                                                `
                                                    select-course-item 
                                                    ${place_name ?
                                                    current_index === maxLength ?
                                                        'last'
                                                        : dir
                                                    : 'none'}
                                                    ${color}
                                                `
                                            }
                                            onClick={() => selectCourse(c)}
                                        >
                                            {
                                                current_index <= maxLength &&
                                                <img src={showImages[current_index]} alt="시티투어 정류장 이미지" />
                                            }
                                            <span>{place_name?.replaceAll('"', '')}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )
                })
            }
        </div>
    )
};

export default SelectCourseInfoPresenter;