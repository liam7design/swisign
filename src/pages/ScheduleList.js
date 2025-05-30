import React from 'react';
import { useNavigate } from 'react-router-dom';
import SubpageLayout from '../layouts/SubpageLayout';
import BoardList from '../components/board/BoardList';
import ScheduleData from '../data/ScheduleData.json';

const ScheduleList = () => {
  const navigate = useNavigate();
  return (
    <SubpageLayout customBackPath={() => navigate('/')}>
      <BoardList
        data={ScheduleData}
        detailLink="/ScheduleDetail" 
        type="schedule"
      />
    </SubpageLayout>
  )
}

export default ScheduleList;