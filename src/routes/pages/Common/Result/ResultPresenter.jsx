import React from "react";
import { useNavigate } from "react-router-dom";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Pin from '../../../../assets/Pin.png';
import { Empty } from "antd";

import './Result.css';
import BackButton from "../../../../components/BackButton/BackButton";

const ResultPresenter = ({
    navigate,

    mapRef,
    center,

    results,
    marker,
    selectItem,
    level,
}) => {

    return (
        <div className="result-container">
            <BackButton
                direction="left"
                destination="first"
            />
            <Map
                center={{ lat: center.lat, lng: center.lng }}
                style={{ width: '100%', height: '100vh' }}
                ref={mapRef}
                level={level}
            >
                <MapMarker
                    position={marker}
                />
            </Map>
            <ul className="food-list">
                {
                    results?.map(result => {
                        const { address_name, category_name, phone, place_name, x, y } = result;

                        return (
                            <li
                                className="food-item"
                                onClick={() => {
                                    selectItem({ lat: y, lng: x });
                                }}
                            >
                                <div className="food-info">
                                    <div className="name">
                                        {place_name}
                                    </div>
                                    <div className="info">
                                        <div>{category_name}</div>
                                        <div>{phone}</div>
                                        <div>{address_name}</div>
                                    </div>
                                </div>
                                <img src={Pin} alt="핀 이미지" />
                            </li>
                        )
                    })
                }
                {
                    results.length === 0 &&
                    <div className="empty-list">
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                    </div>
                }
            </ul>
        </div>
    );
};

export default ResultPresenter;