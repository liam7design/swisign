import React from 'react';
import SubpageLayout from '../layouts/SubpageLayout';
import BoardList from '../components/board/BoardList';
import SaleData from '../data/SaleData.json';

const SaleList = () => {
  return (
    <SubpageLayout>
      <BoardList
        data={SaleData} 
        detailLink="/sale-detail" 
        type="sale"
      />
    </SubpageLayout>
  )
}

export default SaleList;