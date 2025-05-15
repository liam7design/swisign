import React from 'react';
import SubpageLayout from '../layouts/SubpageLayout';
import BoardDetail from '../components/board/BoardDetail';
import { FloatingBox, FloatingButton } from '../components/ui/FloatingButton';
import SaleData from '../data/SaleData.json';

const SaleDetail = () => {
  return (
    <SubpageLayout customTitle="동작구 만양로 19 706-308">
      <BoardDetail
        data={SaleData}
        type="sale"
      />
      <FloatingBox>
        <FloatingButton variant="contained" label="완료" />
      </FloatingBox>
    </SubpageLayout>
  )
}

export default SaleDetail;