import React, { useEffect, useState } from 'react';
import './imageTable.css';

// mock data
import { userImg } from '../mock/testData';

// react-motion
import { Motion, spring } from 'react-motion';

// 스타일 정의
import styled from 'styled-components';

const DragContent = styled.div`
  border: 1px solid lightgrey;
`;

const ImageTableMotion = () => {
  const [userImage, setUserImage] = useState([...userImg]);

  return (
    <div className="main">
      {userImage.map((img, index) => {
        return (
          <div className="wrapper" key={index}>
            <img className="iamge" src={img} alt="테스트 이미지" />
          </div>
        );
      })}
    </div>
  );
};

export default ImageTableMotion;
