import React from 'react';
import SubpageLayout from '../layouts/SubpageLayout';
import BoardList from '../components/board/BoardList';
import ScheduleData from '../data/ScheduleData.json';

const ScheduleList = () => {
  return (
    <SubpageLayout customBackPath="/">
      <BoardList
        data={ScheduleData}
        detailLink="/ScheduleDetail" 
        type="schedule"
      />
    </SubpageLayout>
  )
}

export default ScheduleList;