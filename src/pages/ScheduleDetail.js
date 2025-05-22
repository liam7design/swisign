import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import SubpageLayout from '../layouts/SubpageLayout';
import FullpageLayout from '../layouts/FullpageLayout';
import ScheduleDetailComponent from '../components/schedule/ScheduleDetail';
import ScheduleWriteComponent from '../components/schedule/ScheduleWrite';
import ScheduleData from '../data/ScheduleData.json';
import { MemoProvider } from '../context/MemoContext';

const ScheduleDetail = () => {
  const { id } = useParams();
  const detailItem = ScheduleData.find(item => item.id === parseInt(id));

  return (
    <MemoProvider>
      <Routes>
        <Route
          path="/"
          element={
            <SubpageLayout customTitle={detailItem.address} customBackPath="/ScheduleList">
              <ScheduleDetailComponent data={ScheduleData} />
            </SubpageLayout>
          }
        />
        <Route
          path="Write"
          element={
            <FullpageLayout customTitle={detailItem.address}>
              <ScheduleWriteComponent data={ScheduleData} />
            </FullpageLayout>
          }
        />
      </Routes>
    </MemoProvider>
  )
}

export default ScheduleDetail;