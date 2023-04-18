import React, { useEffect, useState } from 'react';
import './imageTable.css';

// mock data
import { userImg } from '../mock/testData';

// 드래그 요소
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

// 스타일 정의
import styled from 'styled-components';

const DragContent = styled.div`
  border: 1px solid lightgrey;
`;

const ImageTable = () => {
  const [userImage, setUserImage] = useState([...userImg]);

  useEffect(() => {
    userImage.map((img, idx) => {
      console.log(`useEffect > ${idx}: ${img}`);
    });
  }, [userImage]);

  // 드래그 이벤트 함수
  const onDragEnd = (result, provided) => {
    console.log('provided: ', provided);
    console.log('result: ', result);

    if (!result) {
      console.log('result가 null인 경우');
      return;
    }

    // 드래그 결과
    // source : 원본
    // destination : 변경
    const { destination, source } = result;

    // 동일한 위치에서 놓은 경우
    if (destination.index === source.index) {
      console.log('초기 위치 index 동일한 경우');
      return;
    }

    // 데이터 변경
    setUserImage((prev) => {
      // 원본 데이터
      const sourceData = userImage[source.index];
      // datas 복사
      let newDatas = prev;
      // 기존 데이터 제거
      newDatas.splice(source.index, 1);
      // 이동 위치로 데이터 옮기기
      newDatas.splice(destination.index, 0, sourceData);

      return newDatas;
    });
  };

  return (
    <div className="main">
      {/* 드래그 영역 */}
      <DragDropContext onDragEnd={onDragEnd}>
        {/* 드래그를 놓을 수 있는 영역 */}
        <Droppable droppableId="DropLand" direction="horizontal">
          {/* 드래그 div 생성 */}
          {(provided, snapshot) => {
            // css가 적용된 div
            return (
              <DragContent {...provided.droppableProps} ref={provided.innerRef}>
                <h3 className="explanation">Drag Image!</h3>
                {userImage.map((img, index) => {
                  console.log(`${index}: ${img}`);
                  return (
                    <Draggable key={index} draggableId={img} index={index}>
                      {(provided, snapshot) => (
                        <div
                          className="wrapper"
                          key={index}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <img className="iamge" src={img} alt="테스트 이미지" />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              </DragContent>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ImageTable;
